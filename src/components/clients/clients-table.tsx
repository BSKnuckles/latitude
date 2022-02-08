import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
dayjs.extend(relativeTime)
import {
	ArrowSmDownIcon,
	ArrowSmUpIcon,
	SwitchVerticalIcon,
} from '@heroicons/react/solid'

export default function ClientsTable({
	clients,
	order,
	direction,
	perPage,
	updateSort,
}) {
	const handleDelete = (client) => {
		console.log('Delete:', client)
	}

	const clientStatus = (status) => {
		switch (status) {
			case 'New':
				return (
					<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
						{status}
					</span>
				)
			case 'Active':
				return (
					<span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
						{status}
					</span>
				)
			case 'Fired':
				return (
					<span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
						{status}
					</span>
				)
		}
	}
	const sortControls = (
		label: string,
		column: string,
		order: string,
		direction: string,
		updateSort
	) => {
		if (order === column) {
			// Sort is set for this column
			if (direction === 'asc')
				return (
					<button
						onClick={() => updateSort(column, 'desc')}
						className="flex items-center space-x-1"
					>
						<span className="text-xs font-medium uppercase tracking-wider text-gray-500">
							{label}
						</span>
						<span className="sr-only">Sort by Client {label}</span>
						<ArrowSmDownIcon className="h-4 w-4 text-gray-700" />
					</button>
				)
			else
				return (
					<button
						onClick={() => updateSort(column, 'asc')}
						className="flex items-center space-x-1"
					>
						<span className="text-xs font-medium uppercase tracking-wider text-gray-500">
							{label}
						</span>
						<span className="sr-only">Sort by Client {label}</span>
						<ArrowSmUpIcon className="h-4 w-4 text-gray-700" />
					</button>
				)
		} else
			return (
				<button
					onClick={() => updateSort(column, 'asc')}
					className="flex items-center space-x-2"
				>
					<span className="text-xs font-medium uppercase tracking-wider text-gray-500">
						{label}
					</span>
					<span className="sr-only">Sort by Client {label}</span>
					<SwitchVerticalIcon className="h-4 w-4 text-gray-700" />
				</button>
			)
	}
	return (
		<div className="flex flex-col">
			<div className="inline-block min-w-full align-middle">
				<div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
					<table className="min-w-full table-fixed divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="flex w-full items-center px-6 py-3 text-left"
								>
									{sortControls('Name', 'name', order, direction, updateSort)}
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
								>
									{sortControls(
										'Status',
										'status',
										order,
										direction,
										updateSort
									)}
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
								>
									{sortControls(
										'Created',
										'createdAt',
										order,
										direction,
										updateSort
									)}
								</th>
								<th scope="col" className="relative px-6 py-3">
									<div className="flex items-center justify-end">
										<label
											htmlFor="results"
											className="mr-2 text-xs text-gray-500"
										>
											Results
										</label>
										<select
											onChange={(e) => updateSort(e.target.id, e.target.value)}
											name="results"
											id="results"
											className="rounded border-gray-300 py-0.5 pl-2 pr-6 text-xs"
										>
											<option>10</option>
											<option>25</option>
											<option>50</option>
										</select>
									</div>
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{clients.length > 0 ? (
								clients.map((client) => (
									<tr key={client.id}>
										<td className="whitespace-nowrap px-6 py-4">
											<div className="flex flex-col justify-center">
												<Link href={`/dashboard/clients/${client.id}`}>
													<a className="text-sm font-medium text-indigo-600">
														{client.name}
													</a>
												</Link>
												<p className="text-sm text-gray-500">{client.name}</p>
											</div>
										</td>
										<td className="whitespace-nowrap px-6 py-4">
											{clientStatus(client.status)}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
											{dayjs(client.createdAt).fromNow()}
										</td>
										<td className="space-x-4 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
											<Link href={`/dashboard/clients/${client.id}/edit`}>
												<a className="text-indigo-600 hover:text-indigo-900">
													Edit
												</a>
											</Link>
											<button
												onClick={() => handleDelete(client)}
												className="text-red-600 hover:text-red-900"
											>
												Delete
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={4}
										className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500"
									>
										No clients have been added
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
