import { VIDEO_CLIPS } from '../config'
import { useI18n } from '../context/I18nContext'
import './VideoClips.css'

export default function VideoClips() {
  const { t } = useI18n()

  return (
    <section className="clips" id="reklamlar">
      <div className="clips__head">
        <h2>{t('home.clipsTitle')}</h2>
        <p>{t('home.clipsLead')}</p>
      </div>

      <div className="clips__rail">
        {VIDEO_CLIPS.map((clip, i) => (
          <article key={clip.id} className={`clip clip--${(i % 4) + 1}`}>
            <div className="clip__stage">
              <div className="clip__orb" />
              <div className="clip__orb clip__orb--2" />
              <span className="clip__play" aria-hidden="true">
                ▶
              </span>
              <span className="clip__dur">{clip.duration}</span>
            </div>
            <div className="clip__meta">
              <span className="clip__tag">{t(clip.tagKey)}</span>
              <h3>{t(clip.titleKey)}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
