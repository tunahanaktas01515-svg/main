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

  const activeLabel = MENU_ITEMS.find((i) => i.id === activeItem)?.label

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
        <div
          className="relative flex items-center ml-1 partnership-items-enter"
          onMouseLeave={() => setActiveItem(null)}
        >
          {/* Fixed icon hitboxes — leave one icon boundary / enter another switches cleanly */}
          <div className="flex items-center">
            {MENU_ITEMS.map(({ id, label, Icon }) => {
              const isActive = activeItem === id
              const anotherActive = activeItem !== null && activeItem !== id

              return (
                <button
                  key={id}
                  type="button"
                  aria-label={label}
                  className={`flex items-center justify-center w-9 h-9 rounded-lg bg-transparent border-0 cursor-pointer transition-opacity duration-150 ${
                    anotherActive ? 'opacity-0' : 'opacity-100'
                  }`}
                  onMouseEnter={() => setActiveItem(id)}
                >
                  <span className={isActive ? 'icon-glow-wrap' : ''}>
                    <Icon glowing={isActive} />
                  </span>
                </button>
              )
            })}
          </div>

          {/* Label sits after all icon slots so it never blocks switching */}
          {activeItem && activeLabel && (
            <span
              key={activeItem}
              className="menu-label-reveal text-sm font-medium text-text-secondary whitespace-nowrap ml-1.5"
            >
              {activeLabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
