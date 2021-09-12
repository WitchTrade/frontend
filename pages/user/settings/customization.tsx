import type { NextPage } from 'next';
import Image from 'next/image';
import CustomHeader from '../../../components/core/CustomHeader';
import PickerArea from '../../../components/customization/PickerArea';
import SettingNav from '../../../components/navs/SettingNav';
import ActionButton from '../../../components/styles/ActionButton';
import ColorPicker from '../../../components/customization/ColorPicker';
import Dropdown from '../../../components/styles/Dropdown';
import PageHeader from '../../../components/styles/PageHeader';
import CustomizationHandler from '../../../shared/handlers/customization.handler';
import TextInput from '../../../components/styles/TextInput';
import FileInput from '../../../components/styles/FileInput';
import ThemeHandler from '../../../shared/handlers/theme.handler';

const Customization: NextPage = () => {
    const { theme } = ThemeHandler();

    const {
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
    } = CustomizationHandler();

    return (
        <>
            <CustomHeader
                title="WitchTrade | Customization"
                description="Customize your WitchTrade expirience"
                url="https://witchtrade.org/user/settings/customization"
            />
            <SettingNav />
            <div className="flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <PageHeader title="Customization" description="Customize your WitchTrade expirience" />
                {selectedTheme && !creatingCustomTheme && allThemes &&
                    <div className="w-60 self-center">
                        <Dropdown selectedValue={selectedTheme} setValue={applyNewTheme} values={allThemes} />
                    </div>
                }
                <div className="flex justify-center text-center mt-2">
                    {creatingCustomTheme &&
                        <>
                            <div className="mx-1">
                                <ActionButton type="proceed" onClick={saveCustomTheme}>Save</ActionButton>
                            </div>
                            <div className="mx-1">
                                <ActionButton type="cancel" onClick={cancelCustomTheme}>Cancel</ActionButton>
                            </div>
                        </>
                    }
                </div>
                {!creatingCustomTheme && !selectedTheme?.official &&
                    <div className="flex justify-center">
                        <div className="mt-2 bg-wt-surface-dark rounded-lg p-2 w-72">
                            <p className="text-center">Custom theme <span className="text-wt-accent font-bold">{selectedTheme?.displayName}</span></p>
                            <div className="flex justify-center text-center">
                                <div className="mx-2">
                                    <ActionButton type="neutral" onClick={downloadTheme}>Export Theme</ActionButton>
                                </div>
                                <div className="mx-2">
                                    <ActionButton type="cancel" onClick={deleteTheme}>Delete Theme</ActionButton>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {!creatingCustomTheme &&
                    <div className="flex justify-center text-center mt-2">
                        <div className="mx-2">
                            <FileInput inputId="themeUpload" text="Import Theme" inputRef={themeUploadFile} inputChanged={checkThemeInputFile}></FileInput>
                        </div>
                        <div className="mx-2">
                            <ActionButton type="proceed" onClick={initCustomTheme}>Create new theme</ActionButton>
                        </div>
                    </div>
                }
                {creatingCustomTheme && customTheme &&
                    <>
                        <div className="my-2 text-center flex justify-center">
                            <ActionButton type={liveTheme ? 'neutral-enabled' : 'neutral'} onClick={switchLiveTheme}>
                                <Image src={`/assets/svgs/eye/${liveTheme ? 'filled' : 'outline'}_${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="24px" width="24px" alt="Live Theme Icon" />
                                <p className="ml-1">{liveTheme ? 'Disable live theme' : 'Enable live theme'}</p>
                            </ActionButton>
                        </div>
                        <div className="flex flex-col justify-center max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="my-2">
                                <TextInput type="input" value={customTheme.displayName} setValue={(value) => setCustomTheme({ ...customTheme, displayName: value })} placeholder="Theme name" required={true} svgPath={`/assets/svgs/bookmark/${theme?.type === 'light' ? 'black' : 'white'}.svg`} />
                            </div>
                            <div className="my-2">
                                <p>Theme type</p>
                                <Dropdown selectedValue={themeType} setValue={setThemeType} values={themeTypes} />
                            </div>
                        </div>
                        <div className="mt-3 flex flex-wrap justify-center">
                            <PickerArea areaTitle="Text colors">
                                <div className="mx-1">
                                    <ColorPicker title="Light Color" hexColor={customTheme.colors.light} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, light: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Dark Color" hexColor={customTheme.colors.dark} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, dark: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Default Text Color" hexColor={customTheme.colors.text} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, text: color } })} />
                                </div>
                            </PickerArea>
                            <PickerArea areaTitle="Surface colors">
                                <div className="mx-1">
                                    <ColorPicker title="Surface" hexColor={customTheme.colors.surface} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, surface: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Dark Surface" hexColor={customTheme.colors.surfaceDark} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, surfaceDark: color } })} />
                                </div>
                            </PickerArea>
                            <PickerArea areaTitle="Selected colors">
                                <div className="mx-1">
                                    <ColorPicker title="Selected" hexColor={customTheme.colors.selected} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, selected: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Selected Light" hexColor={customTheme.colors.selectedLight} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, selectedLight: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Selected Dark" hexColor={customTheme.colors.selectedDark} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, selectedDark: color } })} />
                                </div>
                            </PickerArea>
                            <PickerArea areaTitle="Hover colors">
                                <div className="mx-1">
                                    <ColorPicker title="Hover" hexColor={customTheme.colors.hover} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, hover: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Hover Light" hexColor={customTheme.colors.hoverLight} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, hoverLight: color } })} />
                                </div>
                            </PickerArea>
                            <PickerArea areaTitle="Accent colors">
                                <div className="mx-1">
                                    <ColorPicker title="Accent" hexColor={customTheme.colors.accent} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, accent: color } })} />
                                </div>
                                <div className="mx-1">
                                    <ColorPicker title="Accent Light" hexColor={customTheme.colors.accentLight} setHexColor={(color) => setCustomTheme({ ...customTheme, colors: { ...customTheme.colors, accentLight: color } })} />
                                </div>
                            </PickerArea>
                            <PickerArea areaTitle="Status colors">
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
                            </PickerArea>
                            <div className="m-2 rounded-lg">
                                <p>Test notification</p>
                                <div className="my-2">
                                    <Dropdown selectedValue={notificationType} setValue={setNotificationType} values={notificationTypes} />
                                </div>
                                <div className="mx-1 flex justify-center">
                                    <ActionButton type="neutral" onClick={createTestNotification}>Create</ActionButton>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div >
        </>
    );
};

export default Customization;
