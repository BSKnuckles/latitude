import Authenticated from '@/layouts/authenticated'
import PageHeader from '@/layouts/page-header'

export default function Dashboard() {
	return (
		<Authenticated>
			<PageHeader title="Dashboard" />
		</Authenticated>
	)
}
