import dayjs from 'dayjs'
import { FunctionComponent } from 'react'
import { AdminLog } from '../../shared/stores/admin/admin.model'

interface Props {
  log: AdminLog
}

const LogEntry: FunctionComponent<Props> = ({ log }) => {
  return (
    <div
      className={`flex justify-between items-center bg-wt-surface-dark text-center mx-1 mt-2 shadow-md p-4 w-full rounded-lg border-2 ${
        log.actionType === 0 ? 'border-wt-success' : 'border-wt-error'
      }`}
    >
      <div className='flex flex-col items-center'>
        <p className='px-1 bg-wt-accent rounded-full'>{log.username}</p>
        <p>{dayjs(log.timestamp).format('DD.MM.YYYY HH:mm')}</p>
      </div>
      <div className='flex flex-col items-center'>
        <p>{log.log}</p>
      </div>
      <div className='flex flex-col items-center'>
        <p>
          Target:{' '}
          <span className='px-1 bg-wt-warning rounded-full'>
            {log.targetUsername}
          </span>
        </p>
      </div>
    </div>
  )
}

export default LogEntry
