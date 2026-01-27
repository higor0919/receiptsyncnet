import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get('TIKTOK_ACCESS_TOKEN');
    if (!accessToken) {
      throw new Error('TikTok access token not configured');
    }

    const { event, email, url, userAgent, ttp, content_name } = await req.json();

    // Get client IP from headers
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
               req.headers.get('x-real-ip') || 
               '';

    // Generate unique event ID
    const eventId = crypto.randomUUID();
    const eventTime = Math.floor(Date.now() / 1000);

    // Build the event data
    const eventData = {
      event: event || 'CompleteRegistration',
      event_time: eventTime,
      event_id: eventId,
      user: {
        email: email ? await hashSHA256(email.toLowerCase().trim()) : undefined,
        ip: ip || undefined,
        user_agent: userAgent || undefined,
        ttp: ttp || undefined,
      },
      page: {
        url: url || '',
      },
      properties: {
        content_name: content_name || undefined,
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

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending TikTok event:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
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
