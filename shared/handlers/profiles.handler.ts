import { useEffect, useState } from 'react'
import { PreviewMarket } from '../stores/markets/market.model'

const ProfilesHandler = (profiles: PreviewMarket[]) => {
  const [filteredProfiles, setFilteredProfiles] = useState<PreviewMarket[]>([])
  const [loadedProfiles, setLoadedProfiles] = useState<PreviewMarket[]>([])

  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    setFilteredProfiles(profiles)
  }, [profiles])

  useEffect(() => {
    setFilteredProfiles(
      profiles.filter((p) =>
        p.displayName.toLowerCase().includes(searchValue.toLowerCase())
      )
    )
  }, [searchValue])

  useEffect(() => {
    setLoadedProfiles(filteredProfiles.slice(0, 50))
  }, [filteredProfiles])

  const loadMoreProfiles = () => {
    setLoadedProfiles(filteredProfiles.slice(0, loadedProfiles.length + 50))
  }

  const hasMoreProfiles = () => {
    return profiles.length > loadedProfiles.length
  }

  return {
    loadedProfiles,
    loadMoreProfiles,
    hasMoreProfiles,
    searchValue,
    setSearchValue,
  }
}

export default ProfilesHandler
