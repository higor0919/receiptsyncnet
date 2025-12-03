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

              <div className="flex justify-center mb-8">
                <Waitlist variant="cta" />
              </div>

              <p className="text-white/80 text-lg">
                Get exclusive early access and a special launch-day discount.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
