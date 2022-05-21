import { Badge } from '../user/badge.model'
import { Role } from '../user/role.model'

export interface AdminUser {
  id: string
  username: string
  displayName: string
  verified: boolean
  banned: boolean
  banMessage: string
  roles: Role[]
  badges: Badge[]
  created: Date
  lastOnline: Date
}

export interface AdminLog {
  id: string
  timestamp: Date
  actionGroup: number
  actionType: number
  log: string
  username: string
  targetUsername: string
}

export interface BroadcastNotification {
  text: string
  iconLink: string
  link: string
}

export enum ACTIONGROUP {
  BAN = 'BAN',
  ROLES = 'ROLES',
  BADGES = 'BADGES',
  VERIFY = 'VERIFY',
}

export enum ACTIONTYPE {
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
