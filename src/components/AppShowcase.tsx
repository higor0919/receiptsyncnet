import appCameraImage from "@/assets/app-camera.png";
import appHomeImage from "@/assets/app-home.png";
import appAnalyticsImage from "@/assets/app-analytics.png";
import appSuccessImage from "@/assets/app-success.png";
import sheetsMockup from "@/assets/sheets-mockup.png";

const AppShowcase = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 space-y-24 md:space-y-32">
        
        {/* Section 1: One-Tap Scanning */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              One-Tap Scanning
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Open the app, snap a photo. That's it. No extra buttons, no complicated menus. The fastest way to capture a receipt.
            </p>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative max-w-sm">
              <img 
                src={appCameraImage} 
                alt="ReceiptSync scanning interface" 
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Section 2: AI-Powered Extraction */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
          <div className="flex-1 text-left lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              AI-Powered Extraction
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Our AI instantly extracts vendor, date, amount, tax, and category. Never manually type receipt data again.
            </p>
          </div>
          <div className="flex-1 flex justify-center lg:justify-start">
            <div className="relative flex gap-4 items-end">
              <img 
                src={appHomeImage} 
                alt="ReceiptSync home screen" 
                className="w-48 md:w-56 h-auto drop-shadow-2xl"
              />
              <img 
                src={appAnalyticsImage} 
                alt="ReceiptSync analytics view" 
                className="w-40 md:w-48 h-auto drop-shadow-2xl -ml-8"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Real-Time Google Sheets Sync */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real-Time Google Sheets Sync
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Extracted data appears in your spreadsheet instantly. No more exporting CSVs or manual data entry.
            </p>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative max-w-lg">
              <img 
                src={sheetsMockup} 
                alt="Google Sheets with receipt data" 
                className="w-full h-auto rounded-lg shadow-2xl border border-border"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Simple Onboarding */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
          <div className="flex-1 text-left lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple Onboarding
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Connect your Google account, select your spreadsheet, and you're ready. Set up in 2 minutes, save hours every month.
            </p>
          </div>
          <div className="flex-1 flex justify-center lg:justify-start">
            <div className="relative max-w-sm">
              <img 
                src={appSuccessImage} 
                alt="Receipt saved success screen" 
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AppShowcase;
