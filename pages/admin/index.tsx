import { NextPage } from 'next';
import InfiniteScroll from 'react-infinite-scroll-component';
import AdminFilter from '../../components/admin/AdminFilter';
import AdminUserView from '../../components/admin/adminUserView';
import CustomHeader from '../../components/core/CustomHeader';
import LoginWrapper from '../../components/core/LoginWrapper';
import AdminNav from '../../components/navs/AdminNav';
import PageHeader from '../../components/styles/PageHeader';
import TextInput from '../../components/styles/TextInput';
import AdminHandler from '../../shared/handlers/admin.handler';
import AdminFilterHandler from '../../shared/handlers/adminFilter.handler';

const Admin: NextPage = () => {
  const {
    playerSearchString,
    setPlayerSearchString,
    changeVerification,
    ban,
    unban,
    badges,
    changeBadge,
    roles,
    changeRole,
    sendMessage
  } = AdminHandler();

  const {
    totalAdminUserCount,
    filteredAdminUsers,
    loadedAdminUsers,
    loadMoreAdminUsers,
    hasMoreAdminUsers,
    adminFilterValues,
    setAdminFilterValues
  } = AdminFilterHandler(25);

  return (
    <LoginWrapper admin={true}>
      <CustomHeader
        title="WitchTrade | Administration"
        description="Administration"
        url="https://witchtrade.org/admin"
      />
      <PageHeader title="Administration" />
      <AdminNav />
      <div className="flex flex-col justify-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-2 ">
        <AdminFilter adminFilterValues={adminFilterValues} setAdminFilterValues={setAdminFilterValues} />
        <p className="text-center mt-1">
          <span className="text-wt-accent font-bold">
            {totalAdminUserCount}
          </span> user
          {totalAdminUserCount === 1 ? '' : 's'}
          {totalAdminUserCount !== filteredAdminUsers.length ? (
            <> in total, <span className="text-wt-accent font-bold">
              {filteredAdminUsers.length}
            </span> filtered</>) : ''}
        </p>
        <InfiniteScroll
          className="flex flex-col justify-center"
          dataLength={loadedAdminUsers.length}
          next={loadMoreAdminUsers}
          hasMore={hasMoreAdminUsers()}
          loader={<p></p>}
        >
          {loadedAdminUsers.map(adminUser => (
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
  );
};

export default Admin;
