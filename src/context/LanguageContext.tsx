import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "mn";

interface LanguageContextType {
  lang: Lang;
  isEnglish: boolean;
  setLang: (l: Lang) => void;
  t: (en: string, mn: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "mn",
  isEnglish: false,
  setLang: () => {},
  t: (_en, mn) => mn,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("lang");
    return stored === "en" || stored === "mn" ? stored : "mn";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const isEnglish = lang === "en";
  const t = (en: string, mn: string) => (isEnglish ? en : mn);

  return (
    <LanguageContext.Provider value={{ lang, isEnglish, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
