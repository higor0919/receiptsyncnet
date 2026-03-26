import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      className="py-24"
      style={{ backgroundColor: "hsl(240,82%,18%)" }}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-5 text-white leading-tight">
            Frequently Asked{" "}
            <span style={{ color: "hsl(327,100%,59%)" }}>Questions</span>
          </h2>
          <p className="text-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                backgroundColor: openIndex === index
                  ? "hsl(240,82%,22%)"
                  : "hsl(240,82%,20%)",
                border: openIndex === index
                  ? "1px solid hsla(327,100%,59%,0.3)"
                  : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-white pr-4">
                  {t(faq.questionKey)}
                </span>
                <ChevronDown
                  className="flex-shrink-0 w-5 h-5 transition-transform duration-200"
                  style={{
                    color: openIndex === index ? "hsl(327,100%,59%)" : "rgba(255,255,255,0.5)",
                    transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {openIndex === index && (
                <div
                  className="px-6 pb-6 text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {t(faq.answerKey)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div
          className="mt-12 p-8 rounded-3xl text-center"
          style={{
            backgroundColor: "hsl(240,82%,22%)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h3 className="text-xl font-bold text-white mb-2">
            {t("faq.stillHaveQuestions")}
          </h3>
          <p className="mb-6" style={{ color: "rgba(255,255,255,0.65)" }}>
            {"Can't find what you're looking for? Our team is happy to help."}
          </p>
          <a
            href="mailto:receiptsync@gmail.com"
            className="inline-block py-3 px-8 rounded-full font-bold transition-all"
            style={{
              backgroundColor: "hsl(327,100%,59%)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(327,100%,50%)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 25px hsla(327,100%,59%,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(327,100%,59%)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {"Contact Support"}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
