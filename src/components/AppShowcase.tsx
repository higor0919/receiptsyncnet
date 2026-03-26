import { useTranslation } from "react-i18next";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import scanReceiptImg from "@/assets/enhanced-camera-scan.png";
import aiExtractionImg from "@/assets/app-analytics.png";
import sheetsIntegrationImg from "@/assets/sheets-mockup.png";
import enhancedReceiptHistory from "@/assets/enhanced-receipt-history.png";

const showcaseItems = [
  {
    titleKey: "features.instantCapture.title",
    descriptionKey: "features.instantCapture.description",
    image: scanReceiptImg,
    imageAlt: "One-Tap Scanning",
    reverse: false,
  },
  {
    titleKey: "features.aiExtraction.title",
    descriptionKey: "features.aiExtraction.description",
    image: aiExtractionImg,
    imageAlt: "AI-Powered Extraction",
    reverse: true,
  },
  {
    titleKey: "features.googleSheets.title",
    descriptionKey: "features.googleSheets.description",
    image: sheetsIntegrationImg,
    imageAlt: "Real-Time Google Sheets Sync",
    reverse: false,
  },
  {
    titleKey: "features.fastSetup.title",
    descriptionKey: "features.fastSetup.description",
    image: enhancedReceiptHistory,
    imageAlt: "Simple Onboarding",
    reverse: true,
  },
];

const ShowcaseRow = ({
  titleKey,
  descriptionKey,
  image,
  imageAlt,
  reverse,
  index,
}: {
  titleKey: string;
  descriptionKey: string;
  image: string;
  imageAlt: string;
  reverse: boolean;
  index: number;
}) => {
  const { t } = useTranslation();
  const rowRef = useRef(null);
  const inView = useInView(rowRef, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20 py-16`}
      style={{ borderBottom: index < 3 ? "1px solid rgba(0,0,0,0.06)" : "none" }}
    >
      {/* Phone mockup with 3D float */}
      <div className="flex-1 flex justify-center relative">
        {/* Ambient glow behind phone */}
        <div
          className="absolute inset-0 blur-3xl opacity-20 rounded-full"
          style={{ background: "hsl(327,100%,59%)", transform: "scale(0.7)" }}
        />
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          className="relative max-w-xs w-full"
          style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.25))" }}
          whileHover={{ scale: 1.04, rotate: reverse ? -2 : 2 }}
        >
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-auto rounded-3xl"
            loading="lazy"
          />
          {/* Shine overlay */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
            }}
          />
        </motion.div>
      </div>

      {/* Text content */}
      <div className="flex-1 max-w-lg">
        {/* Step number */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-8xl font-black leading-none mb-4 select-none"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px hsla(327,100%,59%,0.25)",
          }}
        >
          0{index + 1}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-3xl md:text-4xl font-black mb-4 leading-tight"
          style={{ color: "hsl(240,82%,18%)" }}
        >
          {t(titleKey)}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg leading-relaxed"
          style={{ color: "hsl(240,10%,46%)" }}
        >
          {t(descriptionKey)}
        </motion.p>

        {/* Animated accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-6 h-1 w-20 rounded-full"
          style={{
            background: "linear-gradient(90deg, hsl(327,100%,59%), hsl(240,82%,55%))",
            transformOrigin: "left",
          }}
        />
      </div>
    </motion.div>
  );
};

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
      {/* Subtle parallax background pattern */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none opacity-30"
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "hsla(327,100%,59%,0.08)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "hsla(240,82%,55%,0.08)" }}
        />
      </motion.div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {showcaseItems.map((item, index) => (
          <ShowcaseRow key={index} {...item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default AppShowcase;
