import { FunctionComponent } from 'react';
import Image from 'next/image';
import useThemeProvider from '../../shared/providers/theme.provider';

const Footer: FunctionComponent = () => {
    const { theme } = useThemeProvider();

    return (
        <div className="bg-wt-surface-dark text-wt-text py-4">
            <div className="text-center w-full">
                <div className="flex justify-center my-1">
                    <a className="rounded-full mb-1" href="https://discord.gg/wm7sTW8MJq" target="_blank" rel="noreferrer">
                        <div className="bg-wt-surface rounded-full p-1 w-9 h-9 flex justify-center items-center hover:bg-wt-accent">
                            <Image src={`/assets/svgs/discord/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height={24} width={24} alt="Discord Logo" />
                        </div>
                    </a>
                </div>
                <p className="text-sm">Version <b>1.0.0</b> • xx.xx.xxxx</p>
                <div className="flex justify-center">
                    <p className="text-sm">Made with </p>
                    <Image src="/assets/svgs/heart.svg" height={20} width={24} alt="Heart" />
                    <p className="text-sm"> by GiyoMoon</p>
                </div>
                <p className="font-bold">Disclaimer</p>
                <p className="text-sm">All material about Witch It belongs to Barrel Roll Games</p>
                <p className="text-sm">This content is not affiliated with, endorsed, sponsored, or specifically approved by Barrel Roll Games and Barrel Roll Games is not responsible for it.</p>
            </div>
        </div>
    );
};

export default Footer;