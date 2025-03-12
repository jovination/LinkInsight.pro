
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'Invalid URL format' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    console.log(`Analyzing link: ${url}`);

    // In a real implementation, this would make an actual HTTP request
    // For now, we'll simulate the analysis
    const randomDelay = Math.floor(Math.random() * 2000) + 500;
    await new Promise(resolve => setTimeout(resolve, randomDelay));

    // Simulate different results
    const random = Math.random();
    let status, statusCode, responseTime, title;

    if (random > 0.8) {
      status = 'broken';
      statusCode = 404;
      responseTime = '-';
      title = null;
    } else if (random > 0.7) {
      status = 'redirected';
      statusCode = 301;
      responseTime = (Math.random() * 1 + 0.5).toFixed(2) + 's';
      title = 'Redirected Page';
    } else {
      status = 'healthy';
      statusCode = 200;
      responseTime = (Math.random() * 1 + 0.1).toFixed(2) + 's';
      title = 'Example Page Title';
    }

    // Create a response with the analysis results
    const result = {
      url,
      status,
      statusCode,
      responseTime,
      title,
      errors: status === 'broken' ? ['Page not found'] : [],
      redirectUrl: status === 'redirected' ? url.replace('http:', 'https:') : null,
      analyzed_at: new Date().toISOString()
    };

    // If authenticated, could save the result to the database
    // const supabaseAdmin = createClient(
    //   Deno.env.get('SUPABASE_URL') ?? '',
    //   Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    // );
    // 
    // await supabaseAdmin.from('link_checks').insert({
    //   url: result.url,
    //   status: result.status,
    //   response_time: result.responseTime,
    //   status_code: result.statusCode,
    //   user_id: /* user id from auth */
    // });

    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
    
  } catch (error) {
    console.error('Error analyzing link:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to analyze link' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
