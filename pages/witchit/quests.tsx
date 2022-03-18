import { useEffect } from 'react';
import { useObservable } from '@ngneat/react-rxjs';
import Image from 'next/image';
import Link from 'next/link';
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

const Quests = () => {
  const [user] = useObservable(userStore);
  const [inventory] = useObservable(inventoryStore);

  const {
    quests,
    loading,
    getQuests,
  } = useQuestsHandler();

  const {
    dialogOpen,
    setDialogOpen,
    selectedItem,
    openItemDetails,
    capitalizeFirstLetter
  } = ItemsHandler();

  useEffect(() => {
    if (user.loggedIn && user.verifiedSteamProfileLink) {
      getQuests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


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
        <div className="flex text-center justify-center">
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
              </div>
              <p className="font-bold text-2xl" >Daily</p>
              <div className='flex flex-wrap justify-center'>
                {quests.filter(q => q.type === 'daily').map((q, index) => (
                  <Quest key={index} quest={q} openItemDetails={openItemDetails} />
                ))}
              </div>
            </div>
          }
        </div>
      }
    </>
  )
}

export default Quests;
