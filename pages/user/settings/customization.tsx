import { useObservable } from '@ngneat/react-rxjs'
import Image from 'next/image'
import CustomHeader from '../../../components/core/CustomHeader'
import LoginWrapper from '../../../components/core/LoginWrapper'
import ColorPicker from '../../../components/customization/ColorPicker'
import PickerArea from '../../../components/customization/PickerArea'
import SettingNav from '../../../components/navs/SettingNav'
import ActionButton from '../../../components/styles/ActionButton'
import Dropdown from '../../../components/styles/Dropdown'
import FileInput from '../../../components/styles/FileInput'
import PageHeader from '../../../components/styles/PageHeader'
import TextInput from '../../../components/styles/TextInput'
import ThemeDropdown from '../../../components/styles/ThemeDropdown'
import CustomizationHandler from '../../../shared/handlers/customization.handler'
import { themeStore } from '../../../shared/stores/theme/theme.store'
import type { NextPage } from 'next'

const Customization: NextPage = () => {
  const [theme] = useObservable(themeStore)

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
    exampleChartRef,
  } = CustomizationHandler()

  return (
    <LoginWrapper>
      <CustomHeader
        title='WitchTrade | Customization'
        description='Customize your WitchTrade expirience'
        url='https://witchtrade.org/user/settings/customization'
      />
      <SettingNav />
      <div className='flex flex-col justify-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <PageHeader
          title='Customization'
          description='Customize your WitchTrade expirience'
        />
        {selectedTheme && !creatingCustomTheme && allThemes && (
          <div className='self-center w-60'>
            <ThemeDropdown
              selectedTheme={selectedTheme}
              setTheme={applyNewTheme}
              themes={allThemes}
            />
          </div>
        )}
        <div className='flex justify-center mt-2 text-center'>
          {creatingCustomTheme && (
            <>
              <div className='mx-1'>
                <ActionButton type='success' onClick={saveCustomTheme}>
                  Save
                </ActionButton>
              </div>
              <div className='mx-1'>
                <ActionButton type='cancel' onClick={cancelCustomTheme}>
                  Cancel
                </ActionButton>
              </div>
            </>
          )}
        </div>
        {!creatingCustomTheme && !selectedTheme?.official && (
          <div className='flex justify-center'>
            <div className='p-2 mt-2 w-96 bg-wt-surface-dark rounded-lg'>
              <p className='text-center'>
                Custom theme{' '}
                <span className='font-bold text-wt-accent'>
                  {selectedTheme?.displayName}
                </span>
              </p>
              <div className='flex flex-wrap justify-center'>
                <div className='m-2'>
                  <ActionButton type='info' onClick={downloadTheme}>
                    Export Theme
                  </ActionButton>
                </div>
                <div className='m-2'>
                  <ActionButton
                    type='warning'
                    onClick={() => initCustomTheme(true)}
                  >
                    Edit theme
                  </ActionButton>
                </div>
                <div className='m-2'>
                  <ActionButton type='cancel' onClick={deleteTheme}>
                    Delete Theme
                  </ActionButton>
                </div>
              </div>
            </div>
          </div>
        )}
        {!creatingCustomTheme && (
          <div className='flex justify-center mt-2'>
            <div className='mx-2'>
              <FileInput
                inputId='themeUpload'
                text='Import Theme'
                inputRef={themeUploadFile}
                inputChanged={checkThemeInputFile}
              ></FileInput>
            </div>
            <div className='mx-2'>
              <ActionButton
                type='success'
                onClick={() => initCustomTheme(false)}
              >
                Create new theme
              </ActionButton>
            </div>
          </div>
        )}
        {creatingCustomTheme && customTheme && (
          <>
            <div className='flex justify-center my-2 text-center'>
              <ActionButton type='info' onClick={switchLiveTheme}>
                <Image
                  src={`/assets/svgs/eye/${liveTheme ? 'filled' : 'outline'}_${
                    theme?.type === 'light' ? 'black' : 'white'
                  }.svg`}
                  height='24px'
                  width='24px'
                  alt='Live Theme Icon'
                />
                <p className='ml-1'>
                  {liveTheme ? 'Disable live theme' : 'Enable live theme'}
                </p>
              </ActionButton>
            </div>
            <div className='flex flex-col justify-center px-4 mx-auto max-w-lg sm:px-6 lg:px-8'>
              <div className='my-2'>
                {!editingTheme && (
                  <TextInput
                    type='input'
                    value={customTheme.displayName}
                    setValue={(value) =>
                      setCustomTheme({ ...customTheme, displayName: value })
                    }
                    placeholder='Theme name'
                    required={true}
                    svgPath={`/assets/svgs/bookmark/${
                      theme?.type === 'light' ? 'black' : 'white'
                    }.svg`}
                  />
                )}
                {editingTheme && (
                  <p>
                    Editing theme{' '}
                    <span className='font-bold text-wt-accent'>
                      {customTheme.displayName}
                    </span>
                  </p>
                )}
              </div>
              <div className='my-2'>
                <p>Theme type</p>
                <Dropdown
                  selectedValue={themeType}
                  setValue={setThemeType}
                  values={themeTypes}
                />
              </div>
            </div>
            <div className='flex flex-wrap justify-center mt-3'>
              <PickerArea areaTitle='Text colors'>
                <div className='mx-1'>
                  <ColorPicker
                    title='Default Text Color'
                    hexColor={customTheme.colors.text}
                    setHexColor={(color) =>
                      setCustomTheme({
                        ...customTheme,
                        colors: { ...customTheme.colors, text: color },
                      })
                    }
                  />
                </div>
                <div className='mx-1'>
                  <ColorPicker
                    title='Light Color'
                    hexColor={customTheme.colors.light}
                    setHexColor={(color) =>
                      setCustomTheme({
                        ...customTheme,
                        colors: { ...customTheme.colors, light: color },
                      })
                    }
                  />
                </div>
                <div className='mx-1'>
                  <ColorPicker
                    title='Dark Color'
                    hexColor={customTheme.colors.dark}
                    setHexColor={(color) =>
                      setCustomTheme({
                        ...customTheme,
                        colors: { ...customTheme.colors, dark: color },
                      })
                    }
                  />
                </div>
              </PickerArea>
              <PickerArea areaTitle='Surface colors'>
                <div className='mx-1'>
                  <ColorPicker
                    title='Surface'
                    hexColor={customTheme.colors.surface}
                    setHexColor={(color) =>
                      setCustomTheme({
                        ...customTheme,
                        colors: { ...customTheme.colors, surface: color },
                      })
                    }
                  />
                </div>
                <div className='mx-1'>
                  <ColorPicker
                    title='Dark Surface'
                    hexColor={customTheme.colors.surfaceDark}
                    setHexColor={(color) =>
                      setCustomTheme({
                        ...customTheme,
                        colors: { ...customTheme.colors, surfaceDark: color },
                      })
                    }
                  />
                </div>
              </PickerArea>
              <PickerArea areaTitle='Selected colors'>
                <div className='mx-1'>
                  <ColorPicker
                    title='Selected'
                    hexColor={customTheme.colors.selected}
                    setHexColor={(color) =>
                      setCustomTheme({
                        ...customTheme,
                        colors: { ...customTheme.colors, selected: color },
                      })
                    }
                  />
                </div>
                <div className='mx-1'>
                  <ColorPicker
                    title='Hover'
                    hexColor={customTheme.colors.hover}
                    setHexColor={(color) =>
                      setCustomTheme({
                        ...customTheme,
                        colors: { ...customTheme.colors, hover: color },
                      })
                    }
                  />
                </div>
                <div className='mx-1'>
                  <ColorPicker
                    title='Disabled'
                    hexColor={customTheme.colors.disabled}
                    setHexColor={(color) =>
                      setCustomTheme({
                        ...customTheme,
                        colors: { ...customTheme.colors, disabled: color },
                      })
                    }
                  />
                </div>
              </PickerArea>
              <PickerArea areaTitle='Accent colors'>
                <div className='mx-1'>
                  <ColorPicker
                    title='Accent'
                    hexColor={customTheme.colors.accent}
                    setHexColor={(color) =>
                      setCustomTheme({
                        ...customTheme,
                        colors: { ...customTheme.colors, accent: color },
                      })
                    }
                  />
                </div>
                <div className='mx-1'>
                  <ColorPicker
                    title='Accent Light'
                    hexColor={customTheme.colors.accentLight}
                    setHexColor={(color) =>
                      setCustomTheme({
                        ...customTheme,
                        colors: { ...customTheme.colors, accentLight: color },
                      })
                    }
                  />
                </div>
                <div className='mx-1'>
                  <ColorPicker
                    title='Verified badge color'
                    hexColor={customTheme.colors.verified}
                    setHexColor={(color) =>
                      setCustomTheme({
                        ...customTheme,
                        colors: { ...customTheme.colors, verified: color },
                      })
                    }
                  />
                </div>
              </PickerArea>
              <PickerArea areaTitle='Chart colors'>
                <div className='flex flex-wrap justify-center'>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Chart Text'
                      hexColor={customTheme.colors.chartText}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, chartText: color },
                        })
                      }
                    />
                  </div>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Chart Background'
                      hexColor={customTheme.colors.chartBackground}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: {
                            ...customTheme.colors,
                            chartBackground: color,
                          },
                        })
                      }
                    />
                  </div>
                </div>
                <div className='flex flex-wrap justify-center'>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Chart Color 1'
                      hexColor={customTheme.colors.chartColor1}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, chartColor1: color },
                        })
                      }
                    />
                  </div>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Chart Color 2'
                      hexColor={customTheme.colors.chartColor2}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, chartColor2: color },
                        })
                      }
                    />
                  </div>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Chart Color 3'
                      hexColor={customTheme.colors.chartColor3}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, chartColor3: color },
                        })
                      }
                    />
                  </div>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Chart Color 4'
                      hexColor={customTheme.colors.chartColor4}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, chartColor4: color },
                        })
                      }
                    />
                  </div>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Chart Color 5'
                      hexColor={customTheme.colors.chartColor5}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, chartColor5: color },
                        })
                      }
                    />
                  </div>
                </div>
              </PickerArea>
              {liveTheme && customTheme && (
                <div>
                  <p className='text-center'>Example chart</p>
                  <div className='flex flex-wrap justify-center mx-2 align-middle'>
                    <div
                      className='p-3 m-2 w-full bg-wt-chartbg rounded-lg shadow-xl'
                      style={{ maxWidth: '450px', maxHeight: '300px' }}
                    >
                      <canvas
                        ref={exampleChartRef}
                        height='1000'
                        width='1500'
                      ></canvas>
                    </div>
                  </div>
                </div>
              )}
              <PickerArea areaTitle='Status colors (Notifications and action buttons)'>
                <div className='flex flex-wrap justify-center'>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Info'
                      hexColor={customTheme.colors.info}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, info: color },
                        })
                      }
                    />
                  </div>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Info Light'
                      hexColor={customTheme.colors.infoLight}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, infoLight: color },
                        })
                      }
                    />
                  </div>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Info Dark'
                      hexColor={customTheme.colors.infoDark}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, infoDark: color },
                        })
                      }
                    />
                  </div>
                </div>
                <div className='flex flex-wrap justify-center'>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Success'
                      hexColor={customTheme.colors.success}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, success: color },
                        })
                      }
                    />
                  </div>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Success Light'
                      hexColor={customTheme.colors.successLight}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: {
                            ...customTheme.colors,
                            successLight: color,
                          },
                        })
                      }
                    />
                  </div>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Success Dark'
                      hexColor={customTheme.colors.successDark}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, successDark: color },
                        })
                      }
                    />
                  </div>
                </div>
                <div className='flex flex-wrap justify-center'>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Warning'
                      hexColor={customTheme.colors.warning}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, warning: color },
                        })
                      }
                    />
                  </div>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Warning Light'
                      hexColor={customTheme.colors.warningLight}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: {
                            ...customTheme.colors,
                            warningLight: color,
                          },
                        })
                      }
                    />
                  </div>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Warning Dark'
                      hexColor={customTheme.colors.warningDark}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, warningDark: color },
                        })
                      }
                    />
                  </div>
                </div>
                <div className='flex flex-wrap justify-center'>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Error'
                      hexColor={customTheme.colors.error}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, error: color },
                        })
                      }
                    />
                  </div>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Error Light'
                      hexColor={customTheme.colors.errorLight}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, errorLight: color },
                        })
                      }
                    />
                  </div>
                  <div className='mx-1'>
                    <ColorPicker
                      title='Error Dark'
                      hexColor={customTheme.colors.errorDark}
                      setHexColor={(color) =>
                        setCustomTheme({
                          ...customTheme,
                          colors: { ...customTheme.colors, errorDark: color },
                        })
                      }
                    />
                  </div>
                </div>
              </PickerArea>
              <div className='m-2 rounded-lg'>
                <p>Test notification</p>
                <div className='my-2'>
                  <Dropdown
                    selectedValue={notificationType}
                    setValue={setNotificationType}
                    values={notificationTypes}
                  />
                </div>
                <div className='flex justify-center mx-1'>
                  <ActionButton type='info' onClick={createTestNotification}>
                    Create
                  </ActionButton>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </LoginWrapper>
  )
}

export default Customization
