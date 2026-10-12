import { tutorials } from '../config'

export function Instructions() {
	return (
		<section className='mt-16'>
			<h2 className='text-sm font-bold opacity-60'>HOW TO SUBSCRIBE</h2>
			<p className='mt-2 text-sm opacity-60'>
				Click <b>copy link</b>, then add it to your calendar as a subscription.
				New episodes appear on their own, with no need to import anything again.
			</p>
			<div className='mt-4 divide-y divide-current/10 border-y border-current/10'>
				{tutorials.map((t) => (
					<details key={t.name} className='group py-1'>
						<summary className='flex min-h-11 cursor-pointer list-none items-center justify-between focus-visible:outline-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden'>
							{t.name}
							<span className='transition group-open:rotate-45'>+</span>
						</summary>
						<ol className='list-inside list-decimal space-y-1 pb-3 text-sm opacity-80'>
							{t.steps.map((st) => (
								<li key={st}>{st}</li>
							))}
						</ol>
					</details>
				))}
			</div>
		</section>
	)
}
