import { getCsrfToken, signIn, useSession, getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ErrorBanner from '../../components/notifications/error-banner'
import SuccessBanner from '../../components/notifications/success-banner'
import Link from 'next/link'

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      session: await getSession(context)
    }
  }
}

export default function Login({ csrfToken }) {
	const { data: session, status } = useSession()
  const [error, setError] = useState()
	const [callback, setCallback] = useState(`${process.env.NEXT_PUBLIC_URL}/dashboard`)
	const [confirmation, setConfirmation] = useState()
  const router = useRouter()
  const { query } = useRouter()

  useEffect(() => {
		if (session) router.push('/dashboard')
    if (query && query?.error) {
      switch (query.error) {
        case 'Verification':
          setError('The verification token has expired. Please sign in again.')
          break
        case 'Configuration':
          setError('There is a problem with the server configuration. Please contact support for assistance.')
          break
        case 'AccessDenied':
          setError('You are not authorized to access Latitude. Please contact support if you believe this is an error.')
          break
        case 'EmailCreateAccount':
          setError('Failed to create new account. Please contact support for assistance.')
          break
        case 'EmailSignin':
          setError('Failed to send your passwordless link. Please check your email and try again.')
          break
        case 'CredentialsSignin':
          setError('Your credentials did not match our records.')
          break
        case 'SessionRequired':
          setError('You must be signing in to view this page.')
          break
				case 'NoUserFound':
					setError('No user found with these credentials.')
					break
				case 'Passwordless':
					setError('You previously signed in with magic links. Please sign in with a magic link then set a password.')
					break
        default:
          setError('An unknown error occurred. Please sign in again.')
          break
      }
    }
		if (query && query?.callbackUrl) {
			setCallback(query.callbackUrl)
		}
		if (query && query?.confirmation) {
			switch (query.confirmation) {
				case "SuccessfulAccountCreation":
					setConfirmation('Successfully created your account! Please sign in.')
					break
			}
		}
  }, [query, router, session])

  const handleMagicLink = async event => {
    event.preventDefault()
    const response = await signIn('email', {
      email: event.target[0].value,
      csrfToken: csrfToken,
      callbackUrl: callback,
    })
		if (response?.error) setError(error)
  }
  const handleCredentials = async event => {
    event.preventDefault()
    const response = await signIn('credentials', {
      csrfToken: csrfToken,
      callbackUrl: callback,
      email: event.target[0].value,
      password: event.target[1].value
    })
		// if (!response?.error) router.push(callback)
  }

  return (
    <>
      <div className='min-h-full flex'>
        <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full max-w-sm lg:w-96'>
            <div className='mb-2'>
              <Link href='/'>
                <a>
                  <img
                    className='h-12 w-auto mx-auto'
                    src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                    alt='Workflow'
                  />
                </a>
              </Link>
              <h2 className='mt-6 text-3xl font-extrabold text-center text-gray-900'>Sign in to your account</h2>
            </div>

            {error && (
              <div className='mt-6'>
                <ErrorBanner title='Authentication Failed' message={error} />
              </div>
            )}

						{confirmation && (
							<div className='mt-6'>
								<SuccessBanner title='Success' message={confirmation} />
							</div>
						)}

            <div className='mt-6'>
              <div>
                <div>
                  <form onSubmit={handleMagicLink} id='magic-link-form' className='space-y-6'>
                    <div>
                      <label htmlFor='email-link' className='block text-sm font-medium text-gray-700'>
                        Email Address
                      </label>
                      <div className='mt-1'>
                        <input
                          id='email-link'
                          name='email-link'
                          type='email'
                          autoComplete='email'
                          required
                          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type='submit'
                        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        Send Passwordless Login Link to Your Inbox
                      </button>
                    </div>
                  </form>
                </div>

                <div className='mt-6 relative'>
                  <div className='absolute inset-0 flex items-center' aria-hidden='true'>
                    <div className='w-full border-t border-gray-300' />
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='px-2 bg-white text-gray-500'>Or continue with</span>
                  </div>
                </div>
              </div>

              <div className='mt-6'>
                <form onSubmit={handleCredentials} id='credentials-form' className='space-y-6'>
                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                      Email address
                    </label>
                    <div className='mt-1'>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        required
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                      Password
                    </label>
                    <div className='mt-1'>
                      <input
                        id='password'
                        name='password'
                        type='password'
                        autoComplete='current-password'
                        required
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type='submit'
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                      Sign in
                    </button>
                  </div>

                  <div className='flex items-center justify-center'>
                    <div className='text-sm'>
                      <Link href='/auth/register'>
                        <a className='font-medium text-indigo-600 hover:text-indigo-500 hover:underline'>
                          No Account? Sign Up Here
                        </a>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden lg:block relative w-0 flex-1'>
          <img
            className='absolute inset-0 h-full w-full object-cover'
            src='https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
            alt=''
          />
        </div>
      </div>
    </>
  )
}
