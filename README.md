# BINGE-ICS

Search for the series and get one calendar link with all their episodes. Subscribe to it in Google Calendar, Apple Calendar or Outlook, and new episodes show up on their own.

Episode data comes from the TVmaze API.

## Structure

- `backend/`: Cloudflare Worker built with Hono. It searches shows and serves the `.ics` feed.
- `frontend/`: Next.js app (Tailwind CSS and TanStack Query) to search, pick shows and copy the calendar link.

## API

| Route | Description |
| --- | --- |
| `GET /shows/:showName` | Search shows by name. |
| `GET /episodes.ics?shows=1,2,3` | Calendar feed with the episodes of the given show IDs (up to 10). |

## Running locally

Backend:

```sh
cd backend
pnpm install
pnpm dev
```

Frontend:

```sh
cd frontend
pnpm install
pnpm dev
```

The frontend reads these variables from `frontend/.env`:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | URL of the worker, for example `http://localhost:8787`. |
| `NEXT_PUBLIC_COFFEE_URL` | Optional. Donation link shown in the footer. |

## Deploy

Deploy the worker with `pnpm deploy` inside `backend/`. Calendar apps fetch the `.ics` URL on their own, so `NEXT_PUBLIC_API_URL` must point to the public worker URL in production.

## Formatting and linting

Both projects use Biome. Run `pnpm format` and `pnpm lint` inside each folder.

## License

[MIT](LICENSE)
