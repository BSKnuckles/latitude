import Authenticated from '@/layouts/authenticated'
import PageHeader from '@/layouts/page-header'

export default function Settings() {
	return (
		<Authenticated>
			<PageHeader title="Settings" />
			<p>Body content</p>
		</Authenticated>
	)
}
