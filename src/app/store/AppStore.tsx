import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export interface Invoice {
  id: string
  vendor: string
  number: string
  date: string
  net: number
  vatRate: number
  vat: number
  gross: number
  status: 'pending' | 'approved' | 'rejected'
  flags: string[]
  source: 'manual' | 'analyzed'
}

export interface Activity {
  id: string
  type: 'ai' | 'invoice' | 'payment' | 'tax' | 'system'
  text: string
  at: number
}

export interface PaymentRules {
  autoApprove: boolean
  maxAmount: number
  trustedVendorsOnly: boolean
}

interface AppStore {
  credits: number
  usedCredits: number
  spend: (amount: number, reason: string) => void
  invoices: Invoice[]
  addInvoice: (inv: Omit<Invoice, 'id' | 'status'> & { status?: Invoice['status'] }) => Invoice
  setInvoiceStatus: (id: string, status: Invoice['status']) => void
  rules: PaymentRules
  setRules: (rules: PaymentRules) => void
  activity: Activity[]
  pushActivity: (type: Activity['type'], text: string) => void
  resetDemo: () => void
}

const STORAGE = 'cenan_app_state_v1'

const AppStoreContext = createContext<AppStore | null>(null)

const TODAY = new Date().toISOString().slice(0, 10)

function seedInvoices(): Invoice[] {
  return [
    {
      id: 'inv-1001',
      vendor: 'Yıldız Yazılım A.Ş.',
      number: 'YZL2026-0431',
      date: TODAY,
      net: 12500,
      vatRate: 20,
      vat: 2500,
      gross: 15000,
      status: 'pending',
      flags: [],
      source: 'analyzed',
    },
    {
      id: 'inv-1002',
      vendor: 'Mavi Lojistik Ltd.',
      number: 'MVL-88213',
      date: TODAY,
      net: 4200,
      vatRate: 20,
      vat: 840,
      gross: 5040,
      status: 'pending',
      flags: ['Yüksek tutar farkı'],
      source: 'analyzed',
    },
    {
      id: 'inv-1003',
      vendor: 'Ofis Dünyası',
      number: 'OFD-2026-77',
      date: TODAY,
      net: 850,
      vatRate: 10,
      vat: 85,
      gross: 935,
      status: 'approved',
      flags: [],
      source: 'analyzed',
    },
  ]
}

interface Persisted {
  credits: number
  usedCredits: number
  invoices: Invoice[]
  rules: PaymentRules
  activity: Activity[]
}

function loadState(): Persisted {
  try {
    const raw = localStorage.getItem(STORAGE)
    if (raw) return JSON.parse(raw) as Persisted
  } catch {
    /* ignore */
  }
  return {
    credits: 4500,
    usedCredits: 0,
    invoices: seedInvoices(),
    rules: { autoApprove: true, maxAmount: 10000, trustedVendorsOnly: true },
    activity: [
      { id: 'a1', type: 'system', text: 'Cenan AI çalışma alanı hazır.', at: Date.now() - 60000 },
    ],
  }
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(() => loadState())

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(state))
  }, [state])

  const api = useMemo<AppStore>(() => {
    const pushActivity = (type: Activity['type'], text: string) =>
      setState((s) => ({
        ...s,
        activity: [
          { id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, type, text, at: Date.now() },
          ...s.activity,
        ].slice(0, 40),
      }))

    return {
      credits: state.credits,
      usedCredits: state.usedCredits,
      invoices: state.invoices,
      rules: state.rules,
      activity: state.activity,
      spend: (amount, reason) =>
        setState((s) => ({
          ...s,
          credits: Math.max(0, s.credits - amount),
          usedCredits: s.usedCredits + amount,
          activity: [
            {
              id: `a-${Date.now()}`,
              type: 'system' as const,
              text: `${amount} kredi kullanıldı · ${reason}`,
              at: Date.now(),
            },
            ...s.activity,
          ].slice(0, 40),
        })),
      addInvoice: (inv) => {
        const created: Invoice = {
          ...inv,
          id: `inv-${Date.now()}`,
          status: inv.status ?? 'pending',
        }
        setState((s) => ({ ...s, invoices: [created, ...s.invoices] }))
        return created
      },
      setInvoiceStatus: (id, status) =>
        setState((s) => ({
          ...s,
          invoices: s.invoices.map((i) => (i.id === id ? { ...i, status } : i)),
        })),
      setRules: (rules) => setState((s) => ({ ...s, rules })),
      pushActivity,
      resetDemo: () => setState(loadState),
    }
  }, [state])

  return <AppStoreContext.Provider value={api}>{children}</AppStoreContext.Provider>
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext)
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider')
  return ctx
}

export function formatMoney(value: number, currency = '₺') {
  return `${currency}${value.toLocaleString('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
