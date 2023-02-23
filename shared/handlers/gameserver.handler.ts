import { useEffect, useState } from 'react'
import { Gameserver } from '../models/gameserver.model'
import { createNotification } from '../stores/notification/notification.model'
import { notificationService } from '../stores/notification/notification.service'
import { userService } from '../stores/user/user.service'

const useGameserverHandler = () => {
  const [euServers, setEuServers] = useState<Gameserver[]>([])
  const [hkServers, setHkServers] = useState<Gameserver[]>([])
  const [usServers, setUsServers] = useState<Gameserver[]>([])

  const [loading, setLoading] = useState<boolean>(true)
  const [steamSyncLoading, setSteamSyncLoading] = useState(false)

  const [watchlist, setWatchlist] = useState<string[]>([])
  const [ownPlayer, setOwnPlayer] = useState<string>('')

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogName, setDialogName] = useState('')

  useEffect(() => {
    getGameServers()

    const watchlist = localStorage.getItem('gameserver-watchlist')
    if (watchlist) {
      setWatchlist(JSON.parse(watchlist))
    }

    const ownPlayer = localStorage.getItem('gameserver-ownplayer')
    if (ownPlayer) {
      setOwnPlayer(ownPlayer)
    }
  }, [])

  const getGameServers = async () => {
    setLoading(true)

    const gameServersFormServer = await fetchGameServers()

    setLoading(false)

    setEuServers(
      gameServersFormServer.filter((server) => server.name.startsWith('Europe'))
    )
    setHkServers(
      gameServersFormServer.filter((server) => server.name.startsWith('Asia'))
    )
    setUsServers(
      gameServersFormServer.filter((server) =>
        server.name.startsWith('America')
      )
    )
  }

  const fetchGameServers = async (): Promise<Gameserver[]> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/gameservers`
    )
    const data = await res.json()
    return data
  }

  const syncSteamFriends = () => {
    setSteamSyncLoading(true)
    userService.getSteamFriends().subscribe(async (res) => {
      setSteamSyncLoading(false)
      const jsonRes = await res.json()
      const friends = jsonRes.friends
      const ownPlayer = jsonRes.ownPlayer
      if (!res.ok) {
        const notification = createNotification({
          content: jsonRes.message,
          duration: 5000,
          type: 'error',
        })
        notificationService.addNotification(notification)
        return
      }
      const combinedFriends = watchlist.concat(
        friends.filter((friend: string) => watchlist.indexOf(friend) < 0)
      )
      localStorage.setItem(
        'gameserver-watchlist',
        JSON.stringify(combinedFriends)
      )
      setWatchlist(combinedFriends)
      localStorage.setItem('gameserver-ownplayer', ownPlayer)
      setOwnPlayer(ownPlayer)
      const notification = createNotification({
        content: 'Steam friends added!',
        duration: 5000,
        type: 'success',
      })
      notificationService.addNotification(notification)
    })
  }

  const clearWatchlist = () => {
    localStorage.removeItem('gameserver-watchlist')
    localStorage.removeItem('gameserver-ownplayer')
    setWatchlist([])
    setOwnPlayer('')
  }

  const addPlayer = (playerName: string) => {
    if (watchlist.some((player) => player === playerName)) {
      const notification = createNotification({
        content: 'Player is already in the watchlist',
        duration: 5000,
        type: 'warning',
      })
      notificationService.addNotification(notification)
      return
    }
    const newWatchlist = [...watchlist, playerName]
    localStorage.setItem('gameserver-watchlist', JSON.stringify(newWatchlist))
    setWatchlist(newWatchlist)
    if (dialogOpen) {
      setDialogOpen(false)
      setDialogName('')
    }
  }

  const removePlayer = (playerName: string) => {
    const newWatchlist = watchlist.filter((player) => player !== playerName)
    localStorage.setItem('gameserver-watchlist', JSON.stringify(newWatchlist))
    setWatchlist(newWatchlist)
  }

  return {
    euServers,
    hkServers,
    usServers,
    loading,
    steamSyncLoading,
    getGameServers,
    watchlist,
    ownPlayer,
    syncSteamFriends,
    clearWatchlist,
    addPlayer,
    removePlayer,
    dialogOpen,
    setDialogOpen,
    dialogName,
    setDialogName,
  }
}

export default useGameserverHandler
