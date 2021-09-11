import { createRef, useEffect, useState } from 'react';
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

    const themeUploadFile = createRef<any>();

    let notificationTypes: DropdownValue[] = [
        { key: 'info', displayName: 'Info' },
        { key: 'success', displayName: 'Success' },
        { key: 'warning', displayName: 'Warning' },
        { key: 'error', displayName: 'Error' }
    ];

    const [notificationType, setNotificationType] = useState(notificationTypes[0]);

    useEffect(() => {
        const themeSub = themeService.currentTheme$.subscribe(setSelectedTheme);
        const availableThemeSub = themeService.allThemes$.subscribe(setAllThemes);

        return () => {
            themeSub.unsubscribe();
            availableThemeSub.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (liveTheme && customTheme) {
            themeService.applyTheme(customTheme);
        }
    }, [customTheme]);

    useEffect(() => {
        if (themeType && customTheme) {
            setCustomTheme({ ...customTheme, type: themeType.key });
        }
    }, [themeType]);

    const applyNewTheme = (theme: Theme) => {
        themeService.applyTheme(theme);
    };

    const initCustomTheme = () => {
        setOriginalTheme(selectedTheme);
        const theme = createTheme({
            displayName: '',
            type: selectedTheme?.type ? selectedTheme?.type : 'dark',
            colors: selectedTheme?.colors ? selectedTheme?.colors : createThemeColors({}),
            key: 'custom',
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
        } else if (!liveTheme && customTheme) {
            themeService.applyTheme(customTheme);
        }
        setLiveTheme(!liveTheme);
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
        if (allThemes?.find(theme => theme.key === customTheme.displayName.toLowerCase().replaceAll(' ', '-'))) {
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
            const tempCustomTheme = { ...customTheme, key: customTheme.displayName.toLowerCase().replaceAll(' ', '-') };
            customThemes.push(tempCustomTheme);
            themeService.applyTheme(tempCustomTheme);
        }
        localStorage.setItem('customThemes', JSON.stringify(customThemes));

        themeService.loadCustomThemes();

        setCreatingCustomTheme(false);
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
                const customThemesString = localStorage.getItem('customThemes');
                let customThemes: Theme[] = [];
                if (customThemesString) {
                    customThemes = JSON.parse(customThemesString);
                }
                const importedTheme = JSON.parse(reader.result as string);

                // TODO: improve checking imported json
                if (!importedTheme.key) {
                    const notification = createNotification({
                        content: 'File doesn\'t seem to be a WitchTrade theme file',
                        duration: 5000,
                        type: 'error'
                    });
                    notificationService.addNotification(notification);
                    return;
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
                customThemes.push(importedTheme);
                themeService.applyTheme(importedTheme);
                localStorage.setItem('customThemes', JSON.stringify(customThemes));

                themeService.loadCustomThemes();

                setCreatingCustomTheme(false);
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
        cancelCustomTheme,
        saveCustomTheme,
        downloadTheme,
        deleteTheme,
        themeUploadFile,
        checkThemeInputFile,
        notificationTypes,
        notificationType,
        setNotificationType,
        createTestNotification
    };
};

export default CustomizationHandler;