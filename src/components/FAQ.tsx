import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const faqs = [
    { questionKey: "faq.q1.question", answerKey: "faq.q1.answer" },
    { questionKey: "faq.q2.question", answerKey: "faq.q2.answer" },
    { questionKey: "faq.q3.question", answerKey: "faq.q3.answer" },
    { questionKey: "faq.q4.question", answerKey: "faq.q4.answer" },
    { questionKey: "faq.q5.question", answerKey: "faq.q5.answer" },
    { questionKey: "faq.q6.question", answerKey: "faq.q6.answer" },
    { questionKey: "faq.q7.question", answerKey: "faq.q7.answer" },
    { questionKey: "faq.q8.question", answerKey: "faq.q8.answer" },
    { questionKey: "faq.q9.question", answerKey: "faq.q9.answer" },
    { questionKey: "faq.q10.question", answerKey: "faq.q10.answer" },
    { questionKey: "faq.q11.question", answerKey: "faq.q11.answer" },
    { questionKey: "faq.q12.question", answerKey: "faq.q12.answer" },
    { questionKey: "faq.q13.question", answerKey: "faq.q13.answer" },
    { questionKey: "faq.q14.question", answerKey: "faq.q14.answer" },
  ];

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "hsl(240,82%,18%)" }}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-10"
        style={{ background: "hsl(327,100%,59%)" }}
      />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-5 text-white leading-tight">
            Frequently Asked{" "}
            <span style={{ color: "hsl(327,100%,59%)" }}>Questions</span>
          </h2>
          <p className="text-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
            {t("faq.subtitle")}
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: isOpen ? "hsl(240,82%,22%)" : "hsl(240,82%,20%)",
                  border: isOpen ? "1px solid hsla(327,100%,59%,0.35)" : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: isOpen ? "0 8px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)" : "none",
                  transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left group"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span
                    className="font-bold pr-4 transition-colors duration-200"
                    style={{ color: isOpen ? "white" : "rgba(255,255,255,0.85)" }}
                  >
                    {t(faq.questionKey)}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: isOpen ? "hsla(327,100%,59%,0.2)" : "rgba(255,255,255,0.06)",
                      border: isOpen ? "1px solid hsla(327,100%,59%,0.3)" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <ChevronDown
                      className="w-4 h-4"
                      style={{ color: isOpen ? "hsl(327,100%,59%)" : "rgba(255,255,255,0.5)" }}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="px-6 pb-6 text-sm leading-relaxed"
                        style={{
                          color: "rgba(255,255,255,0.7)",
                          borderTop: "1px solid rgba(255,255,255,0.06)",
                          paddingTop: "16px",
                        }}
                      >
                        {t(faq.answerKey)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-14 p-8 rounded-3xl"
          style={{
            background: "hsla(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            {"Can't find what you're looking for? Our team is happy to help."}
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block px-8 py-3 rounded-full font-bold text-sm text-white"
            style={{
              background: "linear-gradient(135deg, hsl(327,100%,59%), hsl(280,100%,60%))",
              boxShadow: "0 4px 20px hsla(327,100%,59%,0.4)",
            }}
          >
            Contact Support
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
