import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import CustomHeader from '../../../components/core/CustomHeader';
import LoginWrapper from '../../../components/core/LoginWrapper';
import SettingNav from '../../../components/navs/SettingNav';
import ActionButton from '../../../components/styles/ActionButton';
import BooleanDisplay from '../../../components/styles/BooleanDisplay';
import CheckboxInput from '../../../components/styles/CheckboxInput';
import PageHeader from '../../../components/styles/PageHeader';
import TextInput from '../../../components/styles/TextInput';
import ValueDisplay from '../../../components/styles/ValueDisplay';
import AccountSettingsHandler from '../../../shared/handlers/account.handler';
import useThemeProvider from '../../../shared/providers/theme.provider';
import Tooltip from '../../../components/styles/Tooltip';
import Divider from '../../../components/styles/Divider';
import Verified from '../../../components/styles/VerifiedSvg';

const Account: NextPage = () => {
  const { theme } = useThemeProvider();

  const {
    user,
    formValue,
    setFormValue,
    editing,
    editAccountSettings,
    updateAccountSettings,
    cancelEditAccountSettings
  } = AccountSettingsHandler();

  return (
    <LoginWrapper>
      <CustomHeader
        title="WitchTrade | Account Settings"
        description="Account Settings"
        url="https://witchtrade.org/user/settings/account"
      />
      <SettingNav />
      <PageHeader title="Account Settings" />
      <div className="flex justify-center items-center">
        <p className="text-wt-accent-light text-2xl font-bold">{user.displayName}</p>
        {user.verified &&
          <Tooltip text="Verified">
            <div className="ml-1 h-6 w-6">
              <Verified />
            </div>
          </Tooltip>
        }
      </div>
      {user.badges && user.badges.length > 0 &&
        <div className="flex justify-center mb-2">
          <div className="flex flex-wrap justify-center items-center">
            {user.badges.map(badge => (
              <Tooltip key={badge.id} text={badge.description}>
                <div className="m-1 h-9 w-9">
                  <Image src={`/assets/svgs/badges/${badge.id}.svg`} height={36} width={36} alt={badge.description} />
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      }
      <div className="flex justify-center">
        <div className="w-36 my-2">
          <Divider />
        </div>
      </div>
      {!editing &&
        <div className="flex flex-col justify-center max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="m-1">
            <ValueDisplay name="Username" value={user.username} boldValue={true} svgPath={`/assets/svgs/userbadge/${theme?.type === 'light' ? 'black' : 'white'}.svg`} />
          </div>
          <div className="m-1">
            <ValueDisplay name="Display Name" value={user.displayName} svgPath={`/assets/svgs/person/${theme?.type === 'light' ? 'black' : 'white'}.svg`} />
          </div>
          <div className="m-1">
            <ValueDisplay name="Email" value={user.email} svgPath={`/assets/svgs/email/${theme?.type === 'light' ? 'black' : 'white'}.svg`} />
          </div>
          <div className="m-1 mt-4">
            <ValueDisplay name="Steam Profile Link" value={user.steamProfileLink} link={true} svgPath={`/assets/svgs/steam/${theme?.type === 'light' ? 'black' : 'white'}.svg`} />
          </div>
          <div className="m-1">
            <ValueDisplay name="Steam Trade Link" value={user.steamTradeLink} link={true} svgPath={`/assets/svgs/steam/${theme?.type === 'light' ? 'black' : 'white'}.svg`} />
          </div>
          <div className="m-1">
            <BooleanDisplay name="Using Steam Guard" value={user.usingSteamGuard} trueIconPath="/assets/svgs/booleanIcons/lock.svg" falseIconPath="/assets/svgs/booleanIcons/warning.svg" />
          </div>
          <div className="m-1 mt-4">
            <ValueDisplay name="Discord Tag" value={user.discordTag} svgPath={`/assets/svgs/discord/${theme?.type === 'light' ? 'black' : 'white'}.svg`} />
          </div>
          <div className="m-1">
            <BooleanDisplay name="Profile Hidden" value={user.hidden} trueIconPath="/assets/svgs/booleanIcons/checkbox.svg" falseIconPath="/assets/svgs/booleanIcons/cancel.svg" />
          </div>
          <div className="flex justify-center mt-2">
            <ActionButton type="warning" onClick={editAccountSettings}>Edit</ActionButton>
          </div>
          <div className="flex justify-center mt-2">
            <Link href="/user/settings/changepw">
              <a>
                <ActionButton type="info">Change Password</ActionButton>
              </a>
            </Link>
          </div>
        </div>
      }
      {editing &&
        <div className="flex flex-col justify-center max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="m-1">
            <ValueDisplay name="Username" value={user.username} boldValue={true} svgPath={`/assets/svgs/userbadge/${theme?.type === 'light' ? 'black' : 'white'}.svg`} />
          </div>
          <div className="m-1">
            <TextInput type="input" value={formValue.displayName} setValue={(value) => setFormValue({ ...formValue, displayName: value })} placeholder="Display Name" required={true} svgPath={`/assets/svgs/person/${theme?.type === 'light' ? 'black' : 'white'}.svg`} />
          </div>
          <div className="m-1 mb-4">
            <TextInput type="input" value={formValue.email} setValue={(value) => setFormValue({ ...formValue, email: value })} placeholder="Email" required={true} svgPath={`/assets/svgs/email/${theme?.type === 'light' ? 'black' : 'white'}.svg`} />
          </div>
          {user.verified &&
            <p className="text-sm"><span className="text-wt-warning">Warning:</span> Changing the steam profile or trade link will remove your verified badge! You will have to apply again.</p>
          }
          <div className="m-1">
            <TextInput type="input" value={formValue.steamProfileLink} setValue={(value) => setFormValue({ ...formValue, steamProfileLink: value })} placeholder="Steam Profile Link" required={false} svgPath={`/assets/svgs/steam/${theme?.type === 'light' ? 'black' : 'white'}.svg`} />
          </div>
          <div className="m-1">
            <TextInput type="input" value={formValue.steamTradeLink} setValue={(value) => setFormValue({ ...formValue, steamTradeLink: value })} placeholder="Steam Trade Link" required={false} svgPath={`/assets/svgs/steam/${theme?.type === 'light' ? 'black' : 'white'}.svg`} />
          </div>
          <div className="m-1">
            <CheckboxInput placeholder="Using Steam Guard" value={formValue.usingSteamGuard} setValue={(value) => setFormValue({ ...formValue, usingSteamGuard: value })} />
          </div>
          <div className="m-1 mt-4">
            <TextInput type="input" value={formValue.discordTag} setValue={(value) => setFormValue({ ...formValue, discordTag: value })} placeholder="Discord Tag" required={false} svgPath={`/assets/svgs/discord/${theme?.type === 'light' ? 'black' : 'white'}.svg`} />
          </div>
          <div className="m-1">
            <CheckboxInput placeholder="Profile hidden" value={formValue.hidden} setValue={(value) => setFormValue({ ...formValue, hidden: value })} />
          </div>
          <div className="flex justify-center text-center mt-2">
            <div className="mx-1">
              <ActionButton type="success" onClick={updateAccountSettings}>Save</ActionButton>
            </div>
            <div className="mx-1">
              <ActionButton type="cancel" onClick={cancelEditAccountSettings}>Cancel</ActionButton>
            </div>
          </div>
        </div>
      }
      {user.verified &&
        <p className="text-center"><span className="text-wt-success">Notice:</span> If you want to get your profile verified, have a look into the <Link href="/faq"><a className="hover:underline text-wt-accent cursor-pointer">FAQ</a></Link></p>
      }
    </LoginWrapper>
  );
};

export default Account;
