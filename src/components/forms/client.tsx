import Link from 'next/link'
import SelectDropdown from '@/components/forms/inputs/select-dropdown'

export default function ClientForm({ formData, setFormData, handleSubmit }) {
	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-8 divide-y divide-gray-200"
		>
			<div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
				<div className="sm:col-span-4">
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700"
					>
						Client Name
					</label>
					<div className="mt-1">
						<input
							type="text"
							name="name"
							id="name"
							value={formData.name}
							onChange={(e) =>
								setFormData({
									...formData,
									name: e.target.value,
								})
							}
							className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>
				</div>

				<div className="relative sm:col-span-2">
					<SelectDropdown
						label="Status"
						options={['New', 'Active', 'Fired']}
						value={formData.status}
						handleChange={(e) =>
							setFormData({
								...formData,
								status: e.target.value,
							})
						}
					/>
				</div>
			</div>

			<div className="pt-5">
				<div className="flex justify-end">
					<Link href="/dashboard/clients">
						<a className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
							Cancel
						</a>
					</Link>
					<button
						type="submit"
						className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Save
					</button>
				</div>
			</div>
		</form>
	)
}
