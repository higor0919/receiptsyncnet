import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "What is ReceiptSync?",
    answer: "ReceiptSync is an AI-powered mobile app that lets you scan receipts and automatically sync the extracted data to Google Sheets. Simply take a photo, and our AI extracts vendor, date, amount, and more—saving you hours of manual data entry."
  },
  {
    question: "When will ReceiptSync launch?",
    answer: "We're currently in the final stages of development and expect to launch soon. Join the waitlist to be among the first to know when we go live and get exclusive early access benefits."
  },
  {
    question: "What do I get as an early access user?",
    answer: "The first 100 users on the waitlist will receive 50% off for the first year, a lifetime early adopter badge, priority feature requests, and access to our exclusive early access community."
  },
  {
    question: "How accurate is the AI data extraction?",
    answer: "Our AI has been trained on millions of receipts and achieves 99%+ accuracy for standard receipt fields like vendor, date, amount, and tax. If there's ever an issue, you can quickly edit the data before it syncs to your Google Sheet."
  },
  {
    question: "How does the Google Sheets integration work?",
    answer: "You'll connect your Google account using secure OAuth authentication. You can then select an existing spreadsheet or let us create a new one with pre-configured columns. Every time you scan a receipt, the data is instantly added as a new row in your chosen sheet."
  },
  {
    question: "What happens to my receipt images?",
    answer: "All receipt images are securely stored in the cloud and linked to your Google Sheet entries. You can view, download, or delete them anytime from the app. We use bank-level encryption to protect your data."
  },
  {
    question: "Can I use this for my business expenses?",
    answer: "Absolutely! ReceiptSync is perfect for business expense tracking. The AI automatically categorizes receipts (meals, travel, office supplies, etc.), making it easy to organize expenses for accounting or tax purposes."
  },
  {
    question: "Will there be a free trial?",
    answer: "Yes! When we launch, all users will get a 7-day free trial with full access to all features. No credit card required to start your trial."
  },
  {
    question: "Does it work offline?",
    answer: "You can capture receipt photos offline, and they'll be queued for processing. Once you're back online, the app will automatically extract the data and sync it to your Google Sheet."
  },
  {
    question: "How can I stay updated on the launch?",
    answer: "Join our waitlist above! We'll send you updates on our progress and notify you immediately when ReceiptSync is ready. You can also reach us at receiptsync@gmail.com for any questions."
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
              We'd love to hear from you
            </p>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:receiptsync@gmail.com">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;