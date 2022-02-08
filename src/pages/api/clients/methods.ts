import { PrismaClient } from '@prisma/client'
import { buildPaginator } from '@/lib/api'
const prisma = new PrismaClient()

const getById = async (req, res, session, id) => {
	try {
		console.log('Searching for client by ID:', id)
		const client = await prisma.client.findUnique({ where: { id: id }})
		if (client) res.status(200).json({ data: client })
		else res.status(404).json({ error: 'No client found with this ID'})
	} catch (error) {
		res.json({ error: error })
		// res.status(500).json({
		// 	error:
		// 		'An unknown error occurred. Please try again later and contact support if you continue to see this message.',
		// })
	}
}

const getAll = async (req, res, session) => {
	try {
		const { page = 1, count = 5, orderBy = 'name', direction = 'asc' } = req.query
		const records = await prisma.client.count({where: {
				userId: session.user.id,
			}})
		const clients = await prisma.client.findMany({
			skip: Number(((page - 1) * count)),
			take: Number(count),
			where: {
				userId: session.user.id,
			},
			orderBy: {
				[orderBy]: direction,
			},
		})
		res.status(200).json({data: clients, pagination: buildPaginator('clients', clients.length, records, page, count, orderBy, direction)})
	} catch (error) {
		res.status(500).json({ error: error.message })
		// res.status(500).json({
		// 	error:
		// 		'An unknown error occurred. Please try again later and contact support if you continue to see this message.',
		// })
	}
}

const create = async (req, res, session) => {
	try {
		const { name, status } = req.body
		if (!name) throw new Error('The client name is required')
		if (!status) throw new Error('The client status field is required')
		const client = await prisma.client.create({ data: { name: String(name), userId: String(session.user.id), status: status }})
		if (client) res.status(201).json({ message: `Successfully created client: ${client.name}`, data: client })
		else throw new Error('CreateClientError')
		res.status(501).send()
	} catch (error) {
		res.json({ error: error.message })
		// res.status(500).json({
		// 	error:
		// 		'An unknown error occurred. Please try again later and contact support if you continue to see this message.',
		// })
	}
}

const update = async (req, res, session, id) => {
	try {
		res.status(501).send()
	} catch (error) {
		res.status(500).json({
			error:
				'An unknown error occurred. Please try again later and contact support if you continue to see this message.',
		})
	}
}

const destroy = async (req, res, session, id) => {
	try {
		res.status(501).send()
	} catch (error) {
		res.status(500).json({
			error:
				'An unknown error occurred. Please try again later and contact support if you continue to see this message.',
		})
	}
}

export {
	getById, getAll, create, update, destroy
}