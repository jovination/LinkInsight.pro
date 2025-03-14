
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

    console.log(`Getting backlinks for URL: ${url}`);

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

    // In a production environment, we would use a backlinks API 
    // (e.g., Moz, Ahrefs, Majestic, SEMrush, etc.)
    // For this demo, we'll simulate the data
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Mock backlink data
    const domains = [
      'example.org', 'blog.com', 'news.net', 'reference.info',
      'directory.com', 'partner.co', 'industry.org', 'review.site',
      'tech.blog', 'developer.zone', 'community.forum', 'resources.hub'
    ];
    
    const anchors = [
      'click here', 'useful resource', 'more information', 'read more',
      'great article', 'helpful guide', 'check this out', 'learn more',
      'product review', 'official website', 'expert analysis', 'tool overview'
    ];
    
    // Generate random backlinks
    const backlinks = Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () => {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 60));
      
      return {
        source: `https://${domains[Math.floor(Math.random() * domains.length)]}`,
        anchor: anchors[Math.floor(Math.random() * anchors.length)],
        date: date.toISOString().split('T')[0]
      };
    });
    
    return new Response(
      JSON.stringify(backlinks),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error getting backlinks:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to get backlinks data' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
