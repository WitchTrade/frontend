import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import CustomHeader from '../../components/core/CustomHeader';
import LoginNav from '../../components/navs/LoginNav';
import CheckboxInput from '../../components/styles/CheckboxInput';
import NavbarLink from '../../components/styles/NavbarLink';
import TextInput from '../../components/styles/TextInput';
import LoginHandler from '../../shared/handlers/login.handler';
import { Theme } from '../../shared/models/theme.model';
import themeService from '../../shared/services/theme.service';

const Login: NextPage = () => {
  const [theme, setTheme] = useState<Theme>();

  const {
    username,
    setUsername,
    password,
    setPassword,
    stayLoggedIn,
    setStayLoggedIn,
    login
  } = LoginHandler();

  useEffect(() => {
    const themeSub = themeService.currentTheme$.subscribe(setTheme);

    return (() => {
      themeSub.unsubscribe();
    });
  }, []);

  const checkKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className="flex flex-col justify-center max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
      <CustomHeader
        title="WitchTrade | Login"
        description="A Witch It trading website."
        url="https://witchtrade.org"
        image="https://imgur.com/WmcszU3.png"
      />
      <LoginNav />
      <div className="m-2 mt-4">
        <TextInput type="text" placeholder="Username" value={username} setValue={setUsername} svgPath={`/assets/svgs/userbadge/${theme?.type === 'light' ? 'black' : 'white'}.svg`} handleKeyPress={checkKeyPress} />
      </div>
      <div className="m-2">
        <TextInput type="password" placeholder="Password" value={password} setValue={setPassword} svgPath={`/assets/svgs/password/${theme?.type === 'light' ? 'black' : 'white'}.svg`} handleKeyPress={checkKeyPress} />
      </div>
      <div className="mb-4">
        <CheckboxInput placeholder="Keep me logged in on this device" value={stayLoggedIn} setValue={setStayLoggedIn} />
      </div>
      <div className="text-center mb-4">
        <NavbarLink type="action" onClick={login}>Login</NavbarLink>
      </div>
    </div>
  );
};

export default Login;
