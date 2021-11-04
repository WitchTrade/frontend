import Image from 'next/image';
import { Fragment, FunctionComponent } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import useThemeProvider from '../../shared/providers/theme.provider';

export interface DropdownValue {
  key: any;
  displayName: string;
  imagePath?: string;
  [key: string]: any;
}

interface Props {
  selectedValue: DropdownValue;
  setValue: (value: any) => void;
  values: DropdownValue[];
}

const Dropdown: FunctionComponent<Props> = ({ selectedValue, setValue, values }) => {
  const { theme } = useThemeProvider();

  return (
    <Listbox value={selectedValue} onChange={setValue}>
      {({ open }) => (
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-wt-surface-dark rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-wt-accent sm:text-sm border border-wt-accent-light">
            <div className="flex items-center">
              {selectedValue.imagePath &&
                <Image src={selectedValue.imagePath} height="20px" width="20px" alt="Dropdown Item Icon" />
              }
              <span className="block truncate ml-1">{selectedValue.displayName}</span>
            </div>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <div className="w-5 h-5">
                <Image src={`/assets/svgs/expand_${open ? 'less' : 'more'}/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="20px" width="20px" alt="Dropdown Item Icon" />
              </div>
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute w-full mt-1 overflow-auto text-base bg-wt-surface-dark rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30"
            >
              {values.map((value, i) => (
                <Listbox.Option
                  key={i}
                  className={`select-none relative py-2 pl-10 pr-4 rounded-md ${value.key === selectedValue.key ? '' : 'hover:bg-wt-hover cursor-pointer'}`}
                  value={value}
                >
                  {({ selected }) => (
                    <>
                      <div className="flex items-center">
                        {value.imagePath &&
                          <Image src={value.imagePath} height="20px" width="20px" alt="Dropdown Item Icon" />
                        }
                        <span
                          className={`${selected ? "font-medium" : "font-normal"
                            } block truncate ml-1`}
                        >
                          {value.displayName}
                        </span>
                      </div>
                      {value.key === selectedValue.key ? (
                        <span
                          className="absolute inset-y-0 left-0 flex items-center pl-3"
                        >
                          <Image src={`/assets/svgs/check_circle/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="20px" width="20px" alt="Dropdown Item Icon" />
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
  );
};

export default Dropdown;
