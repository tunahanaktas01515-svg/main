import { useState } from 'react';
import { useLang } from '../i18n';
import type { User } from '../App';

type ProfileModalProps = {
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
};

export function ProfileModal({ user, onClose, onSave }: ProfileModalProps) {
  const { lang, L } = useLang();
  const t = (tr: string, en: string) => (lang === 'tr' ? tr : en);
  const [firstName, setFirstName] = useState(user?.name ?? '');
  const [surname, setSurname] = useState(user?.surname ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: firstName.trim() || 'Kullanıcı',
      surname: surname.trim(),
      email: email.trim(),
      phone: phone.trim(),
    });
  };

  return (
    <div className="modal-overlay modal-overlay--soft" onClick={onClose}>
      <div className="auth-card auth-card--profile" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="close">×</button>
        <div className="auth-card__form auth-card__form--solo">
          <h2 className="auth-card__title">{L.profileInfo}</h2>
          <p className="auth-card__sub">{t('Hesap bilgilerinizi güncelleyin.', 'Update your account details.')}</p>
          <form onSubmit={submit}>
            <div className="auth-row">
              <label>
                <span>{t('İsim', 'First name')}</span>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </label>
              <label>
                <span>{t('Soyisim', 'Surname')}</span>
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
              </label>
            </div>
            <label>
              <span>{L.fieldEmail}</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              <span>{t('Telefon', 'Phone')}</span>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+90 5xx xxx xx xx" />
            </label>
            <label>
              <span>{L.fieldPassword}</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </label>
            <button type="submit" className="auth-card__submit">{t('Kaydet', 'Save')}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
