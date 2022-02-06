import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const handler = async (req, res, id) => {
	try {
		const { name, email, image } = JSON.parse(req.body)
		const user = await prisma.user.findUnique({ where: { id: id } })
		let updatedUser
		if (user.email !== email) {
			updatedUser = await prisma.user.update({
				where: {
					id: id,
				},
				data: {
					name: name,
					email: email,
					image: image,
					emailVerified: null,
				},
			})
		} else {
			updatedUser = await prisma.user.update({
				where: {
					id: id,
				},
				data: {
					name: name,
					email: email,
					image: image,
				},
			})
		}

		if (!updatedUser)
			res.status(500).json({
				error:
					'Failed to update user. Please try again later and contact support if you continue to see this message.',
			})
		else
			res.status(200).json({
				id: updatedUser.id,
				name: updatedUser.name,
				email: updatedUser.email,
				emailVerified: updatedUser.emailVerified,
				image: updatedUser.image,
			})
	} catch (error) {
		res.status(500).json({
			error:
				'An unknown error occurred. Please try again later and contact support if you continue to see this message.',
		})
	}
}

export default handler
