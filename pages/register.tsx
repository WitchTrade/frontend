import { useObservable } from '@ngneat/react-rxjs'
import Link from 'next/link'
import CustomHeader from '../components/core/CustomHeader'
import LoginNav from '../components/navs/LoginNav'
import NavbarLink from '../components/styles/NavbarLink'
import PageHeader from '../components/styles/PageHeader'
import TextInput from '../components/styles/TextInput'
import RegisterHandler from '../shared/handlers/register.handler'
import { themeStore } from '../shared/stores/theme/theme.store'
import type { NextPage } from 'next'

const Register: NextPage = () => {
  const [theme] = useObservable(themeStore)

  const {
    username,
    setUsername,
    displayName,
    setDisplayName,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    email,
    setEmail,
    acceptedLegal,
    setAcceptedLegal,
    acceptedRules,
    setAcceptedRules,
    register,
  } = RegisterHandler()

  return (
    <div className='flex flex-col justify-center px-4 mx-auto max-w-lg sm:px-6 lg:px-8'>
      <CustomHeader
        title='WitchTrade | Register'
        description='Register an account on WitchTrade and start creating offers!'
        url='https://witchtrade.org/register'
      />
      <LoginNav />
      <PageHeader
        title='Register'
        description='Register an account on WitchTrade and start creating offers!'
      />
      <form>
        <div className='m-1 mt-4'>
          <p className='text-sm text-center'>
            Username: <br />- <span className='text-wt-accent-light'>4-20</span>{' '}
            characters long
            <br />- only <span className='text-wt-accent-light'>a-z</span>,{' '}
            <span className='text-wt-accent-light'>0-9</span>,{' '}
            <span className='text-wt-accent-light'>_</span> and{' '}
            <span className='text-wt-accent-light'>.</span> allowed
          </p>
          <TextInput
            type='text'
            placeholder='Username'
            value={username}
            setValue={setUsername}
            required={true}
            svgPath={`/assets/svgs/userbadge/${
              theme?.type === 'light' ? 'black' : 'white'
            }.svg`}
            autocompleteValue='username'
          />
        </div>
        <div className='m-1 mt-4'>
          <p className='text-sm text-center'>
            Password: <br />- Must be at least{' '}
            <span className='text-wt-accent-light'>8</span> characters long
            <br />- Must at least contain{' '}
            <span className='text-wt-accent-light'>1</span> letter and{' '}
            <span className='text-wt-accent-light'>1</span> number
          </p>
          <TextInput
            type='password'
            placeholder='Password'
            value={password}
            setValue={setPassword}
            required={true}
            svgPath={`/assets/svgs/password/${
              theme?.type === 'light' ? 'black' : 'white'
            }.svg`}
            autocompleteValue='new-password'
          />
        </div>
        <div className='m-1'>
          <TextInput
            type='password'
            placeholder='Repeat Password'
            value={repeatPassword}
            required={true}
            setValue={setRepeatPassword}
            svgPath={`/assets/svgs/password/${
              theme?.type === 'light' ? 'black' : 'white'
            }.svg`}
            autocompleteValue='new-password'
          />
        </div>
        <div className='m-1 mt-4'>
          <TextInput
            type='text'
            placeholder='Display Name'
            value={displayName}
            required={true}
            setValue={setDisplayName}
            svgPath={`/assets/svgs/person/${
              theme?.type === 'light' ? 'black' : 'white'
            }.svg`}
          />
        </div>
        <div className='m-1'>
          <TextInput
            type='text'
            placeholder='Email'
            value={email}
            setValue={setEmail}
            required={true}
            svgPath={`/assets/svgs/email/${
              theme?.type === 'light' ? 'black' : 'white'
            }.svg`}
          />
        </div>
        <div className='my-6'>
          <div className='flex justify-center items-center h-10'>
            <input
              id='acceptedRulesCheckbox'
              className='mr-2 w-7 h-7 text-wt-accent-light bg-wt-accent-light focus:outline-none focus:ring-2 focus:ring-wt-accent'
              type='checkbox'
              checked={acceptedRules}
              onChange={() => setAcceptedRules(!acceptedRules)}
            />
            <label className='w-11/12' htmlFor='acceptedRulesCheckbox'>
              I accept WitchTrade&apos;s trading rules and will comply with
              them. (To learn more, please read our{' '}
              <Link href='/rules'>
                <a
                  className='text-wt-accent hover:underline cursor-pointer'
                  target='_blank'
                  rel='noreferrer'
                >
                  Trading Rules
                </a>
              </Link>
              )
            </label>
          </div>
        </div>
        <div className='my-6'>
          <div className='flex justify-center items-center h-10'>
            <input
              id='acceptedLegalCheckbox'
              className='mr-2 w-7 h-7 text-wt-accent-light bg-wt-accent-light focus:outline-none focus:ring-2 focus:ring-wt-accent'
              type='checkbox'
              checked={acceptedLegal}
              onChange={() => setAcceptedLegal(!acceptedLegal)}
            />
            <label className='w-11/12' htmlFor='acceptedLegalCheckbox'>
              I accept how we collect, use, and share your data. (To learn more,
              please read our{' '}
              <Link href='/privacy'>
                <a
                  className='text-wt-accent hover:underline cursor-pointer'
                  target='_blank'
                  rel='noreferrer'
                >
                  Privacy Policy
                </a>
              </Link>
              )
            </label>
          </div>
        </div>
        <div className='flex justify-center mb-4 text-center'>
          <NavbarLink type='info' onClick={register}>
            Register
          </NavbarLink>
        </div>
      </form>
    </div>
  )
}

export default Register
