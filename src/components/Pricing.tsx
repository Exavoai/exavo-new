import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const PricingSection = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "999",
      period: "/month",
      description: "Perfect for small businesses getting started with AI",
      features: [
        "AI Chatbot Integration",
        "Basic Analytics Dashboard",
        "Email Support",
        "5 User Accounts",
        "API Access",
        "Community Resources"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "2,499",
      period: "/month",
      description: "Advanced AI solutions for growing businesses",
      features: [
        "Everything in Starter",
        "Advanced AI Models",
        "Predictive Analytics",
        "Priority Support 24/7",
        "20 User Accounts",
        "Custom Integrations",
        "Dedicated Account Manager",
        "Training & Onboarding"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored AI solutions for large organizations",
      features: [
        "Everything in Professional",
        "Custom AI Development",
        "Unlimited Users",
        "SLA Guarantee",
        "On-Premise Deployment",
        "White-Label Options",
        "Advanced Security Features",
        "Dedicated Support Team"
      ],
      popular: false
    }
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-card rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border animate-slide-up ${
                plan.popular
                  ? 'border-primary scale-105 shadow-xl'
                  : 'border-border/50'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2 text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  {plan.price !== "Custom" && <span className="text-3xl font-semibold">$</span>}
                  <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground text-lg">{plan.period}</span>}
                </div>
              </div>

              <Button
                className={`w-full rounded-xl h-12 text-base font-semibold mb-8 ${
                  plan.popular
                    ? 'bg-primary hover:bg-primary/90'
                    : 'bg-transparent border-2 border-border hover:border-primary hover:bg-primary/5'
                }`}
                variant={plan.popular ? 'default' : 'outline'}
                onClick={() => navigate('/booking')}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>

              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          All plans include 30-day money-back guarantee. Need a custom solution?{' '}
          <button
            onClick={() => navigate('/contact')}
            className="text-primary hover:underline font-semibold"
          >
            Contact our sales team
          </button>
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
