import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import appIcon from "@/assets/app-icon.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img src={appIcon} alt="ReceiptSync" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-foreground">ReceiptSync</span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.product')}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">{t('footer.features')}</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">{t('footer.pricing')}</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">{t('footer.faq')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Download</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/analytics" className="hover:text-primary transition-colors">Analytics</Link></li>
              <li><a href="mailto:receiptsync@gmail.com" className="hover:text-primary transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 ReceiptSync. {t('footer.allRightsReserved')}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">{t('footer.privacyPolicy')}</Link>
            <a href="#" className="hover:text-primary transition-colors">{t('footer.termsOfService')}</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
