import { Check } from "lucide-react";
import Waitlist from "@/components/Waitlist";

const benefits = [
  "No credit card required",
  "14-day free trial",
  "Cancel anytime",
  "Full access to all features"
];

const CTA = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Stop Wasting Time on Receipts?
              </h2>
              
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Join 10,000+ businesses who've already said goodbye to manual data entry
              </p>

              <div className="flex justify-center mb-8">
                <Waitlist variant="cta" />
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/90">
                    <Check className="w-5 h-5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Trusted by businesses worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-32 h-12 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
