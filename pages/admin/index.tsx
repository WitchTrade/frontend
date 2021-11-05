import { NextPage } from 'next';
import InfiniteScroll from 'react-infinite-scroll-component';
import AdminUserView from '../../components/admin/adminUserView';
import CustomHeader from '../../components/core/CustomHeader';
import LoginWrapper from '../../components/core/LoginWrapper';
import AdminNav from '../../components/navs/AdminNav';
import PageHeader from '../../components/styles/PageHeader';
import TextInput from '../../components/styles/TextInput';
import AdminHandler from '../../shared/handlers/admin.handler';

const Admin: NextPage = () => {
  const {
    adminUsers,
    loadedAdminUsers,
    loadMoreAdminUsers,
    hasMoreAdminUsers,
    playerSearchString,
    setPlayerSearchString,
    changeVerification,
    ban,
    unban,
    badges,
    changeBadge,
    roles,
    changeRole
  } = AdminHandler();

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
        <div className="mt-4 max-w-xl w-full self-center">
          <TextInput placeholder="Search by username" required={false} type="text" value={playerSearchString} setValue={(playerSearchString: string) => setPlayerSearchString(playerSearchString)} clearOption={true} />
        </div>
        <p className="text-center"><span className="font-bold text-wt-accent">{adminUsers.length}</span> user{adminUsers.length === 1 ? '' : 's'}</p>
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
            />
          ))}
        </InfiniteScroll>
      </div>
    </LoginWrapper>
  );
};

export default Admin;
