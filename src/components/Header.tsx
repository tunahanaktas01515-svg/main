import { GearIcon, StarManIcon } from '../icons';

type HeaderProps = {
  userName: string;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
};

export function Header({ userName, onOpenSettings, onOpenProfile }: HeaderProps) {
  return (
    <div className="header-actions">
      <button
        type="button"
        className="icon-chip glow-chip"
        aria-label="Ayarlar"
        onClick={onOpenSettings}
      >
        <GearIcon size={22} />
      </button>
      <button
        type="button"
        className="icon-chip avatar-chip glow-chip"
        aria-label={`${userName} profili`}
        onClick={onOpenProfile}
      >
        <StarManIcon size={30} />
      </button>
    </div>
  );
}
