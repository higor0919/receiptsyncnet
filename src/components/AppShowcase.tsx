import appCameraImage from "@/assets/app-camera.png";

const AppShowcase = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text content */}
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              One-Tap Scanning
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Open the app, snap a photo. That's it. No extra buttons, no complicated menus. The fastest way to capture a receipt.
            </p>
          </div>

          {/* Phone mockup */}
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
      </div>
    </section>
  );
};

export default AppShowcase;
