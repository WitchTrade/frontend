import { BehaviorSubject } from 'rxjs';
import { Theme } from '../models/theme.model';
import { darkTheme } from '../themes/dark';
import { draculaTheme } from '../themes/dracula';
import { lightTheme } from '../themes/light';

class ThemeService {
    public officialThemes: Theme[] = [
        { key: 'dark', type: 'dark', displayName: 'Dark', colors: darkTheme, official: true },
        { key: 'dracula', type: 'dark', displayName: 'Dracula', colors: draculaTheme, official: true },
        { key: 'light', type: 'light', displayName: 'Light', colors: lightTheme, official: true },
    ];

    private _avaiableThemesSubj: BehaviorSubject<Theme[]> = new BehaviorSubject<Theme[]>([...this.officialThemes]);
    public avaiableThemes$ = this._avaiableThemesSubj.asObservable();

    private _currentThemeSubj: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this._avaiableThemesSubj.getValue()[0]);
    public currentTheme$ = this._currentThemeSubj.asObservable();

    public init(): void {
        this.loadCustomThemes();
        let storageTheme = localStorage.getItem('theme');

        if (!storageTheme) {
            localStorage.setItem('theme', this._currentThemeSubj.value.key);
            storageTheme = this._currentThemeSubj.value.key;
        }

        let theme = this._avaiableThemesSubj.getValue().find(availableTheme => availableTheme.key === storageTheme);

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

    public loadCustomThemes() {
        const customThemesString = localStorage.getItem('customThemes');
        let customThemes: Theme[] = [];
        if (customThemesString) {
            customThemes = JSON.parse(customThemesString);
        }
        const tempThemes = [...this.officialThemes];
        tempThemes.push(...customThemes);
        this._avaiableThemesSubj.next(tempThemes);
    }
}

const themeService = new ThemeService();
export default themeService;