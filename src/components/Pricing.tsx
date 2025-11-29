import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useState } from "react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const features = [
    "Unlimited receipt scanning",
    "AI-powered data extraction",
    "Real-time Google Sheets sync",
    "Automatic categorization",
    "Cloud storage for receipts",
    "Mobile & web access",
    "Export to CSV/PDF",
    "Email support"
  ];

  const monthlyPrice = 19.99;
  const annualPrice = 89.99;
  const monthlySavings = ((monthlyPrice * 12 - annualPrice) / (monthlyPrice * 12) * 100).toFixed(0);

  return (
    <section className="py-24 bg-muted/30" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start with a 7-day free trial. No credit card required.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-muted rounded-full">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                !isAnnual
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                isAnnual
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                Save {monthlySavings}%
              </span>
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
                7-DAY FREE TRIAL
              </div>

              {/* Plan Name */}
              <h3 className="text-3xl font-bold text-foreground mb-2">
                Pro Plan
              </h3>
              <p className="text-muted-foreground mb-8">
                Everything you need to manage receipts effortlessly
              </p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-bold text-foreground">
                    ${isAnnual ? annualPrice : monthlyPrice}
                  </span>
                  <span className="text-xl text-muted-foreground">
                    /{isAnnual ? "year" : "month"}
                  </span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-muted-foreground mt-2">
                    That's ${(annualPrice / 12).toFixed(2)}/month, billed annually
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <Button 
                size="lg" 
                className="w-full gradient-primary text-lg h-14 mb-8"
              >
                Start 7-Day Free Trial
              </Button>

              {/* Features List */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-foreground mb-4">
                  Everything included:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-secondary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fine print */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  Cancel anytime. No questions asked.
                </p>
              </div>
            </div>
          </Card>

          {/* Additional info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Need a custom plan for your team?{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
