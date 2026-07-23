import { useEffect, useState } from 'react'
import { IHRACAT_FEATURES, INTEGRATIONS, MUHASEBE_FEATURES } from '../data/features'
import FeatureIcon from '../components/FeatureIcon'
import { useI18n } from '../context/I18nContext'
import './About.css'

const ASK_QUESTIONS = [
  'Bu ayki KDV ne kadar?',
  'Şu faturayı sisteme işle',
  'Almanya’ya ihracat riski nedir?',
  'Bu ürünün GTİP kodu ne?',
  'Banka ekstresini mutabakat yap',
  'Bu carinin borcu ne kadar?',
]

export default function About() {
  const { t } = useI18n()
  const [ask, setAsk] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setAsk((a) => (a + 1) % ASK_QUESTIONS.length), 2600)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="about">
      <div className="about__inner">
        {/* HERO */}
        <div className="about__hero" id="nedir">
          <div className="about__hero-text">
            <header className="about__title-row">
              <h1 className="about__title">{t('about.pageTitle')}</h1>
              <span className="about__badge" aria-hidden="true" />
            </header>

            <p className="about__hero-lead">
              Karmaşık menüler, içinden çıkılmaz ekranlar, her işlemi yapmak için üç yerden onay
              istemek… Muhasebe programı açınca bir de yorulmak zorunda mısın? Biz de bıktık. O yüzden
              her şeyi sade, net ve hızlı tasarladık. Artık programla uğraşmak yerine işine
              odaklanabilirsin.
            </p>
          </div>

          <div className="about__bikmis-wrap">
            <video
              className="about__bikmis"
              src="/about-bikmis.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* WHAT IS */}
        <section className="about__block">
          <h2 className="about__h2">{t('about.whatTitle')}</h2>
          <div className="about__card">
            <h3 className="about__lead-title">Cenan Nedir?</h3>
            <p className="about__paragraph">
              Cenan, muhasebeci ve ihracatçılar için geliştirilmiş yapay zeka destekli akıllı bir
              asistandır. Fatura okuma, banka mutabakatı, KDV kontrolü, ihracat belge takibi gibi
              işleri hızlandırır ve kolaylaştırır.
            </p>
            <p className="about__paragraph">
              Logo, Paraşüt ve Zirve gibi uygulamaların yanında destekçi ve eğitici bir program
              olarak çalışır. Gündelik işlemleri her bilgisayarda veya telefonda, kasmadan, yapay
              zeka ile 7/24 konuşarak halledebilirsiniz.
            </p>
          </div>
        </section>

        {/* ASK */}
        <section className="about__ask">
          <span className="about__ask-label">{t('about.askLabel')}</span>
          <div className="about__ask-box">
            <span className="about__ask-mark">✦</span>
            <span key={ask} className="about__ask-text">
              {ASK_QUESTIONS[ask]}
            </span>
            <span className="about__ask-caret" />
          </div>
        </section>

        {/* MUHASEBE */}
        <section className="about__block" id="uygulama">
          <h2 className="about__h2">{t('about.appTitle')}</h2>
          <div className="about__feature-list">
            {MUHASEBE_FEATURES.map((f) => (
              <article key={f.id} className="about__feature">
                <span className="about__feature-icon about__feature-icon--mint">
                  <FeatureIcon name={f.icon} />
                </span>
                <div className="about__feature-body">
                  <h3>{f.title}</h3>
                  <p className="about__paragraph">{f.desc}</p>
                  <div className="about__qa">
                    <span className="about__qa-q">“{f.question}”</span>
                    <span className="about__qa-a">{f.answer}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* IHRACAT */}
        <section className="about__block" id="ai">
          <h2 className="about__h2">{t('about.aiTitle')}</h2>
          <div className="about__feature-list">
            {IHRACAT_FEATURES.map((f) => (
              <article key={f.id} className="about__feature">
                <span className="about__feature-icon about__feature-icon--blue">
                  <FeatureIcon name={f.icon} />
                </span>
                <div className="about__feature-body">
                  <h3>{f.title}</h3>
                  <p className="about__paragraph">{f.desc}</p>
                  <div className="about__qa">
                    <span className="about__qa-q">“{f.question}”</span>
                    <span className="about__qa-a">{f.answer}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* VISION / INTEGRATIONS */}
        <section className="about__block" id="yapimci">
          <h2 className="about__h2">{t('about.visionTitle')}</h2>
          <div className="about__card">
            <p className="about__paragraph">{t('about.visionText')}</p>
            <div className="about__integ">
              {INTEGRATIONS.map((it) => (
                <span key={it.name} className="about__integ-chip">
                  {it.name}
                  <em>{t('home.soon')}</em>
                </span>
              ))}
            </div>
          </div>

          <h2 className="about__h2" style={{ marginTop: '1.75rem' }}>
            {t('about.makerTitle')}
          </h2>
          <div className="about__card">
            <p className="about__paragraph">{t('about.makerText')}</p>
          </div>
        </section>
      </div>
    </div>
  )
}
