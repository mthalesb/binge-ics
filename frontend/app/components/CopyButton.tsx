import { api_url } from "../config";
import { useCopy } from "../hooks";
import type { Show } from "../types";

export function CopyButton({ shows }: { shows: Show[] }) {
  const [copied, copy] = useCopy();

  if (shows.length === 0) return null;

  const icsUrl = `${api_url}/episodes.ics?shows=${shows.map((s) => s.id).join(",")}`;

  return (
    <div className="mt-10">
      <button
        onClick={() => copy(icsUrl)}
        className="min-h-11 w-full border border-current px-4 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span aria-live="polite">{copied ? "copied" : "copy link"}</span>
      </button>
    </div>
  );
}
