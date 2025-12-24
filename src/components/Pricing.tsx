import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Check, Gift, Sparkles, Crown } from "lucide-react";
import Waitlist from "@/components/Waitlist";

const Pricing = () => {
  const { t } = useTranslation();

  const features = [
    t('pricing.features.unlimited', 'Unlimited receipt scanning'),
    t('pricing.features.ai', 'AI-powered data extraction'),
    t('pricing.features.sync', 'Real-time Google Sheets sync'),
    t('pricing.features.categories', 'Automatic categorization'),
    t('pricing.features.cloud', 'Cloud storage for receipts'),
    t('pricing.features.access', 'Mobile & web access'),
    t('pricing.features.export', 'Export to CSV/PDF'),
    t('pricing.features.support', 'Priority email support')
  ];

  const annualPerks = [
    t('pricing.perks.updates', 'All future updates included'),
    t('pricing.perks.priority', 'Priority feature requests'),
    t('pricing.perks.badge', 'Exclusive early adopter badge'),
    t('pricing.perks.community', 'Early access community')
  ];

  return (
    <section className="py-24 bg-muted/30" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('pricing.title', 'Simple')}{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {t('pricing.titleHighlight', 'Pricing')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-4">
            {t('pricing.subtitle', 'Choose the plan that works best for you')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Monthly Plan */}
          <Card className="p-8 relative overflow-hidden animate-slide-up border border-border" style={{ animationDelay: '0.1s' }}>
            <div className="absolute top-0 right-0 w-48 h-48 bg-muted/50 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {t('pricing.monthly', 'Monthly')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('pricing.monthlyDesc', 'Perfect for getting started')}
              </p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-foreground">
                    $9.99
                  </span>
                  <span className="text-xl text-muted-foreground">
                    {t('pricing.perMonth', '/month')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('pricing.cancelAnytime', 'Cancel anytime')}
                </p>
              </div>

              {/* CTA - Waitlist */}
              <div className="mb-8">
                <Waitlist variant="secondary" />
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-foreground mb-4">
                  {t('pricing.everythingYouNeed', 'Everything you need:')}
                </p>
                <div className="grid gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-muted-foreground" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Lifetime Deal */}
          <Card className="p-8 relative overflow-hidden animate-slide-up border-2 border-primary/30 bg-gradient-to-b from-primary/5 to-transparent" style={{ animationDelay: '0.2s' }}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                {t('pricing.bestValue', 'BEST VALUE')}
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Crown className="w-6 h-6 text-primary" />
                {t('pricing.annual', 'Annual Deal')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('pricing.annualDesc', 'For the first 100 early access members')}
              </p>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-foreground">
                    $39.99
                  </span>
                  <span className="text-xl text-muted-foreground">
                    {t('pricing.perYear', '/year')}
                  </span>
                </div>
                <p className="text-sm text-secondary mt-2 font-medium">
                  {t('pricing.annualSavings', 'Just $3.33/month — Limited deal for first 100!')}
                </p>
              </div>

              {/* Annual Perks */}
              <div className="mb-8 p-5 bg-primary/5 rounded-xl border border-primary/20">
                <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-primary" />
                  {t('pricing.exclusivePerks', 'Early adopter exclusive perks:')}
                </p>
                <div className="grid gap-3">
                  {annualPerks.map((perk, index) => (
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
                <p className="text-sm text-muted-foreground mb-3 text-center">
                  {t('pricing.joinToSecure', 'Join the waitlist to secure this price')}
                </p>
                <Waitlist />
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-foreground mb-4">
                  {t('pricing.fullAccess', 'Full access to all features:')}
                </p>
                <div className="grid gap-3">
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
            </div>
          </Card>
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            {t('pricing.questions', 'Have questions?')}{" "}
            <a href="mailto:receiptsync@gmail.com" className="text-primary hover:underline font-medium">
              {t('footer.contact', 'Contact us')}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
