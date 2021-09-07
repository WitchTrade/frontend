export interface User {
    id: string;
    loggedIn: boolean;
    username: string;
    displayName: string;
    steamUrl: string;
    steamTradeLink: string;
    steamAuth: boolean;
    discordTag: string;
    token: string;
    email: string;
    hidden: boolean;
}

export interface DecodedToken {
    id: string;
    username: string;
    iat: number;
    exp: number;
}

export function createUser(params: Partial<User>) {
    return {
        id: params.id ? params.id : null,
        loggedIn: params.loggedIn || params.loggedIn === false ? params.loggedIn : null,
        username: params.username ? params.username : null,
        displayName: params.displayName ? params.displayName : null,
        steamUrl: params.steamUrl ? params.steamUrl : null,
        steamTradeLink: params.steamTradeLink ? params.steamTradeLink : null,
        steamAuth: params.steamAuth ? params.steamAuth : null,
        discordTag: params.discordTag ? params.discordTag : null,
        token: params.token ? params.token : null,
        email: params.email ? params.email : null,
        hidden: params.hidden ? params.hidden : null
    } as User;
}

export interface UserInfo {
    username: string;
    displayName: string;
    steamUrl: string;
    steamTradeLink: string;
    steamAuth: boolean;
    hidden: boolean;
    discordTag: string;
    badges: { id: string, description: string; }[];
}

export function createUserInfo(userInfo: Partial<UserInfo>): UserInfo {
    return {
        username: userInfo.username ? userInfo.username : '',
        displayName: userInfo.displayName ? userInfo.displayName : '',
        steamUrl: userInfo.steamUrl ? userInfo.steamUrl : '',
        steamTradeLink: userInfo.steamTradeLink ? userInfo.steamTradeLink : '',
        steamAuth: userInfo.steamAuth ? userInfo.steamAuth : false,
        discordTag: userInfo.discordTag ? userInfo.discordTag : '',
        badges: userInfo.badges ? userInfo.badges : '',
        hidden: userInfo.hidden ? userInfo.hidden : false,
    } as UserInfo;
}

export interface RegisterUser {
    username: string;
    displayName: string;
    password: string;
    email: string;
    steamUrl?: string;
    steamTradeLink?: string;
}

const steamUrlRegex = /^(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9\-._~]+\/?$/;
const steamTradeLinkRegex = /^(?:https?:\/\/)?steamcommunity\.com\/tradeoffer\/new\/[a-zA-Z0-9?=&-]+$/;
const discordTagRegex = /^.{3,32}#[0-9]{4}$/;

export { steamUrlRegex, steamTradeLinkRegex, discordTagRegex };