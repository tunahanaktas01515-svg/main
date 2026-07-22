import { useState, useCallback } from 'react'

export default function CenanLogo() {
  const [animKey, setAnimKey] = useState(0)
  const [hovered, setHovered] = useState(false)

  const handleEnter = useCallback(() => {
    setAnimKey((k) => k + 1)
    setHovered(true)
  }, [])

  const handleLeave = useCallback(() => {
    setHovered(false)
  }, [])

  return (
    <button
      type="button"
      className="cenan-logo relative inline-flex items-center h-10 px-1 cursor-pointer bg-transparent border-0"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-label="Cenan"
    >
      <span
        key={hovered ? `write-${animKey}` : 'idle'}
        className={`cenan-script text-white text-[28px] leading-none select-none ${hovered ? 'cenan-writing' : ''}`}
      >
        cenan
      </span>
    </button>
  )
}
