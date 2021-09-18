import { useEffect, useRef, useState } from 'react';
import {
    Chart,
    PieController,
    LineController, ArcElement,
    PointElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Title,
    Legend,
    Tooltip
} from 'chart.js';
import useThemeProvider from '../providers/theme.provider';

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

const useStatsHandler = () => {
    const { theme } = useThemeProvider();

    const playerDistRegion = useRef<any>(null);
    const playerDistMode = useRef<any>(null);
    const playerCountRegion = useRef<any>(null);
    const playerCountMode = useRef<any>(null);

    const [stats, setStats] = useState<Stat[]>([]);

    const [ready, setReady] = useState(false);

    useEffect(() => {
        Chart.register(PieController, LineController, ArcElement, PointElement, LineElement, CategoryScale, LinearScale, Title, Legend, Tooltip);
        getStats();
    }, []);

    useEffect(() => {
        if (
            theme &&
            stats.length > 1 &&
            playerDistRegion &&
            playerDistMode &&
            playerCountRegion &&
            playerCountMode &&
            !ready
        ) {
            setReady(true);
        }
    }, [theme, stats, playerDistRegion, playerDistMode]);

    useEffect(() => {
        if (!ready || !theme) return;

        Chart.defaults.color = theme.colors.chartText;
        Chart.defaults.borderColor = hexToRgbA(theme.colors.chartText, 0.1);

        const regions = stats.filter((stat) => stat.statGroup === 'd_distribution_region');
        const playerDistRegionChart = new Chart(playerDistRegion.current, {
            type: 'pie',
            data: {
                labels: regions.map(d => d.label),
                datasets: [{
                    data: regions.map(d => d.value),
                    backgroundColor: [
                        theme.colors.chartColor1,
                        theme.colors.chartColor2,
                        theme.colors.chartColor3
                    ],
                    borderWidth: [0]
                }]
            },
            options: createChartOptions('Distribution of players among regions in the last 24h')
        });

        const distribution = stats.filter((stat) => stat.statGroup === 'd_distribution_mode');
        distribution.sort((a, b) => {
            return sortedGameModes.indexOf(a.dataset) - sortedGameModes.indexOf(b.dataset);
        });
        const playerDistModeChart = new Chart(playerDistMode.current, {
            type: 'pie',
            data: {
                labels: distribution.map(d => d.label),
                datasets: [{
                    data: distribution.map(d => d.value),
                    backgroundColor: [
                        theme.colors.chartColor1,
                        theme.colors.chartColor2,
                        theme.colors.chartColor3,
                        theme.colors.chartColor4,
                        theme.colors.chartColor5,
                    ],
                    borderWidth: [0]
                }]
            },
            options: createChartOptions('Distribution of players among game modes in the last 24h')
        });

        let countRegion = stats.filter((stat) => stat.statGroup === 'd_playercount_region');
        const lastHour = new Date().getUTCHours();
        countRegion.sort((a, b) => {
            const aNum = parseInt(a.label.substring(0, a.label.indexOf(':')));
            const bNum = parseInt(b.label.substring(0, b.label.indexOf(':')));
            return aNum - bNum;
        });

        countRegion = [
            ...countRegion.slice(countRegion.findIndex(cr => parseInt(cr.label.substring(0, cr.label.indexOf(':'))) === lastHour) + 3),
            ...countRegion.slice(0, countRegion.findIndex(cr => parseInt(cr.label.substring(0, cr.label.indexOf(':'))) === lastHour) + 3)
        ];

        const playerCountRegionChart = new Chart(playerCountRegion.current, {
            type: 'line',
            data: {
                labels: countRegion.filter(cr => cr.dataset === 'EU').map(cr => cr.label),
                datasets: [{
                    label: 'EU',
                    data: countRegion.filter(cr => cr.dataset === 'EU').map(cr => cr.value),
                    backgroundColor: theme.colors.chartColor1,
                    borderColor: theme.colors.chartColor1
                }, {
                    label: 'HK',
                    data: countRegion.filter(cr => cr.dataset === 'HK').map(cr => cr.value),
                    backgroundColor: theme.colors.chartColor2,
                    borderColor: theme.colors.chartColor2
                }, {
                    label: 'US',
                    data: countRegion.filter(cr => cr.dataset === 'US').map(cr => cr.value),
                    backgroundColor: theme.colors.chartColor3,
                    borderColor: theme.colors.chartColor3
                }]
            },
            options: createChartOptions('Distribution of players among regions in the last 24h')
        });

        let countMode = stats.filter((stat) => stat.statGroup === 'd_playercount_mode');
        countMode.sort((a, b) => {
            const aNum = parseInt(a.label.substring(0, a.label.indexOf(':')));
            const bNum = parseInt(b.label.substring(0, b.label.indexOf(':')));
            return aNum - bNum;
        });

        countMode = [
            ...countMode.slice(countMode.findIndex(cr => parseInt(cr.label.substring(0, cr.label.indexOf(':'))) === lastHour) + 3),
            ...countMode.slice(0, countMode.findIndex(cr => parseInt(cr.label.substring(0, cr.label.indexOf(':'))) === lastHour) + 3)
        ];

        const playerCountModeChart = new Chart(playerCountMode.current, {
            type: 'line',
            data: {
                labels: countMode.filter(cr => cr.dataset === 'Hide and Seek').map(cr => cr.label),
                datasets: [
                    {
                        label: 'Hide and Seek',
                        data: countMode.filter(cr => cr.dataset === 'Hide and Seek').map(cr => cr.value),
                        backgroundColor: theme.colors.chartColor1,
                        borderColor: theme.colors.chartColor1
                    },
                    {
                        label: 'Mobification',
                        data: countMode.filter(cr => cr.dataset === 'Mobification').map(cr => cr.value),
                        backgroundColor: theme.colors.chartColor2,
                        borderColor: theme.colors.chartColor2
                    },
                    {
                        label: 'Hunt a Hag',
                        data: countMode.filter(cr => cr.dataset === 'Hunt a Hag').map(cr => cr.value),
                        backgroundColor: theme.colors.chartColor3,
                        borderColor: theme.colors.chartColor3
                    },
                    {
                        label: 'Imposturous (WIP)',
                        data: countMode.filter(cr => cr.dataset === 'Imposturous (WIP)').map(cr => cr.value),
                        backgroundColor: theme.colors.chartColor4,
                        borderColor: theme.colors.chartColor4
                    },
                    {
                        label: 'Fill a Pot (WIP)',
                        data: countMode.filter(cr => cr.dataset === 'Fill a Pot (WIP)').map(cr => cr.value),
                        backgroundColor: theme.colors.chartColor5,
                        borderColor: theme.colors.chartColor5
                    }
                ]
            },
            options: createChartOptions('Distribution of players among game modes in the last 24h')
        });
        return (() => {
            playerDistRegionChart.destroy();
            playerDistModeChart.destroy();
            playerCountRegionChart.destroy();
            playerCountModeChart.destroy();
        });
    }, [ready]);

    const getStats = async () => {
        const statsFromServer = await fetchServerStats();

        setStats(statsFromServer);
    };

    const fetchServerStats = async (): Promise<Stat[]> => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/stats/wiserver`);
        const data = await res.json();
        return data;
    };

    const hexToRgbA = (hexCode: string, opacity: number) => {
        var hex = hexCode.replace('#', '');

        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }

        var r = parseInt(hex.substring(0, 2), 16),
            g = parseInt(hex.substring(2, 4), 16),
            b = parseInt(hex.substring(4, 6), 16);

        return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
    };

    const createChartOptions = (title: string): any => {
        return {
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: title
                },
                tooltip: {
                    intersect: false
                }
            }
        };
    };

    return {
        playerDistRegion,
        playerDistMode,
        playerCountRegion,
        playerCountMode
    };
};

export default useStatsHandler;