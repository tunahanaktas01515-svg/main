import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BadgeCheck, Camera, Check, KeyRound, Mail, ShieldX, Trash2, UserCircle2 } from 'lucide-react';
import { useAppContext } from '../../context/appContextCore';
import { findPlan } from '../../data/plans';
import { maskEmail } from '../../lib/maskEmail';
import { Avatar } from '../ui/Avatar';
import { Modal } from '../ui/Modal';
import { cn } from '../../lib/cn';

/**
 * Profil bilgileri penceresi.
 * Yuvarlak profil fotoğrafı yükleme, takma ad, e-posta doğrulama durumu
 * (doğrulanmamışsa adres maskelenir) ve basit şifre değiştirme formu içerir.
 */
export function AccountModal() {
  const { t, activeOverlay, closeOverlay, profile, updateProfile, isLoggedIn, signIn } = useAppContext();

  const isOpen = activeOverlay === 'account';
  const fileRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState(profile.displayName);
  const [nameSaved, setNameSaved] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordFeedback, setPasswordFeedback] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null);

  // Pencere her açıldığında formu güncel profille tazele
  useEffect(() => {
    if (!isOpen) return;
    setDisplayName(profile.displayName);
    setNameSaved(false);
    setVerificationSent(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordFeedback(null);
  }, [isOpen, profile.displayName]);

  const plan = findPlan(profile.plan);

  const handlePhoto = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') updateProfile({ avatarUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const saveName = () => {
    const trimmed = displayName.trim();
    if (!trimmed) return;
    updateProfile({ displayName: trimmed });
    if (!isLoggedIn) signIn();
    setNameSaved(true);
    window.setTimeout(() => setNameSaved(false), 1800);
  };

  const changePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordFeedback({ tone: 'error', text: t('account.passwordRequired') });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordFeedback({ tone: 'error', text: t('account.passwordTooShort') });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordFeedback({ tone: 'error', text: t('account.passwordMismatch') });
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordFeedback({ tone: 'ok', text: t('account.passwordChanged') });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeOverlay}
      title={t('account.title')}
      subtitle={t('account.subtitle')}
      icon={<UserCircle2 className="h-4.5 w-4.5" />}
      size="lg"
      closeLabel={t('common.close')}
    >
      <div className="grid grid-cols-[minmax(0,220px)_minmax(0,1fr)] gap-6">
        {/* --- Profil fotoğrafı --- */}
        <section className="flex flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 text-center">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              handlePhoto(event.target.files?.[0]);
              event.target.value = '';
            }}
          />

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            aria-label={t('account.uploadPhoto')}
            className="focus-ring group relative rounded-full"
          >
            <Avatar
              isLoggedIn={isLoggedIn}
              name={profile.displayName}
              src={profile.avatarUrl}
              size="2xl"
              glow
            />
            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Camera className="h-6 w-6 text-white" />
            </span>
          </button>

          <p className="mt-3 text-[13px] font-semibold text-white/88">{t('account.photo')}</p>
          <p className="mt-1 text-[10.5px] leading-relaxed text-white/35">{t('account.photoHint')}</p>

          <div className="mt-3 flex w-full flex-col gap-1.5">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="focus-ring rounded-2xl border border-white/12 bg-white/[0.06] px-3 py-2 text-[11.5px] font-semibold text-white/80 transition-all duration-300 hover:border-indigo-400/40 hover:bg-indigo-500/18 hover:text-white"
            >
              {t('account.uploadPhoto')}
            </button>
            {profile.avatarUrl && (
              <button
                type="button"
                onClick={() => updateProfile({ avatarUrl: null })}
                className="focus-ring flex items-center justify-center gap-1.5 rounded-2xl border border-white/10 px-3 py-2 text-[11.5px] font-medium text-red-300/80 transition-colors hover:bg-red-500/10 hover:text-red-300"
              >
                <Trash2 className="h-3 w-3" />
                {t('account.removePhoto')}
              </button>
            )}
          </div>

          <div className="mt-4 w-full border-t border-white/10 pt-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              {t('account.plan')}
            </span>
            <div className="mt-1.5">
              <span className={cn('rounded-full border px-2.5 py-1 text-[11px] font-bold', plan.badge)}>
                {plan.name}
              </span>
            </div>
          </div>
        </section>

        {/* --- Bilgiler --- */}
        <div className="flex flex-col gap-5">
          {/* Takma ad */}
          <section>
            <label
              htmlFor="account-display-name"
              className="mb-1.5 block text-[11.5px] font-semibold text-white/70"
            >
              {t('account.displayName')}
            </label>
            <div className="flex items-center gap-2">
              <input
                id="account-display-name"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder={t('account.displayNamePlaceholder')}
                className="focus-ring h-10 min-w-0 flex-1 rounded-2xl border border-white/12 bg-white/[0.05] px-3.5 text-[13px] text-white/90 placeholder:text-white/30 transition-colors focus:border-indigo-400/50"
              />
              <button
                type="button"
                onClick={saveName}
                className="focus-ring flex h-10 shrink-0 items-center gap-1.5 rounded-2xl border border-indigo-400/40 bg-indigo-500/20 px-4 text-[12.5px] font-semibold text-indigo-100 transition-all duration-300 hover:bg-indigo-500/30"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {nameSaved ? (
                    <motion.span
                      key="saved"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      className="flex items-center gap-1.5"
                    >
                      <Check className="h-3.5 w-3.5" />
                      {t('common.saved')}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="save"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                    >
                      {t('common.save')}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </section>

          {/* E-posta */}
          <section>
            <span className="mb-1.5 block text-[11.5px] font-semibold text-white/70">{t('account.email')}</span>
            <div
              className={cn(
                'flex items-center gap-2.5 rounded-2xl border px-3.5 py-2.5',
                profile.emailVerified
                  ? 'border-emerald-400/25 bg-emerald-500/[0.07]'
                  : 'border-red-400/25 bg-red-500/[0.06]'
              )}
            >
              <Mail className="h-4 w-4 shrink-0 text-white/45" />
              <span className="min-w-0 flex-1 truncate font-mono text-[13px] text-white/88">
                {profile.emailVerified ? profile.email : maskEmail(profile.email)}
              </span>

              {/* Doğrulama ikonu: onaylıysa yeşil rozet, değilse kırmızı çarpı */}
              {profile.emailVerified ? (
                <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
                  <BadgeCheck className="h-4 w-4" />
                  {t('account.emailVerified')}
                </span>
              ) : (
                <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-red-300">
                  <ShieldX className="h-4 w-4" />
                  {t('account.emailUnverified')}
                </span>
              )}
            </div>

            {!profile.emailVerified && (
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-[10.5px] leading-relaxed text-white/35">{t('account.maskNote')}</p>
                <button
                  type="button"
                  onClick={() => {
                    setVerificationSent(true);
                    // Demo akış: doğrulama bağlantısı onaylanmış kabul edilir
                    window.setTimeout(() => updateProfile({ emailVerified: true }), 1400);
                  }}
                  className="focus-ring shrink-0 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-white/75 transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-500/15 hover:text-emerald-200"
                >
                  {verificationSent ? t('account.verificationSent') : t('account.verifyEmail')}
                </button>
              </div>
            )}
          </section>

          {/* Şifre */}
          <section className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-4">
            <div className="mb-3 flex items-center gap-2">
              <KeyRound className="h-3.5 w-3.5 text-white/50" />
              <h3 className="text-[13px] font-semibold text-white/88">{t('account.password')}</h3>
            </div>

            <div className="flex flex-col gap-2">
              <PasswordField
                id="pwd-current"
                label={t('account.currentPassword')}
                value={currentPassword}
                onChange={setCurrentPassword}
              />
              <div className="grid grid-cols-2 gap-2">
                <PasswordField
                  id="pwd-new"
                  label={t('account.newPassword')}
                  value={newPassword}
                  onChange={setNewPassword}
                />
                <PasswordField
                  id="pwd-confirm"
                  label={t('account.confirmPassword')}
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={changePassword}
                className="focus-ring rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-2 text-[12.5px] font-semibold text-white/80 transition-all duration-300 hover:border-indigo-400/40 hover:bg-indigo-500/18 hover:text-white"
              >
                {t('account.changePassword')}
              </button>

              {passwordFeedback && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    'text-[11.5px] font-medium',
                    passwordFeedback.tone === 'ok' ? 'text-emerald-300' : 'text-red-300'
                  )}
                >
                  {passwordFeedback.text}
                </motion.span>
              )}
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
}

/** Değeri hiçbir zaman açık göstermeyen basit şifre alanı */
function PasswordField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[10.5px] font-medium text-white/45">
        {label}
      </label>
      <input
        id={id}
        type="password"
        autoComplete="new-password"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="••••••••"
        className="focus-ring h-9 w-full rounded-xl border border-white/12 bg-white/[0.05] px-3 text-[13px] tracking-[0.18em] text-white/90 placeholder:tracking-[0.18em] placeholder:text-white/25 transition-colors focus:border-indigo-400/50"
      />
    </div>
  );
}
