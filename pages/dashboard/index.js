import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Authenticated from '../../components/layouts/authenticated'

export default function Dashboard() {
  // const { data: session, status } = useSession()
  // const router = useRouter()
  // const loading = status === 'loading'

  // if (typeof window !== 'undefined' && loading) return null

  // if (!session) router.push('/')

  return (
    <Authenticated title='Dashboard'>
      <p>Body content</p>
    </Authenticated>
  )
}
