import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Plan limits configuration
const PLAN_LIMITS = {
  "prod_TTapRptmEkLouu": {
    name: "Starter",
    maxTeamMembers: 1, // Owner only
    teamEnabled: false,
  },
  "prod_TTapq8rgy3dmHT": {
    name: "Pro",
    maxTeamMembers: 5,
    teamEnabled: true,
  },
  "prod_TTapwaC6qD21xi": {
    name: "Enterprise",
    maxTeamMembers: 999, // Effectively unlimited
    teamEnabled: true,
  },
  // Default for users without subscription
  "default": {
    name: "Free",
    maxTeamMembers: 1,
    teamEnabled: false,
  },
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

    // Create client with service role for database operations
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    console.log(`Checking team limits for user: ${user.email}`);

    // Get current team member count
    const { data: teamMembers, error: countError } = await supabaseClient
      .from("team_members")
      .select("id", { count: "exact" })
      .eq("organization_id", user.id);

    if (countError) {
      console.error("Error counting team members:", countError);
      throw new Error(`Failed to count team members: ${countError.message}`);
    }

    const currentCount = teamMembers?.length || 0;
    console.log(`Current team member count: ${currentCount}`);

    // Check subscription status
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let planLimits = PLAN_LIMITS.default;
    let productId = "default";

    if (customers.data.length > 0) {
      const customerId = customers.data[0].id;
      console.log(`Found Stripe customer: ${customerId}`);

      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "active",
        limit: 1,
      });

      if (subscriptions.data.length > 0) {
        const subscription = subscriptions.data[0];
        productId = subscription.items.data[0].price.product as string;
        console.log(`Active subscription product: ${productId}`);

        if (PLAN_LIMITS[productId as keyof typeof PLAN_LIMITS]) {
          planLimits = PLAN_LIMITS[productId as keyof typeof PLAN_LIMITS];
        }
      } else {
        console.log("No active subscription found");
      }
    } else {
      console.log("No Stripe customer found");
    }

    const canInvite = planLimits.teamEnabled && currentCount < planLimits.maxTeamMembers;
    const limitReached = currentCount >= planLimits.maxTeamMembers;

    console.log(`Plan: ${planLimits.name}, Team enabled: ${planLimits.teamEnabled}, Max: ${planLimits.maxTeamMembers}, Can invite: ${canInvite}`);

    return new Response(
      JSON.stringify({
        success: true,
        currentCount,
        maxTeamMembers: planLimits.maxTeamMembers,
        teamEnabled: planLimits.teamEnabled,
        canInvite,
        limitReached,
        planName: planLimits.name,
        productId,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in check-team-limits:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
