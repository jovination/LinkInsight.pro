
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

    console.log(`Analyzing keywords for URL: ${url}`);

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

    // In a production environment, we would make actual HTTP requests and analyze the content
    // For this demo, we'll simulate the analysis
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate simulated keyword density data
    const keywords = [
      'website', 'example', 'content', 'page', 'link', 'seo', 
      'optimization', 'performance', 'analytics', 'tools', 
      'marketing', 'search', 'engine', 'monitoring'
    ];
    
    const result: Record<string, number> = {};
    
    keywords.sort(() => Math.random() - 0.5).slice(0, 8).forEach(keyword => {
      result[keyword] = parseFloat((Math.random() * 3 + 0.5).toFixed(2));
    });
    
    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error analyzing keywords:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to analyze keywords' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
