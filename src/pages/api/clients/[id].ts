import { getSession } from 'next-auth/react'
import { getById, update, destroy } from './methods'

const handler = async (req, res) => {
	const session = await getSession({ req })
	const { id } = req.query
	if (!session) res.status(401).send()
	else {
		switch (req.method) {
			case 'GET':
				await getById(req, res, session, id)
				break
			case 'PUT':
				await update(req, res, session, id)
				break
			case 'DELETE':
				await destroy(req, res, session, id)
				break
			default:
				res.status(418).send()
		}
	}
}

export default handler
