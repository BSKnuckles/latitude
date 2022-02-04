import { getCsrfToken, signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import ErrorBanner from '../../components/error-banner'
import Link from 'next/link'

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}

export default function Login({ csrfToken }) {
	const [error, setError] = useState()
	const router = useRouter()

	const handleMagicLink = async (event) => {
		event.preventDefault()
		const { error, status } = await signIn('email', {
      redirect: false,
      callbackUrl: `${process.env.NEXTAUTH_URL}/dashboard`,
      email: event.target[0].value,
    })
		if (error) setError(error)
		else router.push('/auth/confirmation')
	}
	const handleCredentials = async event => {
    event.preventDefault()
    const { error, status } = await signIn('credentials', {
      redirect: false,
      callbackUrl: `${process.env.NEXTAUTH_URL}/dashboard`,
      email: event.target[0].value,
      password: event.target[1].value
    })
    if (error) setError(error)
    else router.push('/dashboard')
  }

  return (
    <>
      <div className='min-h-full flex'>
        <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full max-w-sm lg:w-96'>
            <div>
              <img
                className='h-12 w-auto mx-auto'
                src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                alt='Workflow'
              />
              <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
            </div>

            {error && (
              <div className='mt-8'>
                <ErrorBanner title='Authentication Failed' message={error} />
              </div>
            )}

            <div className='mt-6'>
              <div>
                <div>
                  <p className='text-sm font-medium text-gray-700'>Sign in with</p>

                  <div className='mt-1 grid grid-cols-3 gap-3'>
                    <div>
                      <button
                        onClick={() => signIn("google")}
                        className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                        <span className='sr-only'>Sign in with Google</span>
                        <svg
                          aria-hidden='true'
                          focusable='false'
                          data-prefix='fab'
                          data-icon='google'
                          className='svg-inline--fa fa-google fa-w-16 h-5 w-5'
                          role='img'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 488 512'>
                          <path
                            fill='currentColor'
                            d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'></path>
                        </svg>
                      </button>
                    </div>

                    <div>
                      <a
                        href='#'
                        className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                        <span className='sr-only'>Sign in with LinkedIn</span>
                        <svg
                          aria-hidden='true'
                          focusable='false'
                          data-prefix='fab'
                          data-icon='linkedin-in'
                          className='svg-inline--fa fa-linkedin-in fa-w-14 h-5 w-5'
                          role='img'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 448 512'>
                          <path
                            fill='currentColor'
                            d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z'></path>
                        </svg>
                      </a>
                    </div>

                    <div>
                      <a
                        href='#'
                        className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                        <span className='sr-only'>Sign in with Zoom</span>
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' className='w-5 h-5 text-gray-500'>
                          <path d='M33.619,4H16.381C9.554,4,4,9.554,4,16.381v17.238C4,40.446,9.554,46,16.381,46h17.238C40.446,46,46,40.446,46,33.619	V16.381C46,9.554,40.446,4,33.619,4z M30,30.386C30,31.278,29.278,32,28.386,32H15.005C12.793,32,11,30.207,11,27.995v-9.382	C11,17.722,11.722,17,12.614,17h13.382C28.207,17,30,18.793,30,21.005V30.386z M39,30.196c0,0.785-0.864,1.264-1.53,0.848l-5-3.125	C32.178,27.736,32,27.416,32,27.071v-5.141c0-0.345,0.178-0.665,0.47-0.848l5-3.125C38.136,17.54,39,18.019,39,18.804V30.196z' />
                        </svg>
                      </a>
                    </div>
                  </div>
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
            </div>

            <div className='mt-6'>
              <div>
                <div>
                  <form onSubmit={handleMagicLink} id='magic-link-form' className='space-y-6'>
                    <div>
                      <label htmlFor='email-link' className='block text-sm font-medium text-gray-700'>
                        Email address
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
                        Send Magic Link to Your Inbox
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
                    {/* <div className='flex items-center'>
                      <input
                        id='remember-me'
                        name='remember-me'
                        type='checkbox'
                        className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                      />
                      <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                        Remember me
                      </label>
                    </div> */}

                    <div className='text-sm'>
                      <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
                        Forgot your password?
                      </a>
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
