import { Card } from "@/components/ui/card";
import { Check, Gift } from "lucide-react";
import Waitlist from "@/components/Waitlist";

const Pricing = () => {
  const earlyAccessBenefits = [
    "Unlimited receipt scanning",
    "AI-powered data extraction",
    "Real-time Google Sheets sync",
    "Automatic categorization",
    "Cloud storage for receipts",
    "Mobile & web access",
    "Export to CSV/PDF",
    "Priority email support"
  ];

  const earlyAccessPerks = [
    "50% off for the first year",
    "Lifetime early adopter badge",
    "Priority feature requests",
    "Exclusive early access community"
  ];

  return (
    <section className="py-24 bg-muted/30" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Early Access{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Benefits
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-4">
            Join the waitlist now and get exclusive perks when we launch
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 md:p-12 relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
                <Gift className="w-4 h-4" />
                EARLY ACCESS EXCLUSIVE
              </div>

              {/* Plan Name */}
              <h3 className="text-3xl font-bold text-foreground mb-2">
                First 100 Users
              </h3>
              <p className="text-muted-foreground mb-8">
                Be among the first to experience ReceiptSync
              </p>

              {/* Early Access Perks */}
              <div className="mb-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm font-semibold text-foreground mb-4">
                  🎁 Early adopter perks:
                </p>
                <div className="grid gap-3">
                  {earlyAccessPerks.map((perk, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA - Waitlist */}
              <div className="mb-8">
                <Waitlist />
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-foreground mb-4">
                  Full access to all features:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {earlyAccessBenefits.map((feature, index) => (
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
                  We'll notify you as soon as ReceiptSync is ready for launch
                </p>
              </div>
            </div>
          </Card>

          {/* Additional info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Have questions?{" "}
              <a href="mailto:receiptsync@gmail.com" className="text-primary hover:underline font-medium">
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