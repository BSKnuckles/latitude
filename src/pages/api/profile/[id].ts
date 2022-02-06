import { getSession } from 'next-auth/react'
import GET from './get'
import PUT from './put'

const handler = async (req, res) => {
	const session = await getSession({ req })
	console.log('Session:', session)
	const { id } = req.query
	if (!session) res.status(401).send()
	else {
		switch (req.method) {
			case 'GET':
				await GET(req, res, id)
				break
			case 'PUT':
				await PUT(req, res, id)
				break
			default:
				res.status(418).send()
		}
	}
}

export default handler
