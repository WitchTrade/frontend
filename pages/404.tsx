import Image from 'next/image'
import type { NextPage } from 'next'

const NotFound: NextPage = () => {
  return (
    <div className='px-4 mx-auto max-w-6xl sm:px-6 lg:px-8'>
      <p className='py-4 text-5xl font-bold text-center text-wt-accent'>
        Page not found
      </p>
      <Image
        src='/assets/images/notFound.gif'
        height={810}
        width={1440}
        quality={100}
        alt='Not found pixel art'
      />
    </div>
  )
}

export default NotFound
