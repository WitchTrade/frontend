import type { NextPage } from 'next';
import CustomHeader from '../components/core/CustomHeader';
import Note from '../components/text/Note';
import Section from '../components/text/Section';
import Title from '../components/text/Title';

const Legal: NextPage = () => {
  return (
    <>
      <CustomHeader
        title="WitchTrade | Rules"
        description="Trading rules for WitchTrade"
        url="https://witchtrade.org/rules"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title level={1}>Trading Rules</Title>

        <Note>Last updated November 29, 2021</Note>

        <Section>By using this website and/or creating an account, you agree to the following rules:</Section>
        <Title level={4}>General rules</Title>
        <ul className="list-disc pl-8">
          <li>
            WitchTrade assumes no responsibility and cannot be held liable for any problems arising from a user&apos;s participation in trading or interaction with other users on the site. Only the user is responsible for ensuring that the content of a trade is as expected before completing it. All features of this website are provided &quotas is&quot and without warranty of any kind.
          </li>
          <li>
            WitchTrade reserves the right to terminate any account or remove any offer at their discretion.
          </li>
        </ul>
        <Title level={4}>The following actions result in a warning</Title>
        <ul className="list-disc pl-8">
          <li>
            <b>Begging</b> - Asking for free items
          </li>
          <li>
            <b>Promotions</b> - Self-advertising, promotions of groups, 3rd party media, etc.
          </li>
          <li>
            <b>Multiple Account Usage</b> - Using multiple accounts
          </li>
          <li>
            <b>Inappropriate Content</b> - NSFW or NSFL content is not permitted in offerlist or wishlist descriptions
          </li>
          <li>
            <b>Posting Links</b> - Posting links in the offerlist or wishlist description is not permitted
          </li>
        </ul>
        <Title level={4}>The following actions result in a ban</Title>
        <ul className="list-disc pl-8">
          <li>
            <b>Botting/Scripting</b> - Using bots/scripts to automate actions
          </li>
          <li>
            <b>Non Witch It Trades</b> - Offering or looking for other items/things which are not Witch It items, like CSGO skins.
          </li>
          <li>
            <b>Code trades</b> – Offering Witch It codes for items or offering items for codes. You are only allowed to trade items that you have in your inventory, and you are not allowed to ask for anything else except Witch It items
          </li>
          <li>
            <b>Ignored Warnings</b> - Failure to comply with Formal Warnings from staff.
          </li>
        </ul>
      </div>
    </>
  );
};

export default Legal;
