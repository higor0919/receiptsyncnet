import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How accurate is the AI data extraction?",
    answer: "Our AI has been trained on millions of receipts and achieves 99%+ accuracy for standard receipt fields like vendor, date, amount, and tax. If there's ever an issue, you can quickly edit the data before it syncs to your Google Sheet."
  },
  {
    question: "How does the Google Sheets integration work?",
    answer: "During onboarding, you'll connect your Google account (secure OAuth authentication). You can then select an existing spreadsheet or let us create a new one with pre-configured columns. Every time you scan a receipt, the data is instantly added as a new row in your chosen sheet. The receipt image is also linked so you can access it anytime."
  },
  {
    question: "What happens to my receipt images?",
    answer: "All receipt images are securely stored in the cloud and linked to your Google Sheet entries. You can view, download, or delete them anytime from the app. We use bank-level encryption to protect your data, and you maintain full ownership of all your receipts."
  },
  {
    question: "Can I use this for my business expenses?",
    answer: "Absolutely! ReceiptSync is perfect for business expense tracking. The AI automatically categorizes receipts (meals, travel, office supplies, etc.), making it easy to organize expenses for accounting or tax purposes. You can export your data anytime for your accountant."
  },
  {
    question: "What if I need to edit extracted data?",
    answer: "After each scan, you'll see a preview of the extracted data before it's saved. You can quickly edit any field if needed. You can also edit receipts later from your receipt history or directly in your Google Sheet."
  },
  {
    question: "Does it work offline?",
    answer: "You can capture receipt photos offline, and they'll be queued for processing. Once you're back online, the app will automatically extract the data and sync it to your Google Sheet. This ensures you never miss a receipt, even without internet access."
  },
  {
    question: "How many receipts can I scan?",
    answer: "With the Pro plan, you get unlimited receipt scanning. Scan as many receipts as you need—whether it's 10 per month or 1,000. No hidden limits, no extra charges."
  },
  {
    question: "What happens after my free trial ends?",
    answer: "After your 7-day free trial, you'll be automatically enrolled in the Pro plan at the selected billing cycle (monthly or annual). You'll receive a reminder email before the trial ends. You can cancel anytime during the trial with no charges."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel anytime from your account settings. If you cancel, you'll continue to have access until the end of your billing period. Your data and receipts remain safe and exportable even after cancellation."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with ReceiptSync for any reason, contact our support team within 30 days of purchase for a full refund—no questions asked."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 bg-background" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-secondary to-emerald-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about ReceiptSync
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
              Our support team is here to help you get the most out of ReceiptSync
            </p>
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
