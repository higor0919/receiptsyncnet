import { useTranslation } from "react-i18next";
import appHomeImg from "@/assets/app-home.png";

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      titleKey: "howItWorks.step1.title",
      descriptionKey: "howItWorks.step1.description",
    },
    {
      number: "02",
      titleKey: "howItWorks.step2.title",
      descriptionKey: "howItWorks.step2.description",
    },
    {
      number: "03",
      titleKey: "howItWorks.step3.title",
      descriptionKey: "howItWorks.step3.description",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24"
      style={{ backgroundColor: "hsl(240,82%,18%)" }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: App image */}
          <div className="relative flex justify-center order-2 md:order-1">
            <div
              className="rounded-3xl overflow-hidden max-w-sm w-full"
              style={{
                boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 60px hsla(327,100%,59%,0.15)",
              }}
            >
              <img
                src={appHomeImg}
                alt="ReceiptSync App"
                className="w-full h-auto"
              />
            </div>
            {/* Decorative glow */}
            <div
              className="absolute -inset-8 rounded-3xl -z-10 blur-3xl opacity-15"
              style={{ background: "hsl(327,100%,59%)" }}
            />
          </div>

          {/* Right: Steps */}
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white leading-tight">
              {t("howItWorks.title")}{" "}
              <span style={{ color: "hsl(327,100%,59%)" }}>
                {t("howItWorks.titleHighlight") || "Freedom"}
              </span>
            </h2>
            <p className="text-lg mb-12" style={{ color: "rgba(255,255,255,0.65)" }}>
              {t("howItWorks.subtitle")}
            </p>

            <div className="space-y-10">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6 items-start">
                  {/* Big pink number */}
                  <div
                    className="text-6xl font-black leading-none flex-shrink-0 w-16"
                    style={{ color: "hsl(327,100%,59%)" }}
                  >
                    {step.number}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {t(step.titleKey)}
                    </h3>
                    <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {t(step.descriptionKey)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-6 mt-12 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              {[
                { value: "<30 sec", label: t("hero.setupTime") },
                { value: "99%+", label: t("hero.aiAccuracy") },
                { value: "5 sec", label: t("stats.perReceipt") },
                { value: "10hrs+", label: t("stats.savedMonthly") },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-black mb-1" style={{ color: "hsl(327,100%,59%)" }}>
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
