import { Store, StoreConfig } from '@datorama/akita';
import { createUser, User } from './user.model';

@StoreConfig({
  name: 'user',
  resettable: true
})
export class UserStore extends Store<User> {

  constructor() {
    super({});
  }

}

export const userStore = new UserStore();
