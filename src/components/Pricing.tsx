import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import AppStoreButtons from "@/components/AppStoreButtons";

const Pricing = () => {
  const { t } = useTranslation();

  const freeFeatures = [
    t("pricing.features.unlimited"),
    t("pricing.features.cloud"),
    t("pricing.features.sync"),
    t("pricing.features.categories"),
    t("pricing.features.access"),
  ];

  const proFeatures = [
    t("pricing.features.unlimited"),
    t("pricing.features.ai"),
    t("pricing.features.access"),
    t("pricing.features.categories"),
    t("pricing.features.cloud"),
    t("pricing.features.access"),
    t("pricing.features.export"),
    t("pricing.features.support"),
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            className="text-4xl md:text-5xl font-black mb-5 leading-tight"
            style={{ color: "hsl(240,82%,18%)" }}
          >
            {t("pricing.title")}{" "}
            <span style={{ color: "hsl(327,100%,59%)" }}>{t("pricing.titleHighlight") || "Pricing"}</span>
          </h2>
          <p className="text-lg" style={{ color: "hsl(240,10%,46%)" }}>
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <div
            className="p-8 rounded-3xl border"
            style={{
              backgroundColor: "white",
              borderColor: "hsl(240,10%,88%)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <div className="mb-6">
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: "hsl(240,82%,18%)" }}
              >
                {t("pricing.monthly")}
              </h3>
              <p className="text-sm" style={{ color: "hsl(240,10%,50%)" }}>
                {t("pricing.monthlyDesc")}
              </p>
            </div>

            <div className="mb-8">
              <span
                className="text-5xl font-black"
                style={{ color: "hsl(240,82%,18%)" }}
              >
                $9.99
              </span>
              <span className="text-lg ml-1" style={{ color: "hsl(240,10%,50%)" }}>
                /month
              </span>
              <p className="text-sm mt-1" style={{ color: "hsl(240,10%,60%)" }}>
                {t("pricing.cancelAnytime")}
              </p>
            </div>

            <a
              href="#download"
              className="block text-center py-3 px-6 rounded-full font-bold text-sm mb-8 transition-all"
              style={{
                border: "2px solid hsl(240,82%,18%)",
                color: "hsl(240,82%,18%)",
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(240,82%,18%)";
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = "hsl(240,82%,18%)";
              }}
            >
              {"Get Monthly Plan"}
            </a>

            <ul className="space-y-3">
              {proFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "hsl(240,82%,95%)" }}
                  >
                    <Check className="w-3 h-3" style={{ color: "hsl(240,82%,40%)" }} />
                  </div>
                  <span className="text-sm" style={{ color: "hsl(240,10%,40%)" }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Annual Plan - Featured */}
          <div
            className="p-8 rounded-3xl relative overflow-hidden"
            style={{
              backgroundColor: "hsl(240,82%,18%)",
              boxShadow: "0 20px 60px hsla(240,82%,18%,0.4), 0 0 40px hsla(327,100%,59%,0.1)",
            }}
          >
            {/* Best value badge */}
            <div className="absolute top-6 right-6">
              <span
                className="text-xs font-black px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "hsl(327,100%,59%)",
                  color: "white",
                }}
              >
                BEST VALUE
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1 text-white">
                {t("pricing.annual")}
              </h3>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                {t("pricing.annualDesc")}
              </p>
            </div>

            <div className="mb-8">
              <span
                className="text-5xl font-black text-white"
              >
                $39.99
              </span>
              <span className="text-lg ml-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                /year
              </span>
              <p
                className="text-sm mt-1 font-bold"
                style={{ color: "hsl(327,100%,70%)" }}
              >
                Just $3.33/month — Limited deal for first 100!
              </p>
            </div>

            <a
              href="#download"
              className="block text-center py-3 px-6 rounded-full font-bold text-sm mb-8 transition-all"
              style={{
                backgroundColor: "hsl(327,100%,59%)",
                color: "white",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(327,100%,50%)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 25px hsla(327,100%,59%,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(327,100%,59%)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {"Get Annual Deal"}
            </a>

            <ul className="space-y-3">
              {proFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "hsla(327,100%,59%,0.25)" }}
                  >
                    <Check className="w-3 h-3" style={{ color: "hsl(327,100%,75%)" }} />
                  </div>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA below pricing */}
        <div className="text-center mt-12">
          <p className="text-sm mb-4" style={{ color: "hsl(240,10%,55%)" }}>
            Have questions?{" "}
            <a
              href="mailto:receiptsync@gmail.com"
              className="font-bold"
              style={{ color: "hsl(327,100%,59%)" }}
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
