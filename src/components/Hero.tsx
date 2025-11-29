import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import appHome from "@/assets/app-home.png";
import appCamera from "@/assets/app-camera.png";
import appAnalytics from "@/assets/app-analytics.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="gradient-primary text-lg h-14 px-8 group">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-14 px-8">
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 justify-center lg:justify-start pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-muted border-2 border-background" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="font-semibold text-foreground">10,000+ users</div>
                <div>saving hours every week</div>
              </div>
            </div>
          </div>

          {/* Right column - App Screenshots */}
          <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative flex items-center justify-center gap-4">
              {/* Left phone - Home screen */}
              <div className="relative z-10 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <img 
                  src={appHome} 
                  alt="ReceiptSync home screen with quick scan access" 
                  className="w-64 md:w-72 h-auto rounded-3xl shadow-2xl border-4 border-muted"
                />
              </div>

              {/* Center phone - Camera scanning (larger, in front) */}
              <div className="relative z-20 transform scale-110 hover:scale-115 transition-transform duration-300">
                <img 
                  src={appCamera} 
                  alt="ReceiptSync camera interface scanning a receipt" 
                  className="w-64 md:w-72 h-auto rounded-3xl shadow-2xl border-4 border-muted"
                />
              </div>

              {/* Right phone - Analytics dashboard */}
              <div className="relative z-10 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                <img 
                  src={appAnalytics} 
                  alt="ReceiptSync expense analysis dashboard with insights" 
                  className="w-64 md:w-72 h-auto rounded-3xl shadow-2xl border-4 border-muted"
                />
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
                  <div className="font-semibold text-foreground">10 seconds</div>
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
