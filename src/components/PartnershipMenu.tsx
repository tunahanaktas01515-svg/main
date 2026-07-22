import { useState, useRef, useCallback, useEffect } from 'react'
import { GrowthIcon, PiggyIcon, DeskIcon } from './MenuIcons'

type MenuId = 'investments' | 'deposit' | 'more' | null

const MENU_ITEMS = [
  { id: 'investments' as const, label: 'Önceki Yatırımlarınız', Icon: GrowthIcon },
  { id: 'deposit' as const, label: 'Para Yatırma', Icon: PiggyIcon },
  { id: 'more' as const, label: 'Daha Fazlası', Icon: DeskIcon },
]

export default function PartnershipMenu() {
  const [rotated, setRotated] = useState(false)
  const [showItems, setShowItems] = useState(false)
  const [activeItem, setActiveItem] = useState<MenuId>(null)
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rotateTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    if (rotateTimer.current) clearTimeout(rotateTimer.current)
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const handleEnter = useCallback(() => {
    clearTimers()
    setRotated(true)
    rotateTimer.current = setTimeout(() => setShowItems(true), 480)
  }, [clearTimers])

  const handleLeave = useCallback(() => {
    clearTimers()
    leaveTimer.current = setTimeout(() => {
      setShowItems(false)
      setActiveItem(null)
      setRotated(false)
    }, 200)
  }, [clearTimers])

  return (
    <div
      className="relative flex items-center gap-1"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer bg-transparent border-0 flex-shrink-0"
        aria-label="Ortaklık menüsü"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
          style={{
            transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.45s cubic-bezier(0.34, 1.2, 0.64, 1)',
          }}
        >
          <circle cx="6" cy="12" r="2.4" fill="white" />
          <line x1="8.4" y1="12" x2="15.5" y2="5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="16.8" cy="4.5" r="2.4" fill="white" />
          <line x1="8.4" y1="12" x2="15.5" y2="18.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="16.8" cy="19.5" r="2.4" fill="white" />
        </svg>
      </button>

      {showItems && (
        <div className="flex items-center gap-0.5 ml-1 partnership-items-enter">
          {MENU_ITEMS.map(({ id, label, Icon }) => {
            const isActive = activeItem === id
            const isHidden = activeItem !== null && activeItem !== id

            return (
              <div
                key={id}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all duration-200 ${
                  isHidden
                    ? 'opacity-0 max-w-0 px-0 overflow-hidden pointer-events-none'
                    : 'opacity-100 hover:bg-white/5'
                }`}
                onMouseEnter={() => setActiveItem(id)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <span className={`flex items-center justify-center w-7 h-7 flex-shrink-0 ${isActive ? 'icon-glow-wrap' : ''}`}>
                  <Icon glowing={isActive} />
                </span>
                {isActive && (
                  <span
                    key={`${id}-label`}
                    className="menu-label-reveal text-sm font-medium text-text-secondary whitespace-nowrap"
                  >
                    {label}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
