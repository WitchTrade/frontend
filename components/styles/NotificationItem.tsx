import dayjs from 'dayjs'
import Image from 'next/image'
import { FunctionComponent } from 'react'
import { ServerNotification } from '../../shared/stores/serverNotification/server-notification.model'

interface Props {
  notification: ServerNotification
  deleteNotification: (notification: ServerNotification) => void
}

const NotificationItem: FunctionComponent<Props> = ({
  notification,
  deleteNotification,
}) => {
  let notificationContent = (
    <>
      <div className='flex items-center'>
        {notification.iconLink && (
          <div
            className='ml-1 w-10 h-10'
            style={{ minHeight: '40px', minWidth: '40px' }}
          >
            <Image
              className='rounded-md'
              height={40}
              width={40}
              src={notification.iconLink}
              alt={notification.text}
            />
          </div>
        )}
        <p className='py-2 px-4 text-sm break-words'> {notification.text}</p>
      </div>
      <p className='text-xs text-center'>
        {dayjs().to(dayjs(notification.created))}
      </p>
    </>
  )

  if (notification.link) {
    notificationContent = (
      <a
        className='py-2 w-full h-full hover:bg-wt-hover'
        href={notification.link}
        target=''
      >
        {notificationContent}
      </a>
    )
  } else {
    notificationContent = (
      <div className='py-2 w-full h-full'>{notificationContent}</div>
    )
  }

  return (
    <div className='flex justify-between items-center mx-1 mb-2 bg-wt-surface-dark rounded-md'>
      {notificationContent}
      <button
        className='p-1 mr-1 h-full font-medium bg-red-600 hover:bg-red-500 rounded-md'
        onClick={() => deleteNotification(notification)}
      >
        <div className='w-6 h-6'>
          <Image
            src='/assets/svgs/bin/white.svg'
            height={24}
            width={24}
            alt='Bin'
          />
        </div>
      </button>
    </div>
  )
}

export default NotificationItem
