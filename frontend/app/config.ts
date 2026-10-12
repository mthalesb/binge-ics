export const api_url = process.env.NEXT_PUBLIC_API_URL

export const donation_url = process.env.NEXT_PUBLIC_COFFEE_URL

export const maxShows = 10

export const tutorials = [
	{
		name: 'Google Calendar',
		steps: [
			"Open calendar.google.com on a computer (the phone app can't add by URL).",
			'Next to “Other calendars”, click + → From URL.',
			'Paste the link and click Add calendar.',
			'Google refreshes subscriptions slowly, up to ~24h.',
		],
	},
	{
		name: 'Apple Calendar (iPhone)',
		steps: [
			'Settings → Calendar → Accounts → Add Account.',
			'Other → Add Subscribed Calendar.',
			'Paste the link in Server and tap Next → Save.',
		],
	},
	{
		name: 'Apple Calendar (Mac)',
		steps: [
			'File → New Calendar Subscription…',
			'Paste the link and click Subscribe.',
		],
	},
	{
		name: 'Outlook',
		steps: [
			'Calendar → Add calendar → Subscribe from web.',
			'Paste the link, name it and click Import.',
		],
	},
]
