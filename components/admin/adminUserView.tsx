import { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useObservable } from '@ngneat/react-rxjs';
import { AdminUser } from '../../shared/stores/admin/admin.model';
import Tooltip from '../styles/Tooltip';
import ActionButton from '../styles/ActionButton';
import WTDialog from '../styles/WTDialog';
import TextInput from '../styles/TextInput';
import Divider from '../styles/Divider';
import { Badge } from '../../shared/stores/user/badge.model';
import { Role } from '../../shared/stores/user/role.model';
import Verified from '../styles/VerifiedSvg';
import Chip from '../styles/Chip';
import { themeStore } from '../../shared/stores/theme/theme.store';

interface Props {
  adminUser: AdminUser;
  changeVerification: (adminUser: AdminUser) => void;
  ban: (adminUser: AdminUser, reason: string) => void;
  unban: (adminUser: AdminUser) => void;
  badges: Badge[];
  changeBadge: (adminUser: AdminUser, badge: Badge) => void;
  roles: Role[];
  changeRole: (adminUser: AdminUser, role: Role) => void;
  sendMessage: (adminUser: AdminUser, text: string, link: string, iconLink: string) => void;
};

const AdminUserView: FunctionComponent<Props> = ({ adminUser, changeVerification, ban, unban, badges, changeBadge, roles, changeRole, sendMessage }) => {
  const [theme] = useObservable(themeStore);

  const [show, setShow] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [badgeDialogOpen, setBadgeDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  const [banReason, setBanReason] = useState('');

  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [iconLink, setIconLink] = useState('');

  return (
    <>
      <WTDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} closeOnOutsideClick={true}>
        <div className="inline-block max-w-md p-6 my-8 overflow-auto text-left align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4 border-wt-warning">
          <div className="h-full flex flex-col justify-between">
            <div>
              <p className="text-2xl font-medium leading-6">Ban reason</p>
              <p className="text-sm my-2">Please provide a ban reason.</p>
            </div>
            <TextInput type="text" placeholder="Ban reason" required={false} value={banReason} setValue={setBanReason} />
            <div className="mt-4 flex justify-evenly pb-2">
              <ActionButton type="success" onClick={() => {
                if (banReason) {
                  ban(adminUser, banReason);
                  setDialogOpen(false);
                  setBanReason('');
                }
              }}>
                Ban user
              </ActionButton>
              <ActionButton type="cancel" onClick={() => setDialogOpen(false)}>
                Cancel
              </ActionButton>
            </div>
          </div>
        </div>
      </WTDialog>
      <WTDialog dialogOpen={badgeDialogOpen} setDialogOpen={setBadgeDialogOpen} closeOnOutsideClick={true}>
        <div className="inline-block max-w-md p-6 my-8 overflow-auto text-left align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4 border-wt-success">
          <div className="h-full flex flex-col justify-between">
            <div>
              <p className="text-2xl font-medium leading-6">Manage badges of <span className="text-wt-accent">{adminUser.username}</span></p>
            </div>
            <div className="flex flex-wrap justify-center items-center mt-3">
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
              <ActionButton type="success" onClick={() => setBadgeDialogOpen(false)}>
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
              <p className="text-2xl font-medium leading-6">Manage roles of <span className="text-wt-accent">{adminUser.username}</span></p>
            </div>
            <div className="flex flex-col justify-center items-center mt-3">
              {roles.sort((a, b) => a.rank - b.rank).map(role => (
                <div key={role.id} className={`m-1 rounded-full p-1 cursor-pointer hover:bg-wt-hover ${adminUser.roles.some(r => r.id === role.id) ? 'border-2 border-wt-accent' : ''}`} onClick={() => changeRole(adminUser, role)}>
                  <p>{role.description}</p>
                </div>
              ))
              }
            </div>
            <div className="mt-4 flex justify-evenly pb-2">
              <ActionButton type="success" onClick={() => setRoleDialogOpen(false)}>
                Done
              </ActionButton>
            </div>
          </div>
        </div>
      </WTDialog>
      <WTDialog dialogOpen={messageDialogOpen} setDialogOpen={setMessageDialogOpen} closeOnOutsideClick={true}>
        <div className="inline-block max-w-md p-6 my-8 overflow-auto text-left align-middle transition-all transform bg-wt-surface-dark shadow-xl rounded-2xl border-4 border-wt-success">
          <div className="h-full flex flex-col justify-between">
            <div>
              <p className="text-2xl font-medium leading-6">Send message to <span className="text-wt-accent">{adminUser.username}</span></p>
            </div>
            <div className="m-1">
              <TextInput type="input" value={text} setValue={(text) => setText(text)} placeholder="Text" required={true} />
            </div>
            <div className="m-1">
              <TextInput type="input" value={link} setValue={(link) => setLink(link)} placeholder="Link" required={false} />
            </div>
            <div className="m-1">
              <TextInput type="input" value={iconLink} setValue={(iconLink) => setIconLink(iconLink)} placeholder="Image Link" required={false} />
            </div>
            <div className="mt-4 flex justify-evenly pb-2">
              <ActionButton type="success" onClick={() => { sendMessage(adminUser, text, link, iconLink); setMessageDialogOpen(false); }}>
                Send
              </ActionButton>
            </div>
          </div>
        </div>
      </WTDialog>
      <div className={`flex flex-wrap justify-between bg-wt-surface-dark text-center mx-1 mt-2 shadow-md px-4 py-2 cursor-pointer border-l-2 border-t-2 border-r-2 ${show ? 'rounded-t-lg border-wt-accent' : 'rounded-lg border-wt-surface-dark'}`} style={{ minHeight: '62px' }} onClick={() => setShow(!show)}>
        <div className="flex items-center">
          <Link href={`/@/${adminUser.username}`}>
            <a target="_blank" rel="noreferrer">
              <div className="py-1 px-2 rounded-lg border border-wt-accent hover:bg-wt-hover">
                <p className="font-bold text-wt-accent">{adminUser.username}</p>
              </div>
            </a>
          </Link>
          {adminUser.verified &&
            <div className="ml-1 h-5 w-5">
              <Verified />
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
              <div key={badge.id} className="m-1 h-7 w-7">
                <Image src={`/assets/svgs/badges/${badge.id}.svg`} height={28} width={28} alt={badge.description} />
              </div>
            ))}
          </div>
          <div className="w-6 h-6">
            <Image src={`/assets/svgs/expand_${show ? 'less' : 'more'}/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="24px" width="24px" alt="Dropdown Item Icon" />
          </div>
        </div>
      </div>
      {show &&
        <div className="bg-wt-surface-dark rounded-b-lg mx-1 pb-2 px-4 z-10 border-wt-accent border-l-2 border-b-2 border-r-2">
          <div className="flex flex-wrap justify-center">
            <Chip title="Created" text={dayjs(adminUser.created).format('DD.MM.YYYY HH:mm')} />
            <Chip title="Last Online" text={dayjs(adminUser.lastOnline).format('DD.MM.YYYY HH:mm')} />
          </div>
          <div className="px-1 py-1">
            <Divider />
          </div>
          <p className="text-wt-accent-light mb-2 text-center">Actions</p>
          <div className="flex flex-wrap justify-evenly">
            <div className="my-1">
              <ActionButton type={adminUser.verified ? 'cancel' : 'success'} onClick={() => changeVerification(adminUser)}>
                {adminUser.verified ? 'Unverify' : 'Verify'}
              </ActionButton>
            </div>
            {adminUser.banned &&
              <div className="my-1">
                <ActionButton type="success" onClick={() => unban(adminUser)}>
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
              <ActionButton type="success" onClick={() => setBadgeDialogOpen(true)}>
                Manage Badges
              </ActionButton>
            </div>
            <div className="my-1">
              <ActionButton type="success" onClick={() => setRoleDialogOpen(true)}>
                Manage Roles
              </ActionButton>
            </div>
            <div className="my-1">
              <ActionButton type="success" onClick={() => setMessageDialogOpen(true)}>
                Send message
              </ActionButton>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default AdminUserView;
