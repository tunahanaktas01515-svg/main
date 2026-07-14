import { CubeIcon, SparkIcon } from "./Icons";

/** Futuristic holographic 3D-print visual built purely with CSS. */
export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* orbit rings */}
      <div className="animate-spin-slow absolute inset-0 rounded-full border border-blue/20" />
      <div
        className="absolute inset-8 rounded-full border border-orange/20"
        style={{ animation: "spin-slow 26s linear infinite reverse" }}
      />
      <div className="absolute inset-16 rounded-full border border-red/15" />

      {/* glow core */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="h-40 w-40 rounded-full bg-blue/25 blur-3xl" />
      </div>

      {/* central prism */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="animate-float glass relative flex h-44 w-44 items-center justify-center rounded-3xl border-blue/30 shadow-glow-blue">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue/20 via-transparent to-orange/20" />
          <CubeIcon className="h-24 w-24 text-blue-bright" strokeWidth={1.1} />
          {/* scanning line */}
          <div className="absolute inset-x-4 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
        </div>
      </div>

      {/* floating chips */}
      <FloatingChip
        className="left-0 top-6"
        color="blue"
        label="PLA · 42 g"
      />
      <FloatingChip
        className="right-0 top-24"
        color="orange"
        label="1h 48m"
        delay="1.4s"
      />
      <FloatingChip
        className="bottom-8 left-6"
        color="red"
        label="98% fit"
        delay="2.2s"
      />

      <div className="animate-float absolute -right-2 bottom-24 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-orange to-red shadow-glow-orange">
        <SparkIcon className="h-6 w-6 text-white" />
      </div>
    </div>
  );
}

function FloatingChip({
  className,
  color,
  label,
  delay = "0s",
}: {
  className: string;
  color: "blue" | "orange" | "red";
  label: string;
  delay?: string;
}) {
  const dot =
    color === "blue"
      ? "bg-blue"
      : color === "orange"
        ? "bg-orange"
        : "bg-red";
  return (
    <div
      className={`glass animate-float absolute flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-ink shadow-lg ${className}`}
      style={{ animationDelay: delay }}
    >
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </div>
  );
}
