import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import './AttachMenu.css'

interface AttachMenuProps {
  onAction?: (id: string) => void
  onFileSelected?: (file: File) => void
}

const ITEMS = [
  {
    id: 'upload',
    label: 'Bir dosya yükle',
    hasChevron: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M8 4.5h5.2L16 7.3V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 19V6A1.5 1.5 0 0 1 5.5 4.5H8Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M13 4.5V7.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 2.5v4M7 4.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'recents',
    label: 'Son Kullanılanlar',
    hasChevron: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 3.5h7.2L18 7.3V20a1.5 1.5 0 0 1-1.5 1.5h-9.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M14 3.5V7h3.5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12h6M9 15.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Beceriler',
    hasChevron: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 20l3-6 3 6H7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M15.5 14.5h4v4h-4v-4Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'connector',
    label: 'Bağlayıcı ekle',
    hasChevron: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15.5 15.5h4M17.5 13.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
] as const

export default function AttachMenu({ onAction, onFileSelected }: AttachMenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const handleItem = (id: string) => {
    if (id === 'upload') {
      fileRef.current?.click()
      return
    }
    onAction?.(id)
    setOpen(false)
  }

  return (
    <div
      className={`attach ${open ? 'attach--open' : ''}`}
      ref={rootRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="attach__btn"
        aria-label={open ? 'Menüyü kapat' : 'Eklentiler'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="attach__plus" aria-hidden="true" />
      </button>

      {open && (
        <div className="attach__menu" role="menu">
          {ITEMS.map((item, index) => (
            <div key={item.id}>
              {index === 2 && <div className="attach__divider" />}
              <button
                type="button"
                className="attach__item"
                role="menuitem"
                onClick={() => handleItem(item.id)}
              >
                <span className="attach__icon">{item.icon as ReactNode}</span>
                <span className="attach__label">{item.label}</span>
                {item.hasChevron && (
                  <span className="attach__chevron" aria-hidden="true">
                    ›
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        className="attach__file"
        accept=".pdf,.png,.jpg,.jpeg,.xml,.csv,.xlsx,.doc,.docx"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            onFileSelected?.(file)
            setOpen(false)
          }
          e.target.value = ''
        }}
      />
    </div>
  )
}

export function AskBar({
  value,
  busy,
  dock,
  onChange,
  onSubmit,
  onFileSelected,
  onAttachAction,
}: {
  value: string
  busy: boolean
  dock?: boolean
  onChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
  onFileSelected?: (file: File) => void
  onAttachAction?: (id: string) => void
}) {
  return (
    <form className={`cenan-ask ${dock ? 'cenan-ask--dock' : ''}`} onSubmit={onSubmit}>
      <AttachMenu onFileSelected={onFileSelected} onAction={onAttachAction} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Bir soru sor"
        aria-label="Cenan AI mesaj"
      />
      <button type="submit" className="cenan-ask__send" disabled={!value.trim() || busy} aria-label="Gönder">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12h12M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  )
}
