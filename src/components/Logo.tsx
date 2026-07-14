import Link from "next/link";
import { CubeIcon } from "./Icons";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="MakerAI Hub home"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue to-red shadow-[0_6px_20px_-6px_rgba(47,123,255,0.9)] transition-transform group-hover:scale-105">
        <CubeIcon className="h-5 w-5 text-white" />
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-orange shadow-[0_0_10px_2px_rgba(255,122,26,0.9)]" />
      </span>
      <span className="text-lg font-semibold tracking-tight">
        Maker<span className="text-gradient-blue">AI</span>{" "}
        <span className="text-ink-soft font-medium">Hub</span>
      </span>
    </Link>
  );
}
