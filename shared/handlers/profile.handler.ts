import { useState } from 'react'
import { createNotification } from '../stores/notification/notification.model'
import { notificationService } from '../stores/notification/notification.service'
import { MARKET_TYPE } from './market.handler'

const ProfileHandler = () => {
  const [type, setType] = useState(MARKET_TYPE.OFFER)

  const copyDiscordTag = (discordTag: string) => {
    navigator.clipboard.writeText(discordTag)
    const notification = createNotification({
      content: 'Discord Username copied to clipboard',
      duration: 5000,
      type: 'success',
    })
    notificationService.addNotification(notification)
  }

  const copyWitchItUserId = (witchItUserId: string) => {
    navigator.clipboard.writeText(witchItUserId)
    const notification = createNotification({
      content: 'Witch It Id copied to clipboard',
      duration: 5000,
      type: 'success',
    })
    notificationService.addNotification(notification)
  }

  return {
    copyDiscordTag,
    copyWitchItUserId,
    type,
    setType,
  }
}

export default ProfileHandler
