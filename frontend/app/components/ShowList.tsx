import type { Show } from "../types";

type Props = {
  shows: Show[];
  ready: boolean;
  onRemove: (id: number) => void;
};

export function ShowList({ shows, ready, onRemove }: Props) {
  return (
    <ul className="mt-10 divide-y divide-current/10">
      {shows.map((s, i) => (
        <li key={s.id} className="flex items-center gap-4 py-3">
          <span className="w-6 text-xs opacity-60">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="flex-1">{s.name}</span>
          <button
            onClick={() => onRemove(s.id)}
            className="flex size-11 items-center justify-center transition hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-accent"
          >
            ✕
          </button>
        </li>
      ))}
      {ready && shows.length === 0 && (
        <li className="py-3 text-sm opacity-60">nothing queued yet.</li>
      )}
    </ul>
  );
}
