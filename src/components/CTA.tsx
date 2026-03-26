import { useTranslation } from "react-i18next";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AppStoreButtons from "@/components/AppStoreButtons";

const FloatingParticle = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: x,
      top: y,
      width: size,
      height: size,
      background: "hsl(327,100%,59%)",
    }}
    animate={{
      y: [0, -30, 0],
      opacity: [0, 0.6, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 4 + delay,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

const CTA = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const particles = [
    { delay: 0, x: "10%", y: "80%", size: 6 },
    { delay: 0.8, x: "20%", y: "60%", size: 4 },
    { delay: 1.5, x: "80%", y: "70%", size: 8 },
    { delay: 2.2, x: "70%", y: "85%", size: 5 },
    { delay: 0.4, x: "50%", y: "90%", size: 6 },
    { delay: 1.1, x: "35%", y: "75%", size: 4 },
    { delay: 2.8, x: "90%", y: "55%", size: 7 },
    { delay: 1.8, x: "60%", y: "65%", size: 5 },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl p-12 text-center relative overflow-hidden"
          style={{
            backgroundColor: "hsl(240,82%,18%)",
            boxShadow: "0 40px 100px hsla(240,82%,18%,0.35), 0 0 0 1px hsla(327,100%,59%,0.15)",
          }}
        >
          {/* Animated particles */}
          {particles.map((p, i) => (
            <FloatingParticle key={i} {...p} />
          ))}

          {/* Radial glow bottom */}
          <motion.div
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 110%, hsla(327,100%,59%,0.35) 0%, transparent 60%)",
            }}
          />

          {/* Top glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, hsla(327,100%,59%,0.6), transparent)",
            }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-5 text-white leading-tight">
                Ready to Stop Wasting Time on{" "}
                <span style={{ color: "hsl(327,100%,59%)" }}>Receipts?</span>
              </h2>
              <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
                {t("cta.subtitle")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
            >
              <AppStoreButtons variant="hero" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              ✨ {t("cta.freeToStart")} · No credit card required
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
