'use client'

import { CopyButton } from './components/CopyButton'
import { DonateLink } from './components/DonateLink'
import { GithubLink } from './components/GithubLink'
import { Header } from './components/Header'
import { Instructions } from './components/Instructions'
import { SearchBox } from './components/SearchBox'
import { ShowList } from './components/ShowList'
import { maxShows } from './config'
import { useLocalStorage } from './hooks'
import type { Show } from './types'

export default function App() {
	const [shows, setShows, ready] = useLocalStorage<Show[]>('shows', [])

	const add = (show: Show) =>
		setShows((prev) => {
			const full = prev.length >= maxShows
			const duplicate = prev.some((s) => s.id === show.id)

			return full || duplicate ? prev : [...prev, show]
		})

	const remove = (id: number) =>
		setShows((prev) => prev.filter((s) => s.id !== id))

	return (
		<main className='mx-auto w-full max-w-xl px-6 py-20'>
			<GithubLink />
			<Header />
			<SearchBox full={shows.length >= maxShows} onAdd={add} />
			<ShowList shows={shows} ready={ready} onRemove={remove} />
			<CopyButton shows={shows} />
			<Instructions />
			<DonateLink />
		</main>
	)
}
