import { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import { AdminUser } from '../../shared/stores/admin/admin.model';
import Tooltip from '../styles/Tooltip';
import useThemeProvider from '../../shared/providers/theme.provider';
import ActionButton from '../styles/ActionButton';
import WTDialog from '../styles/WTDialog';
import TextInput from '../styles/TextInput';
import Divider from '../styles/Divider';
import { Badge } from '../../shared/stores/user/badge.model';
import { Role } from '../../shared/stores/user/role.model';

interface Props {
  adminUser: AdminUser;
  changeVerification: (adminUser: AdminUser) => void;
  ban: (adminUser: AdminUser, reason: string) => void;
  unban: (adminUser: AdminUser) => void;
  badges: Badge[];
  changeBadge: (adminUser: AdminUser, badge: Badge) => void;
  roles: Role[];
  changeRole: (adminUser: AdminUser, role: Role) => void;
};

const AdminUserView: FunctionComponent<Props> = ({ adminUser, changeVerification, ban, unban, badges, changeBadge, roles, changeRole }) => {
  const { theme } = useThemeProvider();

  const [show, setShow] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [badgeDialogOpen, setBadgeDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);

  const [banReason, setBanReason] = useState('');

  return (
    <div>
      <WTDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} closeOnOutsideClick={true}>
        <div className="inline-block max-w-md p-6 my-8 overflow-auto text-left align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4 border-wt-warning">
          <div className="h-full flex flex-col justify-between">
            <div>
              <p className="text-2xl font-medium leading-6">Ban reason</p>
              <p className="text-sm my-2">Please provide a ban reason.</p>
            </div>
            <TextInput type="text" placeholder="Ban reason" required={false} value={banReason} setValue={setBanReason} />
            <div className="mt-4 flex justify-evenly pb-2">
              <ActionButton type="cancel" onClick={() => setDialogOpen(false)}>
                Cancel
              </ActionButton>
              <ActionButton type="proceed" onClick={() => {
                if (banReason) {
                  ban(adminUser, banReason);
                  setDialogOpen(false);
                  setBanReason('');
                }
              }}>
                Ban user
              </ActionButton>
            </div>
          </div>
        </div>
      </WTDialog>
      <WTDialog dialogOpen={badgeDialogOpen} setDialogOpen={setBadgeDialogOpen} closeOnOutsideClick={true}>
        <div className="inline-block max-w-md p-6 my-8 overflow-auto text-left align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4 border-wt-success">
          <div className="h-full flex flex-col justify-between">
            <div>
              <p className="text-2xl font-medium leading-6">Manage Badges of {adminUser.username}</p>
            </div>
            <div className="flex justify-center items-center mt-3">
              {badges.map(badge => (
                <Tooltip key={badge.id} text={badge.description}>
                  <div className={`m-1 h-14 w-14 rounded-full p-1 cursor-pointer ${adminUser.badges.some(b => b.id === badge.id) ? 'border-2 border-wt-accent' : ''}`} onClick={() => changeBadge(adminUser, badge)}>
                    <Image src={`/assets/svgs/badges/${badge.id}.svg`} height={56} width={56} alt={badge.description} />
                  </div>
                </Tooltip>
              ))
              }
            </div>
            <div className="mt-4 flex justify-evenly pb-2">
              <ActionButton type="proceed" onClick={() => setBadgeDialogOpen(false)}>
                Done
              </ActionButton>
            </div>
          </div>
        </div>
      </WTDialog>
      <WTDialog dialogOpen={roleDialogOpen} setDialogOpen={setRoleDialogOpen} closeOnOutsideClick={true}>
        <div className="inline-block max-w-md p-6 my-8 overflow-auto text-left align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4 border-wt-success">
          <div className="h-full flex flex-col justify-between">
            <div>
              <p className="text-2xl font-medium leading-6">Manage Roles of {adminUser.username}</p>
            </div>
            <div className="flex flex-col justify-center items-center mt-3">
              {roles.sort((a, b) => a.rank - b.rank).map(role => (
                <div key={role.id} className={`m-1 rounded-full p-1 cursor-pointer ${adminUser.roles.some(r => r.id === role.id) ? 'border-2 border-wt-accent' : ''}`} onClick={() => changeRole(adminUser, role)}>
                  <p>{role.description}</p>
                </div>
              ))
              }
            </div>
            <div className="mt-4 flex justify-evenly pb-2">
              <ActionButton type="proceed" onClick={() => setRoleDialogOpen(false)}>
                Done
              </ActionButton>
            </div>
          </div>
        </div>
      </WTDialog>
      <div className={`flex flex-wrap justify-between bg-wt-surface-dark text-center mx-1 mt-2 shadow-md p-4 cursor-pointer w-full border-l-2 border-t-2 border-r-2 ${show ? 'rounded-t-lg border-wt-accent' : 'rounded-lg border-wt-surface-dark'}`} style={{ minHeight: '70px' }} onClick={() => setShow(!show)}>
        <div className="flex items-center">
          <p className="font-bold text-wt-accent">{adminUser.username}</p>
          {adminUser.verified &&
            <div className="ml-1 h-5 w-5">
              <Image src="/assets/svgs/verified.svg" height={20} width={20} alt="Verified" />
            </div>
          }
          <span className="text-sm align-top ml-1">({adminUser.displayName})</span>
          {adminUser.banned &&
            <div className="bg-wt-error rounded-full px-1 mx-1">
              <p className="text-wt-light">Banned</p>
            </div>
          }
          {adminUser.roles.map(role => (
            <div key={role.id} className="bg-wt-accent rounded-full px-1 mx-1">
              <p className="text-wt-light">{role.description}</p>
            </div>
          ))
          }
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap justify-center items-center">
            {adminUser.badges.map(badge => (
              <Tooltip key={badge.id} text={badge.description}>
                <div className="m-1 h-7 w-7">
                  <Image src={`/assets/svgs/badges/${badge.id}.svg`} height={28} width={28} alt={badge.description} />
                </div>
              </Tooltip>
            ))}
          </div>
          <div className="w-6 h-6">
            <Image src={`/assets/svgs/expand_${show ? 'less' : 'more'}/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="24px" width="24px" alt="Dropdown Item Icon" />
          </div>
        </div>
      </div>
      {show &&
        <div className="bg-wt-surface-dark rounded-b-lg mx-1 pb-2 px-4 z-10 w-full border-wt-accent border-l-2 border-b-2 border-r-2">
          <div className="px-1 py-1">
            <Divider />
          </div>
          <p className="text-wt-accent-light mb-2 text-center">Actions</p>
          <div className="flex flex-wrap justify-evenly">
            <div className="my-1">
              <ActionButton type={adminUser.verified ? 'cancel' : 'proceed'} onClick={() => changeVerification(adminUser)}>
                {adminUser.verified ? 'Unverify' : 'Verify'}
              </ActionButton>
            </div>
            {adminUser.banned &&
              <div className="my-1">
                <ActionButton type="proceed" onClick={() => unban(adminUser)}>
                  Unban
                </ActionButton>
              </div>
              ||
              <div className="my-1">
                <ActionButton type="warning" onClick={() => setDialogOpen(true)}>
                  Ban
                </ActionButton>
              </div>
            }
            <div className="my-1">
              <ActionButton type="proceed" onClick={() => setBadgeDialogOpen(true)}>
                Manage Badges
              </ActionButton>
            </div>
            <div className="my-1">
              <ActionButton type="proceed" onClick={() => setRoleDialogOpen(true)}>
                Manage Roles
              </ActionButton>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default AdminUserView;
