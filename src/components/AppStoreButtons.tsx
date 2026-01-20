import { Apple } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AppStoreButtonsProps {
  variant?: "hero" | "cta" | "navbar";
}

const PlayStoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
  </svg>
);

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
        className="gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
      >
        {t('nav.downloadApp', 'Download App')}
      </a>
    );
  }

  const buttonBaseClass = variant === "cta"
    ? "flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all hover:scale-105"
    : "flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition-all hover:scale-105";

  const appStoreClass = variant === "cta"
    ? `${buttonBaseClass} bg-white text-primary`
    : `${buttonBaseClass} bg-foreground text-background`;

  const playStoreClass = variant === "cta"
    ? `${buttonBaseClass} bg-white/20 text-white border border-white/30`
    : `${buttonBaseClass} bg-background text-foreground border border-border`;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={appStoreClass}
      >
        <Apple className="w-6 h-6" />
        <div className="flex flex-col items-start">
          <span className="text-xs opacity-80">{t('download.downloadOn', 'Download on the')}</span>
          <span className="text-sm font-semibold">{t('download.appStore', 'App Store')}</span>
        </div>
      </a>
      <a
        href={playStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={playStoreClass}
      >
        <PlayStoreIcon />
        <div className="flex flex-col items-start">
          <span className="text-xs opacity-80">{t('download.getItOn', 'Get it on')}</span>
          <span className="text-sm font-semibold">{t('download.googlePlay', 'Google Play')}</span>
        </div>
      </a>
    </div>
  );
};

export default AppStoreButtons;
