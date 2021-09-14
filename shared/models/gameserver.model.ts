export interface Gameserver {
    name: string;
    playerCount: number;
    maxPlayers: number;
    gameMode: string;
    players: Player[];
}

interface Player {
    name: string;
    playingFor: number;
}
