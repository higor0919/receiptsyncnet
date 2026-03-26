import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import appIcon from "@/assets/app-icon.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer style={{ backgroundColor: "hsl(240,82%,11%)" }}>
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Main footer content */}
        <div
          className="py-16 grid grid-cols-2 md:grid-cols-4 gap-10"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
                <img src={appIcon} alt="ReceiptSync" className="w-full h-full object-cover" />
              </div>
              <span className="text-white font-black text-lg">ReceiptSync</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              AI-powered receipt scanning that syncs directly to Google Sheets. Save hours every month.
            </p>
            <div className="flex gap-3">
              <a
                href="#download"
                className="text-xs font-bold px-4 py-2 rounded-full transition-all"
                style={{
                  backgroundColor: "hsl(327,100%,59%)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(327,100%,50%)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(327,100%,59%)";
                }}
              >
                Download App
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              {[
                { href: "#features", label: t("nav.features") },
                { href: "#pricing", label: "Pricing" },
                { href: "#how-it-works", label: t("nav.howItWorks") },
                { href: "#faq", label: t("nav.faq") },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(327,100%,70%)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/blog", label: "Blog", isLink: true },
                { href: "mailto:receiptsync@gmail.com", label: "Contact", isLink: false },
                { href: "#download", label: "Download", isLink: false },
              ].map((link) => (
                <li key={link.href}>
                  {link.isLink ? (
                    <Link
                      to={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(327,100%,70%)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(327,100%,70%)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/privacy", label: t("footer.privacyPolicy") },
                { href: "/terms", label: t("footer.termsOfService") },
                { href: "/cookies", label: "Cookie Policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(327,100%,70%)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} ReceiptSync. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            Made with{" "}
            <span style={{ color: "hsl(327,100%,59%)" }}>♥</span>
            {" "}for busy people everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
