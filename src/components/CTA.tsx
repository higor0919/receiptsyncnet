import { useTranslation } from "react-i18next";
import AppStoreButtons from "@/components/AppStoreButtons";

const CTA = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div
          className="rounded-3xl p-12 text-center relative overflow-hidden"
          style={{
            backgroundColor: "hsl(240,82%,18%)",
            boxShadow: "0 30px 80px hsla(240,82%,18%,0.3)",
          }}
        >
          {/* Background decorative glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, hsla(327,100%,59%,0.15) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-5 text-white leading-tight">
              Ready to Stop Wasting Time on{" "}
              <span style={{ color: "hsl(327,100%,59%)" }}>Receipts?</span>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
              {t("cta.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <AppStoreButtons variant="hero" />
            </div>

            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              ✨ {t("cta.freeToStart")} · {"No credit card required"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
