import { Sparkles } from "lucide-react";
import Waitlist from "@/components/Waitlist";

const Hero = () => {
  return (
    <section id="waitlist" className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="text-center lg:text-left space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm font-medium text-accent-foreground">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Receipt Management</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-foreground">Scan</span>{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">→</span>{" "}
              <span className="text-foreground">Done</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Stop wasting hours on receipts. Just scan it, and you're done. 
              AI extracts all data instantly to your Google Sheets.
            </p>

            <div className="flex flex-col items-center lg:items-start gap-4">
              <Waitlist variant="hero" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center justify-center w-5 h-5 bg-primary/20 text-primary rounded-full text-xs font-bold">✓</span>
                <span><strong className="text-foreground">First 100 users</strong> get early access</span>
              </div>
            </div>
          </div>

          {/* Right column - Hero Video */}
          <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative flex items-center justify-center">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-muted">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full max-w-md h-auto"
                >
                  <source src="/videos/hero-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card p-4 rounded-2xl shadow-xl border border-border animate-float z-30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-secondary rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-foreground">5 seconds</div>
                  <div className="text-sm text-muted-foreground">per receipt</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
