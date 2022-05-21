export interface ThemeColors {
  light: string
  dark: string
  text: string

  selected: string
  disabled: string
  surface: string
  surfaceDark: string
  hover: string

  accentLight: string
  accent: string

  verified: string

  info: string
  infoDark: string
  infoLight: string
  success: string
  successDark: string
  successLight: string
  warning: string
  warningDark: string
  warningLight: string
  error: string
  errorDark: string
  errorLight: string

  chartColor1: string
  chartColor2: string
  chartColor3: string
  chartColor4: string
  chartColor5: string

  chartBackground: string
  chartText: string
}

export function createThemeColors(params: Partial<ThemeColors>) {
  return {
    light: params.light ? params.light : '',
    dark: params.dark ? params.dark : '',
    text: params.text ? params.text : '',
    selected: params.selected ? params.selected : '',
    disabled: params.disabled ? params.disabled : '',
    surface: params.surface ? params.surface : '',
    surfaceDark: params.surfaceDark ? params.surfaceDark : '',
    hover: params.hover ? params.hover : '',
    accentLight: params.accentLight ? params.accentLight : '',
    accent: params.accent ? params.accent : '',
    verified: params.verified ? params.verified : '',
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
    chartText: params.chartText ? params.chartText : '',
  } as ThemeColors
}

export interface ThemeStyle {
  '--wt-light': string
  '--wt-dark': string
  '--wt-text': string
  '--wt-selected': string
  '--wt-disabled': string
  '--wt-surface': string
  '--wt-surface-dark': string
  '--wt-hover': string
  '--wt-accent-light': string
  '--wt-accent': string
  '--wt-verified': string
  '--wt-info': string
  '--wt-info-dark': string
  '--wt-info-light': string
  '--wt-success': string
  '--wt-success-dark': string
  '--wt-success-light': string
  '--wt-warning': string
  '--wt-warning-dark': string
  '--wt-warning-light': string
  '--wt-error': string
  '--wt-error-dark': string
  '--wt-error-light': string
  '--wt-chartbg': string
  'background-color': 'var(--wt-surface)'
  color: 'var(--wt-text)'
}
