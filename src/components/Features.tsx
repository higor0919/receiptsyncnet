import { useTranslation } from "react-i18next";
import { Camera, Sparkles, Sheet, Rocket, RefreshCw, PieChart, FileDown } from "lucide-react";

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Camera,
      titleKey: "features.instantCapture.title",
      descriptionKey: "features.instantCapture.description",
      isPro: false,
    },
    {
      icon: Sparkles,
      titleKey: "features.aiExtraction.title",
      descriptionKey: "features.aiExtraction.description",
      isPro: false,
    },
    {
      icon: Sheet,
      titleKey: "features.googleSheets.title",
      descriptionKey: "features.googleSheets.description",
      isPro: false,
    },
    {
      icon: Rocket,
      titleKey: "features.fastSetup.title",
      descriptionKey: "features.fastSetup.description",
      isPro: false,
    },
    {
      icon: RefreshCw,
      titleKey: "features.recurring.title",
      descriptionKey: "features.recurring.description",
      isPro: true,
    },
    {
      icon: PieChart,
      titleKey: "features.budget.title",
      descriptionKey: "features.budget.description",
      isPro: true,
    },
    {
      icon: FileDown,
      titleKey: "features.export.title",
      descriptionKey: "features.export.description",
      isPro: true,
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2
            className="text-4xl md:text-5xl font-black mb-5 leading-tight"
            style={{ color: "hsl(240,82%,18%)" }}
          >
            {t("features.title")}{" "}
            <span style={{ color: "hsl(327,100%,59%)" }}>{t("features.titleHighlight")}</span>
          </h2>
          <p className="text-lg" style={{ color: "hsl(240,10%,46%)" }}>
            {t("features.subtitle")}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 cursor-default relative"
              style={{
                backgroundColor: "white",
                borderColor: "hsl(240,10%,90%)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "hsl(327,100%,80%)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                (e.currentTarget as HTMLElement).style.borderColor = "hsl(240,10%,90%)";
              }}
            >
              {/* Pro badge */}
              {feature.isPro && (
                <span
                  className="absolute top-4 right-4 text-xs font-bold px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "hsl(327,100%,95%)",
                    color: "hsl(327,100%,45%)",
                  }}
                >
                  Pro
                </span>
              )}

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "hsl(327,100%,96%)" }}
              >
                <feature.icon
                  className="w-7 h-7"
                  style={{ color: "hsl(327,100%,59%)" }}
                />
              </div>

              <h3
                className="text-lg font-bold mb-3"
                style={{ color: "hsl(240,82%,18%)" }}
              >
                {t(feature.titleKey)}
              </h3>

              <p className="text-sm leading-relaxed" style={{ color: "hsl(240,10%,46%)" }}>
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
