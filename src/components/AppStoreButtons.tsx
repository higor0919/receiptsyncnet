import { Apple } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

interface AppStoreButtonsProps {
  variant?: "hero" | "cta" | "navbar";
}

const PlayStoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
  </svg>
);

const getTTPCookie = (): string | undefined => {
  const match = document.cookie.match(/(?:^|; )_ttp=([^;]*)/);
  return match ? match[1] : undefined;
};

const trackingCooldowns = new Map<string, number>();
const TRACKING_COOLDOWN_MS = 5000;

const trackDownloadClick = async (store: "app_store" | "google_play") => {
  const lastTracked = trackingCooldowns.get(store) || 0;
  const now = Date.now();
  if (now - lastTracked < TRACKING_COOLDOWN_MS) return;
  trackingCooldowns.set(store, now);
  try {
    await supabase.functions.invoke("track-download", {
      body: { store_type: store, user_agent: navigator.userAgent, referrer: document.referrer || null },
    });
  } catch (error) {
    console.error("Failed to track download:", error);
  }
};

const AppStoreButtons = ({ variant = "hero" }: AppStoreButtonsProps) => {
  const { t } = useTranslation();
  const appStoreUrl = "https://apps.apple.com/us/app/receiptsync-receipt-tracker/id6756007251";
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.app.receipt_sync";

  if (variant === "navbar") {
    return (
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackDownloadClick("app_store")}
        className="text-sm font-bold px-5 py-2 rounded-full transition-all"
        style={{ backgroundColor: "hsl(327,100%,59%)", color: "white" }}
      >
        {t("nav.downloadApp", "Download App")}
      </a>
    );
  }

  const isOnDark = variant === "hero" || variant === "cta";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackDownloadClick("app_store")}
        className="flex items-center gap-3 px-6 py-3.5 rounded-full font-bold transition-all"
        style={{ backgroundColor: "hsl(327,100%,59%)", color: "white" }}
      >
        <Apple className="w-5 h-5 flex-shrink-0" />
        <div className="flex flex-col items-start">
          <span className="text-xs opacity-80">{t("download.downloadOn", "Download on the")}</span>
          <span className="text-sm font-bold">{t("download.appStore", "App Store")}</span>
        </div>
      </a>
      <a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackDownloadClick("google_play")}
        className="flex items-center gap-3 px-6 py-3.5 rounded-full font-bold transition-all"
        style={{
          backgroundColor: "transparent",
          color: isOnDark ? "white" : "hsl(240,82%,18%)",
          border: isOnDark ? "2px solid rgba(255,255,255,0.4)" : "2px solid hsl(240,82%,18%)",
        }}
      >
        <PlayStoreIcon />
        <div className="flex flex-col items-start">
          <span className="text-xs opacity-80">{t("download.getItOn", "Get it on")}</span>
          <span className="text-sm font-bold">{t("download.googlePlay", "Google Play")}</span>
        </div>
      </a>
    </div>
  );
};

export default AppStoreButtons;
