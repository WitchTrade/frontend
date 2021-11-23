import { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useThemeProvider from '../../shared/providers/theme.provider';
import KofiButton from '../styles/KofiButton';
import Tooltip from '../styles/Tooltip';
import useWTStatsProvider from '../../shared/providers/wtStats.provider';

const Footer: FunctionComponent = () => {
  const { theme } = useThemeProvider();
  const { wtStats } = useWTStatsProvider();

  return (
    <div className="bg-wt-surface-dark text-wt-text py-4">
      <div className="text-center w-full">
        <div className="flex justify-center my-1">
          <a className="rounded-full mb-1" href="https://discord.gg/wm7sTW8MJq" target="_blank" rel="noreferrer">
            <Tooltip text="Join the WitchTrade Discord server">
              <div className="bg-wt-surface rounded-full p-1 w-9 h-9 flex justify-center items-center hover:bg-wt-accent">
                <Image src={`/assets/svgs/discord/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height={24} width={24} alt="Discord Logo" />
              </div>
            </Tooltip>
          </a>
        </div>
        <p className="text-sm">Version <b>1.0.0</b> • 24.11.2021</p>
        <p className="text-sm"><span className="font-bold text-wt-accent">{wtStats.users}</span> registered users | <span className="font-bold text-wt-accent">{wtStats.offers}</span> offers</p>
        <div className="flex justify-center mt-2 mb-1">
          <p className="text-sm">Made with </p>
          <Image src="/assets/svgs/heart.svg" height={20} width={24} alt="Heart" />
          <p className="text-sm"> by GiyoMoon</p>
        </div>
        <KofiButton />
        <div className="text-sm my-1">
          <Link href="/faq">
            <a className="hover:underline text-wt-accent cursor-pointer">
              FAQ
            </a></Link> • <Link href="/changelog"><a className="hover:underline text-wt-accent cursor-pointer">
              Changelog
            </a>
          </Link> • <Link href="/privacy"><a className="hover:underline text-wt-accent cursor-pointer">
            Privacy Policy
          </a>
          </Link> • <Link href="/legal"><a className="hover:underline text-wt-accent cursor-pointer">
            Legal Disclosure
          </a>
          </Link>
        </div>
        <p className="font-bold mt-1">Disclaimer</p>
        <p className="text-sm">All material about Witch It belongs to Barrel Roll Games</p>
        <p className="text-sm">This content is not affiliated with, endorsed, sponsored, or specifically approved by Barrel Roll Games and Barrel Roll Games is not responsible for it.</p>
      </div>
    </div>
  );
};

export default Footer;
