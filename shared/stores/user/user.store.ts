import { Store, createState, withProps } from '@ngneat/elf'
import { createUser, User } from './user.model'

const { state, config } = createState(withProps<User>(createUser({})))

export const userStore = new Store({ name: 'user', state, config })
