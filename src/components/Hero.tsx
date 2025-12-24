import { useTranslation } from "react-i18next";
import Waitlist from "@/components/Waitlist";
import appIcon from "@/assets/app-icon.png";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="waitlist" className="relative min-h-screen flex flex-col items-center justify-start pt-24 overflow-hidden bg-background">
      {/* Main content - centered */}
      <div className="container mx-auto px-4 py-12 relative z-10 flex flex-col items-center text-center">
        {/* App icon */}
        <div className="mb-6 w-16 h-16 rounded-2xl overflow-hidden">
          <img src={appIcon} alt="ReceiptSync app icon" className="w-full h-full object-cover" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          <span className="text-foreground">Scan → Done</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8">
          Stop wasting hours on receipts. Just scan it, and you're done. AI extracts all data instantly to your Google Sheets.
        </p>

        <div className="flex flex-col items-center gap-3 mb-12">
          <Waitlist variant="hero" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center justify-center w-4 h-4 text-foreground text-xs">✓</span>
            <span>First 100 users get early access</span>
          </div>
        </div>

        {/* Video container */}
        <div className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl mb-16">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-auto"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Stats bar */}
      <div className="w-full border-t border-b border-border bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-foreground">&lt;30 sec</span>
              <span className="text-sm text-muted-foreground">{t('hero.setupTime')}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-foreground">99%+</span>
              <span className="text-sm text-muted-foreground">{t('hero.aiAccuracy')}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-foreground">5 sec</span>
              <span className="text-sm text-muted-foreground">Per receipt</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl font-bold text-foreground">10hrs+</span>
              <span className="text-sm text-muted-foreground">Saved monthly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
