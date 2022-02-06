import { CheckCircleIcon } from '@heroicons/react/solid'

export default function SuccessBanner({ title, message }) {
	return (
		<div className="rounded-md bg-green-50 p-4">
			<div className="flex items-center">
				<CheckCircleIcon
					className="h-5 w-5 text-green-400"
					aria-hidden="true"
				/>
				<h3 className="ml-3 text-sm font-medium text-green-800">{title}</h3>
			</div>
			<div className="mt-2 text-sm text-green-700">
				<p>{message}</p>
			</div>
		</div>
	)
}
