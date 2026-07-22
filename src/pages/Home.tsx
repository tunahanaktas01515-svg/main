import { Link } from 'react-router-dom'
import ContactSection from '../components/ContactSection'
import OsDownload from '../components/OsDownload'
import ChatDemo from '../components/ChatDemo'
import GoldParticles from '../components/GoldParticles'
import FeatureIcon from '../components/FeatureIcon'
import { IHRACAT_FEATURES, INTEGRATIONS, MUHASEBE_FEATURES } from '../data/features'
import { useI18n } from '../context/I18nContext'
import './Home.css'

export default function Home() {
  const { t } = useI18n()

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero__glow" aria-hidden="true" />

        <div className="hero__grid">
          <div className="hero__left">
            <span className="hero__eyebrow">{t('home.kicker')}</span>
            <h1 className="hero__title" aria-label="CENAN AI">
              <span className="hero__title-1">CENAN</span>
              <span className="hero__title-2">AI</span>
            </h1>
            <p className="hero__tagline">{t('home.tagline')}</p>
            <p className="hero__lead">{t('home.lead')}</p>

            <div className="hero__cta">
              <OsDownload compact />
              <Link to="/cenan-ai" className="hero__try">
                {t('home.tryCenan')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-ico">✦</span>
                <div>
                  <strong>7/24</strong>
                  <small>{t('home.badge247')}</small>
                </div>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-ico">⚡</span>
                <div>
                  <strong>10+</strong>
                  <small>{t('home.statFeatures')}</small>
                </div>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-ico">◈</span>
                <div>
                  <strong>{t('home.badgeDevices')}</strong>
                  <small>{t('home.badgeVoice')}</small>
                </div>
              </div>
            </div>
          </div>

          <div className="hero__right">
            <div className="hero__figure">
              <GoldParticles />
              <div className="hero__figure-card">
                <span className="hero__fc-row"><i>👤</i> {t('home.fcRole')}</span>
                <span className="hero__fc-row"><i>📅</i> {t('home.fcSince')}</span>
                <span className="hero__fc-row"><i>📈</i> {t('home.fcValue')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="posbar">
        <p className="posbar__text">{t('home.positioning')}</p>
      </section>

      {/* MUHASEBE FEATURES */}
      <section className="feat" id="muhasebe">
        <div className="feat__head">
          <span className="feat__tag">{t('home.accountingTag')}</span>
          <h2>{t('home.accountingTitle')}</h2>
          <p>{t('home.accountingSub')}</p>
        </div>
        <div className="feat__grid">
          {MUHASEBE_FEATURES.map((f, i) => (
            <article key={f.id} className="fcard" style={{ animationDelay: `${i * 0.06}s` }}>
              <span className="fcard__icon fcard__icon--mint">
                <FeatureIcon name={f.icon} />
              </span>
              <h3>{f.title}</h3>
              <p className="fcard__desc">{f.desc}</p>
              <div className="fcard__q">
                <span className="fcard__q-mark">“</span>
                {f.question}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* IHRACAT FEATURES */}
      <section className="feat feat--alt" id="ihracat">
        <div className="feat__head">
          <span className="feat__tag feat__tag--blue">{t('home.exportTag')}</span>
          <h2>{t('home.exportTitle')}</h2>
          <p>{t('home.exportSub')}</p>
        </div>
        <div className="feat__grid">
          {IHRACAT_FEATURES.map((f, i) => (
            <article key={f.id} className="fcard" style={{ animationDelay: `${i * 0.06}s` }}>
              <span className="fcard__icon fcard__icon--blue">
                <FeatureIcon name={f.icon} />
              </span>
              <h3>{f.title}</h3>
              <p className="fcard__desc">{f.desc}</p>
              <div className="fcard__q">
                <span className="fcard__q-mark">“</span>
                {f.question}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* INTEGRATIONS / VISION */}
      <section className="integ">
        <div className="integ__inner">
          <div className="integ__head">
            <span className="feat__tag feat__tag--amber">{t('home.integTag')}</span>
            <h2>{t('home.integTitle')}</h2>
            <p>{t('home.integSub')}</p>
          </div>
          <div className="integ__logos">
            {INTEGRATIONS.map((it) => (
              <div key={it.name} className="integ__chip">
                <span className="integ__name">{it.name}</span>
                <span className="integ__soon">{t('home.soon')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AD REEL */}
      <section className="reel">
        <div className="reel__head">
          <h2>{t('home.reelTitle')}</h2>
          <p>{t('home.reelSub')}</p>
        </div>
        <div className="reel__grid">
          <div className="reel__demo">
            <ChatDemo />
          </div>
          <div className="reel__copy">
            <h3>{t('home.reelPitchTitle')}</h3>
            <p>{t('home.reelPitch')}</p>
            <Link to="/cenan-ai" className="hero__try hero__try--solid">
              {t('home.tryCenan')}
            </Link>
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
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
