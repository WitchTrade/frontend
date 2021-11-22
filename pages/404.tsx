import type { NextPage } from 'next';
import Image from 'next/image';

const NotFound: NextPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-5xl font-bold text-wt-accent text-center py-4">Page not found</p>
      <Image src="/assets/images/notFound.gif" height={810} width={1440} quality={100} alt="Not found pixel art"/>
    </div>
  );
};

export default NotFound;
