import { useObservable } from '@ngneat/react-rxjs'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { createNotification } from '../stores/notification/notification.model'
import { notificationService } from '../stores/notification/notification.service'
import { userService } from '../stores/user/user.service'
import { userStore } from '../stores/user/user.store'

const AccountSettingsHandler = () => {
  const router = useRouter()

  const [user] = useObservable(userStore)

  const [editing, setEditing] = useState(false)

  const [formValue, setFormValue] = useState({
    displayName: '',
    email: '',
    discordTag: '',
    hidden: false,
  })

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newRepeatPassword, setNewRepeatPassword] = useState('')

  const [steamVerificationState, setSteamVerificationState] = useState('')
  const [epicVerificationState, setEpicVerificationState] = useState('')

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

      userService.setSteamProfileUrl(queryString).subscribe(() => {
        setSteamVerificationState('')
      })
    } else if (router.query['code'] && steamVerificationState === '') {
      setEpicVerificationState('Verifing...')
      router.replace('/user/settings/account', undefined, { shallow: true })
      userService
        .setEpicAccountId(`?code=${router.query.code}`)
        .subscribe(() => {
          setEpicVerificationState('')
        })
    }
  }, [router.query])

  const editAccountSettings = () => {
    setEditing(true)
    setFormValue({
      displayName: user.displayName,
      email: user.email,
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

    userService
      .updateAccountSettings({
        displayName: formValue.displayName,
        email: formValue.email,
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

  const verifyEpicAccountId = () => {
    setEpicVerificationState('Redirecting...')
    userService.getEpicLoginUrl().subscribe(async (res) => {
      if (res.status === 200) {
        const text = await res.text()
        router.push(text)
      }
    })
  }

  const removeSteamProfileLink = () => {
    userService.removeSteamProfileLink().subscribe()
  }

  const removeEpicAccountId = () => {
    userService.removeEpicAccountId().subscribe()
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
    verifyEpicAccountId,
    removeSteamProfileLink,
    removeEpicAccountId,
    steamVerificationState,
    epicVerificationState,
  }
}

export default AccountSettingsHandler
