import { createState, Store, withProps } from '@ngneat/elf';
import { WtStats } from './wtStats.model';

const { state, config } = createState(withProps<WtStats>({ users: 0, offers: 0 }));

export const wtStatsStore = new Store({ name: 'wtStats', state, config });
