import { Camera, Sparkles, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Scan",
    description: "Open the app and snap a photo of your receipt. Our AI automatically detects and crops it perfectly."
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Extract",
    description: "AI instantly reads and extracts all key data: vendor, date, amount, tax, and suggests a category."
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Done",
    description: "Data appears in your Google Sheet in real-time. That's it. Get back to your business."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Three Steps to{" "}
            <span className="bg-gradient-to-r from-secondary to-emerald-600 bg-clip-text text-transparent">
              Freedom
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            The simplest receipt management workflow ever created
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary" />
            
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center">
                  {/* Step number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted text-2xl font-bold text-muted-foreground mb-6 relative z-10">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "<30 sec", label: "Setup time" },
            { value: "99%+", label: "High-Precision AI" },
            { value: "5 sec", label: "Per receipt" },
            { value: "10hrs+", label: "Saved monthly" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
