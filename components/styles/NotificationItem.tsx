import { FunctionComponent } from 'react';
import Image from 'next/image';
import { ServerNotification } from '../../shared/stores/serverNotification/server-notification.model';
import dayjs from 'dayjs';

interface Props {
  notification: ServerNotification;
  deleteNotification: (notification: ServerNotification) => void;
}

const NotificationItem: FunctionComponent<Props> = ({ notification, deleteNotification }) => {

  let notificationContent = (
    <>
      <div className="flex justify-between items-center">
        {notification.iconLink &&
          <div className="h-10 w-10 ml-1" style={{ minHeight: '40px', minWidth: '40px' }}>
            <Image className="rounded-md" height={40} width={40} src={notification.iconLink} alt={notification.text} />
          </div>
        }
        <p className="px-4 py-2 text-sm break-words"> {notification.text}</p>
      </div>
      <p className="text-xs text-center">{dayjs().to(dayjs(notification.created))}</p>
    </>
  );

  if (notification.link) {
    notificationContent = (
      <a className="hover:bg-wt-hover w-full h-full py-2" href={notification.link} target="">
        {notificationContent}
      </a>
    );
  } else {
    notificationContent = (
      <div className="w-full h-full py-2">
        {notificationContent}
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center mb-2 mx-1 bg-wt-surface-dark rounded-md">
      {notificationContent}
      <button className="bg-red-600 hover:bg-red-500 p-1 mr-1 h-full rounded-md text-bg font-medium" onClick={() => deleteNotification(notification)}>
        <div className="h-6 w-6">
          <Image src="/assets/svgs/bin/white.svg" height={24} width={24} alt="Bin" />
        </div>
      </button>
    </div>
  );
};

export default NotificationItem;
