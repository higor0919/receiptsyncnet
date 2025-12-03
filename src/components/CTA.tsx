import Waitlist from "@/components/Waitlist";

const CTA = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Stop Wasting Time on Receipts?
              </h2>
              
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Be the first to automate your receipts. Join the early access list.
              </p>

              <div className="flex justify-center mb-6">
                <Waitlist variant="cta" />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-white/20 rounded-full text-sm font-bold">🎁</span>
                  <span>First 100 users get early access</span>
                </div>
                <span className="hidden sm:inline text-white/50">•</span>
                <span className="text-white/70">Special launch-day discount</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
