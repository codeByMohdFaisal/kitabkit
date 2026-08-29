import { formatPrice } from "@/lib/site";

export function PriceTag({
  price,
  currency,
  size = "md",
}: {
  price: number;
  currency: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg" ? "text-3xl" : size === "sm" ? "text-base" : "text-xl";

  return (
    <span className={`font-display font-bold text-forest-800 ${sizeClass}`}>
      {formatPrice(price, currency)}
    </span>
  );
}
