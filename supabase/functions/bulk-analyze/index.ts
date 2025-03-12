
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { urls } = await req.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return new Response(
        JSON.stringify({ error: 'URLs array is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    console.log(`Analyzing ${urls.length} links`);

    // In a real implementation, this would make actual HTTP requests or use a batched approach
    // For now, we'll simulate the analysis
    const randomDelay = Math.floor(Math.random() * 3000) + 1000;
    await new Promise(resolve => setTimeout(resolve, randomDelay));

    // Create response data
    const results = urls.map(url => {
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

      return {
        url,
        status,
        statusCode,
        responseTime,
        title,
        errors: status === 'broken' ? ['Page not found'] : [],
        redirectUrl: status === 'redirected' ? url.replace('http:', 'https:') : null,
        analyzed_at: new Date().toISOString()
      };
    });

    return new Response(
      JSON.stringify(results),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
    
  } catch (error) {
    console.error('Error analyzing links:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to analyze links' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
