import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
};

/** Original FIAM mark aspect ~ 993×304 */
const sizes = {
  sm: { width: 110, height: 34, className: "h-8 w-auto" },
  md: { width: 148, height: 45, className: "h-10 w-auto sm:h-11" },
  lg: { width: 180, height: 55, className: "h-12 w-auto" },
};

export function Logo({
  className = "",
  priority = false,
  size = "md",
  variant = "dark",
}: LogoProps) {
  const s = sizes[size];
  const src = variant === "light" ? "/fiam-logo-light.png" : "/fiam-logo.png";

  return (
    <Link
      href="/"
      aria-label="Fiam Pakistan home"
      className={`inline-flex items-center shrink-0 bg-transparent ${className}`}
    >
      <Image
        src={src}
        alt="FIAM"
        width={s.width}
        height={s.height}
        priority={priority}
        unoptimized
        className={`${s.className} bg-transparent object-contain object-left`}
        style={{ background: "transparent" }}
      />
    </Link>
  );
}
