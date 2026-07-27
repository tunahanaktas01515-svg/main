import { useState } from 'react';
import { useLang } from '../i18n';
import type { User } from '../App';

type LoginModalProps = {
  onClose: () => void;
  onSubmit: (user: User) => void;
};

export function LoginModal({ onClose, onSubmit }: LoginModalProps) {
  const { L } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || (email.split('@')[0] || 'Kullanıcı');
    onSubmit({ name: finalName, email: email.trim() || 'user@cenan.io' });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="close">×</button>
        <h2 className="modal__title">{L.loginTitle}</h2>
        <p className="modal__sub">{L.loginSub}</p>
        <form className="modal__form" onSubmit={submit}>
          <label>
            <span>{L.fieldName}</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ayşe Kenter" />
          </label>
          <label>
            <span>{L.fieldEmail}</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ayse@cenan.io" required />
          </label>
          <label>
            <span>{L.fieldPassword}</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </label>
          <button type="submit" className="modal__submit">{L.login}</button>
        </form>
      </div>
    </div>
  );
}
