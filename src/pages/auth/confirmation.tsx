import Image from 'next/image'
import Link from 'next/link'

export default function Confirmation() {
	return (
		<>
			<div className="flex min-h-full flex-col bg-white lg:relative">
				<div className="flex flex-grow flex-col">
					<main className="flex flex-grow flex-col bg-white">
						<div className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 sm:px-6 lg:px-8">
							<div className="flex-shrink-0 pt-10 sm:pt-16">
								<Link href="/">
									<a className="inline-flex">
										<span className="sr-only">Workflow</span>
										<div className="flex h-12 w-auto">
											<Image
												src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
												alt=""
												width={500}
												height={500}
											/>
										</div>
									</a>
								</Link>
							</div>
							<div className="my-auto flex-shrink-0 py-16 pr-4 sm:py-32 sm:pr-6 lg:w-1/2 lg:pr-8">
								<p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
									Confirmation
								</p>
								<h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
									Check Your Email
								</h1>
								<p className="mt-2 text-base text-gray-500">
									A sign in link has been sent to your email address. Check your
									inbox and click that link to sign in to your account.
								</p>
								<div className="mt-6">
									<Link href="/">
										<a className="text-base font-medium text-indigo-600 hover:text-indigo-500">
											Go back home
											<span aria-hidden="true"> &rarr;</span>
										</a>
									</Link>
								</div>
							</div>
						</div>
					</main>
				</div>
				<div className="hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2">
					<div className="flex h-full w-full object-cover">
						<Image
							className="absolute inset-0"
							src="https://images.unsplash.com/photo-1470847355775-e0e3c35a9a2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80"
							alt=""
							height={2400}
							width={1000}
						/>
					</div>
				</div>
			</div>
		</>
	)
}
