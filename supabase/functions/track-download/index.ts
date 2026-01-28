import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface GeoData {
  country_name?: string;
  country_code?: string;
  city?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { store_type, user_agent, referrer } = await req.json();

    // Get client IP from headers
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               req.headers.get('x-real-ip') || 
               req.headers.get('cf-connecting-ip') ||
               '';

    console.log('Client IP:', ip);

    // Get geolocation data from IP using ip-api.com (free, no key required)
    let geoData: GeoData = {};
    if (ip && ip !== '127.0.0.1' && ip !== '::1' && !ip.startsWith('192.168.') && !ip.startsWith('10.')) {
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

    // Insert the click record
    const { error } = await supabase.from('download_clicks').insert({
      store_type,
      country: geoData.country_name || null,
      country_code: geoData.country_code || null,
      city: geoData.city || null,
      user_agent: user_agent || null,
      referrer: referrer || null,
    });

    if (error) {
      console.error('Insert error:', error);
      throw error;
    }

    console.log(`Download click tracked: ${store_type} from ${geoData.country_name || 'Unknown'}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error tracking download:', error);
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
