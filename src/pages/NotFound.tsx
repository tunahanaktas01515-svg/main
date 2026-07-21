import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import './NotFound.css'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <div className="nf">
      <div className="nf__art" aria-hidden="true">
        <div className="nf__veil" />
        <div className="nf__petals">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={`nf__petal nf__petal--${(i % 7) + 1}`} />
          ))}
        </div>
      </div>

      <header className="nf__top">
        <span className="nf__brand">CENAN</span>
        <span className="nf__tag">{t('nf.tag')}</span>
      </header>

      <div className="nf__main">
        <Link to="/" className="nf__back-home">
          {t('nf.backHome')}
        </Link>
        <div className="nf__code-wrap">
          <h1 className="nf__code">404</h1>
          <p className="nf__label">{t('nf.notFound')}</p>
        </div>
      </div>

      <nav className="nf__side nf__side--left">
        <Link to="/">{t('nf.back')}</Link>
      </nav>
      <nav className="nf__side nf__side--right">
        <Link to="/">{t('nf.home')}</Link>
      </nav>

      <footer className="nf__foot">
        <div className="nf__dots" aria-hidden="true">
          <span />
          <span className="is-active" />
          <span />
        </div>
      </footer>
    </div>
  )
}
