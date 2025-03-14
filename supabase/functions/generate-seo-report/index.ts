
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

    console.log(`Generating SEO report for: ${url}`);

    // Get authorization header for authenticated requests
    const authHeader = req.headers.get('Authorization');
    let userId = null;

    // Initialize Supabase client with admin privileges
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // If authorization header is present, verify the user
    if (authHeader) {
      try {
        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
        
        if (error) throw error;
        if (user) userId = user.id;
      } catch (error) {
        console.error('Auth error:', error);
      }
    }

    // In a production environment, we would make actual HTTP requests to analyze the URL
    // and use real SEO checking libraries. For this demo, we'll simulate the analysis
    
    // Simulate a fetch delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate random SEO issues
    const issueTypes = ['critical', 'warning', 'info'];
    const impactLevels = ['high', 'medium', 'low'];
    
    const possibleIssues = [
      {
        type: 'critical',
        description: 'Missing meta description',
        impact: 'high',
        location: '<head> section'
      },
      {
        type: 'critical',
        description: 'Missing title tag',
        impact: 'high',
        location: '<head> section'
      },
      {
        type: 'critical',
        description: 'Slow page load time (> 5s)',
        impact: 'high',
        location: 'Overall page'
      },
      {
        type: 'warning',
        description: 'Images missing alt text',
        impact: 'medium',
        location: 'Multiple images'
      },
      {
        type: 'warning',
        description: 'Duplicate content detected',
        impact: 'medium',
        location: 'Multiple pages'
      },
      {
        type: 'warning',
        description: 'H1 tag missing',
        impact: 'medium',
        location: 'Page content'
      },
      {
        type: 'warning',
        description: 'Low word count (< 300 words)',
        impact: 'medium',
        location: 'Page content'
      },
      {
        type: 'info',
        description: 'Consider adding more internal links',
        impact: 'low'
      },
      {
        type: 'info',
        description: 'Consider adding schema markup',
        impact: 'low',
        location: '<head> section'
      },
      {
        type: 'info',
        description: 'Improve keyword density for main keywords',
        impact: 'low',
        location: 'Page content'
      }
    ];
    
    // Randomly select a subset of issues
    const selectedIssues = possibleIssues
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 5) + 3); // 3-7 issues
    
    // Generate recommendations based on the issues
    const recommendationsMappings = {
      'Missing meta description': 'Add a meta description that is between 140-160 characters',
      'Missing title tag': 'Add a descriptive title tag between 50-60 characters',
      'Slow page load time (> 5s)': 'Optimize images and minimize CSS/JavaScript to improve load time',
      'Images missing alt text': 'Add descriptive alt text to all images for better accessibility and SEO',
      'Duplicate content detected': 'Use canonical URLs to indicate the preferred version of duplicate pages',
      'H1 tag missing': 'Add a single H1 tag that clearly describes the page content',
      'Low word count (< 300 words)': 'Expand content to at least 500 words for better topical coverage',
      'Consider adding more internal links': 'Add 3-5 relevant internal links to improve site structure',
      'Consider adding schema markup': 'Implement schema.org markup for rich snippets in search results',
      'Improve keyword density for main keywords': 'Ensure main keywords appear in headings and throughout the content naturally'
    };
    
    const recommendations = selectedIssues.map(issue => 
      recommendationsMappings[issue.description as keyof typeof recommendationsMappings]
    ).filter(Boolean);
    
    // Calculate a score based on the issues found
    const criticalCount = selectedIssues.filter(i => i.type === 'critical').length;
    const warningCount = selectedIssues.filter(i => i.type === 'warning').length;
    const infoCount = selectedIssues.filter(i => i.type === 'info').length;
    
    // Score calculation: start at 100 and deduct points based on issue severity
    let score = 100 - (criticalCount * 15) - (warningCount * 7) - (infoCount * 2);
    score = Math.max(0, Math.min(100, score)); // Ensure score is between 0-100
    
    // Create the report object
    const report = {
      id: `report-${Date.now()}`,
      url,
      date: new Date().toISOString(),
      score,
      issues: selectedIssues,
      recommendations
    };
    
    // Save the report to the database if authenticated
    if (userId) {
      try {
        await supabaseAdmin.from('seo_reports').insert({
          user_id: userId,
          url: report.url,
          score: report.score,
          issues: report.issues,
          recommendations: report.recommendations,
          created_at: report.date
        });
      } catch (dbError) {
        console.error('Error saving report to database:', dbError);
      }
    }
    
    return new Response(
      JSON.stringify(report),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error generating SEO report:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to generate SEO report' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
