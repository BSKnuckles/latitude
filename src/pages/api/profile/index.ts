import { getSession } from 'next-auth/react'
import GET from './get'
import PUT from './put'
import POST from './post'
import DELETE from './delete'

const handler = async (req, res) => {
  const session = await getSession({ req })
	if (!session) res.status(401).send()
	else {
		switch (req.method) {
			case "GET":
				await GET(req, res, session)
				break
			case "PUT":
				await PUT(req, res, session)
				break
			case "POST":
				await POST(req, res, session)
				break
			case "DELETE":
				await DELETE(req, res, session)
				break
			default:
				res.status(418).send()
		}
	}
}

export default handler