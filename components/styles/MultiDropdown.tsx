import Image from 'next/image';
import { Fragment, FunctionComponent } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { DropdownValue } from './Dropdown';
import useDetectOutsideClick from '../../shared/hooks/useDetectOutsideClick';
import { useObservable } from '@ngneat/react-rxjs';
import { themeStore } from '../../shared/stores/theme/theme.store';

interface Props {
  selectedValues: DropdownValue[];
  updateValue: (value: DropdownValue) => void;
  values: DropdownValue[];
}

const MultiDropdown: FunctionComponent<Props> = ({ selectedValues, updateValue, values }) => {
  const [theme] = useObservable(themeStore);

  const { show, nodeRef, toggleRef } = useDetectOutsideClick(false);

  return (
    <Listbox value={selectedValues} onChange={(value: any) => updateValue(value)}>
      <div className="relative mt-1">
        <Listbox.Button
          className="relative w-full py-2 pl-3 pr-10 text-left bg-wt-surface-dark rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-wt-accent sm:text-sm border border-wt-accent-light"
          ref={toggleRef}
        >
          <div className="flex items-center truncate ml-1">
            {selectedValues.map((sv, i) => (
              <>
                {sv.imagePath &&
                  <div className="flex items-center mr-1" style={{ minWidth: '20px' }}>
                    <Image className="min-w-full" src={sv.imagePath} height="20px" width="20px" alt="Dropdown Item Icon" />
                  </div>
                  ||
                  <p>{sv.displayName}{i !== selectedValues.length - 1 ? ', ' : ''}</p>
                }
              </>
            ))}
          </div>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <div className="w-5 h-5">
              <Image src={`/assets/svgs/expand_${show ? 'less' : 'more'}/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="20px" width="20px" alt="Dropdown Item Icon" />
            </div>
          </span>
        </Listbox.Button>
        <div ref={nodeRef}>
          <Transition
            show={show}
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
                  className={`select-none relative py-2 pl-10 pr-4 rounded-md cursor-pointer hover:bg-wt-hover`}
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
                      <span
                        className="absolute inset-y-0 left-0 flex items-center pl-3"
                      >
                        <Image src={`/assets/svgs/${selectedValues.some(sv => sv.key === value.key) ? 'check_box' : 'check_box_outline'}/${theme?.type === 'light' ? 'black' : 'white'}.svg`} height="20px" width="20px" alt="Dropdown Item Icon" />
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </div>
    </Listbox>
  );
};

export default MultiDropdown;
