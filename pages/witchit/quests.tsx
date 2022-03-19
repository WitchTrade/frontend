import { useEffect, useState } from 'react';
import { useObservable } from '@ngneat/react-rxjs';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import CustomHeader from '../../components/core/CustomHeader';
import WitchItNav from '../../components/navs/WitchItNav';
import PageHeader from '../../components/styles/PageHeader';
import { userStore } from '../../shared/stores/user/user.store';
import useQuestsHandler from '../../shared/handlers/quests.handler';
import Loading from '../../components/styles/Loading';
import Quest from '../../components/witchit/quest';
import ItemDetailDialog from '../../components/items/ItemDetailDialog';
import ItemsHandler from '../../shared/handlers/items.handler';
import { inventoryStore } from '../../shared/stores/inventory/inventory.store';
import NextQuest from '../../components/witchit/nextQuest';
import ActionButton from '../../components/styles/ActionButton';

const Quests = () => {
  const [user] = useObservable(userStore);
  const [inventory] = useObservable(inventoryStore);
  const [timeString, setTimeString] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const {
    quests,
    loading,
    getQuests,
    cachedAt,
  } = useQuestsHandler();

  const {
    dialogOpen,
    setDialogOpen,
    selectedItem,
    openItemDetails,
    capitalizeFirstLetter
  } = ItemsHandler();

  useEffect(() => {
    dayjs.extend(duration);
  }, []);

  useEffect(() => {
    if (user.loggedIn && user.verifiedSteamProfileLink) {
      getQuests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    formatDate()
    const interval = setInterval(() => {
      formatDate()
    }, 1000);

    return () => {
      clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedAt]);

  const formatDate = () => {
    const cachedAtDate = new Date(cachedAt);
    setTimeLeft(new Date(cachedAtDate.getTime() + 5.06 * 60000).getTime() - new Date().getTime());
    setTimeString(dayjs.duration(dayjs(cachedAtDate.getTime() + 5.06 * 60000).diff(dayjs())).format('mm:ss'));
  }

  return (
    <>
      <CustomHeader
        title="WitchTrade | Witch It"
        description="Witch It related tools on WitchTrade."
        url="https://witchtrade.org/witchit"
      />
      <ItemDetailDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} item={selectedItem} inventory={inventory} capitalizeFirstLetter={capitalizeFirstLetter} />
      <WitchItNav />
      <PageHeader title="Witch It Quests" description="Ingame quest overview" />
      <p className="text-center mb-2 -mt-2 text-sm"><span className="text-wt-warning">Warning:</span> Quests are cached for 5 minutes</p>
      {!user.loggedIn &&
        <div className="flex flex-col text-center">
          <p className="text-center pt-2 text-xl text-wt-warning-light">Please log in to access this page</p>
          <div>
            <Image src="/assets/images/chicken.png" height="75" width="75" alt="No access chicken" />
          </div>
        </div>
      }
      {user.loggedIn && !user.verifiedSteamProfileLink &&
        <div className="flex flex-col text-center">
          <p className="text-center pt-2 text-xl text-wt-warning-light">Please verify your steam profile link in your <Link href="/user/settings/account"><a className="hover:underline text-wt-accent cursor-pointer">account settings</a></Link></p>
          <div>
            <Image src="/assets/images/chicken.png" height="75" width="75" alt="No access chicken" />
          </div>
        </div>
      }
      {user.loggedIn && user.verifiedSteamProfileLink &&
        <div className="flex flex-col text-center justify-center">
          <div className="flex justify-center pb-2">
            <ActionButton type="success" onClick={getQuests} disabled={loading || timeLeft > 0}>
              <Image src="/assets/svgs/refresh.svg" height="24px" width="24px" alt="Refresh" />
              Refresh{timeLeft > 0 ? `(${timeString})` : ''}
            </ActionButton>
          </div>
          {loading &&
            <Loading text="Loading quests" />
          }
          {!loading &&
            <div className="flex flex-col">
              <p className="font-bold text-2xl" >Weekly</p>
              <div className='flex flex-wrap justify-center'>
                {quests.filter(q => q.type === 'weekly').map((q, index) => (
                  <Quest key={index} quest={q} openItemDetails={openItemDetails} />
                ))}
                {quests.filter(q => q.type === 'weekly').length < 2 &&
                  <NextQuest type='weekly' />
                }
              </div>
              <p className="font-bold text-2xl" >Daily</p>
              <div className='flex flex-wrap justify-center'>
                {quests.filter(q => q.type === 'daily').map((q, index) => (
                  <Quest key={index} quest={q} openItemDetails={openItemDetails} />
                ))}
                {quests.filter(q => q.type === 'daily').length < 3 &&
                  <NextQuest type='daily' />
                }
              </div>
            </div>
          }
        </div>
      }
    </>
  )
}

export default Quests;
