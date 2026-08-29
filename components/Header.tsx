import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/ebooks", label: "All Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-forest-100 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-display text-lg font-bold text-forest-900">
          <Image src="/logo-mark.svg" alt="Kitaab Kit" width={32} height={32} className="rounded-md" priority />
          <span className="hidden sm:inline">
            Kitaab <span className="text-terracotta-600">Kit</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-forest-800 transition-colors hover:bg-forest-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
