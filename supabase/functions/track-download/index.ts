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
const RATE_LIMIT_MAX_REQUESTS = 20; // 20 requests per minute per IP

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
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

interface GeoData {
  country_name?: string;
  country_code?: string;
  city?: string;
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
               req.headers.get('cf-connecting-ip') ||
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': '60' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Database configuration missing');
      return new Response(JSON.stringify({ error: 'Service unavailable' }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

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

    const { store_type, user_agent, referrer } = body;

    // Validate store_type
    if (!store_type || !['app_store', 'google_play'].includes(store_type)) {
      return new Response(JSON.stringify({ error: 'Invalid store type' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Client IP:', ip);

    // Get geolocation data from IP using ip-api.com (free, no key required)
    let geoData: GeoData = {};
    if (ip && ip !== 'unknown' && ip !== '127.0.0.1' && ip !== '::1' && !ip.startsWith('192.168.') && !ip.startsWith('10.')) {
      try {
        // ip-api.com is free for non-commercial use, no API key needed
        const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,city`);
        if (geoResponse.ok) {
          const data = await geoResponse.json();
          console.log('Geo data:', data);
          if (data.status === 'success') {
            geoData = {
              country_name: data.country,
              country_code: data.countryCode,
              city: data.city,
            };
          }
        }
      } catch (geoError) {
        console.error('Geo lookup failed:', geoError);
      }
    } else {
      console.log('Skipping geo lookup for local/private IP');
    }

    // Insert the click record with validated/sanitized data
    const { error } = await supabase.from('download_clicks').insert({
      store_type,
      country: geoData.country_name || null,
      country_code: geoData.country_code || null,
      city: geoData.city || null,
      user_agent: user_agent ? String(user_agent).slice(0, 500) : null,
      referrer: referrer ? String(referrer).slice(0, 500) : null,
    });

    if (error) {
      console.error('Insert error:', error);
      return new Response(JSON.stringify({ error: 'Failed to track download' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Download click tracked: ${store_type} from ${geoData.country_name || 'Unknown'}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error tracking download:', error);
    // Return generic error message - don't expose internals
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
