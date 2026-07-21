import './LiquidBackground.css'

export default function LiquidBackground() {
  return (
    <div className="liquid-bg" aria-hidden="true">
      <div className="liquid-bg__glow liquid-bg__glow--a" />
      <div className="liquid-bg__glow liquid-bg__glow--b" />
      <div className="liquid-blob liquid-blob--1" />
      <div className="liquid-blob liquid-blob--2" />
      <div className="liquid-blob liquid-blob--3" />
      <div className="liquid-blob liquid-blob--4" />
      <div className="liquid-blob liquid-blob--5" />
      <svg className="liquid-bg__lines" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="chromeStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="40%" stopColor="rgba(180,220,255,0.35)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(255,160,120,0.2)" />
          </linearGradient>
        </defs>
        <path
          className="liquid-path liquid-path--a"
          d="M-50,500 C150,350 280,620 480,420 C680,220 820,580 1050,380 C1180,280 1280,450 1350,400"
          fill="none"
          stroke="url(#chromeStroke)"
          strokeWidth="1.2"
        />
        <path
          className="liquid-path liquid-path--b"
          d="M-80,300 C120,480 320,180 520,360 C720,540 860,200 1100,320 C1220,380 1300,250 1400,280"
          fill="none"
          stroke="url(#chromeStroke)"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}
