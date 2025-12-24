import { useTranslation } from "react-i18next";
import { Camera, Sparkles, Sheet, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Camera,
      titleKey: 'features.instantCapture.title',
      descriptionKey: 'features.instantCapture.description',
      gradient: "from-primary to-purple-600"
    },
    {
      icon: Sparkles,
      titleKey: 'features.aiExtraction.title',
      descriptionKey: 'features.aiExtraction.description',
      gradient: "from-secondary to-emerald-600"
    },
    {
      icon: Sheet,
      titleKey: 'features.googleSheets.title',
      descriptionKey: 'features.googleSheets.description',
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Rocket,
      titleKey: 'features.fastSetup.title',
      descriptionKey: 'features.fastSetup.description',
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('features.title')}{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {t('features.titleHighlight')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('features.subtitle')}
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
                {t(feature.titleKey)}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {t(feature.descriptionKey)}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
