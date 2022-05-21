import { Transition } from '@headlessui/react'
import { selectAllEntities } from '@ngneat/elf-entities'
import { useObservable } from '@ngneat/react-rxjs'
import { FunctionComponent, useEffect, useState } from 'react'
import { tap } from 'rxjs'
import { Notification } from '../../shared/stores/notification/notification.model'
import { notificationStore } from '../../shared/stores/notification/notification.store'

const NotificationComponent: FunctionComponent = () => {
  const [notifications] = useObservable(
    notificationStore.pipe(
      selectAllEntities(),
      tap((notifications) => notifications.sort((a, b) => b.id - a.id))
    )
  )
  const [shownNotifications, setShownNotifications] = useState<Notification[]>(
    []
  )

  // showNotification is a mirror of the latest three notifications, but they get deleted after a 150 ms delay
  // this is to ensure that the fade out animation is displayed correctly.
  useEffect(() => {
    if (
      (!notifications[2] && shownNotifications[0]) ||
      (!notifications[1] && shownNotifications[1]) ||
      (!notifications[0] && shownNotifications[2])
    ) {
      setTimeout(() => {
        setShownNotifications([
          notifications[2],
          notifications[1],
          notifications[0],
        ])
      }, 150)
    } else {
      setShownNotifications([
        notifications[2],
        notifications[1],
        notifications[0],
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications])

  const color = {
    error: 'bg-wt-error border-wt-error-light',
    warning: 'bg-wt-warning border-wt-warning-light',
    info: 'bg-wt-info border-wt-info-light',
    success: 'bg-wt-success border-wt-success-light',
  }

  return (
    <div className='fixed bottom-0 z-50'>
      {[...Array(3)].map((x, i) => (
        <Transition
          key={i}
          show={
            notifications[notifications.length - Math.abs(i - 3)] ? true : false
          }
          enter='transition-opacity duration-75'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-150'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div style={{ minWidth: '100vw' }}>
            <div
              className={`mx-auto flex flex-col justify-center text-center overflow-hidden ${
                shownNotifications[i] ? 'border-b-4' : ''
              } ${color[shownNotifications[i]?.type]} ${
                i === 0 || !shownNotifications[i - 1] ? 'rounded-t-lg' : ''
              }`}
              style={{ width: '90vw', minHeight: '45px' }}
            >
              <p className='font-bold text-wt-light'>
                {shownNotifications[i]?.content}
              </p>
            </div>
          </div>
        </Transition>
      ))}
    </div>
  )
}

export default NotificationComponent
