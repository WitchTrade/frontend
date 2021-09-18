export interface ThemeColors {
    light: string;
    dark: string;
    text: string;

    selectedLight: string;
    selected: string;
    selectedDark: string;
    disabled: string;
    surface: string;
    surfaceDark: string;
    hover: string;
    hoverLight: string;

    accentLight: string;
    accent: string;

    info: string;
    infoDark: string;
    infoLight: string;
    success: string;
    successDark: string;
    successLight: string;
    warning: string;
    warningDark: string;
    warningLight: string;
    error: string;
    errorDark: string;
    errorLight: string;

    chartColor1: string;
    chartColor2: string;
    chartColor3: string;
    chartColor4: string;
    chartColor5: string;

    chartBackground: string;
    chartText: string;
}

export function createThemeColors(params: Partial<ThemeColors>) {
    return {
        light: params.light ? params.light : '',
        dark: params.dark ? params.dark : '',
        text: params.text ? params.text : '',
        selectedLight: params.selectedLight ? params.selectedLight : '',
        selected: params.selected ? params.selected : '',
        selectedDark: params.selected ? params.selected : '',
        disabled: params.disabled ? params.disabled : '',
        surface: params.surface ? params.surface : '',
        surfaceDark: params.surfaceDark ? params.surfaceDark : '',
        hover: params.hover ? params.hover : '',
        hoverLight: params.hoverLight ? params.hoverLight : '',
        accentLight: params.accentLight ? params.accentLight : '',
        accent: params.accent ? params.accent : '',
        info: params.info ? params.info : '',
        infoDark: params.infoDark ? params.infoDark : '',
        infoLight: params.infoLight ? params.infoLight : '',
        success: params.success ? params.success : '',
        successDark: params.successDark ? params.successDark : '',
        successLight: params.successLight ? params.successLight : '',
        warning: params.warning ? params.warning : '',
        warningDark: params.warningDark ? params.warningDark : '',
        warningLight: params.warningLight ? params.warningLight : '',
        error: params.error ? params.error : '',
        errorDark: params.errorDark ? params.errorDark : '',
        errorLight: params.errorLight ? params.errorLight : '',
        chartColor1: params.chartColor1 ? params.chartColor1 : '',
        chartColor2: params.chartColor2 ? params.chartColor2 : '',
        chartColor3: params.chartColor3 ? params.chartColor3 : '',
        chartColor4: params.chartColor4 ? params.chartColor4 : '',
        chartColor5: params.chartColor5 ? params.chartColor5 : '',

        chartBackground: params.chartBackground ? params.chartBackground : '',
        chartText: params.chartText ? params.chartText : ''
    } as ThemeColors;
}