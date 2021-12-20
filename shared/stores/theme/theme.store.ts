import { createState, Store, withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import { Theme } from '../../models/theme.model';
import { betaBlueTheme } from '../../themes/betaBlue';
import { darkTheme } from '../../themes/dark';
import { draculaTheme } from '../../themes/dracula';
import { lightTheme } from '../../themes/light';
import { midnightPumpkinTheme } from '../../themes/midnightPumpkin';
import { mintyGingerbreadTheme } from '../../themes/mintyGingerbread';
import { morgaryllForestTheme } from '../../themes/morgaryllForest';

export const officialThemes: Theme[] = [
  { key: 'dark', type: 'dark', displayName: 'Dark', colors: darkTheme, creator: 'official', official: true },
  { key: 'dracula', type: 'dark', displayName: 'Dracula', colors: draculaTheme, creator: 'official', official: true },
  { key: 'betaBlue', type: 'dark', displayName: 'Beta Blue', colors: betaBlueTheme, creator: 'official', official: true },
  { key: 'light', type: 'light', displayName: 'Light', colors: lightTheme, creator: 'official', official: true },
  { key: 'midnightPumpkin', type: 'dark', displayName: 'Midnight Pumpkin', creator: 'by pumpkin22/7', colors: midnightPumpkinTheme, official: true },
  { key: 'mintyGingerbread', type: 'dark', displayName: 'Minty Gingerbread', creator: 'by gedankenkind', colors: mintyGingerbreadTheme, official: true },
  { key: 'morgaryllForest', type: 'dark', displayName: 'Morgaryll Forest', creator: 'by Faline', colors: morgaryllForestTheme, official: true }
];

const { state: allThemeState, config: allThemeConfig } = createState(withEntities<Theme, 'key'>({ initialValue: officialThemes, idKey: 'key' }));

export const allThemesStore = new Store({ name: 'allThemes', state: allThemeState, config: allThemeConfig });

const { state, config } = createState(withProps<Theme>(allThemesStore.getValue()[0]));

export const themeStore = new Store({ name: 'theme', state, config });
