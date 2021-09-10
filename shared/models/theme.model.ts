import { ThemeColors } from './themeColor.model';

export interface Theme {
    key: string;
    type: 'light' | 'dark';
    displayName: string;
    colors: ThemeColors;
}