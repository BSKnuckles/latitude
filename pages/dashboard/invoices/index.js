import { useSession } from 'next-auth/react'
import Authenticated from '../../../components/layouts/Authenticated'
import Guest from '../../../components/layouts/Guest'
import AccessDenied from '../../../components/access-denied'

export default function Invoices() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  if (typeof window !== 'undefined' && loading) return null

  if (!session) {
    return (
      <Guest>
        <AccessDenied />
      </Guest>
    )
  }

  return (
    <Authenticated title='Invoices'>
      <p>Body content</p>
    </Authenticated>
  )
}
