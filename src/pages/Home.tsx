import { Link } from 'react-router-dom'
import LiquidBackground from '../components/LiquidBackground'
import VideoClips from '../components/VideoClips'
import ContactSection from '../components/ContactSection'
import OsDownload from '../components/OsDownload'
import { useI18n } from '../context/I18nContext'
import './Home.css'

export default function Home() {
  const { t } = useI18n()

  return (
    <div className="home">
      <section className="hero">
        <LiquidBackground />

        <div className="hero__content">
          <p className="hero__eyebrow hero__eyebrow--left">{t('home.eyebrowLeft')}</p>
          <h1 className="hero__title" aria-label="CENAN">
            <span>C</span>
            <span>E</span>
            <span>N</span>
            <span>A</span>
            <span>N</span>
          </h1>
          <p className="hero__eyebrow hero__eyebrow--right">{t('home.eyebrowRight')}</p>

          <p className="hero__lead">{t('home.lead')}</p>

          <div className="hero__cta">
            <OsDownload compact />
            <Link to="/cenan-ai" className="btn btn--ghost btn--icon" aria-label={t('nav.ai')}>
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
          <span>{t('home.scroll')}</span>
          <span className="hero__scroll-arrow">↓</span>
        </div>
      </section>

      <VideoClips />

      <section className="home-download" id="indir">
        <div className="home-download__inner">
          <h2>{t('home.downloadTitle')}</h2>
          <p>{t('home.downloadLead')}</p>
          <OsDownload />
        </div>
      </section>

      <ContactSection />
    </div>
  )
}
