import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Allowed origins for CORS - restrict to your domains
const ALLOWED_ORIGINS = [
  'https://receiptsyncnet.lovable.app',
  'https://receiptsync.net',
  'https://www.receiptsync.net',
];

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute per IP

// In-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  record.count++;
  return true;
}

function getCorsHeaders(origin: string | null): Record<string, string> {
  // Check if origin is in allowed list, or allow in development
  const isAllowed = origin && (
    ALLOWED_ORIGINS.includes(origin) || 
    origin.includes('localhost') || 
    origin.includes('.lovable.app')
  );
  
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

interface TikTokEvent {
  event: string;
  event_time: number;
  event_id: string;
  user: {
    email?: string;
    ip?: string;
    user_agent?: string;
    ttp?: string;
  };
  page?: {
    url?: string;
  };
  properties?: {
    content_name?: string;
  };
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get client IP for rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               req.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': '60' },
      });
    }

    const accessToken = Deno.env.get('TIKTOK_ACCESS_TOKEN');
    if (!accessToken) {
      console.error('TikTok access token not configured');
      return new Response(JSON.stringify({ error: 'Service unavailable' }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate request body
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { event, email, url, userAgent, ttp, content_name } = body;

    // Validate required fields
    if (!event || typeof event !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid event type' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate URL if provided
    if (url && typeof url === 'string') {
      try {
        const parsedUrl = new URL(url);
        // Only allow requests from our domains
        if (!ALLOWED_ORIGINS.some(o => parsedUrl.origin === o || parsedUrl.hostname.includes('lovable.app'))) {
          console.warn(`Invalid URL origin: ${parsedUrl.origin}`);
        }
      } catch {
        // Invalid URL, will use empty string
      }
    }

    // Generate unique event ID
    const eventId = crypto.randomUUID();
    const eventTime = Math.floor(Date.now() / 1000);

    // Build the event data
    const eventData = {
      event: event || 'CompleteRegistration',
      event_time: eventTime,
      event_id: eventId,
      user: {
        email: email ? await hashSHA256(String(email).toLowerCase().trim()) : undefined,
        ip: ip !== 'unknown' ? ip : undefined,
        user_agent: userAgent ? String(userAgent).slice(0, 500) : undefined,
        ttp: ttp ? String(ttp).slice(0, 100) : undefined,
      },
      page: {
        url: url ? String(url).slice(0, 500) : '',
      },
      properties: {
        content_name: content_name ? String(content_name).slice(0, 100) : undefined,
      },
    };

    // Send to TikTok Events API v1.3
    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken,
      },
      body: JSON.stringify({
        event_source: 'web',
        event_source_id: 'D5S1QMBC77UAR2VTU55G',
        test_event_code: 'TEST70023',
        data: [eventData],
      }),
    });

    const result = await response.json();

    console.log('TikTok Events API response:', result);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending TikTok event:', error);
    // Return generic error message - don't expose internals
    return new Response(
      JSON.stringify({ error: 'Failed to process event' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// Hash email using SHA256 as required by TikTok
async function hashSHA256(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
