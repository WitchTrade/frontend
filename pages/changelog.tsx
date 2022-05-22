import Link from 'next/link'
import CustomHeader from '../components/core/CustomHeader'
import Title from '../components/text/Title'
import type { NextPage } from 'next'

const Changelog: NextPage = () => {
  return (
    <>
      <CustomHeader
        title='WitchTrade | Changelog'
        description='Changelog'
        url='https://witchtrade.org/changelog'
      />
      <div className='px-4 pb-4 mx-auto max-w-6xl sm:px-6 lg:px-8'>
        <div className='mb-2'>
          <Title level={1}>Changelog</Title>
        </div>
        <Title level={4}>Version 1.3.0 (22.05.2022)</Title>
        <p>
          <b>Added:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>
            When syncing your market, you can now see which items have been
            updated and which have been deleted
          </li>
        </ul>
        <p>
          <b>Changed:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>
            The remaining time until a new quest is available is now always
            displayed, even if all quest slots are occupied
          </li>
        </ul>
        <Title level={4}>Version 1.2.0 (21.03.2022)</Title>
        <p>
          <b>Added:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>
            Witch It quests! View your current ingame quests{' '}
            <Link href='/witchit/quests'>
              <a className='text-wt-accent hover:underline cursor-pointer'>
                here
              </a>
            </Link>
          </li>
        </ul>
        <p>
          <b>Changes:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>Disabled Christmas themed navbar</li>
        </ul>
        <Title level={4}>Version 1.1.3 (01.02.2022)</Title>
        <p>
          <b>Added:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>Completionist badges</li>
        </ul>
        <Title level={4}>Version 1.1.2 (24.01.2022)</Title>
        <p>
          <b>Added:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>
            Emotes for the market descriptions. Check out the{' '}
            <Link href='/faq'>
              <a className='text-wt-accent hover:underline cursor-pointer'>
                FAQ
              </a>
            </Link>
            .
          </li>
          <li>Moderator badge</li>
        </ul>
        <p>
          <b>Changes:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>Updated max description length to 250 characters.</li>
        </ul>
        <Title level={4}>Version 1.1.1 (11.01.2022)</Title>
        <p>
          <b>Added:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>
            Markdown markup language support for market descriptions. Check out
            the{' '}
            <Link href='/faq'>
              <a className='text-wt-accent hover:underline cursor-pointer'>
                FAQ
              </a>
            </Link>
            .
          </li>
        </ul>
        <Title level={4}>Version 1.1.0 (07.01.2022)</Title>
        <p>
          <b>Added:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>GitHub and Steam Group links in the footer</li>
        </ul>
        <p>
          <b>Changes:</b>
        </p>
        <li>
          Rework of the sync offer feature
          <ul className='pl-8 list-disc'>
            <li>Specify prices for both items and recipes!</li>
            <li>
              Dynamic prices: Choose dynamic prices to set ingredients based on
              the item&apos;s rarity, character or event
            </li>
            <li>
              Ignore list: Define a list of items which should be ignore when
              syncing your market
            </li>
            <li>
              Sync overview: After a manual sync in the manage market view,
              there will be a overview of the newly added items (Makes reviewing
              new offers a lot easier)
            </li>
          </ul>
        </li>
        <li>
          Reordered the slot dropdown values in the filter. Ingredients and
          recipes are now on the top. Other values are sorted alphabetically.
        </li>
        <li>
          Changed how fetching the game servers works internally. Improves the
          speed slightly.
        </li>
        <li>Improved usability of number input fields</li>
        <p>
          <b>Bug fixes:</b>
        </p>
        <li>Fixed price rating mistake in the search trade view</li>
        <li>
          Fixed the &quot;I want both prices&quot; bug when editing a trade
        </li>
        <Title level={4}>Version 1.0.6 (20.12.2021)</Title>
        <p>
          <b>Added:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>AND/OR option if a trade has two prices set</li>
        </ul>
        <p>
          <b>Changes:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>Multi select dropdowns for the item filter</li>
        </ul>
        <Title level={4}>Version 1.0.5 (18.12.2021)</Title>
        <p>
          <b>Added:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>Steam profile verification</li>
        </ul>
        <Title level={4}>Version 1.0.4 (13.12.2021)</Title>
        <p>
          <b>Added:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>Winterdream 2021 event</li>
          <li>Items from Witch It version 1.2.3</li>
        </ul>
        <Title level={4}>Version 1.0.3 (05.12.2021)</Title>
        <p>
          <b>Added:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>
            Three new themes!
            <ul className='pl-8 list-disc'>
              <li>
                &quot;Midnight Pumpkin&quot; by{' '}
                <Link href='/@/pumpkin227'>
                  <a className='text-wt-accent hover:underline cursor-pointer'>
                    pumpkin22/7
                  </a>
                </Link>
              </li>
              <li>
                &quot;Minty Gingerbread&quot; by{' '}
                <Link href='/@/gedankenkind'>
                  <a className='text-wt-accent hover:underline cursor-pointer'>
                    gedankenkind
                  </a>
                </Link>
              </li>
              <li>
                &quot;Morgaryll Forest&quot; by{' '}
                <Link href='/@/windverweht'>
                  <a className='text-wt-accent hover:underline cursor-pointer'>
                    Faline
                  </a>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <p>
          <b>Changes:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>
            Revised theming
            <ul className='pl-8 list-disc'>
              <li>Buttons are now always based on status colors</li>
              <li>
                The user dropdown is now themed like the notification dropdown
              </li>
              <li>The color of the verified badge can now be customized</li>
              <li>Removed some unnecessary/unused colors</li>
            </ul>
          </li>
        </ul>
        <Title level={4}>Version 1.0.2 (29.11.2021)</Title>
        <p>
          <b>Added:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>
            <Link href='/rules'>
              <a className='text-wt-accent hover:underline cursor-pointer'>
                Trading Rules
              </a>
            </Link>{' '}
            to ensure a safe and fair environment for all
          </li>
          <li>
            Button to remove single player from the watchlist over the server
            playerlist
          </li>
          <li>
            Clicking on the selected item in the create trade window now also
            opens the item detail view
          </li>
        </ul>
        <p>
          <b>Changes:</b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>Enabled Christmas themed navbar🎄</li>
        </ul>
        <p>
          <b>Bug fixes: </b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>
            Fixed item dialog closing when clicking near the listed trades
          </li>
        </ul>
        <Title level={4}>Version 1.0.1 (27.11.2021)</Title>
        <p>
          <b>Changes: </b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>
            Moved the &quot; Duplicates only&quot; checkbox into the inventory
            dropdown in the filter
          </li>
          <li>
            Added missing metadata for /faq, /changelog, /privacy and /legal
          </li>
        </ul>
        <p>
          <b>Bug fixes: </b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>
            Fixed &quot; wishlist only&quot; search not working when there are
            no items in your wishlist
          </li>
          <li>Fixed &quot; duplicates only&quot; search not working</li>
          <li>Fixed sorting of game server watchlist being case sensitive</li>
          <li>
            Fixed manage market bug that caused the wishlist note to appear in
            the offerlist when there is only a wishlist note set
          </li>
          <li>
            Fixed some inventory item count&apos; s wrapping to a next line in
            different item views
          </li>
          <li>Fixed some icons overlapping in the game servers view</li>
        </ul>
        <Title level={4}>Version 1.0.0 (24.11.2021)</Title>
        <p>
          <b>New Features: </b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>
            Different ingredients can now be demanded for offers and wishlist
            items
          </li>
          <li>
            Verified Profiles.Profiles can now get a verification badge.For more
            information, visit the{' '}
            <Link href='/faq'>
              <a className='text-wt-accent hover:underline cursor-pointer'>
                FAQ
              </a>
            </Link>
          </li>
          <li>
            Custom website themes!Registered users can create their own themes
          </li>
          <li>Stats for Witch It gameservers</li>
          <li>
            Item filter is now available in the profile and manage market view
          </li>
          <li>Item detail view now displays available offers</li>
          <li>Search Filter: Search for items on your wishlist</li>
          <li>Search for profiles in the profiles list</li>
          <li>
            Invalid item notifications are now being deleted automatically
          </li>
          <li>
            Notifications now have timestamps and there is a delete all button
            if 4 or more are shown
          </li>
          <li>WitchTrade font now links you to the home page</li>
          <li>
            Multiple rarities can now be selected in the sync offers dialog/auto
            sync configuration
          </li>
          <li>
            &quot; Remove offers that have 0 on stock&quot; option added to
            offer sync options
          </li>
          <li>Item filters can now be cleared with one button press</li>
          <li>
            Item detail dialog can be opened by pressing on any offer or
            wishlist item on the profile or manage market view
          </li>
          <li>New changelog and FAQ pages</li>
        </ul>
        <p>
          <b>Revised: </b>
        </p>
        <ul className='pl-8 list-disc'>
          <li>Look and feel of every view has being revised</li>
          <li>Newly designed game serverbrowser</li>
          <li>
            Steam inventory can now be synced every 10 minutes.Autosync is still
            at 1 hour
          </li>
        </ul>
      </div>
    </>
  )
}

export default Changelog
