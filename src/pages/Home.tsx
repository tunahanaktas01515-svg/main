import { Link } from 'react-router-dom'
import LiquidBackground from '../components/LiquidBackground'
import VideoClips from '../components/VideoClips'
import ContactSection from '../components/ContactSection'
import OsDownload from '../components/OsDownload'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <LiquidBackground />

        <div className="hero__content">
          <p className="hero__eyebrow hero__eyebrow--left">YAPAY ZEKA</p>
          <h1 className="hero__title" aria-label="CENAN">
            <span>C</span>
            <span>E</span>
            <span>N</span>
            <span>A</span>
            <span>N</span>
          </h1>
          <p className="hero__eyebrow hero__eyebrow--right">ANALİZ</p>

          <p className="hero__lead">
            Cenan AI — güç ve analiz yeteneğiyle web’de ve uygulamada yanınızda.
            Programı indirin, sohbet edin, raporlarınızı hızlandırın.
          </p>

          <div className="hero__cta">
            <OsDownload compact />
            <Link to="/cenan-ai" className="btn btn--ghost btn--icon" aria-label="Cenan AI’ya git">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 17L17 7M17 7H9M17 7v8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="hero__scroll">
          <span>SCROLL TO EXPLORE</span>
          <span className="hero__scroll-arrow">↓</span>
        </div>
      </section>

      <VideoClips />

      <section className="home-download" id="indir">
        <div className="home-download__inner">
          <h2>Cenan’ı indir</h2>
          <p>
            Sisteminiz otomatik algılanır. Mac, Windows veya Linux için hafif ikonlarla tek tıkta
            indirin.
          </p>
          <OsDownload />
        </div>
      </section>

      <ContactSection />
    </div>
  )
}
