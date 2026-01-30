import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 23, 2025</p>

          <p className="text-foreground/90 leading-relaxed">
            Welcome to ReceiptSync ("we," "our," or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your information when you use the ReceiptSync mobile application and related services (the "Service").
          </p>

          <p className="text-foreground/90 leading-relaxed">
            By using ReceiptSync, you agree to the collection and use of information in accordance with this Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">1. Information We Collect</h2>
          
          <h3 className="text-xl font-medium text-foreground mt-6 mb-3">a. Information You Provide</h3>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90">
            <li>Account information (such as email address, if applicable)</li>
            <li>Uploaded receipts (images or PDFs)</li>
            <li>Expense details you manually enter (merchant name, amount, date, category, notes)</li>
          </ul>

          <h3 className="text-xl font-medium text-foreground mt-6 mb-3">b. Automatically Collected Information</h3>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90">
            <li>Device type and operating system</li>
            <li>App version</li>
            <li>Anonymous usage data (such as feature interactions and app performance)</li>
          </ul>
          <p className="text-foreground/90 mt-4">We do not collect unnecessary personal data.</p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90">
            <li>Scan and extract data from receipts using AI/OCR technology</li>
            <li>Organize and sync expenses (e.g., to spreadsheets or exports)</li>
            <li>Improve app performance, features, and user experience</li>
            <li>Provide customer support</li>
            <li>Ensure security and prevent abuse</li>
          </ul>
          <p className="text-foreground/90 font-medium mt-4">We do not sell your personal data.</p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">3. Receipt Data & AI Processing</h2>
          <p className="text-foreground/90 leading-relaxed">
            Receipt images and documents are processed securely to extract expense data. Processing may involve trusted third-party services used strictly for OCR or AI analysis.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-4">
            <li>Your receipt data is used only to provide the Service</li>
            <li>Your data is not used for advertising</li>
            <li>Your data is not shared with third parties for marketing purposes</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">4. Data Storage & Security</h2>
          <p className="text-foreground/90 leading-relaxed">
            We take reasonable measures to protect your data, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-4">
            <li>Secure storage and access controls</li>
            <li>Encrypted connections where applicable</li>
          </ul>
          <p className="text-foreground/90 mt-4">
            While no system is 100% secure, we work hard to safeguard your information.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">5. Data Retention</h2>
          <p className="text-foreground/90 leading-relaxed">
            We retain your data only as long as:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-4">
            <li>Your account is active, or</li>
            <li>It is necessary to provide the Service</li>
          </ul>
          <p className="text-foreground/90 mt-4">You may request deletion of your data at any time.</p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">6. Third-Party Services</h2>
          <p className="text-foreground/90 leading-relaxed">
            ReceiptSync may use trusted third-party tools for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-4">
            <li>Cloud storage</li>
            <li>Analytics</li>
            <li>OCR / AI processing</li>
          </ul>
          <p className="text-foreground/90 mt-4">
            These providers only receive the minimum data required to perform their function and are bound by confidentiality and data protection obligations.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">7. Your Rights</h2>
          <p className="text-foreground/90 leading-relaxed">
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/90 mt-4">
            <li>Access your data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent</li>
          </ul>
          <p className="text-foreground/90 mt-4">
            To exercise your rights, contact us using the information below.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">8. Children's Privacy</h2>
          <p className="text-foreground/90 leading-relaxed">
            ReceiptSync is not intended for use by children under the age of 13. We do not knowingly collect personal data from children.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">9. Changes to This Privacy Policy</h2>
          <p className="text-foreground/90 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted in the app with an updated "Last updated" date.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">10. Contact Us</h2>
          <p className="text-foreground/90 leading-relaxed">
            If you have any questions or requests regarding this Privacy Policy, please contact us:
          </p>
          <div className="mt-4 space-y-2 text-foreground/90">
            <p>📧 Email: <a href="mailto:higor@receiptsync.net" className="text-primary hover:underline">higor@receiptsync.net</a></p>
            <p>🌐 Website: <a href="https://receiptsync.net" className="text-primary hover:underline">https://receiptsync.net</a></p>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-muted-foreground text-center">© 2025 ReceiptSync. All rights reserved.</p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
