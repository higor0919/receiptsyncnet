import { useTranslation } from "react-i18next";
import AppStoreButtons from "@/components/AppStoreButtons";
import appIcon from "@/assets/app-icon.png";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Announcement bar - JeevMedia style hot pink bar */}
      <div className="w-full text-white text-center py-2.5 px-4 text-sm font-medium" style={{backgroundColor: "hsl(327,100%,59%)"}}>
        🚀 Early Access — Lock in <strong>$39.99/year</strong> for the first 100 users.{" "}
        <a href="#pricing" className="underline font-bold hover:opacity-80 transition-opacity">
          Claim your spot →
        </a>
      </div>

      {/* Hero Section - Deep Navy Background */}
      <section
        id="download"
        className="relative flex flex-col items-center justify-start overflow-hidden"
        style={{ backgroundColor: "hsl(240, 82%, 18%)" }}
      >
        {/* Background decorative glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 75% 50%, hsla(327,100%,59%,0.1) 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, hsla(240,100%,70%,0.08) 0%, transparent 50%)",
          }}
        />

        {/* Main content */}
        <div className="container mx-auto px-6 py-20 relative z-10 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center w-full">
            {/* Left: Text content */}
            <div>
              {/* App icon + badge */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg">
                  <img src={appIcon} alt="ReceiptSync app icon" className="w-full h-full object-cover" />
                </div>
                <span
                  className="text-sm font-bold px-4 py-1.5 rounded-full"
                  style={{
                    backgroundColor: "hsla(327,100%,59%,0.2)",
                    color: "hsl(327,100%,80%)",
                    border: "1px solid hsla(327,100%,59%,0.35)",
                  }}
                >
                  AI-Powered Receipt Scanner
                </span>
              </div>

              {/* Big bold heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 text-white">
                Snap.{" "}
                <span style={{ color: "hsl(327,100%,59%)" }}>Extract.</span>
                <br />
                Organize.
                <br />
                <span style={{ color: "hsl(327,100%,59%)" }}>Automatically.</span>
              </h1>

              <p className="text-lg md:text-xl mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                {t("hero.subtitle")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
                <AppStoreButtons variant="hero" />
              </div>

              <div className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: "hsl(327,100%,59%)", color: "white" }}
                >
                  ✓
                </span>
                <span>{t("hero.availableNow")}</span>
              </div>
            </div>

            {/* Right: App video/mockup */}
            <div className="relative flex justify-center">
              <div
                className="rounded-3xl overflow-hidden w-full max-w-lg"
                style={{
                  boxShadow: "0 30px 90px hsla(327,100%,59%,0.2), 0 10px 40px rgba(0,0,0,0.5)",
                }}
              >
                <video autoPlay loop muted playsInline className="w-full h-auto">
                  <source src="/videos/hero-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Decorative glow behind video */}
              <div
                className="absolute -inset-6 rounded-3xl -z-10 blur-3xl opacity-20"
                style={{ background: "hsl(327,100%,59%)" }}
              />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="w-full py-8"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            backgroundColor: "hsl(240,82%,13%)",
          }}
        >
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "<30 sec", label: t("hero.setupTime") },
                { value: "99%+", label: t("hero.aiAccuracy") },
                { value: "5 sec", label: t("stats.perReceipt") },
                { value: "10hrs+", label: t("stats.savedMonthly") },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <span
                    className="text-2xl md:text-3xl font-black mb-1"
                    style={{ color: "hsl(327,100%,59%)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
