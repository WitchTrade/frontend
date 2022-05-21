import Link from 'next/link'
import CustomHeader from '../components/core/CustomHeader'
import Note from '../components/text/Note'
import Section from '../components/text/Section'
import Title from '../components/text/Title'
import type { NextPage } from 'next'

const Legal: NextPage = () => {
  return (
    <>
      <CustomHeader
        title='WitchTrade | Legal Disclosure'
        url='https://witchtrade.org/legal'
      />
      <div className='px-4 mx-auto max-w-6xl sm:px-6 lg:px-8'>
        <Title level={1}>Legal Disclosure</Title>

        <Note>Last updated November 22, 2021</Note>

        <Title level={2}>Contact</Title>
        <Section>Address on request</Section>
        <Section>Email: witchtrade.org@gmail.com</Section>

        <Title level={2}>Disclaimer</Title>
        <Section>
          The author reserves the right not to be responsible for the
          topicality, correctness, completeness or quality of the information
          provided.
        </Section>

        <Section>
          All offers are non-binding. The author expressly reserves the right to
          change, supplement or delete parts of the pages or the entire offer
          without special notice or to cease publication temporarily or
          permanently.
        </Section>

        <Section>
          The site may contain third-party text materials that have been
          uploaded by users of the site. We assume no liability for this.
        </Section>
        <Title level={2}>Liability for links</Title>
        <Section>
          Our offer contains links to external websites of third parties, on
          whose contents we have no influence. Therefore, we cannot assume any
          liability for these external contents. The respective provider or
          operator of the pages is always responsible for the content of the
          linked pages. The linked pages were checked for possible legal
          violations at the time of linking. Illegal contents were not
          recognizable at the time of linking. However, a permanent control of
          the contents of the linked pages is not reasonable without concrete
          evidence of a violation of the law. If we become aware of any
          infringements, we will remove such links immediately.
        </Section>
        <Title level={2}>Copyright</Title>
        <Section>
          The content and works created by the site operators on these pages are
          subject to Swiss copyright law. Duplication, processing, distribution,
          or any form of commercialization of such material beyond the scope of
          the copyright law shall require the prior written consent of its
          respective author or creator. Downloads and copies of this site are
          only permitted for private, non-commercial use. Insofar as the content
          on this site was not created by the operator, the copyrights of third
          parties are respected. In particular, third-party content is
          identified as such. Should you nevertheless become aware of a
          copyright infringement, please inform us accordingly. If we become
          aware of any infringements, we will remove such content immediately.
        </Section>

        <Section>
          All data (images, text and other information) provided by the game
          Witch It belong to Barrel Roll Games (
          <Link href='https://barrelrollgames.com/'>
            <a
              className='text-wt-accent hover:underline cursor-pointer'
              target='_blank'
              rel='noreferrer'
            >
              https://barrelrollgames.com/
            </a>
          </Link>
          ).
        </Section>
      </div>
    </>
  )
}

export default Legal
