import Authenticated from '@/layouts/authenticated'
import PageHeader from '@/layouts/page-header'

export default function Projects() {
	return (
		<Authenticated>
			<PageHeader title="Projects" />
			<p>Body content</p>
		</Authenticated>
	)
}
