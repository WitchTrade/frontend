import type { NextPage } from 'next';
import Link from 'next/link';
import Section from '../components/text/Section';
import Title from '../components/text/Title';

const FAQ: NextPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-2">
        <Title level={1}>Frequenty asked questions (FAQ)</Title>
      </div>
      <div className="mb-2">
        <Title level={2}>Profile verification</Title>
      </div>
      <Title level={4}>What are the benefits of being verified?</Title>
      <ul className="list-disc pl-8">
        <li>
          Being verified shows other users that:
          <ul className="list-disc pl-8">
            <li>
              you are the user that you claim to be.
            </li>
            <li>
              your market is not fake and you are really offering the items you claim to offer.
            </li>
            <li>
              your prices are real.
            </li>
            <li>
              you have a steam profile AND trade link linked to your account.
            </li>
          </ul>
        </li>
        <li>
          Verified users will be displayed on top of every other users, even if they are offering things for a higher price or if they have less offers.
        </li>
      </ul>
      <Title level={4}>Can I loose my verification?</Title>
      Yes, you could. If:
      <ul className="list-disc pl-8">
        <li>
          you change your steam profile or trade link, you will get unverified automatically.
        </li>
        <li>
          you break any criteria for being verified, WitchTrade is allowed to remove your verification.
        </li>
      </ul>
      <Title level={4}>How do I get verified?</Title>
      Make sure you meet the following criteria:
      <ul className="list-disc pl-8">
        <li>
          You have both a valid steam profile and trade link linked to your WitchTrade account.
        </li>
        <li>
          In order to ensure that you are really the steam user that you have linked, you need to link your WitchTrade profile in the steam profile description and make sure it&apos;s public. This link can be removed again after you are verified.
        </li>
        <li>
          Your market is real and you are really offering the items present.
        </li>
        <li>
          Your prices are real and there are no placeholder prices eg. &quot;0 price means I want items from my wishlist&quot;
        </li>
        <li>
          Your username and display name don&apos;t impersonate another known person in the Witch It community.
        </li>
      </ul>
      <Section>
        After you made sure that you fulfil all these requirements, you have to send your WitchTrade profile link into the verification channel on the <Link href="https://discord.gg/wm7sTW8MJq"><a className="hover:underline text-wt-accent cursor-pointer" target="_blank" rel="noreferrer">WitchTrade Discord</a></Link>.
      </Section>
    </div>
  );
};

export default FAQ;
