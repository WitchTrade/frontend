import { Query } from '@datorama/akita';
import { User } from './user.model';
import { UserStore, userStore } from './user.store';

export class UserQuery extends Query<User> {

  constructor(protected store: UserStore) {
    super(store);
  }

  public loggedIn(): boolean {
    return this.getValue().loggedIn;
  }

}

export const userQuery = new UserQuery(userStore);
