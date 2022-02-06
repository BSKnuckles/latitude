import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const handler = async (req, res, id) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: id },
		})
		if (!user) res.status(404).send()
		else
			res.status(200).json({
				id: user.id,
				name: user.name,
				email: user.email,
				emailVerified: user.emailVerified !== null ? true : false,
				image: user.image,
			})
	} catch (error) {
		res.status(500).json({
			error:
				'An unknown error occurred. Please try again later and contact support if you continue to see this message.',
		})
	}
}

export default handler
