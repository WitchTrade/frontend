import { useObservable } from '@ngneat/react-rxjs'
import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CustomHeader from '../components/core/CustomHeader'
import ItemDetailDialog from '../components/items/ItemDetailDialog'
import ActionButton from '../components/styles/ActionButton'
import Loading from '../components/styles/Loading'
import PageHeader from '../components/styles/PageHeader'
import NextQuest from '../components/witchit/nextQuest'
import Quest from '../components/witchit/quest'
import ItemsHandler from '../shared/handlers/items.handler'
import useQuestsHandler from '../shared/handlers/quests.handler'
import { inventoryStore } from '../shared/stores/inventory/inventory.store'
import { userStore } from '../shared/stores/user/user.store'

const Quests = () => {
  const [user] = useObservable(userStore)
  const [inventory] = useObservable(inventoryStore)
  const [timeString, setTimeString] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)

  const { quests, loading, getQuests, cachedAt } = useQuestsHandler()

  const {
    dialogOpen,
    setDialogOpen,
    selectedItem,
    openItemDetails,
    capitalizeFirstLetter,
  } = ItemsHandler()

  useEffect(() => {
    if (user.loggedIn && user.witchItUserId) {
      getQuests()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    formatDate()
    const interval = setInterval(() => {
      formatDate()
    }, 1000)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedAt])

  const formatDate = () => {
    const cachedAtDate = new Date(cachedAt)
    setTimeLeft(
      new Date(cachedAtDate.getTime() + 5.06 * 60000).getTime() -
        new Date().getTime()
    )
    setTimeString(
      dayjs
        .duration(dayjs(cachedAtDate.getTime() + 5.06 * 60000).diff(dayjs()))
        .format('mm:ss')
    )
  }

  return (
    <>
      <CustomHeader
        title='WitchTrade | Quests'
        description='View your Witch It quests on WitchTrade.'
        url='https://witchtrade.org/quests'
      />
      <ItemDetailDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        item={selectedItem}
        inventory={inventory}
        capitalizeFirstLetter={capitalizeFirstLetter}
      />
      <PageHeader title='Witch It Quests' />
      {user.loggedIn && user.witchItUserId && (
        <p className='-mt-2 mb-2 text-sm text-center'>
          <span className='text-wt-info'>Info:</span> Quests are cached for 5
          minutes
        </p>
      )}
      {!user.loggedIn && (
        <div className='flex flex-col text-center'>
          <p className='pt-2 text-xl text-center text-wt-warning-light'>
            Please log in to see your current Witch It Quests
          </p>
          <div>
            <Image
              src='/assets/images/chicken.png'
              height='75'
              width='75'
              alt='No access chicken'
            />
          </div>
        </div>
      )}
      {user.loggedIn && !user.witchItUserId && (
        <div className='flex flex-col text-center'>
          <p className='pt-2 text-xl text-center text-wt-warning-light'>
            Please link your Witch It Id profile in your{' '}
            <Link href='/user/settings/account'>
              <a className='text-wt-accent hover:underline cursor-pointer'>
                account settings
              </a>
            </Link>
          </p>
          <div>
            <Image
              src='/assets/images/chicken.png'
              height='75'
              width='75'
              alt='No access chicken'
            />
          </div>
        </div>
      )}
      {user.loggedIn && user.witchItUserId && (
        <div className='flex flex-col justify-center text-center'>
          <div className='flex justify-center pb-2'>
            <ActionButton
              type='success'
              onClick={getQuests}
              disabled={loading || timeLeft > 0}
            >
              <Image
                src='/assets/svgs/refresh.svg'
                height='24px'
                width='24px'
                alt='Refresh'
              />
              Refresh{timeLeft > 0 ? `(${timeString})` : ''}
            </ActionButton>
          </div>
          {loading && <Loading text='Loading quests' />}
          {!loading && (
            <div className='flex flex-col'>
              <p className='text-2xl font-bold'>
                Weekly <NextQuest type='weekly' />
              </p>
              <div className='flex flex-wrap justify-center'>
                {quests
                  .filter((q) => q.type === 'weekly')
                  .map((q, index) => (
                    <Quest
                      key={index}
                      quest={q}
                      openItemDetails={openItemDetails}
                    />
                  ))}
              </div>
              <p className='text-2xl font-bold'>
                Daily <NextQuest type='daily' />
              </p>
              <div className='flex flex-wrap justify-center'>
                {quests
                  .filter((q) => q.type === 'daily')
                  .map((q, index) => (
                    <Quest
                      key={index}
                      quest={q}
                      openItemDetails={openItemDetails}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Quests
