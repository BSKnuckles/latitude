import { useState } from 'react'
import { getSession } from 'next-auth/react'
import Authenticated from '@/layouts/authenticated'
import ErrorBanner from '@/components/notifications/error-banner'
import SuccessBanner from '@/components/notifications/success-banner'

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context)
    }
  }
}

export default function Profile({ session }) {
	const profile = {
		name: session.user.name,
		email: session.user.email,
	}
	const [profileError, setProfileError] = useState("")
	const [profileSuccess, setProfileSuccess] = useState("")
	const [passwordError, setPasswordError] = useState("")
	const [passwordSuccess, setPasswordSuccess] = useState("")
	const [formData, setFormData] = useState({
		name: session.user.name,
		email: session.user.email,
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
		notifications: {
			email: {
				comments: false,
				projects: false,
				invoices: false
			}
		}
	})

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (profileError) setProfileError("")
		if (profileSuccess) setProfileSuccess("")
		if (passwordError) setPasswordError("")
		if (passwordSuccess) setPasswordSuccess("")

		// Check if password change should be triggered
		const changePassword = (formData.currentPassword && formData.newPassword && formData.confirmPassword)
		if (changePassword) {
			// Compare new and confirm passwords
			if (!(formData.newPassword === formData.confirmPassword)) setPasswordError('New and Confirm Password fields must match')
			else setPasswordSuccess("Successfully updated password!")
		}

		// Check if profile change should be triggered
		const changeProfile = (formData.name !== profile.name || formData.email !== profile.email)
		if (changeProfile) {
			fetch('/api/profile', {
				method: "PUT",
				body: JSON.stringify({
					name: formData.name,
					email: formData.email
				})
			}).then(res => {
				if (res.status === 200) setProfileSuccess("Successfully updated profile!")
				else setProfileError("Failed to update profile")
			})
			
		}
	}

  return (
		<Authenticated title="User Profile">
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
					<div className='mt-6 sm:mt-5'>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>

					{profileError && 
						<div className='mt-6 sm:mt-5'>
							<ErrorBanner title="Profile Error" message={profileError} />
						</div>
					}

					{profileSuccess && 
						<div className='mt-6 sm:mt-5'>
							<SuccessBanner title="Success" message={profileSuccess} />
						</div>
					}

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
										value={formData.name}
										onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="max-w-lg block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Email Address
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
										value={formData.email}
										onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="max-w-lg block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <button
                    type="button"
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

				<div>
          <div className='mt-6 sm:mt-5'>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Change Password</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              If you previously signed in with passwordless login, leave the existing password field blank.
            </p>
          </div>

					{passwordError && 
						<div className='mt-6 sm:mt-5'>
							<ErrorBanner title="Password Error" message={passwordError} />
						</div>
					}

					{passwordSuccess && 
						<div className='mt-6 sm:mt-5'>
							<SuccessBanner title="Success" message={passwordSuccess} />
						</div>
					}

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Current Password
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="password"
                    name="current-password"
                    id="current-password"
                    autoComplete="current-password"
										value={formData.currentPassword}
										onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                    className="max-w-lg block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                New Password
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="password"
                    name="new-password"
                    id="new-password"
                    autoComplete="new-password"
										value={formData.newPassword}
										onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    className="max-w-lg block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Confirm Password
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    autoComplete="new-password"
										value={formData.confirmPassword}
										onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="max-w-lg block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

				{/* <div className="space-y-6 sm:space-y-5">
          <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Change Password</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              If you previously signed in with passwordless login, leave the existing password field blank.
            </p>
          </div>

					<ErrorBanner title="Password Error" message={passwordError} />

					<div className="">
						<div role="group" aria-labelledby="change-password">
							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:items-start sm:pt-5">
						<label htmlFor="existing-password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
							Existing Password
						</label>
						<div className="mt-1 sm:mt-0 sm:col-span-2">
							<div className="max-w-lg flex rounded-md shadow-sm">
								<input
									type="password"
									name="existing-password"
									id="existing-password"
									value={formData.existingPassword}
									onChange={(e) => setFormData({...formData, existingPassword: e.target.value})}
									autoComplete="existing-password"
									className="max-w-lg block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>

						<label htmlFor="new-password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
							New Password
						</label>
						<div className="mt-1 sm:mt-0 sm:col-span-2">
							<div className="max-w-lg flex rounded-md shadow-sm">
								<input
									type="password"
									name="new-password"
									id="new-password"
									value={formData.newPassword}
									onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
									autoComplete='new-password'
									className="max-w-lg block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>

						<label htmlFor="confirm-assword" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
							Confirm New Password
						</label>
						<div className="mt-1 sm:mt-0 sm:col-span-2">
							<div className="max-w-lg flex rounded-md shadow-sm">
								<input
									type="password"
									name="confirm-password"
									id="confirm-password"
									value={formData.confirmPassword}
									onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
									autoComplete='new-password'
									className="max-w-lg block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>
					</div>
						</div>
					</div>
        </div> */}

        <div className="divide-y divide-gray-200 pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              We'll always let you know about important changes, but you pick what else you want to hear about.
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
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
		</Authenticated>
  )
}