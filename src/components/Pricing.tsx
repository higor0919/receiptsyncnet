import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import AppStoreButtons from "@/components/AppStoreButtons";

const PricingCard = ({
  title,
  subtitle,
  price,
  period,
  savingsNote,
  ctaLabel,
  ctaHref,
  features,
  isFeatured,
  delay,
}: {
  title: string;
  subtitle: string;
  price: string;
  period: string;
  savingsNote?: string;
  ctaLabel: string;
  ctaHref: string;
  features: string[];
  isFeatured: boolean;
  delay: number;
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? "translateZ(16px)" : "translateZ(0)"}`,
        transition: hovered ? "transform 0.1s ease" : "transform 0.5s ease",
        transformStyle: "preserve-3d",
        ...(isFeatured
          ? {
              backgroundColor: "hsl(240,82%,18%)",
              boxShadow: hovered
                ? "0 40px 100px rgba(0,0,0,0.4), 0 0 0 1px hsla(327,100%,59%,0.5)"
                : "0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px hsla(327,100%,59%,0.2)",
            }
          : {
              backgroundColor: "white",
              boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.10)" : "0 2px 12px rgba(0,0,0,0.05)",
              border: `1px solid ${hovered ? "hsla(327,100%,59%,0.4)" : "hsl(240,10%,90%)"}`,
            }),
      }}
      className={`relative rounded-3xl p-8 flex flex-col overflow-hidden`}
    >
      {/* Featured: animated glow */}
      {isFeatured && (
        <motion.div
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, hsla(327,100%,59%,0.3) 0%, transparent 60%)",
          }}
        />
      )}

      {/* BEST VALUE badge */}
      {isFeatured && (
        <div className="absolute top-6 right-6">
          <motion.span
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-black px-3 py-1 rounded-full"
            style={{
              background: "linear-gradient(135deg, hsl(327,100%,59%), hsl(280,100%,60%))",
              color: "white",
              boxShadow: "0 4px 15px hsla(327,100%,59%,0.5)",
            }}
          >
            BEST VALUE
          </motion.span>
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <h3
          className="text-xl font-black mb-1"
          style={{ color: isFeatured ? "white" : "hsl(240,82%,18%)" }}
        >
          {title}
        </h3>
        <p className="text-sm mb-6" style={{ color: isFeatured ? "rgba(255,255,255,0.6)" : "hsl(240,10%,55%)" }}>
          {subtitle}
        </p>

        {/* Price */}
        <div className="mb-2">
          <span
            className="text-5xl font-black"
            style={{ color: isFeatured ? "white" : "hsl(240,82%,18%)" }}
          >
            {price}
          </span>
          <span className="text-lg ml-1" style={{ color: isFeatured ? "rgba(255,255,255,0.5)" : "hsl(240,10%,55%)" }}>
            {period}
          </span>
        </div>

        {savingsNote && (
          <p className="text-sm font-bold mb-6" style={{ color: "hsl(327,100%,59%)" }}>
            {savingsNote}
          </p>
        )}
        {!savingsNote && <div className="mb-6" />}

        {/* CTA Button */}
        <motion.a
          href={ctaHref}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="block text-center py-3.5 px-6 rounded-full font-bold text-sm mb-8 transition-shadow duration-300"
          style={
            isFeatured
              ? {
                  background: "linear-gradient(135deg, hsl(327,100%,59%), hsl(280,100%,60%))",
                  color: "white",
                  boxShadow: hovered ? "0 8px 30px hsla(327,100%,59%,0.6)" : "0 4px 15px hsla(327,100%,59%,0.4)",
                }
              : {
                  border: "2px solid hsl(327,100%,59%)",
                  color: "hsl(327,100%,59%)",
                  backgroundColor: hovered ? "hsla(327,100%,59%,0.06)" : "transparent",
                }
          }
        >
          {ctaLabel}
        </motion.a>

        {/* Features list */}
        <ul className="space-y-3 flex-1">
          {features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              className="flex items-center gap-3 text-sm"
              style={{ color: isFeatured ? "rgba(255,255,255,0.8)" : "hsl(240,10%,40%)" }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: isFeatured ? "hsla(327,100%,59%,0.2)" : "hsl(327,100%,96%)",
                }}
              >
                <Check className="w-3 h-3" style={{ color: "hsl(327,100%,59%)" }} />
              </div>
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const { t } = useTranslation();
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

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
    t("pricing.features.export"),
    t("pricing.features.support"),
  ];

  return (
    <section id="pricing" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-black mb-5 leading-tight"
            style={{ color: "hsl(240,82%,18%)" }}
          >
            {t("pricing.title")}{" "}
            <span style={{ color: "hsl(327,100%,59%)" }}>{t("pricing.titleHighlight")}</span>
          </h2>
          <p className="text-lg" style={{ color: "hsl(240,10%,46%)" }}>
            {t("pricing.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <PricingCard
            title={t("pricing.monthly")}
            subtitle={t("pricing.monthlyDesc")}
            price="$9.99"
            period="/month"
            ctaLabel="Get Monthly Plan"
            ctaHref="#"
            features={freeFeatures}
            isFeatured={false}
            delay={0}
          />
          <PricingCard
            title={t("pricing.annual")}
            subtitle={t("pricing.annualDesc")}
            price="$39.99"
            period="/year"
            savingsNote={t("pricing.annualSavings")}
            ctaLabel="Get Annual Deal"
            ctaHref="#"
            features={proFeatures}
            isFeatured={true}
            delay={0.15}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 text-sm"
          style={{ color: "hsl(240,10%,55%)" }}
        >
          {t("pricing.questions")}{" "}
          <a href="#contact" style={{ color: "hsl(327,100%,59%)", fontWeight: 600 }}>
            Contact us
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
