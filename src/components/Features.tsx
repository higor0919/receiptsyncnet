import { useTranslation } from "react-i18next";
import { Camera, Sparkles, Sheet, Rocket, RefreshCw, PieChart, FileDown } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const FeatureCard = ({
  icon: Icon,
  titleKey,
  descriptionKey,
  isPro,
  index,
}: {
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
  isPro: boolean;
  index: number;
}) => {
  const { t } = useTranslation();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? "translateZ(12px)" : "translateZ(0px)"}`,
        transition: hovered ? "transform 0.1s ease" : "transform 0.4s ease",
        transformStyle: "preserve-3d",
        cursor: "default",
        backgroundColor: "white",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px hsla(327,100%,59%,0.35)" : "0 2px 12px rgba(0,0,0,0.06)",
      }}
      className="p-6 rounded-2xl border border-transparent relative overflow-hidden"
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          background: "radial-gradient(circle at 50% 0%, hsla(327,100%,59%,0.10) 0%, transparent 70%)",
          transition: "opacity 0.3s ease",
        }}
      />
      {isPro && (
        <span
          className="absolute top-4 right-4 text-xs font-bold px-2.5 py-0.5 rounded-full z-10"
          style={{ backgroundColor: "hsl(327,100%,95%)", color: "hsl(327,100%,45%)" }}
        >
          Pro
        </span>
      )}
      <motion.div
        animate={hovered ? { y: -6, scale: 1.1 } : { y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative z-10"
        style={{
          backgroundColor: hovered ? "hsl(327,100%,59%)" : "hsl(327,100%,96%)",
          boxShadow: hovered ? "0 8px 24px hsla(327,100%,59%,0.45), 0 0 0 4px hsla(327,100%,59%,0.1)" : "none",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <Icon
          className="w-7 h-7"
          style={{ color: hovered ? "white" : "hsl(327,100%,59%)", transition: "color 0.3s ease" }}
        />
      </motion.div>
      <h3 className="text-lg font-bold mb-3 relative z-10" style={{ color: "hsl(240,82%,18%)" }}>
        {t(titleKey)}
      </h3>
      <p className="text-sm leading-relaxed relative z-10" style={{ color: "hsl(240,10%,46%)" }}>
        {t(descriptionKey)}
      </p>
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
        style={{
          background: "linear-gradient(90deg, hsl(327,100%,59%), hsl(240,82%,55%))",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s ease",
        }}
      />
    </motion.div>
  );
};

const Features = () => {
  const { t } = useTranslation();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const features = [
    { icon: Camera, titleKey: "features.instantCapture.title", descriptionKey: "features.instantCapture.description", isPro: false },
    { icon: Sparkles, titleKey: "features.aiExtraction.title", descriptionKey: "features.aiExtraction.description", isPro: false },
    { icon: Sheet, titleKey: "features.googleSheets.title", descriptionKey: "features.googleSheets.description", isPro: false },
    { icon: Rocket, titleKey: "features.fastSetup.title", descriptionKey: "features.fastSetup.description", isPro: false },
    { icon: RefreshCw, titleKey: "features.recurring.title", descriptionKey: "features.recurring.description", isPro: true },
    { icon: PieChart, titleKey: "features.budget.title", descriptionKey: "features.budget.description", isPro: true },
    { icon: FileDown, titleKey: "features.export.title", descriptionKey: "features.export.description", isPro: true },
  ];

  return (
    <section id="features" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-5 leading-tight" style={{ color: "hsl(240,82%,18%)" }}>
            {t("features.title")}{" "}
            <span style={{ color: "hsl(327,100%,59%)" }}>{t("features.titleHighlight")}</span>
          </h2>
          <p className="text-lg" style={{ color: "hsl(240,10%,46%)" }}>
            {t("features.subtitle")}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
