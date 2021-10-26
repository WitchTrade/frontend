import { useEffect, useState } from 'react';
import { createUser, User } from '../stores/user/user.model';
import { userQuery } from '../stores/user/user.query';

const useUserProvider = () => {
  const [user, setUser] = useState<User>(createUser({}));

  useEffect(() => {
    const userSub = userQuery.select().subscribe(setUser);

    return (() => {
      userSub.unsubscribe();
    });
  }, []);

  return { user };
};

export default useUserProvider;
