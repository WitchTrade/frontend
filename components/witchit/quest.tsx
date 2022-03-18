import React, { FunctionComponent } from 'react'
import Image from 'next/image';
import { Quest } from '../../shared/models/quest.model'
import { Item } from '../../shared/stores/items/item.model';

interface Props {
  quest: Quest;
  openItemDetails: (item: Item) => void;
}

const Quest: FunctionComponent<Props> = ({ quest, openItemDetails }) => {
  return (
    <div className="flex flex-col sm:flex-row rounded-lg bg-wt-surface-dark m-2 border-2 p-2 w-full" style={{ borderColor: `#${quest.rewardItem.rarityColor}`, maxWidth: '300px' }}>
      <div className="relative h-20 w-20 self-center">
        <Image className="rounded-lg cursor-pointer" src={quest.rewardItem.iconUrl} height={80} width={80} alt={quest.rewardItem.name} onClick={() => openItemDetails(quest.rewardItem)} />
        <p className="absolute bottom-0 right-1 font-bold">{quest.rewardAmount}</p>
      </div>
      <div className="ml-2 flex-1">
        <p>{quest.quest.string}</p>
        <div className="w-100 h-6 rounded-full bg-wt-surface relative">
          <div
            className="absolute top-0 left-0 bg-wt-accent h-6 rounded-full text-center"
            style={{
              width: `${quest.progress / quest.maxProgress * 100 <= 100 ? quest.progress / quest.maxProgress * 100 : 100}%`
            }}
          >
          </div>
          <p className="absolute left-0 right-0 mx-auto">{quest.progress > 0 && quest.completed ? 'Completed' : `${quest.progress} / ${quest.maxProgress}`}</p>
        </div>
      </div>
    </div>
  )
}

export default Quest
