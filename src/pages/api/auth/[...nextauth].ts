import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		EmailProvider({
			server: {
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT),
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD,
				},
			},
			from: process.env.SMTP_FROM,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		// Choose how you want to save the user session.
		// The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.
		// If you use an `adapter` however, we default it to `"database"` instead.
		// You can still force a JWT session by explicitly defining `"jwt"`.
		// When using `"database"`, the session cookie will only contain a `sessionToken` value,
		// which is used to look up the session in the database.
		strategy: 'jwt',

		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 30 * 24 * 60 * 60, // 30 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		// updateAge: 24 * 60 * 60, // 24 hours
	},
	// jwt: {
	// 	// You can define your own encode/decode functions for signing and encryption
	// 	// if you want to override the default behaviour.
	// 	// encode: async ({ secret, token, maxAge }) => {},
	// 	// decode: async ({ secret, token, maxAge }) => {},
	// },
	pages: {
		signIn: '/auth/login', // Displays signin buttons
		// signOut: '/auth/signout', // Displays form with sign out button
		error: '/auth/login', // Error code passed in query string as ?error=
		verifyRequest: '/auth/confirmation', // Used for check email page
		newUser: '/dashboard/profile', // If set, new users will be directed here on first sign in
	},
	// Callbacks are asynchronous functions you can use to control what happens
	// when an action is performed.
	// https://next-auth.js.org/configuration/callbacks
	callbacks: {
		// async signIn({ user, account, profile, email, credentials }) { return true },
		// async redirect({ url, baseUrl }) { return baseUrl },
		async session({ session, token, user }) {
			session.user = {
				id: token.sub,
				name: token.name,
				email: token.email,
				emailVerified: token.emailVerified !== null ? true : false,
				image: token.picture,
			}
			return session
		},
		// async jwt({ token, user, account, profile, isNewUser }) {
		// 	return token
		// }
	},

	// Events are useful for logging
	// https://next-auth.js.org/configuration/events
	events: {},

	// Enable debug messages in the console if you are having problems
	debug: true,
})
