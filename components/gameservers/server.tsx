import { FunctionComponent } from 'react';
import Image from 'next/image';
import useDetectOutsideClick from '../../shared/hooks/useDetectOutsideClick';
import { Gameserver } from '../../shared/models/gameserver.model';
import useThemeProvider from '../../shared/providers/theme.provider';
import dayjs from 'dayjs';
import Divider from '../styles/Divider';

interface Props {
    server: Gameserver;
};

const Server: FunctionComponent<Props> = ({ server }) => {
    const { theme } = useThemeProvider();

    const { show, nodeRef, toggleRef } = useDetectOutsideClick(false);

    return (
        <div className="relative w-full">
            <div className={`flex justify-between p-1 cursor-pointer border-wt-accent-light ${show ? 'rounded-t-md border-l border-t border-r' : 'rounded-md border'}`} ref={toggleRef}>
                <p><span className="font-bold">{server.name}</span> | {server.gameMode}</p>
                <div className="flex">
                    <p className={`${server.playerCount === server.maxPlayers ? 'text-wt-warning' : server.playerCount >= 10 ? 'text-wt-success' : ''}`}>{server.playerCount}/{server.maxPlayers}</p>
                    <div className="w-6 h-6">
                        <Image src={`/assets/svgs/expand_${show ? 'less' : 'more'}/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="24px" width="24px" alt="Dropdown Item Icon" />
                    </div>
                </div>
            </div>
            {show &&
                <div ref={nodeRef} className="absolute top-8 left-0 bg-wt-surface-dark rounded-b-md border-l border-b border-r border-wt-accent-light z-50 p-2 w-full">
                    <div className="mx-5 my-1">
                        <Divider />
                    </div>
                    <p className="text-wt-accent text-center">Playing</p>
                    {server.players.map((player, i) => (
                        <div key={i} className="flex justify-between">
                            <p className="text-sm">{player.name}</p>
                            <p className="text-sm">{Math.round(dayjs.duration(player.playingFor, 's').asMinutes())} min</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default Server;