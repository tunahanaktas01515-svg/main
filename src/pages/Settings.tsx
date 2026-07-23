import { useEffect, useState } from 'react';
import { useLang } from '../i18n';
import { Toggle } from '../components/Toggle';

type Theme = 'light' | 'dark' | 'system';

type SettingsProps = {
  theme: Theme;
  onTheme: (t: Theme) => void;
};

export function Settings({ theme, onTheme }: SettingsProps) {
  const { lang, setLang } = useLang();
  const t = (tr: string, en: string) => (lang === 'tr' ? tr : en);

  const sections = [
    { id: 'genel', label: t('Genel', 'General') },
    { id: 'hesap', label: t('Hesap & Güvenlik', 'Account & Security') },
    { id: 'ai', label: t('AI & Asistan', 'AI & Assistant') },
    { id: 'bildirim', label: t('Bildirimler', 'Notifications') },
    { id: 'entegrasyon', label: t('Entegrasyonlar', 'Integrations') },
    { id: 'abonelik', label: t('Abonelik & Kullanım', 'Subscription & Usage') },
    { id: 'ajanlar', label: t('Ajanlar', 'Agents') },
    { id: 'gelismis', label: t('Gelişmiş', 'Advanced') },
  ];
  const [section, setSection] = useState('genel');

  // interactive states
  const [voice, setVoice] = useState(true);
  const [wake, setWake] = useState(true);
  const [autosave, setAutosave] = useState(true);
  const [twofa, setTwofa] = useState(false);
  const [notif, setNotif] = useState({ email: true, app: true, pay: true, recon: true, rate: false });
  const [smsConfirm, setSmsConfirm] = useState(true);
  const [assignKey, setAssignKey] = useState<string>('Ctrl + Space');
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening) return;
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      const parts = [];
      if (e.ctrlKey) parts.push('Ctrl');
      if (e.altKey) parts.push('Alt');
      if (e.shiftKey) parts.push('Shift');
      const key = e.key === ' ' ? 'Space' : e.key.length === 1 ? e.key.toUpperCase() : e.key;
      if (!['Control', 'Alt', 'Shift'].includes(e.key)) parts.push(key);
      if (parts.length) setAssignKey(parts.join(' + '));
      setListening(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [listening]);

  const Row = ({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) => (
    <div className="set-row">
      <div className="set-row__info">
        <span className="set-row__title">{title}</span>
        {desc && <span className="set-row__desc">{desc}</span>}
      </div>
      <div className="set-row__ctrl">{children}</div>
    </div>
  );

  const Select = ({ options }: { options: string[] }) => (
    <select className="set-select" defaultValue={options[0]}>
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );

  return (
    <div className="settings">
      <aside className="settings__nav">
        <h2>{t('Ayarlar', 'Settings')}</h2>
        {sections.map((s) => (
          <button key={s.id} type="button" className={`settings__tab ${section === s.id ? 'is-active' : ''}`} onClick={() => setSection(s.id)}>
            {s.label}
          </button>
        ))}
      </aside>

      <div className="settings__panel glass-card">
        {section === 'genel' && (
          <div className="set-group">
            <h3>{t('Genel', 'General')}</h3>
            <Row title={t('Dil', 'Language')}>
              <div className="seg">
                <button type="button" className={lang === 'tr' ? 'is-on' : ''} onClick={() => setLang('tr')}>TR</button>
                <button type="button" className={lang === 'en' ? 'is-on' : ''} onClick={() => setLang('en')}>ENG</button>
              </div>
            </Row>
            <Row title={t('Tema', 'Theme')} desc={t('Açık / Koyu / Sistem', 'Light / Dark / System')}>
              <div className="seg seg--theme">
                <button type="button" className={theme === 'light' ? 'is-on' : ''} onClick={() => onTheme('light')}>☀︎ {t('Açık', 'Light')}</button>
                <button type="button" className={theme === 'dark' ? 'is-on' : ''} onClick={() => onTheme('dark')}>☾ {t('Koyu', 'Dark')}</button>
                <button type="button" className={theme === 'system' ? 'is-on' : ''} onClick={() => onTheme('system')}>{t('Sistem', 'System')}</button>
              </div>
            </Row>
            <Row title={t('Tarih ve saat formatı', 'Date & time format')}>
              <Select options={['GG.AA.YYYY · 24s', 'AA/GG/YYYY · 12h', 'YYYY-AA-GG']} />
            </Row>
            <Row title={t('Para birimi', 'Default currency')}>
              <Select options={['₺ TRY', '€ EUR', '$ USD']} />
            </Row>
          </div>
        )}

        {section === 'hesap' && (
          <div className="set-group">
            <h3>{t('Hesap & Güvenlik', 'Account & Security')}</h3>
            <Row title={t('İsim', 'Name')}><input className="set-input" defaultValue="Ayşe Kenter" /></Row>
            <Row title={t('E-posta', 'Email')}><input className="set-input" defaultValue="ayse@cenan.io" /></Row>
            <Row title={t('Telefon', 'Phone')}><input className="set-input" defaultValue="+90 5xx xxx xx xx" /></Row>
            <Row title={t('Şifre', 'Password')}><button className="set-btn">{t('Şifre değiştir', 'Change password')}</button></Row>
            <Row title={t('İki adımlı doğrulama (2FA)', 'Two-factor (2FA)')}><Toggle on={twofa} onChange={setTwofa} /></Row>
            <Row title={t('Oturumları yönet', 'Manage sessions')} desc={t('3 aktif cihaz', '3 active devices')}><button className="set-btn">{t('Görüntüle', 'View')}</button></Row>
            <Row title={t('Hesabı sil / dondur', 'Delete / freeze account')}><button className="set-btn set-btn--danger">{t('Devam et', 'Continue')}</button></Row>
          </div>
        )}

        {section === 'ai' && (
          <div className="set-group">
            <h3>{t('AI & Asistan', 'AI & Assistant')}</h3>
            <Row title={t('Varsayılan AI modeli', 'Default AI model')}><Select options={[t('Dengeli', 'Balanced'), t('Hızlı', 'Fast'), t('Güçlü', 'Powerful')]} /></Row>
            <Row title={t('Sesli asistan', 'Voice assistant')}><Toggle on={voice} onChange={setVoice} /></Row>
            <Row title={t('Mikrofon seçimi', 'Microphone')}><Select options={['Varsayılan Mikrofon', 'AirPods Pro', 'USB Mic']} /></Row>
            <Row title={t('Hoparlör seçimi', 'Speaker')}><Select options={['Varsayılan Hoparlör', 'AirPods Pro', 'HDMI']} /></Row>
            <Row title={t('“Cenan” ile sesle çağırma', 'Wake word “Cenan”')}><Toggle on={wake} onChange={setWake} /></Row>
            <Row title={t('Sesli konuşma tuşu', 'Push-to-talk key')} desc={listening ? t('Bir tuşa basın…', 'Press a key…') : assignKey}>
              <button className={`set-btn ${listening ? 'is-listening' : ''}`} onClick={() => setListening(true)}>{t('Tuş Ata', 'Assign key')}</button>
            </Row>
            <Row title={t('Cevap uzunluğu', 'Answer length')}><Select options={[t('Orta', 'Medium'), t('Kısa', 'Short'), t('Detaylı', 'Detailed')]} /></Row>
            <Row title={t('Otomatik belge kaydetme', 'Auto-save documents')}><Toggle on={autosave} onChange={setAutosave} /></Row>
          </div>
        )}

        {section === 'bildirim' && (
          <div className="set-group">
            <h3>{t('Bildirimler', 'Notifications')}</h3>
            <Row title={t('E-posta bildirimleri', 'Email notifications')}><Toggle on={notif.email} onChange={(v) => setNotif({ ...notif, email: v })} /></Row>
            <Row title={t('Uygulama içi bildirimler', 'In-app notifications')}><Toggle on={notif.app} onChange={(v) => setNotif({ ...notif, app: v })} /></Row>
            <Row title={t('Ödeme hatırlatmaları', 'Payment reminders')}><Toggle on={notif.pay} onChange={(v) => setNotif({ ...notif, pay: v })} /></Row>
            <Row title={t('Mutabakat uyarıları', 'Reconciliation alerts')}><Toggle on={notif.recon} onChange={(v) => setNotif({ ...notif, recon: v })} /></Row>
            <Row title={t('Kur alarmı bildirimleri', 'Rate alarms')}><Toggle on={notif.rate} onChange={(v) => setNotif({ ...notif, rate: v })} /></Row>
            <Row title={t('Otonom ödeme onayı için SMS', 'SMS confirmation for autonomous payments')} desc={t('Onay için telefon numarasına mesaj iletilsin', 'Send an SMS to your phone for approval')}>
              <Toggle on={smsConfirm} onChange={setSmsConfirm} />
            </Row>
          </div>
        )}

        {section === 'entegrasyon' && (
          <div className="set-group">
            <h3>{t('Entegrasyonlar', 'Integrations')}</h3>
            <Row title="iyzico" desc={t('Ödeme altyapısı', 'Payment infrastructure')}><span className="set-badge on">{t('Bağlı', 'Connected')}</span></Row>
            <Row title={t('Banka / ekstre bağlantıları', 'Bank / statement links')} desc={t('Yakında', 'Soon')}><button className="set-btn">{t('Bağlan', 'Connect')}</button></Row>
            <Row title={t('E-fatura / Logo / Paraşüt', 'E-invoice / Logo / Paraşüt')}><button className="set-btn">{t('Bağlan', 'Connect')}</button></Row>
            <Row title={t('API anahtarları', 'API keys')}><button className="set-btn">{t('Yönet', 'Manage')}</button></Row>
          </div>
        )}

        {section === 'abonelik' && (
          <div className="set-group">
            <h3>{t('Abonelik & Kullanım', 'Subscription & Usage')}</h3>
            <Row title={t('Mevcut paket', 'Current plan')}><span className="set-badge">Cenan Pro</span></Row>
            <Row title={t('Kalan kredi', 'Remaining credit')}><b>8.760 / 10.000</b></Row>
            <Row title={t('Kullanım geçmişi', 'Usage history')}><button className="set-btn">{t('Görüntüle', 'View')}</button></Row>
            <Row title={t('Fatura / ödeme geçmişi', 'Billing history')}><button className="set-btn">{t('Görüntüle', 'View')}</button></Row>
            <Row title={t('Paket yükselt', 'Upgrade plan')}><button className="set-btn set-btn--primary">Cenan Ultra</button></Row>
          </div>
        )}

        {section === 'ajanlar' && (
          <div className="set-group">
            <h3>{t('Ajanlar', 'Agents')}</h3>
            <Row title={t('Fatura Ajanı', 'Invoice Agent')} desc={t('Ödeme yapabilir · Belge silemez', 'Can pay · Cannot delete')}><span className="set-badge on">{t('Aktif', 'Active')}</span></Row>
            <Row title={t('İhracat Ajanı', 'Export Agent')} desc={t('Belge oluşturabilir', 'Can create documents')}><span className="set-badge on">{t('Aktif', 'Active')}</span></Row>
            <Row title={t('Yeni ajan ekle', 'Add new agent')}><button className="set-btn set-btn--primary">+ {t('Ekle', 'Add')}</button></Row>
          </div>
        )}

        {section === 'gelismis' && (
          <div className="set-group">
            <h3>{t('Gelişmiş', 'Advanced')}</h3>
            <Row title={t('Veri yedekleme', 'Data backup')}><button className="set-btn">{t('Yedekle', 'Back up')}</button></Row>
            <Row title={t('Dışa aktarma', 'Export')}><Select options={['Excel', 'PDF', 'CSV']} /></Row>
            <Row title={t('Log kayıtları', 'Logs')}><button className="set-btn">{t('Görüntüle', 'View')}</button></Row>
            <Row title={t('Beta özellikler', 'Beta features')}><Toggle on={false} onChange={() => {}} /></Row>
          </div>
        )}
      </div>
    </div>
  );
}
