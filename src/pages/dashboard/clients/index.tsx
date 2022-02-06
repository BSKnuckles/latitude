import Authenticated from '@/layouts/authenticated'
import { useFetch } from 'src/lib/api'
import ClientsTable from '@/components/clients/clients-table'
import Paginator from '@/components/generic/paginator'
import { useRouter } from 'next/router'
import PageHeader from '@/layouts/page-header'

export default function Clients() {
	const router = useRouter()
	const {
		page = 1,
		count = 5,
		orderBy = 'name',
		direction = 'asc',
	} = router.query
	const controls = [{ label: 'New Client', href: '/dashboard/clients/new' }]
	const {
		data: results,
		error,
		isLoaded,
	} = useFetch(
		`/api/clients?page=${page}&count=${count}&orderBy=${orderBy}&direction=${direction}`,
		'GET'
	)
	// console.log(data, error, isLoaded)

	if (isLoaded && !error) {
		return (
			<Authenticated>
				<PageHeader title="Clients" controls={controls} />
				<div className="space-y-6">
					<ClientsTable clients={results.data} />
					<Paginator pagination={results.pagination} />
				</div>
			</Authenticated>
		)
	} else
		return (
			<Authenticated>
				<PageHeader title="Clients" controls={controls} />
			</Authenticated>
		)
}
