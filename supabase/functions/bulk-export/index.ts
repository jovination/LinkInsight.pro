
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
    const { format, type } = await req.json();

    if (!format || !['csv', 'pdf'].includes(format)) {
      return new Response(
        JSON.stringify({ error: 'Invalid format. Supported formats: csv, pdf' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    if (!type || !['links', 'seo', 'performance'].includes(type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid export type. Supported types: links, seo, performance' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    console.log(`Exporting ${type} data in ${format} format`);

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
        return new Response(
          JSON.stringify({ error: 'Authentication failed' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 401 
          }
        );
      }
    }

    // In a production environment, we would:
    // 1. Fetch the relevant data from the database
    // 2. Generate a CSV or PDF file
    // 3. Store it in storage bucket
    // 4. Return a signed URL to download the file
    
    // For this demo, we'll simulate the export process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a mock URL for demonstration
    const exportId = crypto.randomUUID();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const mockUrl = `https://example.com/exports/${type}_export_${timestamp}.${format}`;
    
    // If this were a real implementation, we would log the export activity
    if (userId) {
      try {
        await supabaseAdmin.from('export_logs').insert({
          user_id: userId,
          export_type: type,
          format: format,
          created_at: new Date().toISOString(),
          file_url: mockUrl
        }).catch(err => {
          // Just log the error but don't fail the request
          console.error('Error logging export:', err);
        });
      } catch (dbError) {
        console.error('Error logging export:', dbError);
        // Continue even if logging fails
      }
    }
    
    return new Response(
      JSON.stringify({ url: mockUrl, success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error processing export:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to process export request', details: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
