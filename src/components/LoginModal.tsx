import { useEffect, useState } from 'react';
import { useLang } from '../i18n';
import { FlowerIcon } from '../icons';
import type { User } from '../App';

type LoginModalProps = {
  onClose: () => void;
  onSubmit: (user: User) => void;
};

const FLOWER_COLORS = ['#5b8def', '#4fd1c5', '#a8b0bd', '#7eb6ff', '#3dbf7a', '#c7d0e0'];

export function LoginModal({ onClose, onSubmit }: LoginModalProps) {
  const { lang, L } = useLang();
  const t = (tr: string, en: string) => (lang === 'tr' ? tr : en);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flowerIdx, setFlowerIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setFlowerIdx((i) => (i + 1) % FLOWER_COLORS.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || (email.split('@')[0] || 'Kullanıcı');
    onSubmit({
      name: finalName,
      surname: '',
      email: email.trim() || 'user@cenan.io',
      phone: '',
    });
  };

  const social = (provider: 'google' | 'apple') => {
    onSubmit({
      name: provider === 'google' ? 'Google Kullanıcı' : 'Apple Kullanıcı',
      surname: '',
      email: provider === 'google' ? 'user@gmail.com' : 'user@icloud.com',
      phone: '',
    });
  };

  return (
    <div className="modal-overlay modal-overlay--soft" onClick={onClose}>
      <div className="auth-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="close">×</button>
        <div className="auth-card__art" style={{ ['--flower' as string]: FLOWER_COLORS[flowerIdx] }}>
          <span className="auth-card__bloom">
            <FlowerIcon size={88} />
          </span>
        </div>
        <div className="auth-card__form">
          <h2 className="auth-card__title">{L.loginTitle}</h2>
          <p className="auth-card__sub">{L.loginSub}</p>
          <form onSubmit={submit}>
            <label>
              <span>{L.fieldName}</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ayşe" />
            </label>
            <label>
              <span>{L.fieldEmail}</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ayse@cenan.io" required />
            </label>
            <label>
              <span>{L.fieldPassword}</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </label>
            <button type="submit" className="auth-card__submit">{L.login}</button>
          </form>
          <div className="auth-card__or"><span>{t('veya', 'or')}</span></div>
          <div className="auth-card__social">
            <button type="button" className="auth-social auth-social--google" onClick={() => social('google')}>
              <GoogleGlyph /> Google
            </button>
            <button type="button" className="auth-social auth-social--apple" onClick={() => social('apple')}>
              <AppleGlyph /> Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.7 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.7-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.7-.7s1.6.7 2.7.7c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.1-.8-2.2-3.4zM14.2 6.3c.6-.7 1-1.7.9-2.7-0.9.1-1.9.6-2.5 1.3-.6.6-1.1 1.7-.9 2.6 1 .1 1.9-.5 2.5-1.2z" />
    </svg>
  );
}
