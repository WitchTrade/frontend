import { useEffect, useState } from 'react';
import { Theme } from '../models/theme.model';
import themeService from '../services/theme.service';

const ThemeHandler = () => {
    const [theme, setTheme] = useState<Theme>();

    useEffect(() => {
        const themeSub = themeService.currentTheme$.subscribe(setTheme);

        return (() => {
            themeSub.unsubscribe();
        });
    }, []);

    return { theme };
};

export default ThemeHandler;