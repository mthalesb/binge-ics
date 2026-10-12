import type { Metadata } from 'next'
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const mono = JetBrains_Mono({ subsets: ['latin'] })

const display = Space_Grotesk({
	variable: '--font-display',
	subsets: ['latin'],
	weight: '700',
})

export const metadata: Metadata = {
	title: 'BINGE-ICS',
	description: 'Your shows, in your calendar.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang='pt-BR'
			className={`${display.variable} h-full antialiased [color-scheme:dark]`}
		>
			<body
				className={`${mono.className} flex min-h-full flex-col bg-neutral-950 text-neutral-100`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
