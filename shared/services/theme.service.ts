import { BehaviorSubject } from 'rxjs';
import { Theme } from '../models/theme.model';

class ThemeService {
    private _currentThemeSubj: BehaviorSubject<Theme> = new BehaviorSubject<Theme>({ theme: 'theme-dark', type: 'dark' });
    public currentTheme$ = this._currentThemeSubj.asObservable();

    public init(): void {
        let theme = localStorage.getItem('theme');
        let type = localStorage.getItem('theme-type') as 'light' | 'dark';

        // set default theme is none is set
        if (!theme) {
            localStorage.setItem('theme', this._currentThemeSubj.value.theme);
            theme = this._currentThemeSubj.value.theme;
        }
        if (!type) {
            localStorage.setItem('theme-type', this._currentThemeSubj.value.type);
            type = this._currentThemeSubj.value.type;
        }

        this._currentThemeSubj.next({ theme, type });

        // apply theme
        document.body.className = theme;
    }

    /**
     * Applies a new theme and saves it in the local storage.
     * @param new theme to apply and save in local storage
     */
    public applyTheme(newTheme: Theme): void {
        localStorage.setItem('theme', newTheme.theme);
        localStorage.setItem('theme-type', newTheme.type);
        this._currentThemeSubj.next({ theme: newTheme.theme, type: newTheme.type });

        // apply theme
        document.body.className = newTheme.theme;
    };
}

const themeService = new ThemeService();
export default themeService;