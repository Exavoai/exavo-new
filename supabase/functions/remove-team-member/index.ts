import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create client for auth verification
    const supabaseAuth = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseAuth.auth.getUser(token);

    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    // Create client with service role for database operations (bypasses RLS)
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { memberId } = await req.json();

    if (!memberId) {
      throw new Error("Member ID is required");
    }

    // Verify the member belongs to the user's organization before deleting
    const { data: member, error: fetchError } = await supabaseClient
      .from("team_members")
      .select("organization_id")
      .eq("id", memberId)
      .single();

    if (fetchError || !member) {
      throw new Error("Team member not found");
    }

    if (member.organization_id !== user.id) {
      throw new Error("Unauthorized: You can only remove members from your own organization");
    }

    // Delete team member
    const { error: deleteError } = await supabaseClient
      .from("team_members")
      .delete()
      .eq("id", memberId);

    if (deleteError) {
      console.error("Delete error:", deleteError);
      throw new Error(`Failed to remove team member: ${deleteError.message}`);
    }

    console.log(`Team member ${memberId} removed successfully by user ${user.id}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});