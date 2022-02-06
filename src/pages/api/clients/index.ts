import { getSession } from 'next-auth/react'
import { getAll, create } from './methods'

const handler = async (req, res) => {
	const session = await getSession({ req })
	if (!session) res.status(401).send()
	else {
		switch (req.method) {
			case 'GET':
				await getAll(req, res, session)
				break
			case 'POST':
				await create(req, res, session)
				break
			default:
				res.status(418).send()
		}
	}
}

export default handler
