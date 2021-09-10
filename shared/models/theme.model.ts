import { ThemeColors } from './themeColor.model';

export interface Theme {
    key: string;
    type: 'light' | 'dark';
    displayName: string;
    colors: ThemeColors;
}

export function createTheme(params: Partial<Theme>) {
    return {
        key: params.key ? params.key : null,
        type: params.type ? params.type : null,
        displayName: params.displayName ? params.displayName : null,
        colors: params.colors ? params.colors : null
    } as Theme;
}