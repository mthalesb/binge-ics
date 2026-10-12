import { donation_url } from "../config";

export function DonateLink() {
  if (!donation_url) return null;

  return (
    <a
      href={donation_url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-12 inline-flex min-h-11 items-center underline decoration-accent underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
    >
      ☕ buy me a coffee
    </a>
  );
}
