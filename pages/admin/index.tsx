import { NextPage } from 'next'
import InfiniteScroll from 'react-infinite-scroll-component'
import AdminFilter from '../../components/admin/AdminFilter'
import AdminUserView from '../../components/admin/adminUserView'
import CustomHeader from '../../components/core/CustomHeader'
import LoginWrapper from '../../components/core/LoginWrapper'
import AdminNav from '../../components/navs/AdminNav'
import PageHeader from '../../components/styles/PageHeader'
import AdminHandler from '../../shared/handlers/admin.handler'
import AdminFilterHandler from '../../shared/handlers/adminFilter.handler'

const Admin: NextPage = () => {
  const {
    changeVerification,
    ban,
    unban,
    badges,
    changeBadge,
    roles,
    changeRole,
    sendMessage,
  } = AdminHandler()

  const {
    totalAdminUserCount,
    filteredAdminUsers,
    loadedAdminUsers,
    loadMoreAdminUsers,
    hasMoreAdminUsers,
    adminFilterValues,
    setAdminFilterValues,
  } = AdminFilterHandler(25)

  return (
    <LoginWrapper admin={true}>
      <CustomHeader
        title='WitchTrade | Administration'
        description='Administration'
        url='https://witchtrade.org/admin'
      />
      <PageHeader title='Administration' />
      <AdminNav />
      <div className='flex flex-col justify-center py-2 px-4 mx-auto max-w-3xl sm:px-6 lg:px-8 '>
        <AdminFilter
          adminFilterValues={adminFilterValues}
          setAdminFilterValues={setAdminFilterValues}
        />
        <p className='mt-1 text-center'>
          <span className='font-bold text-wt-accent'>
            {totalAdminUserCount}
          </span>{' '}
          user
          {totalAdminUserCount === 1 ? '' : 's'}
          {totalAdminUserCount !== filteredAdminUsers.length ? (
            <>
              {' '}
              in total,{' '}
              <span className='font-bold text-wt-accent'>
                {filteredAdminUsers.length}
              </span>{' '}
              filtered
            </>
          ) : (
            ''
          )}
        </p>
        <InfiniteScroll
          className='flex flex-col justify-center'
          dataLength={loadedAdminUsers.length}
          next={loadMoreAdminUsers}
          hasMore={hasMoreAdminUsers()}
          loader={<p></p>}
        >
          {loadedAdminUsers.map((adminUser) => (
            <AdminUserView
              key={adminUser.id}
              adminUser={adminUser}
              changeVerification={changeVerification}
              ban={ban}
              unban={unban}
              badges={badges}
              changeBadge={changeBadge}
              roles={roles}
              changeRole={changeRole}
              sendMessage={sendMessage}
            />
          ))}
        </InfiniteScroll>
      </div>
    </LoginWrapper>
  )
}

export default Admin
