import { useObservable } from '@ngneat/react-rxjs'
import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { themeStore } from '../../shared/stores/theme/theme.store'
import { wtStatsStore } from '../../shared/stores/wtStats/wtStats.store'
import KofiButton from '../styles/KofiButton'
import Tooltip from '../styles/Tooltip'

const Footer: FunctionComponent = () => {
  const [theme] = useObservable(themeStore)
  const [wtStats] = useObservable(wtStatsStore)

  return (
    <div className='py-4 text-wt-text bg-wt-surface-dark'>
      <div className='w-full text-center'>
        <div className='flex justify-center my-1'>
          <a
            className='mx-1 mb-1 rounded-full'
            href='https://discord.gg/wm7sTW8MJq'
            target='_blank'
            rel='noreferrer'
          >
            <Tooltip text='WitchTrade Discord server'>
              <div className='flex justify-center items-center p-1 w-9 h-9 bg-wt-surface hover:bg-wt-accent rounded-full'>
                <Image
                  src={`/assets/svgs/discord/${
                    theme?.type === 'light' ? 'black' : 'white'
                  }.svg`}
                  height={24}
                  width={24}
                  alt='Discord Logo'
                />
              </div>
            </Tooltip>
          </a>
          <a
            className='mx-1 mb-1 rounded-full'
            href='https://github.com/WitchTrade'
            target='_blank'
            rel='noreferrer'
          >
            <Tooltip text='WitchTrade on GitHub'>
              <div className='flex justify-center items-center p-1 w-9 h-9 bg-wt-surface hover:bg-wt-accent rounded-full'>
                <Image
                  src={`/assets/svgs/github/${
                    theme?.type === 'light' ? 'black' : 'white'
                  }.svg`}
                  height={24}
                  width={24}
                  alt='GitHub Logo'
                />
              </div>
            </Tooltip>
          </a>
          <a
            className='mx-1 mb-1 rounded-full'
            href='https://steamcommunity.com/groups/WitchTrade'
            target='_blank'
            rel='noreferrer'
          >
            <Tooltip text='WitchTrade on Steam'>
              <div className='flex justify-center items-center p-1 w-9 h-9 bg-wt-surface hover:bg-wt-accent rounded-full'>
                <Image
                  src={`/assets/svgs/steam/${
                    theme?.type === 'light' ? 'black' : 'white'
                  }.svg`}
                  height={24}
                  width={24}
                  alt='GitHub Logo'
                />
              </div>
            </Tooltip>
          </a>
        </div>
        <p className='text-sm'>
          Version <b>1.2.0</b> • 21.03.2022
        </p>
        <p className='text-sm'>
          <span className='font-bold text-wt-accent'>{wtStats.users}</span>{' '}
          registered users |{' '}
          <span className='font-bold text-wt-accent'>{wtStats.offers}</span>{' '}
          offers
        </p>
        <div className='flex justify-center mt-2 mb-1'>
          <p className='text-sm'>Made with </p>
          <Image
            src='/assets/svgs/heart.svg'
            height={20}
            width={24}
            alt='Heart'
          />
          <p className='text-sm'> by GiyoMoon</p>
        </div>
        <KofiButton />
        <div className='my-1 text-sm'>
          <Link href='/faq'>
            <a className='text-wt-accent hover:underline cursor-pointer'>FAQ</a>
          </Link>{' '}
          •{' '}
          <Link href='/changelog'>
            <a className='text-wt-accent hover:underline cursor-pointer'>
              Changelog
            </a>
          </Link>{' '}
          •{' '}
          <Link href='/rules'>
            <a className='text-wt-accent hover:underline cursor-pointer'>
              Rules
            </a>
          </Link>{' '}
          •{' '}
          <Link href='/privacy'>
            <a className='text-wt-accent hover:underline cursor-pointer'>
              Privacy Policy
            </a>
          </Link>{' '}
          •{' '}
          <Link href='/legal'>
            <a className='text-wt-accent hover:underline cursor-pointer'>
              Legal Disclosure
            </a>
          </Link>
        </div>
        <p className='mt-1 font-bold'>Disclaimer</p>
        <p className='text-sm'>
          All material about Witch It belongs to Barrel Roll Games
        </p>
        <p className='text-sm'>
          This content is not affiliated with, endorsed, sponsored, or
          specifically approved by Barrel Roll Games and Barrel Roll Games is
          not responsible for it.
        </p>
      </div>
    </div>
  )
}

export default Footer
