type ToggleProps = {
  on: boolean;
  onChange: (v: boolean) => void;
  label?: string;
};

export function Toggle({ on, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      className={`toggle ${on ? 'is-on' : ''}`}
      onClick={() => onChange(!on)}
      aria-pressed={on}
      aria-label={label}
    >
      <span className="toggle__knob" />
    </button>
  );
}
