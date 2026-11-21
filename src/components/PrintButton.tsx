"use client";

/** Opens the browser's print dialog; "Save as PDF" there gives a clean one-page copy. */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full border border-ink/25 px-5 py-2.5 font-semibold transition hover:border-ink"
    >
      Print or save as PDF
    </button>
  );
}
