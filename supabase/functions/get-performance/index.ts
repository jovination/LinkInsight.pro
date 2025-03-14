
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

    console.log(`Getting performance metrics for URL: ${url}`);

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

    // In a production environment, we would use Google PageSpeed Insights API
    // or equivalent services for real performance data
    // For this demo, we'll simulate the data
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Generate mock performance history
    const historyEntries = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      return {
        date: date.toISOString().split('T')[0],
        pageSpeed: Math.round(Math.random() * 40 + 60) // Random score between 60-100
      };
    });
    
    // Generate current performance metrics
    const performanceData = {
      url,
      date: new Date().toISOString(),
      pageSpeed: Math.round(Math.random() * 40 + 60),
      firstContentfulPaint: (Math.random() * 2 + 0.5).toFixed(1) + 's',
      largestContentfulPaint: (Math.random() * 3 + 1).toFixed(1) + 's',
      timeToInteractive: (Math.random() * 4 + 2).toFixed(1) + 's',
      totalBlockingTime: (Math.random() * 0.5).toFixed(1) + 's',
      cumulativeLayoutShift: (Math.random() * 0.1).toFixed(2),
      history: historyEntries
    };
    
    return new Response(
      JSON.stringify(performanceData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error getting performance metrics:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to get performance metrics' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
