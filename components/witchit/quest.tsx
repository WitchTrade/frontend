import Image from 'next/image'
import React, { FunctionComponent } from 'react'
import { Quest } from '../../shared/models/quest.model'
import { Item } from '../../shared/stores/items/item.model'

interface Props {
  quest: Quest
  openItemDetails: (item: Item) => void
}

const Quest: FunctionComponent<Props> = ({ quest, openItemDetails }) => {
  return (
    <div
      className='flex flex-col p-2 m-2 w-full bg-wt-surface-dark rounded-lg border-2 sm:flex-row'
      style={{
        borderColor: `#${quest.rewardItem.rarityColor}`,
        maxWidth: '300px',
      }}
    >
      <div className='relative self-center w-20 h-20'>
        <Image
          className='rounded-lg cursor-pointer'
          src={quest.rewardItem.iconUrl}
          height={80}
          width={80}
          alt={quest.rewardItem.name}
          onClick={() => openItemDetails(quest.rewardItem)}
        />
        {quest.rewardAmount > 1 && (
          <p className='absolute right-1 bottom-0 font-bold'>
            {quest.rewardAmount}
          </p>
        )}
      </div>
      <div className='flex flex-col flex-1 justify-between ml-2'>
        <p>{quest.quest.string}</p>
        <div className='relative w-full h-6 bg-wt-surface rounded-full'>
          <div
            className='absolute top-0 left-0 h-6 text-center bg-wt-accent rounded-full'
            style={{
              width: `${
                (quest.progress / quest.maxProgress) * 100 <= 100
                  ? (quest.progress / quest.maxProgress) * 100
                  : 100
              }%`,
            }}
          ></div>
          <p className='absolute inset-x-0 mx-auto'>
            {quest.progress > 0 && quest.completed
              ? 'Completed'
              : `${quest.progress} / ${quest.maxProgress}`}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Quest
