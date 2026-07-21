import { CONTACT } from '../config'
import { useI18n } from '../context/I18nContext'
import './ContactSection.css'

export default function ContactSection() {
  const { t } = useI18n()
  const telHref = `tel:${CONTACT.phone}`
  const waHref = `https://wa.me/${CONTACT.whatsapp}`
  const mailHref = `mailto:${CONTACT.email}?subject=Cenan%20AI`

  return (
    <section className="contact" id="iletisim">
      <h2 className="contact__title">{t('contact.title')}</h2>
      <p className="contact__sub">{t('contact.sub')}</p>

      <div className="contact__icons">
        <a className="contact__btn" href={telHref} aria-label={t('contact.call')}>
          <span className="contact__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </span>
          <span>{t('contact.call')}</span>
        </a>

        <a
          className="contact__btn"
          href={waHref}
          target="_blank"
          rel="noreferrer"
          aria-label={t('contact.whatsapp')}
        >
          <span className="contact__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.82c0 1.96.52 3.8 1.44 5.4L2 22l4.95-1.55a9.9 9.9 0 0 0 5.09 1.4h.01c5.46 0 9.89-4.4 9.89-9.82C21.94 6.4 17.5 2 12.04 2Zm5.75 13.95c-.24.68-1.4 1.24-1.93 1.32-.5.07-1.12.1-1.81-.11-.42-.13-.95-.31-1.64-.61-2.89-1.25-4.77-4.16-4.92-4.35-.14-.19-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.45.27-.29.59-.36.79-.36h.57c.18 0 .43-.07.67.51.24.6.82 2.01.89 2.16.07.14.12.32.02.51-.1.2-.15.32-.3.5-.14.17-.3.38-.43.51-.14.14-.29.29-.12.56.16.28.73 1.2 1.56 1.95 1.08.96 1.98 1.26 2.26 1.4.28.14.44.12.6-.07.17-.2.7-.81.89-1.09.19-.28.37-.23.63-.14.26.1 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
            </svg>
          </span>
          <span>{t('contact.whatsapp')}</span>
        </a>

        <a className="contact__btn" href={mailHref} aria-label={t('contact.mail')}>
          <span className="contact__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
              <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </span>
          <span>{t('contact.mail')}</span>
        </a>
      </div>

      <p className="contact__meta">
        {CONTACT.phoneDisplay} · {CONTACT.email}
      </p>
    </section>
  )
}
