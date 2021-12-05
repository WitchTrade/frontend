import { BehaviorSubject } from 'rxjs';
import { Theme } from '../models/theme.model';
import { betaBlueTheme } from '../themes/betaBlue';
import { darkTheme } from '../themes/dark';
import { draculaTheme } from '../themes/dracula';
import { lightTheme } from '../themes/light';
import { midnightPumpkinTheme } from '../themes/midnightPumpkin';
import { mintyGingerbreadTheme } from '../themes/mintyGingerbread';
import { morgaryllForestTheme } from '../themes/morgaryllForest';

class ThemeService {
  public officialThemes: Theme[] = [
    { key: 'dark', type: 'dark', displayName: 'Dark', colors: darkTheme, creator: 'official', official: true },
    { key: 'dracula', type: 'dark', displayName: 'Dracula', colors: draculaTheme, creator: 'official', official: true },
    { key: 'betaBlue', type: 'dark', displayName: 'Beta Blue', colors: betaBlueTheme, creator: 'official', official: true },
    { key: 'light', type: 'light', displayName: 'Light', colors: lightTheme, creator: 'official', official: true },
    { key: 'midnightPumpkin', type: 'dark', displayName: 'Midnight Pumpkin', creator: 'by pumpkin22/7', colors: midnightPumpkinTheme, official: true },
    { key: 'mintyGingerbread', type: 'dark', displayName: 'Minty Gingerbread', creator: 'by gedankenkind', colors: mintyGingerbreadTheme, official: true },
    { key: 'morgaryllForest', type: 'dark', displayName: 'Morgaryll Forest', creator: 'by Faline', colors: morgaryllForestTheme, official: true }
  ];

  // current all themes. Official and custom themes
  private _allThemesSubj: BehaviorSubject<Theme[]> = new BehaviorSubject<Theme[]>([...this.officialThemes]);
  public allThemes$ = this._allThemesSubj.asObservable();

  // current selected theme
  private _currentThemeSubj: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this._allThemesSubj.getValue()[0]);
  public currentTheme$ = this._currentThemeSubj.asObservable();

  public init(): void {
    this.loadCustomThemes();
    let storageTheme = localStorage.getItem('theme');

    if (!storageTheme) {
      localStorage.setItem('theme', this._currentThemeSubj.value.key);
      storageTheme = this._currentThemeSubj.value.key;
    }

    let theme = this._allThemesSubj.getValue().find(theme => theme.key === storageTheme);

    if (!theme) {
      return;
    }

    this._currentThemeSubj.next(theme);
  }

  /**
   * Applies a new theme and saves it in the local storage.
   * @param new theme to apply and save in local storage
   */
  public applyTheme(newTheme: Theme): void {
    localStorage.setItem('theme', newTheme.key);
    this._currentThemeSubj.next(newTheme);
  };

  // loads the custom themes from the local storage and loads them
  public loadCustomThemes() {
    const customThemesString = localStorage.getItem('customThemes');
    let customThemes: Theme[] = [];
    if (customThemesString) {
      customThemes = JSON.parse(customThemesString);
    }
    const allThemes = [...this.officialThemes];
    allThemes.push(...customThemes);
    this._allThemesSubj.next(allThemes);
  }

  public hexToRgbA(hexCode: string, opacity: number) {
    var hex = hexCode.replace('#', '');

    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    var r = parseInt(hex.substring(0, 2), 16),
      g = parseInt(hex.substring(2, 4), 16),
      b = parseInt(hex.substring(4, 6), 16);

    return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
  };
}

const themeService = new ThemeService();
export default themeService;
