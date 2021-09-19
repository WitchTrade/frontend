import { createRef, useEffect, useRef, useState } from 'react';
import { Chart } from 'chart.js';
import { DropdownValue } from '../../components/styles/Dropdown';
import { createTheme, Theme } from '../models/theme.model';
import { createThemeColors } from '../models/themeColor.model';
import themeService from '../services/theme.service';
import { createNotification } from '../stores/notification/notification.model';
import { notificationService } from '../stores/notification/notification.service';

const CustomizationHandler = () => {
    const [allThemes, setAllThemes] = useState<Theme[]>();

    // selected theme in the dropdown
    const [selectedTheme, setSelectedTheme] = useState<Theme>();

    let themeTypes: DropdownValue[] = [
        { key: 'light', displayName: 'Light' },
        { key: 'dark', displayName: 'Dark' },
    ];

    const [themeType, setThemeType] = useState(themeTypes[0]);

    // original theme => Gets set when creating a custom theme, in order to be able to reset
    const [originalTheme, setOriginalTheme] = useState<Theme>();

    const [creatingCustomTheme, setCreatingCustomTheme] = useState(false);
    const [liveTheme, setLiveTheme] = useState(false);
    const [customTheme, setCustomTheme] = useState<Theme>();
    const [editingTheme, setEditingTheme] = useState(false);

    const themeUploadFile = createRef<any>();

    let notificationTypes: DropdownValue[] = [
        { key: 'info', displayName: 'Info' },
        { key: 'success', displayName: 'Success' },
        { key: 'warning', displayName: 'Warning' },
        { key: 'error', displayName: 'Error' }
    ];

    const [notificationType, setNotificationType] = useState(notificationTypes[0]);

    const exampleChartRef = useRef<any>(null);

    useEffect(() => {
        const themeSub = themeService.currentTheme$.subscribe(setSelectedTheme);
        const availableThemeSub = themeService.allThemes$.subscribe(setAllThemes);

        return () => {
            themeSub.unsubscribe();
            availableThemeSub.unsubscribe();
        };
    }, []);

    useEffect(() => {
        let exampleChart: any;

        if (liveTheme && customTheme) {
            themeService.applyTheme(customTheme);

            Chart.defaults.color = customTheme.colors.chartText;
            Chart.defaults.borderColor = themeService.hexToRgbA(customTheme.colors.chartText, 0.1);

            exampleChart = new Chart(exampleChartRef.current, {
                type: 'line',
                data: {
                    labels: ['One', 'Two', 'Three', 'Four'],
                    datasets: [
                        {
                            label: 'Data 1',
                            data: [1, 3, 5, 4],
                            backgroundColor: customTheme.colors.chartColor1,
                            borderColor: customTheme.colors.chartColor1
                        },
                        {
                            label: 'Data 2',
                            data: [3, 3, 1, 3],
                            backgroundColor: customTheme.colors.chartColor2,
                            borderColor: customTheme.colors.chartColor2
                        },
                        {
                            label: 'Data 3',
                            data: [2, 1, 2, 1],
                            backgroundColor: customTheme.colors.chartColor3,
                            borderColor: customTheme.colors.chartColor3
                        },
                        {
                            label: 'Data 4',
                            data: [2, 5, 3, 2],
                            backgroundColor: customTheme.colors.chartColor4,
                            borderColor: customTheme.colors.chartColor4
                        },
                        {
                            label: 'Data 5',
                            data: [5, 2, 4, 1],
                            backgroundColor: customTheme.colors.chartColor5,
                            borderColor: customTheme.colors.chartColor5
                        }
                    ]
                },
                options: {
                    plugins: {
                        tooltip: {
                            intersect: false
                        }
                    },
                    animation: {
                        duration: 0
                    }
                }
            });
        }
        return (() => {
            if (exampleChart) {
                exampleChart.destroy();
            }
        });
    }, [customTheme]);

    useEffect(() => {
        if (themeType && customTheme) {
            setCustomTheme({ ...customTheme, type: themeType.key });
        }
    }, [themeType]);

    const applyNewTheme = (theme: Theme) => {
        themeService.applyTheme(theme);
    };

    const initCustomTheme = (editSelected: boolean) => {
        setEditingTheme(editSelected);
        setOriginalTheme(selectedTheme);
        const theme = createTheme({
            displayName: editSelected ? selectedTheme?.displayName : '',
            type: selectedTheme?.type ? selectedTheme?.type : 'dark',
            colors: selectedTheme?.colors ? createThemeColors(selectedTheme?.colors) : createThemeColors({}),
            key: editSelected ? selectedTheme?.key : 'custom',
            official: false
        });
        const newType = themeTypes.find(type => type.key === theme.type);
        if (newType) {
            setThemeType(newType);
        }
        setCustomTheme(theme);
        setCreatingCustomTheme(true);
    };

    const switchLiveTheme = () => {
        if (liveTheme && originalTheme) {
            themeService.applyTheme(originalTheme);
        }
        setLiveTheme(!liveTheme);
        if (customTheme) {
            setCustomTheme({ ...customTheme });
        }
    };

    const cancelCustomTheme = () => {
        if (originalTheme) {
            themeService.applyTheme(originalTheme);
        }
        setCreatingCustomTheme(false);
    };

    const downloadTheme = () => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(selectedTheme)));
        element.setAttribute('download', `${selectedTheme?.displayName}.json`);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);

        const notification = createNotification({
            content: 'Theme downloaded!',
            duration: 5000,
            type: 'success'
        });
        notificationService.addNotification(notification);
    };

    const saveCustomTheme = () => {
        if (!customTheme?.displayName) {
            const notification = createNotification({
                content: 'Please give your theme a name.',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }
        if (!editingTheme && allThemes?.find(theme => theme.key === customTheme.displayName.toLowerCase().replaceAll(' ', '-'))) {
            const notification = createNotification({
                content: 'There is already a theme with the same name',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }
        if (!/^[a-zA-Z0-9 _-]*$/.test(customTheme.displayName)) {
            const notification = createNotification({
                content: 'Theme names can only contain letters, numbers, -, _ and spaces',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }
        const customThemesString = localStorage.getItem('customThemes');
        let customThemes: Theme[] = [];
        if (customThemesString) {
            customThemes = JSON.parse(customThemesString);
        }
        if (customTheme) {
            if (editingTheme) {
                const oldThemeIndex = customThemes.findIndex(ct => ct.key === customTheme.key);
                customThemes[oldThemeIndex] = customTheme;
                themeService.applyTheme(customTheme);
            } else {
                const tempCustomTheme = { ...customTheme, key: customTheme.displayName.toLowerCase().replaceAll(' ', '-') };
                customThemes.push(tempCustomTheme);
                themeService.applyTheme(tempCustomTheme);
            }
        }
        localStorage.setItem('customThemes', JSON.stringify(customThemes));

        themeService.loadCustomThemes();

        setCreatingCustomTheme(false);

        const notification = createNotification({
            content: 'Theme saved!',
            duration: 5000,
            type: 'success'
        });
        notificationService.addNotification(notification);
    };

    const deleteTheme = () => {
        const customThemesString = localStorage.getItem('customThemes');
        let customThemes: Theme[] = [];
        if (customThemesString) {
            customThemes = JSON.parse(customThemesString);
        }
        if (selectedTheme) {
            const index = customThemes.findIndex(theme => theme.key === selectedTheme.key);
            if (index >= 0) {
                customThemes.splice(index, 1);
                const notification = createNotification({
                    content: 'Theme deleted',
                    duration: 5000,
                    type: 'success'
                });
                notificationService.addNotification(notification);
            }
        }
        localStorage.setItem('customThemes', JSON.stringify(customThemes));

        themeService.loadCustomThemes();

        if (allThemes) {
            themeService.applyTheme(allThemes[0]);
        }
    };

    const checkThemeInputFile = () => {
        if (!themeUploadFile.current.files[0]) {
            return;
        }

        let reader = new FileReader();
        reader.readAsText(themeUploadFile.current.files[0]);

        reader.onload = () => {
            if (reader.result) {
                let importedObject: Theme;

                // try parsing json to object
                try {
                    importedObject = JSON.parse(reader.result as string);
                } catch {
                    const notification = createNotification({
                        content: 'Error while parsing file',
                        duration: 5000,
                        type: 'error'
                    });
                    notificationService.addNotification(notification);
                    return;
                }

                const importedColors = createThemeColors(importedObject.colors);
                const importedTheme = createTheme({ ...importedObject, colors: importedColors, official: false });

                if (!importedTheme.key || !importedTheme.type || !importedTheme.displayName) {
                    const notification = createNotification({
                        content: 'File doesn\'t seem to be a WitchTrade theme file',
                        duration: 5000,
                        type: 'error'
                    });
                    notificationService.addNotification(notification);
                    return;
                }

                if (!/^[a-zA-Z0-9_-]*$/.test(importedTheme.key)) {
                    const notification = createNotification({
                        content: 'Theme keys can only contain letters, numbers, - and _',
                        duration: 5000,
                        type: 'warning'
                    });
                    notificationService.addNotification(notification);
                    return;
                }

                if (!/^[a-zA-Z0-9 _-]*$/.test(importedTheme.displayName)) {
                    const notification = createNotification({
                        content: 'Theme names can only contain letters, numbers, -, _ and spaces',
                        duration: 5000,
                        type: 'warning'
                    });
                    notificationService.addNotification(notification);
                    return;
                }

                // get custom themes to add imported theme to
                const customThemesString = localStorage.getItem('customThemes');
                let customThemes: Theme[] = [];
                if (customThemesString) {
                    customThemes = JSON.parse(customThemesString);
                }

                if (customThemes.find(theme => theme.key === importedTheme.key)) {
                    const notification = createNotification({
                        content: 'There is already a theme with the same name',
                        duration: 5000,
                        type: 'error'
                    });
                    notificationService.addNotification(notification);
                    return;
                }

                // add imported theme to custom themes
                customThemes.push(importedTheme);
                localStorage.setItem('customThemes', JSON.stringify(customThemes));

                // reload custom themes
                themeService.loadCustomThemes();

                // apply imported theme
                themeService.applyTheme(importedTheme);

                const notification = createNotification({
                    content: `${importedTheme.displayName} imported successfully`,
                    duration: 5000,
                    type: 'success'
                });
                notificationService.addNotification(notification);
                return;
            }
        };
    };

    const createTestNotification = () => {
        const notification = createNotification({
            content: 'Test notification',
            duration: 2500,
            type: notificationType.key
        });
        notificationService.addNotification(notification);
    };

    return {
        allThemes,
        themeTypes,
        themeType,
        setThemeType,
        selectedTheme,
        applyNewTheme,
        creatingCustomTheme,
        liveTheme,
        switchLiveTheme,
        customTheme,
        setCustomTheme,
        initCustomTheme,
        editingTheme,
        cancelCustomTheme,
        saveCustomTheme,
        downloadTheme,
        deleteTheme,
        themeUploadFile,
        checkThemeInputFile,
        notificationTypes,
        notificationType,
        setNotificationType,
        createTestNotification,
        exampleChartRef
    };
};

export default CustomizationHandler;