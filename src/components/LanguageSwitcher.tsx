import { useTranslation } from "react-i18next";
import { Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentCode = i18n.resolvedLanguage || i18n.language;
  const currentLanguage =
    languages.find((lang) => lang.code === currentCode) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("i18nextLng", langCode);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
        style={{
          color: "rgba(255,255,255,0.75)",
          backgroundColor: open ? "rgba(255,255,255,0.1)" : "transparent",
          border: "1px solid",
          borderColor: open ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.12)",
        }}
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <ChevronDown
          className="w-3 h-3 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-1.5 w-44 rounded-xl overflow-hidden z-50"
          style={{
            backgroundColor: "hsl(240,82%,14%)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {languages.map((lang) => {
            const isActive = lang.code === currentCode;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors duration-150"
                style={{
                  color: isActive ? "hsl(327,100%,59%)" : "rgba(255,255,255,0.8)",
                  backgroundColor: isActive ? "hsla(327,100%,59%,0.1)" : "transparent",
                  fontWeight: isActive ? 600 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.name}</span>
                {isActive && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "hsl(327,100%,59%)" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
