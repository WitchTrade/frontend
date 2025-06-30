import '../styles/global.scss'

import { useObservable } from '@ngneat/react-rxjs'
import {
  Chart,
  PieController,
  LineController,
  ArcElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Legend,
  Tooltip,
} from 'chart.js'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import Layout from '../components/core/Layout'
import appService from '../shared/services/app.service'
import { themeStore } from '../shared/stores/theme/theme.store'
import { ThemeStyle } from '../shared/stores/theme/themeColor.model'
import type { AppProps } from 'next/app'

function WitchTrade({ Component, pageProps }: AppProps) {
  dayjs.extend(relativeTime)
  dayjs.extend(duration)
  dayjs.extend(utc)

  const [theme] = useObservable(themeStore)
  const [themeStyles, setThemeStyles] = useState<ThemeStyle | null>()

  useEffect(() => {
    if (theme && theme.colors) {
      setThemeStyles({
        '--wt-light': theme.colors.light,
        '--wt-dark': theme.colors.dark,
        '--wt-text': theme.colors.text,
        '--wt-selected': theme.colors.selected,
        '--wt-disabled': theme.colors.disabled,
        '--wt-surface': theme.colors.surface,
        '--wt-surface-dark': theme.colors.surfaceDark,
        '--wt-hover': theme.colors.hover,
        '--wt-accent-light': theme.colors.accentLight,
        '--wt-accent': theme.colors.accent,
        '--wt-verified': theme.colors.verified,
        '--wt-info': theme.colors.info,
        '--wt-info-dark': theme.colors.infoDark,
        '--wt-info-light': theme.colors.infoLight,
        '--wt-success': theme.colors.success,
        '--wt-success-dark': theme.colors.successDark,
        '--wt-success-light': theme.colors.successLight,
        '--wt-warning': theme.colors.warning,
        '--wt-warning-dark': theme.colors.warningDark,
        '--wt-warning-light': theme.colors.warningLight,
        '--wt-error': theme.colors.error,
        '--wt-error-dark': theme.colors.errorDark,
        '--wt-error-light': theme.colors.errorLight,
        '--wt-chartbg': theme.colors.chartBackground,
        'background-color': 'var(--wt-surface)',
        color: 'var(--wt-text)',
      })
    }
  }, [theme])

  useEffect(() => {
    Chart.register(
      PieController,
      LineController,
      ArcElement,
      PointElement,
      LineElement,
      CategoryScale,
      LinearScale,
      Title,
      Legend,
      Tooltip
    )
    appService.init()
  }, [])

  useEffect(() => {
    if (!themeStyles) return
    for (const themeStyle in themeStyles) {
      if (themeStyles.hasOwnProperty(themeStyle)) {
        document.documentElement.style.setProperty(
          themeStyle,
          themeStyles[themeStyle]
        )
      }
    }
  }, [themeStyles])

  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            defer
            data-domain='witchtrade.org'
            data-api='/lythia/a/event/'
            src='/lythia/a.js'
          />
          <Script
            defer
            data-domain='witchtrade.org'
            data-api='/lythia/m/event/'
            src='/lythia/m.js'
          />
        </>
      )}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
export default WitchTrade
