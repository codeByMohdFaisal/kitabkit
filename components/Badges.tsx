import { languageLabels } from "@/lib/site";

export function LanguageBadge({ code }: { code: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-sage-800">
      {languageLabels[code] ?? code}
    </span>
  );
}

export function CategoryPill({
  label,
  href,
}: {
  label: string;
  href?: string;
}) {
  const classes =
    "inline-flex items-center rounded-full border border-forest-200 bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700 transition-colors hover:bg-forest-100";

  if (href) {
    return (
      <a href={href} className={classes}>
        {label}
      </a>
    );
  }

  return <span className={classes}>{label}</span>;
}
