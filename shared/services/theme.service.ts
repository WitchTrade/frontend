import { BehaviorSubject } from 'rxjs';
import { Theme } from '../models/theme.model';

class ThemeService {
    public avaiableThemes: Theme[] = [
        { key: 'theme-dark', type: 'dark', displayName: 'Dark' },
        { key: 'theme-dracula', type: 'dark', displayName: 'Dracula' },
        { key: 'theme-light', type: 'light', displayName: 'Light' },
    ];

    private _currentThemeSubj: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this.avaiableThemes[0]);
    public currentTheme$ = this._currentThemeSubj.asObservable();

    public init(): void {
        let storageTheme = localStorage.getItem('theme');

        if (!storageTheme) {
            localStorage.setItem('theme', this._currentThemeSubj.value.key);
            storageTheme = this._currentThemeSubj.value.key;
        }

        let theme = this.avaiableThemes.find(availableTheme => availableTheme.key === storageTheme);

        if (!theme) {
            return;
        }

        this._currentThemeSubj.next(theme);

        // apply theme
        document.body.className = theme.key;
    }

    /**
     * Applies a new theme and saves it in the local storage.
     * @param new theme to apply and save in local storage
     */
    public applyTheme(newTheme: Theme): void {
        localStorage.setItem('theme', newTheme.key);
        this._currentThemeSubj.next(newTheme);

        // apply theme
        document.body.className = newTheme.key;
    };
}

const themeService = new ThemeService();
export default themeService;