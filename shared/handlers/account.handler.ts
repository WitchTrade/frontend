import { useObservable } from '@ngneat/react-rxjs'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { createNotification } from '../stores/notification/notification.model'
import { notificationService } from '../stores/notification/notification.service'
import {
  steamTradeLinkRegex,
  steamProfileLinkRegex,
} from '../stores/user/user.model'
import { userService } from '../stores/user/user.service'
import { userStore } from '../stores/user/user.store'

const AccountSettingsHandler = () => {
  const router = useRouter()

  const [user] = useObservable(userStore)

  const [editing, setEditing] = useState(false)

  const [formValue, setFormValue] = useState({
    displayName: '',
    email: '',
    steamProfileLink: '',
    steamTradeLink: '',
    usingSteamGuard: false,
    discordTag: '',
    hidden: false,
  })

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newRepeatPassword, setNewRepeatPassword] = useState('')

  const [steamVerificationState, setSteamVerificationState] = useState('')

  useEffect(() => {
    if (router.query['openid.ns'] && steamVerificationState === '') {
      setSteamVerificationState('Verifing...')
      let queryString = '?'
      for (const queryParam in router.query) {
        queryString += queryParam
        queryString += '='
        queryString += encodeURIComponent(router.query[queryParam] as string)
        queryString += '&'
      }
      router.replace('/user/settings/account', undefined, { shallow: true })

      userService.verifySteamProfileUrl(queryString).subscribe(() => {
        setSteamVerificationState('')
      })
    }
  })

  const editAccountSettings = () => {
    setEditing(true)
    setFormValue({
      displayName: user.displayName,
      email: user.email,
      steamProfileLink: user.steamProfileLink ? user.steamProfileLink : '',
      steamTradeLink: user.steamTradeLink ? user.steamTradeLink : '',
      usingSteamGuard: user.usingSteamGuard ? user.usingSteamGuard : false,
      discordTag: user.discordTag ? user.discordTag : '',
      hidden: user.hidden ? user.hidden : false,
    })
  }

  const updateAccountSettings = () => {
    if (!formValue.displayName || !formValue.email) {
      const notification = createNotification({
        content: 'Please fill out every required field',
        duration: 5000,
        type: 'warning',
      })
      notificationService.addNotification(notification)
      return
    }

    if (formValue.displayName.length > 20) {
      const notification = createNotification({
        content: "Display name can't be longer than 20 characters",
        duration: 5000,
        type: 'warning',
      })
      notificationService.addNotification(notification)
      return
    }

    if (
      formValue.steamProfileLink.trim() &&
      !steamProfileLinkRegex.test(formValue.steamProfileLink)
    ) {
      const notification = createNotification({
        content: 'Invalid steam profile url',
        duration: 5000,
        type: 'warning',
      })
      notificationService.addNotification(notification)
      return
    }

    if (
      formValue.steamTradeLink.trim() &&
      !steamTradeLinkRegex.test(formValue.steamTradeLink)
    ) {
      const notification = createNotification({
        content: 'Invalid steam trade link',
        duration: 5000,
        type: 'warning',
      })
      notificationService.addNotification(notification)
      return
    }

    if (
      !formValue.steamProfileLink.trim() &&
      !formValue.steamTradeLink.trim()
    ) {
      const notification = createNotification({
        content: 'Please provide either a steam profile link or trade link.',
        duration: 5000,
        type: 'warning',
      })
      notificationService.addNotification(notification)
      return
    }

    userService
      .updateAccountSettings({
        displayName: formValue.displayName,
        email: formValue.email,
        steamProfileLink: formValue.steamProfileLink.trim()
          ? formValue.steamProfileLink
          : undefined,
        steamTradeLink: formValue.steamTradeLink.trim()
          ? formValue.steamTradeLink
          : undefined,
        usingSteamGuard: formValue.usingSteamGuard,
        discordTag: formValue.discordTag.trim()
          ? formValue.discordTag
          : undefined,
        hidden: formValue.hidden,
      })
      .subscribe((res) => {
        if (res.ok) {
          setEditing(false)
        }
      })
  }

  const cancelEditAccountSettings = () => {
    setEditing(false)
  }

  const changePassword = () => {
    if (!oldPassword) {
      const notification = createNotification({
        content: 'Please enter your old password',
        duration: 5000,
        type: 'warning',
      })
      notificationService.addNotification(notification)
      return
    }
    if (!newPassword) {
      const notification = createNotification({
        content: 'Please enter your new password',
        duration: 5000,
        type: 'warning',
      })
      notificationService.addNotification(notification)
      return
    }
    if (newPassword !== newRepeatPassword) {
      const notification = createNotification({
        content: 'New passwords do not match',
        duration: 5000,
        type: 'warning',
      })
      notificationService.addNotification(notification)
      return
    }
    userService.changePassword(oldPassword, newPassword).subscribe((res) => {
      if (res.status === 200) {
        router.push('/user/settings/account')
      }
    })
  }

  const verifySteamProfileLink = () => {
    setSteamVerificationState('Redirecting...')
    userService.getSteamLoginUrl().subscribe(async (res) => {
      if (res.status === 200) {
        const text = await res.text()
        router.push(text)
      }
    })
  }

  return {
    user,
    formValue,
    setFormValue,
    editing,
    editAccountSettings,
    updateAccountSettings,
    cancelEditAccountSettings,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    newRepeatPassword,
    setNewRepeatPassword,
    changePassword,
    verifySteamProfileLink,
    steamVerificationState,
  }
}

export default AccountSettingsHandler
