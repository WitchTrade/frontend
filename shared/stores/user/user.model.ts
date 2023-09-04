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
  verifiedSteamProfileLink: boolean
  steamTradeLink: string
  discordTag: string
  usingSteamGuard: boolean
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
    verifiedSteamProfileLink:
      params.verifiedSteamProfileLink ||
      params.verifiedSteamProfileLink === false
        ? params.verifiedSteamProfileLink
        : null,
    steamTradeLink: params.steamTradeLink ? params.steamTradeLink : null,
    discordTag: params.discordTag ? params.discordTag : null,
    usingSteamGuard:
      params.usingSteamGuard || params.usingSteamGuard === false
        ? params.usingSteamGuard
        : null,
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
  verifiedSteamProfileLink: string
  steamTradeLink: string
  discordTag: string
  usingSteamGuard: boolean
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
    verifiedSteamProfileLink: userInfo.verifiedSteamProfileLink
      ? userInfo.verifiedSteamProfileLink
      : false,
    steamTradeLink: userInfo.steamTradeLink ? userInfo.steamTradeLink : '',
    discordTag: userInfo.discordTag ? userInfo.discordTag : '',
    usingSteamGuard: userInfo.usingSteamGuard
      ? userInfo.usingSteamGuard
      : false,
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
  steamProfileLink?: string
  steamTradeLink?: string
}

const steamProfileLinkRegex =
  /^(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9\-._~]+\/?$/
const steamTradeLinkRegex =
  /^(?:https?:\/\/)?steamcommunity\.com\/tradeoffer\/new\/?\?partner=[0-9]+&token=[a-zA-Z0-9_-]+$/

export { steamProfileLinkRegex, steamTradeLinkRegex }
