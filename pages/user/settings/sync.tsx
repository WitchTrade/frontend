import { useObservable } from '@ngneat/react-rxjs'
import dayjs from 'dayjs'
import { NextPage } from 'next'
import CustomHeader from '../../../components/core/CustomHeader'
import LoginWrapper from '../../../components/core/LoginWrapper'
import SettingNav from '../../../components/navs/SettingNav'
import ActionButton from '../../../components/styles/ActionButton'
import CheckboxInput from '../../../components/styles/CheckboxInput'
import Loading from '../../../components/styles/Loading'
import PageHeader from '../../../components/styles/PageHeader'
import useSyncSettingsHandler from '../../../shared/handlers/sync.handler'
import { inventoryStore } from '../../../shared/stores/inventory/inventory.store'

const Sync: NextPage = () => {
  const [inventory] = useObservable(inventoryStore)

  const { invLoading, syncInventory, updateInventorySettings } =
    useSyncSettingsHandler()

  return (
    <LoginWrapper>
      <CustomHeader
        title='WitchTrade | Sync Settings'
        description='Sync Settings'
        url='https://witchtrade.org/user/settings/sync'
      />
      <SettingNav />
      <PageHeader
        title='Sync Settings'
        description='Sync your Witch It inventory'
      />
      <div className='flex flex-col justify-center px-4 mx-auto max-w-lg sm:px-6'>
        <div className='p-1 my-3 bg-wt-surface-dark rounded-lg'>
          <p className='text-xl font-bold text-center'>
            Witch It Inventory Sync
          </p>
          {!invLoading && (
            <>
              <div className='flex justify-evenly items-center mt-2'>
                <ActionButton onClick={syncInventory} type='info'>
                  Sync Inventory
                </ActionButton>
                {inventory.lastSynced && (
                  <p>Last synced: {dayjs().to(dayjs(inventory.lastSynced))}</p>
                )}
                {!inventory.id && <p>Last synced: Never</p>}
              </div>
              <p className='mt-1 text-sm text-center'>
                You can sync your inventory every 30 minutes
              </p>
            </>
          )}
          {invLoading && <Loading text='Syncing inventory...' />}
          {inventory.id && !invLoading && (
            <div
              className='flex justify-center m-3'
              style={{ minWidth: '220px', height: '40px' }}
            >
              <CheckboxInput
                placeholder='Show inventory in search and profiles'
                value={inventory.showInTrading}
                setValue={() =>
                  updateInventorySettings({
                    showInTrading: !inventory.showInTrading,
                  })
                }
              />
            </div>
          )}
        </div>
      </div>
    </LoginWrapper>
  )
}

export default Sync
