import Authenticated from '@/layouts/authenticated'
import { useFetch } from 'src/lib/api'
import ClientsTable from '@/components/clients/clients-table'
import Paginator from '@/components/generic/paginator'
import { useRouter } from 'next/router'
import PageHeader from '@/layouts/page-header'
import { useState } from 'react'

export default function Clients() {
	const router = useRouter()
	const {
		page = 1,
		initialCount = 10,
		initialOrderBy = 'name',
		initialDirection = 'asc',
	} = router.query
	const [count, setCount] = useState(initialCount)
	const [orderBy, setOrderBy] = useState(initialOrderBy)
	const [direction, setDirection] = useState(initialDirection)
	const controls = [{ label: 'New Client', href: '/dashboard/clients/new' }]
	const {
		data: results,
		error,
		isLoaded,
	} = useFetch(
		`/api/clients?page=${page}&count=${count}&orderBy=${orderBy}&direction=${direction}`,
		'GET'
	)

	const updateSort = (key, value) => {
		if (key === 'results') setCount(value)
		else {
			setOrderBy(key)
			setDirection(value)
		}
	}
	// console.log(data, error, isLoaded)

	if (isLoaded && !error) {
		return (
			<Authenticated>
				<PageHeader title="Clients" controls={controls} />
				<div className="space-y-6">
					<ClientsTable
						clients={results.data}
						updateSort={updateSort}
						perPage={count}
						order={orderBy}
						direction={direction}
					/>
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
