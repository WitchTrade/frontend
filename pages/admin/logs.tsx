import { NextPage } from 'next'
import LogEntry from '../../components/admin/logEntry'
import CustomHeader from '../../components/core/CustomHeader'
import LoginWrapper from '../../components/core/LoginWrapper'
import AdminNav from '../../components/navs/AdminNav'
import PageHeader from '../../components/styles/PageHeader'
import AdminHandler from '../../shared/handlers/admin.handler'

const AdminLogs: NextPage = () => {
  const { logs } = AdminHandler()

  return (
    <LoginWrapper admin={true}>
      <CustomHeader
        title='WitchTrade | Administration'
        description='Admin Logs'
        url='https://witchtrade.org/admin/logs'
      />
      <PageHeader title='Administration' />
      <AdminNav />
      <div className='flex flex-col justify-center py-2 px-4 mx-auto max-w-3xl sm:px-6 lg:px-8'>
        {logs.map((log) => (
          <LogEntry key={log.id} log={log} />
        ))}
      </div>
    </LoginWrapper>
  )
}

export default AdminLogs
