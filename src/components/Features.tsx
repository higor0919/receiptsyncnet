import { useTranslation } from "react-i18next";
import { Camera, Sparkles, Sheet, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Camera,
      title: t('features.instantCapture.title', 'One-Tap Scanning'),
      description: t('features.instantCapture.description', 'Open the app, snap a photo. That\'s it. No extra buttons, no complicated menus. The fastest way to capture a receipt.'),
      gradient: "from-primary to-purple-600"
    },
    {
      icon: Sparkles,
      title: t('features.aiExtraction.title', 'AI-Powered Extraction'),
      description: t('features.aiExtraction.description', 'Our AI instantly extracts vendor, date, amount, tax, and category. Never manually type receipt data again.'),
      gradient: "from-secondary to-emerald-600"
    },
    {
      icon: Sheet,
      title: t('features.googleSheets.title', 'Real-Time Google Sheets'),
      description: t('features.googleSheets.description', 'Extracted data appears in your spreadsheet instantly. No more exporting CSVs or manual data entry.'),
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Rocket,
      title: t('features.fastSetup.title', 'Simple Onboarding'),
      description: t('features.fastSetup.description', 'Connect your Google account, select your spreadsheet, and you\'re ready. Set up in 2 minutes, save hours every month.'),
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('features.title', 'Everything You Need,')}{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {t('features.titleHighlight', 'Nothing You Don\'t')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('features.subtitle', 'Four powerful features that eliminate manual receipt management forever')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-border animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
