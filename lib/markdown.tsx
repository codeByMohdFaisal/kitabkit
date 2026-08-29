import { Fragment, type ReactNode } from "react";

/**
 * Minimal renderer for the subset of markdown used in `Ebook.description`:
 * blank-line paragraphs, "- " bullet lists, and **bold** / *italic* inline
 * emphasis. Deliberately dependency-free for v1 — swap for a real
 * markdown/MDX pipeline if content authors need more than this.
 */
export function renderMarkdownLite(source: string): ReactNode {
  const blocks = source.trim().split(/\n\s*\n/);

  return blocks.map((block, i) => {
    const lines = block.split("\n").map((l) => l.trim());
    const isList = lines.every((l) => l.startsWith("- "));

    if (isList) {
      return (
        <ul key={i} className="list-disc space-y-2 pl-5 marker:text-forest-500">
          {lines.map((l, j) => (
            <li key={j}>{renderInline(l.slice(2))}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className="leading-relaxed">
        {renderInline(lines.join(" "))}
      </p>
    );
  });
}

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-forest-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
