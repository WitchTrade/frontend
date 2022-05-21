import { Listbox, Transition } from '@headlessui/react'
import { useObservable } from '@ngneat/react-rxjs'
import Image from 'next/image'
import { Fragment, FunctionComponent } from 'react'
import { themeStore } from '../../shared/stores/theme/theme.store'

export interface DropdownValue {
  id?: number
  key: any
  displayName: string
  imagePath?: string
  [key: string]: any
}

interface Props {
  selectedValue: DropdownValue
  setValue: (value: any) => void
  values: DropdownValue[]
}

const Dropdown: FunctionComponent<Props> = ({
  selectedValue,
  setValue,
  values,
}) => {
  const [theme] = useObservable(themeStore)

  return (
    <Listbox value={selectedValue} onChange={setValue}>
      {({ open }) => (
        <div className='relative mt-1'>
          <Listbox.Button className='relative py-2 pr-10 pl-3 w-full text-left bg-wt-surface-dark rounded-lg border border-wt-accent-light focus:outline-none focus:ring-2 focus:ring-wt-accent shadow-md cursor-pointer sm:text-sm'>
            <div className='flex items-center'>
              {selectedValue.imagePath && (
                <div
                  className='flex items-center'
                  style={{ minHeight: '20px', minWidth: '20px' }}
                >
                  <Image
                    src={selectedValue.imagePath}
                    height='20px'
                    width='20px'
                    alt='Dropdown Item Icon'
                  />
                </div>
              )}
              <span className='block ml-1 truncate'>
                {selectedValue.displayName}
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
              {values.map((value, i) => (
                <Listbox.Option
                  key={i}
                  className={`select-none relative py-2 pl-10 pr-4 rounded-md ${
                    value.key === selectedValue.key
                      ? ''
                      : 'hover:bg-wt-hover cursor-pointer'
                  }`}
                  value={value}
                >
                  {({ selected }) => (
                    <>
                      <div className='flex items-center'>
                        {value.imagePath && (
                          <div
                            className='flex items-center'
                            style={{ minHeight: '20px', minWidth: '20px' }}
                          >
                            <Image
                              src={value.imagePath}
                              height='20px'
                              width='20px'
                              alt='Dropdown Item Icon'
                            />
                          </div>
                        )}
                        <span
                          className={`${
                            selected ? 'font-medium' : 'font-normal'
                          } block truncate ml-1`}
                        >
                          {value.displayName}
                        </span>
                      </div>
                      {value.key === selectedValue.key ? (
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

export default Dropdown
