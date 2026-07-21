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
