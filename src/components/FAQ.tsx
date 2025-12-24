import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: "What is ReceiptSync?",
      answer: "ReceiptSync is an AI-powered mobile app that lets you scan receipts and automatically sync the extracted data to Google Sheets. Simply take a photo, and our AI extracts vendor, date, amount, and more—saving you hours of manual data entry."
    },
    {
      question: t('faq.q1.question'),
      answer: t('faq.q1.answer')
    },
    {
      question: t('faq.q2.question'),
      answer: t('faq.q2.answer')
    },
    {
      question: t('faq.q3.question'),
      answer: t('faq.q3.answer')
    },
    {
      question: t('faq.q4.question'),
      answer: t('faq.q4.answer')
    },
    {
      question: t('faq.q5.question'),
      answer: t('faq.q5.answer')
    },
    {
      question: t('faq.q6.question'),
      answer: t('faq.q6.answer')
    },
    {
      question: t('faq.q7.question'),
      answer: t('faq.q7.answer')
    },
    {
      question: t('faq.q8.question'),
      answer: t('faq.q8.answer')
    },
    {
      question: t('faq.q9.question'),
      answer: t('faq.q9.answer')
    }
  ];

  return (
    <section className="py-24 bg-background" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('faq.title').split(' ').slice(0, -1).join(' ')}{" "}
            <span className="bg-gradient-to-r from-secondary to-emerald-600 bg-clip-text text-transparent">
              {t('faq.title').split(' ').slice(-1)}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact support */}
          <div className="mt-12 text-center p-8 bg-muted/50 rounded-2xl">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              We'd love to hear from you
            </p>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:receiptsync@gmail.com">{t('footer.contact')}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
