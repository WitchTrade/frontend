import { getAllEntities, setEntities } from '@ngneat/elf-entities';
import { Theme } from './theme.model';
import { allThemesStore, officialThemes, themeStore } from './theme.store';

class ThemeService {

  public init(): void {
    this.loadCustomThemes();
    let storageTheme = localStorage.getItem('theme');

    if (!storageTheme) {
      localStorage.setItem('theme', themeStore.getValue().key);
      storageTheme = themeStore.getValue().key;
    }

    let theme = allThemesStore.query(getAllEntities()).find(theme => theme.key === storageTheme) as Theme;

    if (!theme) {
      return;
    }

    themeStore.update(() => theme);
  }

  /**
   * Applies a new theme and saves it in the local storage.
   * @param new theme to apply and save in local storage
   */
  public applyTheme(newTheme: Theme): void {
    localStorage.setItem('theme', newTheme.key);
    themeStore.update(() => newTheme);
  };

  // loads the custom themes from the local storage and loads them
  public loadCustomThemes() {
    const customThemesString = localStorage.getItem('customThemes');
    let customThemes: Theme[] = [];
    if (customThemesString) {
      customThemes = JSON.parse(customThemesString);
    }
    const allThemes = [...officialThemes];
    allThemes.push(...customThemes);
    allThemesStore.update(setEntities(allThemes));
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

export const themeService = new ThemeService();
