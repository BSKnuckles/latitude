import Authenticated from '@/layouts/authenticated'
import PageHeader from '@/layouts/page-header'

export default function Invoices() {
	return (
		<Authenticated>
			<PageHeader title="Invoices" />
			<p>Body content</p>
		</Authenticated>
	)
}
