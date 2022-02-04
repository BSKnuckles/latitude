import { getCsrfToken, signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import ErrorBanner from '../../components/notifications/error-banner'
import Link from 'next/link'

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}

export default function Register({ csrfToken }) {
  const [error, setError] = useState()
  const router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault()
    const name = event.target[0].value
    const email = event.target[1].value
    const password = event.target[2].value
    const confirm = event.target[3].value

    if (password === confirm) {
      const { error, message } = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      }).then(res => res.json())
      if (error) setError(error)
      if (message === 'Successfully created user account!') router.push('/auth/login?confirmation=SuccessfulAccountCreation')
    } else {
      setError('Passwords must match!')
    }
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
              <h2 className='mt-6 text-3xl font-extrabold text-center text-gray-900'>Create Your Account</h2>
            </div>

            {error && (
              <div className='mt-8'>
                <ErrorBanner title='Registration Failed' message={error} />
              </div>
            )}

            <div className='mt-6'>
              <form onSubmit={handleSubmit} id='credentials-form' className='space-y-6'>
                <div>
                  <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                    Name
                  </label>
                  <div className='mt-1'>
                    <input
                      id='name'
                      name='name'
                      type='text'
                      autoComplete='name'
                      required
                      className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

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

                <div className='space-y-2'>
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

                  <div className='space-y-1'>
                    <label htmlFor='confirm-password' className='block text-sm font-medium text-gray-700'>
                      Confirm Password
                    </label>
                    <div className='mt-1'>
                      <input
                        id='confirm-password'
                        name='confirm-password'
                        type='password'
                        autoComplete='current-password'
                        required
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    Sign Up
                  </button>
                </div>

                <div className='flex items-center justify-center'>
                  <div className='text-sm'>
                    <Link href='/auth/login'>
                      <a className='font-medium text-indigo-600 hover:text-indigo-500 hover:underline'>
                        Already Have An Account? Log In Here!
                      </a>
                    </Link>
                  </div>
                </div>
              </form>
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
