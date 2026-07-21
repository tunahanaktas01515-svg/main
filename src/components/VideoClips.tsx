import { VIDEO_CLIPS } from '../config'
import './VideoClips.css'

export default function VideoClips() {
  return (
    <section className="clips" id="reklamlar">
      <div className="clips__head">
        <h2>Kısa klipler</h2>
        <p>Cenan AI reklamlarından kısa kesitler.</p>
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
              <span className="clip__tag">{clip.tag}</span>
              <h3>{clip.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
