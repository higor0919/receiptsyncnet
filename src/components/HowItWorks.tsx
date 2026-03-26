import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import appHomeImg from "@/assets/enhanced-home-screen.png";

const HowItWorks = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    { number: "01", titleKey: "howItWorks.step1.title", descriptionKey: "howItWorks.step1.description" },
    { number: "02", titleKey: "howItWorks.step2.title", descriptionKey: "howItWorks.step2.description" },
    { number: "03", titleKey: "howItWorks.step3.title", descriptionKey: "howItWorks.step3.description" },
  ];

  const stats = [
    { value: "<30 sec", labelKey: "hero.setupTime" },
    { value: "99%+", labelKey: "hero.aiAccuracy" },
    { value: "5 sec", labelKey: "stats.perReceipt" },
    { value: "10hrs+", labelKey: "stats.savedMonthly" },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "hsl(240,82%,18%)" }}
    >
      {/* Animated background orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "hsl(327,100%,59%)", transform: "translate(30%, -30%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "hsl(240,82%,55%)", transform: "translate(-30%, 30%)" }}
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left: 3D floating phone */}
          <div className="relative flex justify-center order-2 md:order-1">
            {/* Outer glow ring */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-3xl blur-2xl"
              style={{ background: "hsla(327,100%,59%,0.25)", margin: "-20px" }}
            />

            {/* Phone with 3D float */}
            <motion.div
              animate={{ y: [0, -16, 0], rotateZ: [0, 1, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.05, rotateY: 8 }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
                filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.5))",
              }}
              className="relative max-w-sm w-full"
            >
              <img
                src={appHomeImg}
                alt="ReceiptSync App"
                className="w-full h-auto"
              />
              {/* Glass shine */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
                }}
              />
            </motion.div>

            {/* Floating badge: AI */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-8 -right-4 px-4 py-2 rounded-2xl text-sm font-bold text-white shadow-xl"
              style={{
                background: "linear-gradient(135deg, hsl(327,100%,59%), hsl(280,100%,60%))",
                boxShadow: "0 8px 30px hsla(327,100%,59%,0.5)",
              }}
            >
              ✨ AI Powered
            </motion.div>

            {/* Floating badge: Instant */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-16 -left-4 px-4 py-2 rounded-2xl text-sm font-bold shadow-xl"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
              }}
            >
              ⚡ 5 sec/receipt
            </motion.div>
          </div>

          {/* Right: Steps */}
          <div className="order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-white leading-tight">
                {t("howItWorks.title")}{" "}
                <span style={{ color: "hsl(327,100%,59%)" }}>
                  {t("howItWorks.titleHighlight") || "Freedom"}
                </span>
              </h2>
              <p className="text-lg mb-12" style={{ color: "rgba(255,255,255,0.65)" }}>
                {t("howItWorks.subtitle")}
              </p>
            </motion.div>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                  className="flex gap-6 items-start p-5 rounded-2xl cursor-default transition-all duration-300"
                  style={{
                    backgroundColor: activeStep === index ? "hsla(327,100%,59%,0.1)" : "hsla(255,255,255,0.04)",
                    border: activeStep === index ? "1px solid hsla(327,100%,59%,0.3)" : "1px solid rgba(255,255,255,0.06)",
                    transform: activeStep === index ? "translateX(8px)" : "translateX(0)",
                  }}
                >
                  {/* Big pink number */}
                  <motion.div
                    animate={activeStep === index ? { scale: 1.15 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="text-5xl font-black leading-none flex-shrink-0 w-14 text-center"
                    style={{ color: "hsl(327,100%,59%)" }}
                  >
                    {step.number}
                  </motion.div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {t(step.titleKey)}
                    </h3>
                    <p className="leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                      {t(step.descriptionKey)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-2 gap-6 mt-10 pt-10"
              style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 rounded-xl"
                  style={{ backgroundColor: "hsla(255,255,255,0.04)" }}
                >
                  <div className="text-2xl font-black mb-1" style={{ color: "hsl(327,100%,59%)" }}>
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    {t(stat.labelKey)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
