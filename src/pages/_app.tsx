import { SessionProvider } from 'next-auth/react'
import './globals.css'

// Use of the <SessionProvider> is now mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }) {
	return (
		<SessionProvider
			session={pageProps.session}
			refetchOnWindowFocus={true}
			refetchInterval={5 * 60}
		>
			<Component {...pageProps} />
		</SessionProvider>
	)
}
