import type { NextPage } from 'next';
import Link from 'next/link';
import CustomHeader from '../components/core/CustomHeader';
import Title from '../components/text/Title';

const Changelog: NextPage = () => {
  return (
    <>
      <CustomHeader
        title="WitchTrade | Changelog"
        description="Changelog"
        url="https://witchtrade.org/changelog"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-2">
          <Title level={1}>Changelog</Title>
        </div>
        <Title level={2}>Version 1.0.1 (27.11.2021)</Title>
        <p><b>Changes:</b></p>
        <ul className="list-disc pl-8">
          <li>
            Moved the "Duplicates only" checkbox into the inventory dropdown in the filter
          </li>
          <li>
            Added missing metadata for /faq, /changelog, /privacy and /legal
          </li>
        </ul>
        <p><b>Bug fixes:</b></p>
        <ul className="list-disc pl-8">
          <li>
            Fixed "wishlist only" search not working when there are no items in your wishlist
          </li>
          <li>
            Fixed "duplicates only" search not working
          </li>
          <li>
            Fixed sorting of game server watchlist being case sensitive
          </li>
          <li>
            Fixed manage market bug that caused the wishlist note to appear in the offerlist when there is only a wishlist note set
          </li>
          <li>
            Fixed some inventory item count's wrapping to a next line in different item views
          </li>
          <li>
            Fixed some icons overlapping in the game servers view
          </li>
        </ul>
        <Title level={2}>Version 1.0.0 (24.11.2021)</Title>
        <p><b>New Features:</b></p>
        <ul className="list-disc pl-8">
          <li>
            Different ingredients can now be demanded for offers and wishlist items
          </li>
          <li>
            Verified Profiles. Profiles can now get a verification badge. For more information, visit the <Link href="/faq"><a className="hover:underline text-wt-accent cursor-pointer">FAQ</a></Link>
          </li>
          <li>
            Custom website themes! Registered users can create their own themes
          </li>
          <li>
            Stats for Witch It gameservers
          </li>
          <li>
            Item filter is now available in the profile and manage market view
          </li>
          <li>
            Item detail view now displays available offers
          </li>
          <li>
            Search Filter: Search for items on your wishlist
          </li>
          <li>
            Search for profiles in the profiles list
          </li>
          <li>
            Invalid item notifications are now being deleted automatically
          </li>
          <li>
            Notifications now have timestamps and there is a delete all button if 4 or more are shown
          </li>
          <li>
            WitchTrade font now links you to the home page
          </li>
          <li>
            Multiple rarities can now be selected in the sync offers dialog/auto sync configuration
          </li>
          <li>
            &quot;Remove offers that have 0 on stock&quot; option added to offer sync options
          </li>
          <li>
            Item filters can now be cleared with one button press
          </li>
          <li>
            Item detail dialog can be opened by pressing on any offer or wishlist item on the profile or manage market view
          </li>
          <li>
            New changelog and FAQ pages
          </li>
        </ul>
        <p><b>Revised:</b></p>
        <ul className="list-disc pl-8">
          <li>
            Look and feel of every view has being revised
          </li>
          <li>
            Newly designed game serverbrowser
          </li>
          <li>
            Steam inventory can now be synced every 10 minutes. Autosync is still at 1 hour
          </li>
        </ul>
      </div>
    </>
  );
};

export default Changelog;
