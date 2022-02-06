import { ExclamationIcon } from '@heroicons/react/solid'

export default function ErrorBanner({ title, message }) {
	return (
		<div className="rounded-md bg-yellow-50 p-4">
			<div className="flex items-center">
				<ExclamationIcon
					className="h-5 w-5 text-yellow-400"
					aria-hidden="true"
				/>
				<h3 className="ml-3 text-sm font-medium text-yellow-800">{title}</h3>
			</div>
			<div className="mt-2 text-sm text-yellow-700">
				<p>{message}</p>
			</div>
		</div>
	)
}
