import { useI18n } from '../context/I18nContext'
import './About.css'

export default function About() {
  const { t } = useI18n()

  const appFeatures = [
    'about.app.f1',
    'about.app.f2',
    'about.app.f3',
    'about.app.f4',
  ]
  const aiFeatures = [
    'about.ai.f1',
    'about.ai.f2',
    'about.ai.f3',
    'about.ai.f4',
  ]

  return (
    <div className="about">
      <div className="about__inner">
        <header className="about__title-row">
          <h1 className="about__title">{t('about.pageTitle')}</h1>
          <span className="about__badge" aria-hidden="true" />
        </header>

        <div className="about__stage">
          <div className="about__stars" aria-hidden="true" />
          <div className="about__globe-wrap" aria-hidden="true">
            <div className="about__globe" />
            <div className="about__globe-shade" />
            <div className="about__globe-glow" />
          </div>
        </div>

        <section className="about__block" id="nedir">
          <h2 className="about__h2">{t('about.whatTitle')}</h2>
          <div className="about__card">
            <h3 className="about__lead-title">Cenan Nedir?</h3>
            <p className="about__paragraph">
              Cenan, muhasebeci ve ihracatçılar için geliştirilmiş yapay zeka destekli akıllı bir
              asistandır. Fatura okuma, banka mutabakatı, KDV kontrolü, ihracat belge takibi gibi
              işleri hızlandırır ve kolaylaştırır.
            </p>
          </div>
        </section>

        <section className="about__block" id="uygulama">
          <h2 className="about__h2">{t('about.appTitle')}</h2>
          <ul className="about__list">
            {appFeatures.map((k) => (
              <li key={k}>
                <span className="about__dot" aria-hidden="true" />
                <p className="about__paragraph">{t(k)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about__block" id="ai">
          <h2 className="about__h2">{t('about.aiTitle')}</h2>
          <ul className="about__list">
            {aiFeatures.map((k) => (
              <li key={k}>
                <span className="about__dot" aria-hidden="true" />
                <p className="about__paragraph">{t(k)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="about__block" id="yapimci">
          <h2 className="about__h2">{t('about.makerTitle')}</h2>
          <div className="about__card">
            <p className="about__paragraph">{t('about.makerText')}</p>
          </div>
        </section>
      </div>
    </div>
  )
}
