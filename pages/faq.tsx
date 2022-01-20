import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import CustomHeader from '../components/core/CustomHeader';
import Section from '../components/text/Section';
import Title from '../components/text/Title';
import { createNotification } from '../shared/stores/notification/notification.model';
import { notificationService } from '../shared/stores/notification/notification.service';

const FAQ: NextPage = () => {

  const copyEmote = (emote: string) => {
    navigator.clipboard.writeText(emote);
    const notification = createNotification({
      content: `${emote} copied to clipboard`,
      duration: 5000,
      type: 'success'
    });
    notificationService.addNotification(notification);
  };

  return (
    <>
      <CustomHeader
        title="WitchTrade | FAQ"
        description="Frequently Asked Questions"
        url="https://witchtrade.org/faq"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-2">
          <Title level={1}>Frequenty asked questions (FAQ)</Title>
        </div>
        <div id="markdown" className="mb-2">
          <Title level={2}>Market description syntax</Title>
        </div>
        <Section>
          The market descriptions use a subset of the Markdown markup language to allow users to format their text.
        </Section>
        <Title level={3}>Available syntax</Title>
        <div className="flex justify-center">
          <div className="max-w-2xl flex-1">
            <table className="min-w-full">
              <tr className="bg-wt-accent">
                <th className="rounded-tl-lg">Name</th>
                <th>Example</th>
                <th className="rounded-tr-lg">Result</th>
              </tr>
              <tr className="border-b">
                <td>Heading 1</td>
                <td># Title</td>
                <td><h1 className="text-2xl font-bold">Title</h1></td>
              </tr>
              <tr className="border-b">
                <td>Heading 2</td>
                <td>## Title</td>
                <td><h2 className="text-xl font-bold">Title</h2></td>
              </tr>
              <tr className="border-b">
                <td>Heading 3</td>
                <td>### Title</td>
                <td><h3 className="text-lg font-bold">Title</h3></td>
              </tr>
              <tr className="border-b">
                <td>Bold</td>
                <td>**bold text**</td>
                <td><b>bold text</b></td>
              </tr>
              <tr className="border-b">
                <td>Italic</td>
                <td>*italicized text*</td>
                <td><em>italicized text</em></td>
              </tr>
              <tr className="border-b">
                <td>Blockquote</td>
                <td>&gt; blockquote</td>
                <td><blockquote className="border-l-4 border-wt-accent pl-1">blockquote</blockquote></td>
              </tr>
              <tr className="border-b">
                <td>Ordered list</td>
                <td>1. first<br />2. second<br />3. third</td>
                <td>
                  <ol className="list-decimal ml-4">
                    <li>first</li>
                    <li>second</li>
                    <li>third</li>
                  </ol>
                </td>
              </tr>
              <tr className="border-b">
                <td>Unordered list</td>
                <td>- first<br />- second<br />- third</td>
                <td>
                  <ul className="list-disc ml-4">
                    <li>first</li>
                    <li>second</li>
                    <li>third</li>
                  </ul>
                </td>
              </tr>
              <tr className="border-b">
                <td>Code</td>
                <td>`code`</td>
                <td><code>code</code></td>
              </tr>
              <tr className="border-b">
                <td>Horizontal Rule</td>
                <td>---</td>
                <td><hr className="border-t border-wt-accent pl-1" /></td>
              </tr>
              <tr className="border-b">
                <td>Centered text<br />(Works for every heading and default text)</td>
                <td>[c]centered text<br />## [c]Title</td>
                <td><p className="text-center">centered text</p><br /><h2 className="text-xl font-bold text-center">Title</h2></td>
              </tr>
            </table>
          </div>
        </div>
        <Title level={3}>Available emotes</Title>
        <div className="flex justify-center">
          <div className="max-w-2xl flex-1">
            <table className="min-w-full">
              <tr className="bg-wt-accent">
                <th className="rounded-tl-lg">Syntax</th>
                <th className="rounded-tr-lg">Emote</th>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':witchtrade:')}>:witchtrade:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/witchtrade.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':piggy:')}>:piggy:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/piggy.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':sheep:')}>:sheep:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/sheep.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':chicken:')}>:chicken:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/chicken.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':thl:')}>:thl:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/thl.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="h-6"></tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':fingernails:')}>:fingernails:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/fingernails.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':mouse_poop:')}>:mouse_poop:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/mouse_poop.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':troll_eyes:')}>:troll_eyes:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/troll_eyes.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':mandrake:')}>:mandrake:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/mandrake.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':crystallized_moonlight:')}>:crystallized_moonlight:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/crystallized_moonlight.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="h-6"></tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':odd_mushroom:')}>:odd_mushroom:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/odd_mushroom.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':rusty_nails:')}>:rusty_nails:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/rusty_nails.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':shell:')}>:shell:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/shell.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':ectoplasm:')}>:ectoplasm:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/ectoplasm.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':red_string:')}>:red_string:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/red_string.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':coin:')}>:coin:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/coin.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':candy_cane:')}>:candy_cane:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/candy_cane.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':morgaryll_flower:')}>:morgaryll_flower:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/morgaryll_flower.png" height={24} width={24} /></span></td>
              </tr>
              <tr className="border-b text-center">
                <td className="hover:underline text-wt-accent cursor-pointer" onClick={() => copyEmote(':scarab:')}>:scarab:</td>
                <td><span className="emoteWrapper"><Image src="/assets/images/emotes/scarab.png" height={24} width={24} /></span></td>
              </tr>
            </table>
          </div>
        </div>
        <div id="verification" className="mb-2">
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
            To make sure you are really the Steam user you linked, you need to verify your Steam account in your account settings.
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
    </>
  );
};

export default FAQ;
