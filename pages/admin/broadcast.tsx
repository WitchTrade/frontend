import { NextPage } from 'next';
import CustomHeader from '../../components/core/CustomHeader';
import LoginWrapper from '../../components/core/LoginWrapper';
import AdminNav from '../../components/navs/AdminNav';
import ActionButton from '../../components/styles/ActionButton';
import PageHeader from '../../components/styles/PageHeader';
import TextInput from '../../components/styles/TextInput';
import AdminHandler from '../../shared/handlers/admin.handler';

const Broadcast: NextPage = () => {
  const {
    broadcastNotification,
    setBroadcastNotification,
    broadcast
  } = AdminHandler();

  return (
    <LoginWrapper admin={true}>
      <CustomHeader
        title="WitchTrade | Administration"
        description="Admin"
        url="https://witchtrade.org/admin/broadcast"
      />
      <PageHeader title="Administration" />
      <AdminNav />
      <div className="flex flex-col justify-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="m-1">
          <TextInput type="input" value={broadcastNotification.text} setValue={(text) => setBroadcastNotification({ ...broadcastNotification, text })} placeholder="Text" required={true} />
        </div>
        <div className="m-1">
          <TextInput type="input" value={broadcastNotification.link} setValue={(link) => setBroadcastNotification({ ...broadcastNotification, link })} placeholder="Link" required={false} />
        </div>
        <div className="m-1">
          <TextInput type="input" value={broadcastNotification.iconLink} setValue={(iconLink) => setBroadcastNotification({ ...broadcastNotification, iconLink })} placeholder="Image Link" required={false} />
        </div>
        <div className="flex justify-center my-1">
          <ActionButton type="proceed" disabled={!broadcastNotification.text} onClick={() => broadcast()}>
            Send
          </ActionButton>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default Broadcast;
