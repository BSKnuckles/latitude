import { useState } from 'react'
import { getSession } from 'next-auth/react'
import Authenticated from '@/layouts/authenticated'
import ErrorBanner from '@/components/notifications/error-banner'
import SuccessBanner from '@/components/notifications/success-banner'

export async function getServerSideProps(context) {
	const session = await getSession(context)
	const user = await fetch(
		`
		${process.env.NEXT_PUBLIC_URL}/api/profile/${session.user.id}`,
		{
			headers: {
				'Content-Type': 'application/json',
				cookie: context.req.headers.cookie!,
			},
		}
	).then((res) => res.json())
	return {
		props: {
			session: session,
			user: user,
		},
	}
}

export default function Profile({ session, user }) {
	const profile = {
		name: user.name,
		email: user.email,
	}
	const [profileError, setProfileError] = useState('')
	const [profileSuccess, setProfileSuccess] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [passwordSuccess, setPasswordSuccess] = useState('')
	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
		notifications: {
			email: {
				comments: false,
				projects: false,
				invoices: false,
			},
		},
	})

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (profileError) setProfileError('')
		if (profileSuccess) setProfileSuccess('')
		if (passwordError) setPasswordError('')
		if (passwordSuccess) setPasswordSuccess('')

		// Check if profile change should be triggered
		const changeProfile =
			formData.name !== profile.name || formData.email !== profile.email
		if (changeProfile) {
			fetch(`/api/profile/${user.id}`, {
				method: 'PUT',
				body: JSON.stringify({
					name: formData.name,
					email: formData.email,
				}),
			}).then((res) => {
				if (res.status === 200)
					setProfileSuccess('Successfully updated profile!')
				else setProfileError('Failed to update profile')
			})
		}
	}
	if (!profile) return null
	else {
		return (
			<Authenticated title="User Profile">
				<form
					onSubmit={handleSubmit}
					className="space-y-8 divide-y divide-gray-200"
				>
					<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
						<div>
							<div className="mt-6 sm:mt-5">
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Personal Details
								</h3>
								<p className="mt-1 max-w-2xl text-sm text-gray-500">
									This information will be displayed publicly so be careful what
									you share.
								</p>
							</div>

							{profileError && (
								<div className="mt-6 sm:mt-5">
									<ErrorBanner title="Profile Error" message={profileError} />
								</div>
							)}

							{profileSuccess && (
								<div className="mt-6 sm:mt-5">
									<SuccessBanner title="Success" message={profileSuccess} />
								</div>
							)}

							<div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
								<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
									>
										Name
									</label>
									<div className="mt-1 sm:col-span-2 sm:mt-0">
										<div className="flex max-w-lg rounded-md shadow-sm">
											<input
												type="text"
												name="name"
												id="name"
												autoComplete="name"
												value={formData.name}
												onChange={(e) =>
													setFormData({
														...formData,
														name: e.target.value,
													})
												}
												className="block w-full max-w-lg rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											/>
										</div>
									</div>
								</div>

								<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
									>
										Email Address
									</label>
									<div className="mt-1 sm:col-span-2 sm:mt-0">
										<div className="flex max-w-lg rounded-md shadow-sm">
											<input
												type="email"
												name="email"
												id="email"
												autoComplete="email"
												value={formData.email}
												onChange={(e) =>
													setFormData({
														...formData,
														email: e.target.value,
													})
												}
												className="block w-full max-w-lg rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											/>
										</div>
										<p className="mt-0.5 ml-0.5 text-xs text-gray-400">
											Your email will be validated on your next login attempt.
										</p>
									</div>
								</div>

								<div className="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
									<label
										htmlFor="photo"
										className="block text-sm font-medium text-gray-700"
									>
										Photo
									</label>
									<div className="mt-1 sm:col-span-2 sm:mt-0">
										<div className="flex items-center">
											<span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
												<svg
													className="h-full w-full text-gray-300"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
												</svg>
											</span>
											<button
												type="button"
												className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											>
												Change
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-6 divide-y divide-gray-200 pt-8 sm:space-y-5 sm:pt-10">
							<div>
								<h3 className="text-lg font-medium leading-6 text-gray-900">
									Notifications
								</h3>
								<p className="mt-1 max-w-2xl text-sm text-gray-500">
									We&lsquo;ll always let you know about important changes, but
									you pick what else you want to hear about.
								</p>
							</div>
							{/* <div className="space-y-6 sm:space-y-5 divide-y divide-gray-200">
							<div className="pt-6 sm:pt-5">
								<div role="group" aria-labelledby="label-email">
									<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
										<div>
											<div className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700" id="label-email">
												By Email
											</div>
										</div>
										<div className="mt-4 sm:mt-0 sm:col-span-2">
											<div className="max-w-lg space-y-4">
												<div className="relative flex items-start">
													<div className="flex items-center h-5">
														<input
															id="comments"
															name="comments"
															type="checkbox"
															onChange={(e) => setFormData({...formData, notifications: e.target.value})}
															className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
														/>
													</div>
													<div className="ml-3 text-sm">
														<label htmlFor="comments" className="font-medium text-gray-700">
															Comments
														</label>
														<p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
													</div>
												</div>
												<div>
													<div className="relative flex items-start">
														<div className="flex items-center h-5">
															<input
																id="candidates"
																name="candidates"
																type="checkbox"
																className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
															/>
														</div>
														<div className="ml-3 text-sm">
															<label htmlFor="candidates" className="font-medium text-gray-700">
																Candidates
															</label>
															<p className="text-gray-500">Get notified when a candidate applies for a job.</p>
														</div>
													</div>
												</div>
												<div>
													<div className="relative flex items-start">
														<div className="flex items-center h-5">
															<input
																id="offers"
																name="offers"
																type="checkbox"
																className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
															/>
														</div>
														<div className="ml-3 text-sm">
															<label htmlFor="offers" className="font-medium text-gray-700">
																Offers
															</label>
															<p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="pt-6 sm:pt-5">
								<div role="group" aria-labelledby="label-notifications">
									<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
										<div>
											<div
												className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
												id="label-notifications"
											>
												Push Notifications
											</div>
										</div>
										<div className="sm:col-span-2">
											<div className="max-w-lg">
												<p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
												<div className="mt-4 space-y-4">
													<div className="flex items-center">
														<input
															id="push-everything"
															name="push-notifications"
															type="radio"
															className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
														/>
														<label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
															Everything
														</label>
													</div>
													<div className="flex items-center">
														<input
															id="push-email"
															name="push-notifications"
															type="radio"
															className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
														/>
														<label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
															Same as email
														</label>
													</div>
													<div className="flex items-center">
														<input
															id="push-nothing"
															name="push-notifications"
															type="radio"
															className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
														/>
														<label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
															No push notifications
														</label>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> */}
						</div>
					</div>

					<div className="pt-5">
						<div className="flex justify-end">
							<button
								type="button"
								className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Save
							</button>
						</div>
					</div>
				</form>
			</Authenticated>
		)
	}
}
