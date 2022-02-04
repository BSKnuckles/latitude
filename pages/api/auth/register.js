import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  const prisma = new PrismaClient()
  const { name, email, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { email: email }
    })
    if (user) throw new Error('A user with this email already exists.')
		if (user && !user.password) throw new Error('You previously used passwordless login. Please use the same method then set a password on your profile page.')

		const saltRounds = 10
		bcrypt.hash(password, saltRounds, async (err, hash) => {
			try {
				const newUser = await prisma.user.create({
					data: {
						name: name,
						email: email,
						password: hash
					}
				})
				if (err) res.status(500).json({ error: "Failed to process password." })
				if (newUser) res.status(200).json({ message: 'Successfully created user account!' })
			} catch (error) {
				console.error(error)
				res.status(500).json({ error: "An error occurred creating your account. Please contact support." })
			}
    })

  } catch (error) {
    let statusCode = 500
    switch (error.message) {
      case 'A user with this email already exists.':
        statusCode = 409
        break
		}
		res.status(statusCode).json({ error: error.message })
  }
  // try {
  // 	const user = await prisma.user.findUnique({
  // 		where: { email: credentials.email }
  // 	})

  // 	if (!user) throw new Error('No user found')
  // 	if (!user.password)
  // 		throw new Error('You previously signed in with magic links. Please sign in with a magic link then set a password.')
  // 	const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
  // 	if (!isPasswordValid) throw new Error('Password is not valid')

  // 	return {
  // 		email: user.email,
  // 		id: user.id,
  // 		name: user.name,
  // 		isAdmin: user.isAdmin
  // 	}
  // } catch (error) {
  // 	throw new Error(error)
  // }
  // res.status(200).json({ name: 'John Doe' })
}
