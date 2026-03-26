import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import appIcon from "@/assets/app-icon.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: "hsl(240,82%,14%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl overflow-hidden flex-shrink-0">
              <img src={appIcon} alt="ReceiptSync" className="w-full h-full object-cover" />
            </div>
            <span className="text-white font-black text-lg tracking-tight">ReceiptSync</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: "#features", label: t("nav.features") },
              { href: "#how-it-works", label: t("nav.howItWorks") },
              { href: "#pricing", label: "Pricing" },
              { href: "#faq", label: t("nav.faq") },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:opacity-100"
                style={{ color: "rgba(255,255,255,0.75)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(327,100%,70%)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/blog"
              className="text-sm font-medium transition-colors"
              style={{ color: "rgba(255,255,255,0.75)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(327,100%,70%)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
            >
              {t("nav.blog")}
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="mailto:receiptsync@gmail.com"
              className="text-sm font-medium px-4 py-2 rounded-full transition-all"
              style={{ color: "rgba(255,255,255,0.75)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
            >
              Contact Us
            </a>
            <a
              href="https://app.receiptsync.net/"
              className="text-sm font-medium px-4 py-2 rounded-full transition-all"
              style={{ color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.25)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "white"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.6)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; }}
            >
              Log In to Portal
            </a>
            <a
              href="https://receiptsync.net/enterprise"
              className="text-sm font-bold px-5 py-2 rounded-full transition-all"
              style={{ color: "hsl(327,100%,59%)", border: "2px solid hsl(327,100%,59%)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "hsla(327,100%,59%,0.15)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px hsla(327,100%,59%,0.3)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              Enterprise Plan
            </a>
            <a
              href="#download"
              className="text-sm font-bold px-5 py-2 rounded-full transition-all"
              style={{
                backgroundColor: "hsl(327,100%,59%)",
                color: "white",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(327,100%,50%)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px hsla(327,100%,59%,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "hsl(327,100%,59%)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {t("nav.downloadApp")}
            </a>
          </div>

          {/* Mobile: Language + Menu */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-1"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden py-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex flex-col gap-4">
              {[
                { href: "#features", label: t("nav.features") },
                { href: "#how-it-works", label: t("nav.howItWorks") },
                { href: "#pricing", label: "Pricing" },
                { href: "#faq", label: t("nav.faq") },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-medium"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/blog"
                className="font-medium"
                style={{ color: "rgba(255,255,255,0.8)" }}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.blog")}
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href="mailto:receiptsync@gmail.com"
                  className="text-center py-2 rounded-full font-medium"
                  style={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  Contact Us
                </a>
                <a
                  href="https://app.receiptsync.net/"
                  className="text-center py-2 rounded-full font-medium"
                  style={{ color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  Log In to Portal
                </a>
                <a
                  href="https://receiptsync.net/enterprise"
                  className="text-center py-2 rounded-full font-bold"
                  style={{ color: "hsl(327,100%,59%)", border: "2px solid hsl(327,100%,59%)" }}
                >
                  Enterprise Plan
                </a>
                <a
                  href="#download"
                  className="text-center py-2.5 rounded-full font-bold"
                  style={{ backgroundColor: "hsl(327,100%,59%)", color: "white" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.downloadApp")}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
