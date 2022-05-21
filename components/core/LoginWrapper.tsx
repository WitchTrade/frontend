import { FunctionComponent, ReactNode } from 'react';
import Image from 'next/image';
import { useObservable } from '@ngneat/react-rxjs';
import { userStore } from '../../shared/stores/user/user.store';

interface Props {
  children: ReactNode
  admin?: boolean;
}

const LoginWrapper: FunctionComponent<Props> = ({ admin, children }) => {
  const [user] = useObservable(userStore);

  return (
    <>
      {(user.loggedIn === undefined || user.loggedIn === null || user.loggedIn) && (!admin || user.roles?.length > 0) &&
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
