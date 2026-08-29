import type { Ebook } from "@/lib/types";
import { takeYourLocalShopOnline } from "./take-your-local-shop-online";
import { apniDukaanOnlineLeJaayein } from "./apni-dukaan-online-le-jaayein";

/**
 * Registry of every published ebook. This is the ONLY file that needs a new
 * line when you publish a new title — see README.md "Adding a new ebook".
 * Everything else (catalog, category pages, sitemap, filters) reads from
 * `lib/ebooks.ts`, which sources its data from this array.
 */
export const allEbooks: Ebook[] = [
  takeYourLocalShopOnline,
  apniDukaanOnlineLeJaayein,
];
