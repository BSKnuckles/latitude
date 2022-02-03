import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
			name: 'Email Magic Link',
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
    CredentialsProvider({
      name: 'Credentials',
			credentials: {
				email: { label: 'Email Address', type: 'text', placeholder: 'youare@thebomb.com' },
				password: { label: 'Password', type: 'password' }
			},
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) throw new Error('No user found')
					if (!user.password) throw new Error('You previously signed in with magic links. Please sign in with a magic link then set a password.')
					const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
					if (!isPasswordValid) throw new Error('Password is not valid')

					return {
						email: user.email,
						id: user.id,
						name: user.name,
						isAdmin: user.isAdmin
					}

        } catch (error) {
          throw new Error(error)
        }
      }
    })
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },
  pages: {
    signIn: '/auth/login',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    error: '/auth/login', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    // async jwt({ token, user, account, profile, isNewUser }) { return token }
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: true
})
