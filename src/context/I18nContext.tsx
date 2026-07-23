import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DICTS, LANGS, translate, type Lang } from '../i18n/translations'

const STORAGE_KEY = 'cenan_lang'

interface I18nValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
  langs: typeof LANGS
}

const I18nContext = createContext<I18nValue | null>(null)

function detectInitial(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null
    if (saved === 'tr' || saved === 'en') return saved
  } catch {
    /* ignore */
  }
  const nav = (navigator.language || 'tr').slice(0, 2).toLowerCase()
  return nav === 'en' ? 'en' : 'tr'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('tr')

  useEffect(() => {
    setLangState(detectInitial())
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang: setLangState,
      t: (key: string) => translate(lang, key),
      langs: LANGS,
    }),
    [lang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
