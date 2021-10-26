import { FunctionComponent } from 'react';
import Image from 'next/image';
import useUserProvider from '../../shared/providers/user.provider';

const LoginWrapper: FunctionComponent = ({ children }) => {
  const { user } = useUserProvider();

  return (
    <>
      {!user || user.loggedIn === undefined || user.loggedIn === null || user.loggedIn &&
        <>
          {children}
        </>
        ||
        <div className="flex flex-col text-center">
          <p className="text-center pt-2 text-xl text-wt-warning-light">Please log in to access this page</p>
          <div>
            <Image src="/assets/images/chicken.png" height="75" width="75" alt="No access chicken" />
          </div>
        </div>
      }
    </>
  );
};

export default LoginWrapper;
