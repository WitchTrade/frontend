import { useObservable } from '@ngneat/react-rxjs'
import CustomHeader from '../components/core/CustomHeader'
import LoginNav from '../components/navs/LoginNav'
import CheckboxInput from '../components/styles/CheckboxInput'
import NavbarLink from '../components/styles/NavbarLink'
import PageHeader from '../components/styles/PageHeader'
import TextInput from '../components/styles/TextInput'
import LoginHandler from '../shared/handlers/login.handler'
import { themeStore } from '../shared/stores/theme/theme.store'
import type { NextPage } from 'next'

const Login: NextPage = () => {
  const [theme] = useObservable(themeStore)

  const {
    username,
    setUsername,
    password,
    setPassword,
    stayLoggedIn,
    setStayLoggedIn,
    login,
  } = LoginHandler()

  const checkKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      login()
    }
  }

  return (
    <div className='flex flex-col justify-center px-4 mx-auto max-w-lg sm:px-6 lg:px-8'>
      <CustomHeader
        title='WitchTrade | Login'
        description='Log in to WitchTrade.'
        url='https://witchtrade.org/login'
      />
      <LoginNav />
      <PageHeader
        title='Login'
        description='Log in to WitchTrade. Happy trading :)'
      />
      <form>
        <div className='m-1 mt-4'>
          <TextInput
            type='text'
            placeholder='Username'
            value={username}
            setValue={setUsername}
            required={true}
            svgPath={`/assets/svgs/userbadge/${
              theme?.type === 'light' ? 'black' : 'white'
            }.svg`}
            handleKeyPress={checkKeyPress}
            autocompleteValue='username'
          />
        </div>
        <div className='m-1'>
          <TextInput
            type='password'
            placeholder='Password'
            value={password}
            setValue={setPassword}
            required={true}
            svgPath={`/assets/svgs/password/${
              theme?.type === 'light' ? 'black' : 'white'
            }.svg`}
            handleKeyPress={checkKeyPress}
            autocompleteValue='current-password'
          />
        </div>
        <div className='mb-4'>
          <CheckboxInput
            placeholder='Keep me logged in on this device'
            value={stayLoggedIn}
            setValue={setStayLoggedIn}
          />
        </div>
        <div className='flex justify-center mb-4 text-center'>
          <NavbarLink type='info' onClick={login}>
            Login
          </NavbarLink>
        </div>
      </form>
    </div>
  )
}

export default Login
