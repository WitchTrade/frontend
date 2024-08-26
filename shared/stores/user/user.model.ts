import { Badge } from './badge.model'
import { Role } from './role.model'

export interface User {
  id: string
  loggedIn: boolean
  username: string
  created: Date
  email: string
  lastOnline: Date
  displayName: string
  steamProfileLink: string
  epicAccountId: string
  witchItUserId: string
  discordTag: string
  verified: boolean
  hidden: boolean
  banned: boolean
  banMessage: string
  roles: Role[]
  badges: Badge[]
}

export interface DecodedToken {
  id: string
  username: string
  iat: number
  exp: number
}

export function createUser(params: Partial<User>) {
  return {
    id: params.id ? params.id : null,
    loggedIn:
      params.loggedIn || params.loggedIn === false ? params.loggedIn : null,
    username: params.username ? params.username : null,
    created: params.created ? params.created : null,
    email: params.email ? params.email : null,
    lastOnline: params.lastOnline ? params.lastOnline : null,
    displayName: params.displayName ? params.displayName : null,
    steamProfileLink: params.steamProfileLink ? params.steamProfileLink : null,
    epicAccountId: params.epicAccountId ? params.epicAccountId : null,
    witchItUserId: params.witchItUserId ? params.witchItUserId : null,
    discordTag: params.discordTag ? params.discordTag : null,
    verified:
      params.verified || params.verified === false ? params.verified : null,
    hidden: params.hidden || params.hidden === false ? params.hidden : null,
    banned: params.banned || params.banned === false ? params.banned : null,
    banMessage: params.banMessage ? params.banMessage : null,
    roles: params.roles ? params.roles : [],
    badges: params.badges ? params.badges : [],
  } as User
}

export interface UserInfo {
  username: string
  created: Date
  lastOnline: Date
  displayName: string
  steamProfileLink: string
  epicAccountId: string
  // witchItUserId: string
  discordTag: string
  verified: boolean
  hidden: boolean
  badges: Badge[]
  roles: Role[]
}

export function createUserInfo(userInfo: Partial<UserInfo>): UserInfo {
  return {
    username: userInfo.username ? userInfo.username : '',
    created: userInfo.created ? userInfo.created : null,
    lastOnline: userInfo.lastOnline ? userInfo.lastOnline : null,
    displayName: userInfo.displayName ? userInfo.displayName : '',
    steamProfileLink: userInfo.steamProfileLink
      ? userInfo.steamProfileLink
      : '',
    epicAccountId: userInfo.epicAccountId ? userInfo.epicAccountId : '',
    // witchItUserId: userInfo.witchItUserId,
    discordTag: userInfo.discordTag ? userInfo.discordTag : '',
    hidden: userInfo.hidden ? userInfo.hidden : false,
    verified: userInfo.verified ? userInfo.verified : false,
    badges: userInfo.badges ? userInfo.badges : [],
    roles: userInfo.roles ? userInfo.roles : [],
  } as UserInfo
}

export interface RegisterUser {
  username: string
  displayName: string
  password: string
  email: string
}
