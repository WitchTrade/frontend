import { selectAllEntities } from '@ngneat/elf-entities'
import { useObservable } from '@ngneat/react-rxjs'
import { useEffect, useState } from 'react'
import { tap } from 'rxjs'
import {
  AdminFilterValues,
  createDefaultAdminFilter,
} from '../static/adminFilterValues'
import { AdminUser } from '../stores/admin/admin.model'
import { adminStore } from '../stores/admin/admin.store'
import { Item } from '../stores/items/item.model'

const AdminFilterHandler = (itemsToLoad: number) => {
  const [adminUsers] = useObservable(
    adminStore.pipe(
      selectAllEntities(),
      tap((users) => users.sort((a, b) => a.username.localeCompare(b.username)))
    )
  )

  const [filteredAdminUsers, setFilteredAdminUsers] = useState<AdminUser[]>([])
  const [loadedAdminUsers, setLoadedAdminUsers] = useState<AdminUser[]>([])

  const [adminFilterValues, setAdminFilterValues] = useState<AdminFilterValues>(
    createDefaultAdminFilter()
  )

  useEffect(() => {
    filterAdminUsers()
  }, [adminUsers, adminFilterValues])

  useEffect(() => {
    setLoadedAdminUsers(filteredAdminUsers.slice(0, itemsToLoad))
  }, [filteredAdminUsers])

  const filterAdminUsers = () => {
    const filteredItems = adminUsers.filter((adminUser) => {
      const searchString =
        adminUser.username
          .toLowerCase()
          .includes(adminFilterValues.searchString.toLowerCase()) ||
        adminUser.displayName
          .toLowerCase()
          .includes(adminFilterValues.searchString.toLowerCase())

      const verified =
        adminFilterValues.verified.key !== 'any'
          ? (adminUser.verified &&
              adminFilterValues.verified.key === 'verified') ||
            (!adminUser.verified &&
              adminFilterValues.verified.key === 'notverified')
          : true
      const badge =
        adminFilterValues.badge.key !== 'any'
          ? adminUser.badges.some((b) => b.id === adminFilterValues.badge.key)
          : true

      return searchString && verified && badge
    })

    filteredItems.sort((a, b) => {
      const key = adminFilterValues.orderBy.key as keyof Item
      const one = a[key]
      const two = b[key]
      if (one === undefined || two === undefined) {
        return 0
      }
      let returnValue = 0
      if (one > two) {
        returnValue = 1
      }
      if (two > one) {
        returnValue = -1
      }
      if (adminFilterValues.orderDirection.key === 'desc') {
        returnValue *= -1
      }
      return returnValue
    })

    setFilteredAdminUsers(filteredItems)
  }

  const loadMoreAdminUsers = () => {
    setLoadedAdminUsers(
      filteredAdminUsers.slice(0, loadedAdminUsers.length + 25)
    )
  }

  const hasMoreAdminUsers = () => {
    return adminUsers.length > loadedAdminUsers.length
  }

  return {
    totalAdminUserCount: adminUsers.length,
    filteredAdminUsers,
    loadedAdminUsers,
    loadMoreAdminUsers,
    hasMoreAdminUsers,
    adminFilterValues,
    setAdminFilterValues,
  }
}

export default AdminFilterHandler
