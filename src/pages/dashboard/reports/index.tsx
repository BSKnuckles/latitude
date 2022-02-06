import Authenticated from '@/layouts/authenticated'
import PageHeader from '@/layouts/page-header'

export default function Reports() {
	return (
		<Authenticated>
			<PageHeader title="Reports" />
			<p>Body content</p>
		</Authenticated>
	)
}
