import Link from 'next/link'

export default function PageHeader({ title, controls = [] }) {
	return (
		<div className="mx-auto mb-6 flex max-w-7xl items-center justify-between py-2">
			<h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
			{controls.length > 0 && (
				<div className="ml-auto space-x-4">
					{controls.map((control) => (
						<Link key={control.href} href={control.href}>
							<a className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
								{control.label}
							</a>
						</Link>
					))}
				</div>
			)}
		</div>
	)
}
