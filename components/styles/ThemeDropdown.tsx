import { Listbox, Transition } from '@headlessui/react'
import { useObservable } from '@ngneat/react-rxjs'
import Image from 'next/image'
import { Fragment, FunctionComponent } from 'react'
import { Theme } from '../../shared/stores/theme/theme.model'
import { themeStore } from '../../shared/stores/theme/theme.store'

interface Props {
  selectedTheme: Theme
  setTheme: (theme: Theme) => void
  themes: Theme[]
}

const ThemeDropdown: FunctionComponent<Props> = ({
  selectedTheme,
  setTheme,
  themes,
}) => {
  const [theme] = useObservable(themeStore)

  return (
    <Listbox value={selectedTheme} onChange={setTheme}>
      {({ open }) => (
        <div className='relative mt-1'>
          <Listbox.Button className='relative py-2 pr-10 pl-3 w-full text-left bg-wt-surface-dark rounded-lg border border-wt-accent-light focus:outline-none focus:ring-2 focus:ring-wt-accent shadow-md cursor-pointer sm:text-sm'>
            <div className='flex flex-col justify-center'>
              <span className='block ml-1 truncate'>
                {selectedTheme.displayName}
              </span>
              <span className='ml-1 text-xs text-wt-accent-light'>
                {selectedTheme.creator}
              </span>
            </div>
            <span className='flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none'>
              <div className='w-5 h-5'>
                <Image
                  src={`/assets/svgs/expand_${open ? 'less' : 'more'}/${
                    theme?.type === 'light' ? 'black' : 'white'
                  }.svg`}
                  height='20px'
                  width='20px'
                  alt='Dropdown Item Icon'
                />
              </div>
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options
              static
              className='overflow-auto absolute z-30 mt-1 w-full max-h-60 text-base bg-wt-surface-dark rounded-md focus:outline-none ring-1 ring-black/5 shadow-lg sm:text-sm'
            >
              {themes.map((theme, i) => (
                <Listbox.Option
                  key={i}
                  className={`select-none relative py-2 pl-10 pr-4 rounded-md ${
                    theme.key === selectedTheme.key
                      ? ''
                      : 'hover:bg-wt-hover cursor-pointer'
                  }`}
                  value={theme}
                >
                  {({ selected }) => (
                    <>
                      <div className='flex flex-col justify-center'>
                        <span
                          className={`${
                            selected ? 'font-medium' : 'font-normal'
                          } block truncate ml-1`}
                        >
                          {theme.displayName}
                        </span>
                        <span className='ml-1 text-xs text-wt-accent-light'>
                          {theme.creator}
                        </span>
                      </div>
                      {theme.key === selectedTheme.key ? (
                        <span className='flex absolute inset-y-0 left-0 items-center pl-3'>
                          <Image
                            src={`/assets/svgs/check_circle/${
                              theme?.type === 'light' ? 'black' : 'white'
                            }.svg`}
                            height='20px'
                            width='20px'
                            alt='Dropdown Item Icon'
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}

export default ThemeDropdown
