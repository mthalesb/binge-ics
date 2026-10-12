import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { api_url, maxShows } from '../config'
import { useDebounced } from '../hooks'
import type { Show } from '../types'

type Props = { full: boolean; onAdd: (show: Show) => void }

export function SearchBox({ full, onAdd }: Props) {
	const [text, setText] = useState('')
	const q = useDebounced(text.trim())

	const {
		data: results = [],
		isFetching,
		isError,
	} = useQuery({
		queryKey: ['search', q],
		enabled: q.length > 1,
		queryFn: async (): Promise<Show[]> => {
			const res = await fetch(`${api_url}/shows/${encodeURIComponent(q)}`)

			if (!res.ok) throw new Error('search failed')

			return res.json()
		},
	})

	const open = q.length > 1 && !!text && !full && results.length > 0

	const add = (show: Show) => {
		onAdd(show)
		setText('')
	}

	return (
		<div className='relative mt-12'>
			<input
				value={text}
				onChange={(e) => setText(e.target.value)}
				disabled={full}
				placeholder={
					full ? `limit of ${maxShows} series reached` : 'search a series…'
				}
				className='w-full border-b-2 border-current bg-transparent py-3 text-lg outline-none placeholder:opacity-50 focus:border-accent disabled:opacity-50'
			/>
			{isFetching && (
				<span className='absolute right-0 top-3 animate-pulse text-xl opacity-50'>
					…
				</span>
			)}
			{isError && (
				<p role='alert' className='mt-2 text-sm text-accent'>
					search failed. try again.
				</p>
			)}
			{q.length > 1 &&
				text &&
				!isFetching &&
				!isError &&
				results.length === 0 && (
					<p className='mt-2 text-sm opacity-60'>no results.</p>
				)}
			{open && (
				<ul className='absolute z-10 mt-1 w-full border border-current bg-neutral-950'>
					{results.map((s) => (
						<li key={s.id}>
							<button
								type='button'
								onClick={() => add(s)}
								className='flex min-h-11 w-full items-center justify-between px-3 text-left hover:bg-accent hover:text-neutral-950 focus-visible:bg-accent focus-visible:text-neutral-950 focus-visible:outline-none'
							>
								<span>{s.name}</span>
								<span className='opacity-60'>{s.premiered.slice(0, 4)}</span>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
