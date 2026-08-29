import Link from "next/link";
import { getAllCategories } from "@/lib/ebooks";
import { siteConfig, whatsappLink } from "@/lib/site";

export function Footer() {
  const categories = getAllCategories();

  return (
    <footer className="border-t border-forest-100 bg-forest-900 text-forest-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-white">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm text-forest-300">{siteConfig.description}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sage-400">Browse</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/ebooks" className="hover:text-white">All guides</Link>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/ebooks/category/${category.slug}`} className="hover:text-white">
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sage-400">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </li>
            <li>
              <a href={whatsappLink()} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white">
                {siteConfig.contactEmail}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-forest-800 py-5 text-center text-xs text-forest-400">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
