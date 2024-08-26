import { useObservable } from '@ngneat/react-rxjs'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CustomHeader from '../../../components/core/CustomHeader'
import LoginWrapper from '../../../components/core/LoginWrapper'
import SettingNav from '../../../components/navs/SettingNav'
import ActionButton from '../../../components/styles/ActionButton'
import BooleanDisplay from '../../../components/styles/BooleanDisplay'
import CheckboxInput from '../../../components/styles/CheckboxInput'
import Divider from '../../../components/styles/Divider'
import PageHeader from '../../../components/styles/PageHeader'
import TextInput from '../../../components/styles/TextInput'
import Tooltip from '../../../components/styles/Tooltip'
import ValueDisplay from '../../../components/styles/ValueDisplay'
import Verified from '../../../components/styles/VerifiedSvg'
import AccountSettingsHandler from '../../../shared/handlers/account.handler'
import { themeStore } from '../../../shared/stores/theme/theme.store'

const Account: NextPage = () => {
  const [theme] = useObservable(themeStore)

  const {
    user,
    formValue,
    setFormValue,
    editing,
    editAccountSettings,
    updateAccountSettings,
    cancelEditAccountSettings,
    verifySteamProfileLink,
    verifyEpicAccountId,
    removeSteamProfileLink,
    removeEpicAccountId,
    steamVerificationState,
    epicVerificationState,
  } = AccountSettingsHandler()

  return (
    <LoginWrapper>
      <CustomHeader
        title='WitchTrade | Account Settings'
        description='Account Settings'
        url='https://witchtrade.org/user/settings/account'
      />
      <SettingNav />
      <PageHeader title='Account Settings' />
      <div className='flex justify-center items-center'>
        <p className='text-2xl font-bold text-wt-accent-light'>
          {user.displayName}
        </p>
        {user.verified && (
          <Tooltip text='Verified'>
            <div className='ml-1 w-6 h-6'>
              <Verified />
            </div>
          </Tooltip>
        )}
      </div>
      {user.badges && user.badges.length > 0 && (
        <div className='flex justify-center mb-2'>
          <div className='flex flex-wrap justify-center items-center'>
            {user.badges.map((badge) => (
              <Tooltip key={badge.id} text={badge.description}>
                <div className='m-1 w-9 h-9'>
                  <Image
                    src={`/assets/svgs/badges/${badge.id}.svg`}
                    height={36}
                    width={36}
                    alt={badge.description}
                  />
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      )}
      <div className='flex justify-center'>
        <div className='my-2 w-36'>
          <Divider />
        </div>
      </div>
      {!editing && (
        <div className='flex flex-col justify-center py-2 px-4 mx-auto max-w-lg sm:px-6 lg:px-8'>
          <div className='m-1'>
            <ValueDisplay
              name='Username'
              value={user.username}
              boldValue={true}
              svgPath={`/assets/svgs/userbadge/${
                theme?.type === 'light' ? 'black' : 'white'
              }.svg`}
            />
          </div>
          <div className='m-1'>
            <ValueDisplay
              name='Display Name'
              value={user.displayName}
              svgPath={`/assets/svgs/person/${
                theme?.type === 'light' ? 'black' : 'white'
              }.svg`}
            />
          </div>
          <div className='m-1'>
            <ValueDisplay
              name='Email'
              value={user.email}
              svgPath={`/assets/svgs/email/${
                theme?.type === 'light' ? 'black' : 'white'
              }.svg`}
            />
          </div>
          <div className='m-1 mt-4'>
            <ValueDisplay
              name='Discord Username'
              value={user.discordTag}
              svgPath={`/assets/svgs/discord/${
                theme?.type === 'light' ? 'black' : 'white'
              }.svg`}
            />
          </div>
          <div className='m-1'>
            <BooleanDisplay
              name='Profile Hidden'
              value={user.hidden}
              trueIconPath='/assets/svgs/booleanIcons/checkbox.svg'
              falseIconPath='/assets/svgs/booleanIcons/cancel.svg'
            />
          </div>
          <div className='flex justify-center mt-2'>
            <ActionButton type='warning' onClick={editAccountSettings}>
              Edit
            </ActionButton>
          </div>
          <div className='flex justify-center mt-2'>
            <Link href='/user/settings/changepw'>
              <a>
                <ActionButton type='info'>Change Password</ActionButton>
              </a>
            </Link>
          </div>
        </div>
      )}
      {editing && (
        <div className='flex flex-col justify-center py-2 px-4 mx-auto max-w-lg sm:px-6 lg:px-8'>
          <div className='m-1'>
            <ValueDisplay
              name='Username'
              value={user.username}
              boldValue={true}
              svgPath={`/assets/svgs/userbadge/${
                theme?.type === 'light' ? 'black' : 'white'
              }.svg`}
            />
          </div>
          <div className='m-1'>
            <TextInput
              type='input'
              value={formValue.displayName}
              setValue={(value) =>
                setFormValue({ ...formValue, displayName: value })
              }
              placeholder='Display Name'
              required={true}
              svgPath={`/assets/svgs/person/${
                theme?.type === 'light' ? 'black' : 'white'
              }.svg`}
            />
          </div>
          <div className='m-1 mb-4'>
            <TextInput
              type='input'
              value={formValue.email}
              setValue={(value) => setFormValue({ ...formValue, email: value })}
              placeholder='Email'
              required={true}
              svgPath={`/assets/svgs/email/${
                theme?.type === 'light' ? 'black' : 'white'
              }.svg`}
            />
          </div>
          {user.verified && (
            <p className='text-sm'>
              <span className='text-wt-warning'>Warning:</span> Changing the
              steam profile or trade link will remove your verified badge! You
              will have to apply again.
            </p>
          )}
          <div className='m-1 mt-4'>
            <TextInput
              type='input'
              value={formValue.discordTag}
              setValue={(value) =>
                setFormValue({ ...formValue, discordTag: value })
              }
              placeholder='Discord Username'
              required={false}
              svgPath={`/assets/svgs/discord/${
                theme?.type === 'light' ? 'black' : 'white'
              }.svg`}
            />
          </div>
          <div className='m-1'>
            <CheckboxInput
              placeholder='Profile hidden'
              value={formValue.hidden}
              setValue={(value) =>
                setFormValue({ ...formValue, hidden: value })
              }
            />
          </div>
          <div className='flex justify-center mt-2 text-center'>
            <div className='mx-1'>
              <ActionButton type='success' onClick={updateAccountSettings}>
                Save
              </ActionButton>
            </div>
            <div className='mx-1'>
              <ActionButton type='cancel' onClick={cancelEditAccountSettings}>
                Cancel
              </ActionButton>
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-col justify-center py-2 px-4 mx-auto max-w-xl sm:px-6 lg:px-8'>
        <h2 className='text-lg font-extrabold'>Witch It Connection</h2>
        <p className='mt-2 text-sm'>
          Authorize with your Steam or Epic Games account to get access to Witch
          It related features like quests and syncing your inventory. WitchTrade
          will only save your respective Account Id and Witch It Id and link
          them to your account.
        </p>
        {!user.epicAccountId && (
          <div className='m-1 mt-4'>
            <div className='flex justify-between items-center px-2 h-11 bg-wt-surface-dark rounded-lg'>
              <div className='flex items-center'>
                <Image
                  src={`/assets/svgs/steam/${
                    theme?.type === 'light' ? 'black' : 'white'
                  }.svg`}
                  height='24px'
                  width='24px'
                  alt='Value Icon'
                />
                <p className='ml-1'>Steam Profile:</p>
              </div>
              <div className='flex items-center'>
                {user.steamProfileLink && (
                  <>
                    <a
                      className='text-wt-accent-light hover:underline rounded-md focus:outline-none focus:ring-2 focus:ring-wt-accent'
                      href={user.steamProfileLink}
                      target='_blank'
                      rel='noreferrer'
                    >
                      open profile
                    </a>
                    <div className='flex items-center ml-1'>
                      <ActionButton
                        type='info'
                        onClick={removeSteamProfileLink}
                      >
                        Remove
                      </ActionButton>
                    </div>
                  </>
                )}
                {!user.steamProfileLink && (
                  <div className='flex justify-center items-center ml-1'>
                    <ActionButton type='info' onClick={verifySteamProfileLink}>
                      {steamVerificationState
                        ? steamVerificationState
                        : 'Connect'}
                    </ActionButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {!user.steamProfileLink && (
          <div className='m-1'>
            <div className='flex justify-between items-center px-2 h-11 bg-wt-surface-dark rounded-lg'>
              <div className='flex items-center'>
                <Image
                  src={`/assets/svgs/epic/${
                    theme?.type === 'light' ? 'black' : 'white'
                  }.svg`}
                  height='24px'
                  width='24px'
                  alt='Value Icon'
                />
                <p className='ml-1'>Epic Games Account:</p>
              </div>
              <div className='flex items-center'>
                {user.epicAccountId && (
                  <>
                    <p>connected</p>
                    <div className='flex items-center ml-1'>
                      <ActionButton type='info' onClick={removeEpicAccountId}>
                        Remove
                      </ActionButton>
                    </div>
                  </>
                )}
                {!user.epicAccountId && (
                  <div className='flex justify-center items-center ml-1'>
                    <ActionButton type='info' onClick={verifyEpicAccountId}>
                      {epicVerificationState
                        ? epicVerificationState
                        : 'Connect'}
                    </ActionButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className='m-1'>
          <ValueDisplay
            name='Witch It Id'
            value={user.witchItUserId}
            svgPath={`/assets/svgs/userbadge/${
              theme?.type === 'light' ? 'black' : 'white'
            }.svg`}
          />
        </div>
      </div>
      {!user.verified && (
        <p className='mb-2 text-center'>
          <span className='text-wt-success'>Notice:</span> If you want to get
          your profile verified, have a look into the{' '}
          <Link href='/faq'>
            <a className='text-wt-accent hover:underline cursor-pointer'>FAQ</a>
          </Link>
        </p>
      )}
    </LoginWrapper>
  )
}

export default Account
