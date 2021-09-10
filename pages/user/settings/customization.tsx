import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import CustomHeader from '../../../components/core/CustomHeader';
import SettingNav from '../../../components/navs/SettingNav';
import ActionButton from '../../../components/styles/ActionButton';
import ColorPicker from '../../../components/styles/ColorPicker';
import Dropdown from '../../../components/styles/Dropdown';
import PageHeader from '../../../components/styles/PageHeader';
import { createTheme, Theme } from '../../../shared/models/theme.model';
import { createThemeColors } from '../../../shared/models/themeColor.model';
import themeService from '../../../shared/services/theme.service';

const Customization: NextPage = () => {
    const [selectedTheme, setSelectedTheme] = useState<Theme>();
    const [originalTheme, setOriginalTheme] = useState<Theme>();
    const themes = themeService.avaiableThemes;

    const [creatingCT, setCreatingCT] = useState(false);

    const [customTheme, setCustomTheme] = useState<Theme>(createTheme({
        displayName: 'Custom Theme',
        key: 'custom',
        type: 'dark',
        colors: createThemeColors({})
    }));

    useEffect(() => {
        const themeSub = themeService.currentTheme$.subscribe(setSelectedTheme);

        return () => {
            themeSub.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (selectedTheme && !creatingCT) {
            themeService.applyTheme(selectedTheme);
            setCustomTheme(selectedTheme);
        }
        if (customTheme && creatingCT) {
            themeService.applyTheme(customTheme);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTheme, customTheme]);

    useEffect(() => {
        if (creatingCT && selectedTheme) {
            setOriginalTheme(selectedTheme);
            setCustomTheme(Object.assign(customTheme, { colors: selectedTheme.colors }));
        } else if (originalTheme) {
            setSelectedTheme(originalTheme);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creatingCT]);

    const createCustomTheme = () => {
        // TODO: Save custom theme
    };

    return (
        <>
            <CustomHeader
                title="WitchTrade | Customization"
                description="Customize your WitchTrade expirience"
                url="https://witchtrade.org/user/settings/customization"
                image="https://imgur.com/WmcszU3.png"
            />
            <SettingNav />
            <div className="flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <PageHeader title="Customization" description="Customize your WitchTrade expirience" />
                {selectedTheme && !creatingCT &&
                    <div className="w-60 self-center">
                        <Dropdown selectedValue={selectedTheme} setValue={setSelectedTheme} values={themes} />
                    </div>
                }
                <div className="flex justify-center text-center mt-2">
                    {creatingCT &&
                        <>
                            <div className="mx-1">
                                <ActionButton type="proceed" onClick={createCustomTheme}>Create</ActionButton>
                            </div>
                            <div className="mx-1">
                                <ActionButton type="cancel" onClick={() => { setCreatingCT(!creatingCT); }}>Cancel</ActionButton>
                            </div>
                        </>
                        ||
                        <ActionButton type="neutral" onClick={() => { setCreatingCT(!creatingCT); }}>Create custom theme</ActionButton>
                    }
                </div>
                {creatingCT &&
                    <div className="mt-3 flex flex-wrap justify-center">
                        <div className="bg-wt-surface-dark rounded-lg p-2 m-1">
                            <p className="text-center text-wt-accent-light text-sm">Text colors</p>
                            <div className="flex flex-wrap justify-center">
                                <div className="mx-1">
                                    <ColorPicker title="Light Color" hexColor={customTheme.colors.light} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, light: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Dark Color" hexColor={customTheme.colors.dark} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, dark: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Default Text Color" hexColor={customTheme.colors.text} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, text: color } })} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-wt-surface-dark rounded-lg p-2 m-1">
                            <p className="text-center text-wt-accent-light text-sm">Surface colors</p>
                            <div className="flex flex-wrap justify-center">
                                <div className="mx-1">
                                    <ColorPicker title="Surface" hexColor={customTheme.colors.surface} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, surface: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Dark Surface" hexColor={customTheme.colors.surfaceDark} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, surfaceDark: color } })} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-wt-surface-dark rounded-lg p-2 m-1">
                            <p className="text-center text-wt-accent-light text-sm">Selected colors</p>
                            <div className="flex flex-wrap justify-center">
                                <div className="mx-1">
                                    <ColorPicker title="Selected" hexColor={customTheme.colors.selected} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, selected: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Selected Light" hexColor={customTheme.colors.selectedLight} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, selectedLight: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Selected Dark" hexColor={customTheme.colors.selectedDark} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, selectedDark: color } })} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-wt-surface-dark rounded-lg p-2 m-1">
                            <p className="text-center text-wt-accent-light text-sm">Hover colors</p>
                            <div className="flex flex-wrap justify-center">
                                <div className="mx-1">
                                    <ColorPicker title="Hover" hexColor={customTheme.colors.hover} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, hover: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Hover Light" hexColor={customTheme.colors.hoverLight} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, hoverLight: color } })} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-wt-surface-dark rounded-lg p-2 m-1">
                            <p className="text-center text-wt-accent-light text-sm">Accent colors</p>
                            <div className="flex flex-wrap justify-center">
                                <div className="mx-1">
                                    <ColorPicker title="Accent" hexColor={customTheme.colors.accent} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, accent: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Accent Light" hexColor={customTheme.colors.accentLight} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, accentLight: color } })} />
                                </div>
                            </div>
                        </div>
                        <div className="bg-wt-surface-dark rounded-lg p-2 m-1">
                            <p className="text-center text-wt-accent-light text-sm">Notification colors</p>
                            <div className="flex flex-wrap justify-center">
                                <div className="mx-1">
                                    <ColorPicker title="Info" hexColor={customTheme.colors.info} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, info: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Info Light" hexColor={customTheme.colors.infoLight} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, infoLight: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Info Dark" hexColor={customTheme.colors.infoDark} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, infoDark: color } })} />
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center">
                                <div className="mx-1">
                                    <ColorPicker title="Success" hexColor={customTheme.colors.success} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, success: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Success Light" hexColor={customTheme.colors.successLight} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, successLight: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Success Dark" hexColor={customTheme.colors.successDark} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, successDark: color } })} />
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center">
                                <div className="mx-1">
                                    <ColorPicker title="Warning" hexColor={customTheme.colors.warning} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, warning: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Warning Light" hexColor={customTheme.colors.warningLight} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, warningLight: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Warning Dark" hexColor={customTheme.colors.warningDark} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, warningDark: color } })} />
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center">
                                <div className="mx-1">
                                    <ColorPicker title="Error" hexColor={customTheme.colors.error} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, error: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Error Light" hexColor={customTheme.colors.errorLight} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, errorLight: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Error Dark" hexColor={customTheme.colors.errorDark} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, errorDark: color } })} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-wt-text break-all">
                                {JSON.stringify(customTheme.colors)}
                            </p>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default Customization;
