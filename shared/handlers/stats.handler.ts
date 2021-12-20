import { useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import { themeService } from '../stores/theme/theme.service';
import { useObservable } from '@ngneat/react-rxjs';
import { themeStore } from '../stores/theme/theme.store';

export interface Stat {
  statGroup: string;
  dataset: string;
  label: string;
  value: number;
}

const sortedGameModes = [
  'HaS',
  'Mobi',
  'HaH',
  'Imp',
  'FaP',
];

const sortedWeekDays = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
];

const useStatsHandler = () => {
  const [theme] = useObservable(themeStore);

  const playerDistRegion = useRef<any>(null);
  const playerDistMode = useRef<any>(null);

  const playerCountTotal = useRef<any>(null);
  const playerCountRegion = useRef<any>(null);
  const playerCountMode = useRef<any>(null);

  const [stats, setStats] = useState<Stat[]>([]);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    getStats();
  }, []);

  useEffect(() => {
    if (
      theme &&
      stats.length > 1 &&
      playerDistRegion &&
      playerDistMode &&
      playerCountTotal &&
      playerCountRegion &&
      playerCountMode &&
      !ready
    ) {
      setReady(true);
    }
  }, [
    theme,
    stats,
    playerDistRegion,
    playerDistMode,
    playerCountTotal,
    playerCountRegion,
    playerCountMode
  ]);

  useEffect(() => {
    if (!ready || !theme) return;

    Chart.defaults.color = theme.colors.chartText;
    Chart.defaults.borderColor = themeService.hexToRgbA(theme.colors.chartText, 0.1);

    // PIE CHART
    // REGION
    const playerDistRegionStats = stats.filter((stat) => stat.statGroup === 'w_distribution_region');
    const playerDistRegionChart = new Chart(playerDistRegion.current, {
      type: 'pie',
      data: {
        labels: playerDistRegionStats.map(d => d.label),
        datasets: [{
          data: playerDistRegionStats.map(d => d.value),
          backgroundColor: [
            theme.colors.chartColor1,
            theme.colors.chartColor2,
            theme.colors.chartColor3
          ],
          borderColor: theme.colors.chartText
        }]
      },
      options: createChartOptions(true, true)
    });

    // PIE CHART
    // MODE
    const playerDistModeStats = stats.filter((stat) => stat.statGroup === 'w_distribution_mode');
    playerDistModeStats.sort((a, b) => {
      return sortedGameModes.indexOf(a.dataset) - sortedGameModes.indexOf(b.dataset);
    });
    const playerDistModeChart = new Chart(playerDistMode.current, {
      type: 'pie',
      data: {
        labels: playerDistModeStats.map(d => d.label),
        datasets: [{
          data: playerDistModeStats.map(d => d.value),
          backgroundColor: [
            theme.colors.chartColor1,
            theme.colors.chartColor2,
            theme.colors.chartColor3,
            theme.colors.chartColor4,
            theme.colors.chartColor5,
          ],
          borderColor: theme.colors.chartText
        }]
      },
      options: createChartOptions(true, true)
    });

    // LINE CHART
    // TOTAL
    let playerCountTotalStats = stats.filter((stat) => stat.statGroup === 'w_playercount');

    const last2Hour = new Date();
    last2Hour.setUTCHours(last2Hour.getUTCHours() - (last2Hour.getUTCHours() % 2), 0, 0, 0);
    const last2HourWeekDay = sortedWeekDays[last2Hour.getUTCDay()];

    playerCountTotalStats.sort((a, b) => {
      const aNum = parseInt(a.label.substring(a.label.indexOf(' '), a.label.indexOf(':')), 10);
      const bNum = parseInt(b.label.substring(a.label.indexOf(' '), b.label.indexOf(':')), 10);
      return aNum - bNum;
    });
    playerCountTotalStats.sort((a, b) => {
      return sortedWeekDays.indexOf(a.label.substring(0, a.label.indexOf(' '))) - sortedWeekDays.indexOf(b.label.substring(0, b.label.indexOf(' ')));
    });

    const playerCountTotalSplitIndex = playerCountTotalStats.findIndex(cr => cr.label.substring(0, cr.label.indexOf(' ')) === last2HourWeekDay && parseInt(cr.label.substring(cr.label.indexOf(' '), cr.label.indexOf(':')), 10) === last2Hour.getUTCHours()) + 1;

    playerCountTotalStats = [
      ...playerCountTotalStats.slice(playerCountTotalSplitIndex),
      ...playerCountTotalStats.slice(0, playerCountTotalSplitIndex)
    ];

    const playerCountTotalChart = new Chart(playerCountTotal.current, {
      type: 'line',
      data: {
        labels: playerCountTotalStats.map(cr => cr.label),
        datasets: [{
          label: playerCountTotalStats[0].dataset,
          data: playerCountTotalStats.map(cr => cr.value),
          backgroundColor: theme.colors.chartColor1,
          borderColor: theme.colors.chartColor1
        }]
      },
      options: createChartOptions(false, false)
    });

    // LINE CHART
    // REGION
    let playerCountRegionStats = stats.filter((stat) => stat.statGroup === 'd_playercount_region');
    const lastHour = new Date().getUTCHours();

    playerCountRegionStats.sort((a, b) => {
      const aNum = parseInt(a.label.substring(0, a.label.indexOf(':')), 10);
      const bNum = parseInt(b.label.substring(0, b.label.indexOf(':')), 10);
      return aNum - bNum;
    });

    const playerCountRegionSplitIndex = playerCountRegionStats.findIndex(cr => parseInt(cr.label.substring(0, cr.label.indexOf(':')), 10) === lastHour) + 3;

    playerCountRegionStats = [
      ...playerCountRegionStats.slice(playerCountRegionSplitIndex),
      ...playerCountRegionStats.slice(0, playerCountRegionSplitIndex)
    ];

    const playerCountRegionChart = new Chart(playerCountRegion.current, {
      type: 'line',
      data: {
        labels: playerCountRegionStats.filter(cr => cr.dataset === 'EU').map(cr => cr.label),
        datasets: [{
          label: 'EU',
          data: playerCountRegionStats.filter(cr => cr.dataset === 'EU').map(cr => cr.value),
          backgroundColor: theme.colors.chartColor1,
          borderColor: theme.colors.chartColor1
        }, {
          label: 'HK',
          data: playerCountRegionStats.filter(cr => cr.dataset === 'HK').map(cr => cr.value),
          backgroundColor: theme.colors.chartColor2,
          borderColor: theme.colors.chartColor2
        }, {
          label: 'US',
          data: playerCountRegionStats.filter(cr => cr.dataset === 'US').map(cr => cr.value),
          backgroundColor: theme.colors.chartColor3,
          borderColor: theme.colors.chartColor3
        }]
      },
      options: createChartOptions(true, false)
    });

    // LINE CHART
    // MODE
    let playerCountModeStats = stats.filter((stat) => stat.statGroup === 'd_playercount_mode');

    playerCountModeStats.sort((a, b) => {
      const aNum = parseInt(a.label.substring(0, a.label.indexOf(':')), 10);
      const bNum = parseInt(b.label.substring(0, b.label.indexOf(':')), 10);
      return aNum - bNum;
    });

    const playerCountModeIndex = playerCountModeStats.findIndex(cr => parseInt(cr.label.substring(0, cr.label.indexOf(':')), 10) === lastHour) + 3;

    playerCountModeStats = [
      ...playerCountModeStats.slice(playerCountModeIndex),
      ...playerCountModeStats.slice(0, playerCountModeIndex)
    ];

    const playerCountModeChart = new Chart(playerCountMode.current, {
      type: 'line',
      data: {
        labels: playerCountModeStats.filter(cr => cr.dataset === 'Hide and Seek').map(cr => cr.label),
        datasets: [
          {
            label: 'Hide and Seek',
            data: playerCountModeStats.filter(cr => cr.dataset === 'Hide and Seek').map(cr => cr.value),
            backgroundColor: theme.colors.chartColor1,
            borderColor: theme.colors.chartColor1
          },
          {
            label: 'Mobification',
            data: playerCountModeStats.filter(cr => cr.dataset === 'Mobification').map(cr => cr.value),
            backgroundColor: theme.colors.chartColor2,
            borderColor: theme.colors.chartColor2
          },
          {
            label: 'Hunt a Hag',
            data: playerCountModeStats.filter(cr => cr.dataset === 'Hunt a Hag').map(cr => cr.value),
            backgroundColor: theme.colors.chartColor3,
            borderColor: theme.colors.chartColor3
          },
          {
            label: 'Imposturous (WIP)',
            data: playerCountModeStats.filter(cr => cr.dataset === 'Imposturous (WIP)').map(cr => cr.value),
            backgroundColor: theme.colors.chartColor4,
            borderColor: theme.colors.chartColor4
          },
          {
            label: 'Fill a Pot (WIP)',
            data: playerCountModeStats.filter(cr => cr.dataset === 'Fill a Pot (WIP)').map(cr => cr.value),
            backgroundColor: theme.colors.chartColor5,
            borderColor: theme.colors.chartColor5
          }
        ]
      },
      options: createChartOptions(true, false)
    });

    return (() => {
      playerDistRegionChart.destroy();
      playerDistModeChart.destroy();
      playerCountTotalChart.destroy();
      playerCountRegionChart.destroy();
      playerCountModeChart.destroy();
    });
  }, [ready]);

  const getStats = async () => {
    const statsFromServer = await fetchServerStats();

    setStats(statsFromServer);
  };

  const fetchServerStats = async (): Promise<Stat[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/stats/witchitserver`);
    const data = await res.json();
    return data;
  };

  const createChartOptions = (showLegend: boolean, intersect: boolean): any => {
    return {
      plugins: {
        legend: {
          display: showLegend
        },
        tooltip: {
          intersect
        }
      }
    };
  };

  return {
    playerDistRegion,
    playerDistMode,
    playerCountTotal,
    playerCountRegion,
    playerCountMode
  };
};

export default useStatsHandler;
