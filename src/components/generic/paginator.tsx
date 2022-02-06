import Link from 'next/link'

export default function Paginator({ pagination }) {
	return (
		<nav className="flex items-center justify-between" aria-label="Pagination">
			<div className="hidden sm:block">
				<p className="text-sm text-gray-700">
					Showing <span className="font-medium">{pagination.from}</span> to{' '}
					<span className="font-medium">{pagination.to}</span> of{' '}
					<span className="font-medium">{pagination.total}</span> results
				</p>
			</div>
			<div className="flex flex-1 justify-between sm:justify-end">
				{pagination.prev_url ? (
					<Link href={pagination.prev_url}>
						<a className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
							Previous
						</a>
					</Link>
				) : (
					<button
						disabled
						className="relative inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600"
					>
						Previous
					</button>
				)}
				{pagination.next_url ? (
					<Link href={pagination.next_url}>
						<a className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
							Next
						</a>
					</Link>
				) : (
					<button
						disabled
						className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600"
					>
						Next
					</button>
				)}
			</div>
		</nav>
	)
}
