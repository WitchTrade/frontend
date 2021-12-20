import Image from 'next/image';
import { Fragment, FunctionComponent } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { DropdownValue } from './Dropdown';
import useDetectOutsideClick from '../../shared/hooks/useDetectOutsideClick';
import { useObservable } from '@ngneat/react-rxjs';
import { themeStore } from '../../shared/stores/theme/theme.store';

export function updateMultiSelectValue(existingValues: DropdownValue[], clickedValue: DropdownValue, allValues: DropdownValue[], minSelected?: number): DropdownValue[] {
  if (existingValues.some(ev => ev.key === clickedValue.key)) {
    if (minSelected && existingValues.length === minSelected) {
      return existingValues;
    }
    const newValues = [...existingValues];
    const index = newValues.indexOf(clickedValue);
    newValues[index] = newValues[newValues.length - 1];
    newValues.pop();
    newValues.sort((a, b) => {
      return allValues.findIndex(dv => dv.key === a.key) - allValues.findIndex(dv => dv.key === b.key);
    });
    return newValues;
  } else {
    const newValues = [...existingValues];
    newValues.push(clickedValue);
    newValues.sort((a, b) => {
      return allValues.findIndex(dv => dv.key === a.key) - allValues.findIndex(dv => dv.key === b.key);
    });
    return newValues;
  }
}

interface Props {
  selectedValues: DropdownValue[];
  updateValue: (value: DropdownValue) => void;
  values: DropdownValue[];
  selectAll?: () => void;
  selectNone?: () => void;
}

const MultiDropdown: FunctionComponent<Props> = ({ selectedValues, updateValue, values, selectAll, selectNone }) => {
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
            {selectedValues.length !== values.length && selectedValues.map((sv, i) => (
              <Fragment key={sv.key} >
                {sv.imagePath &&
                  <div className="flex items-center mr-1" style={{ minWidth: '20px' }}>
                    <Image className="min-w-full" src={sv.imagePath} height="20px" width="20px" alt="Dropdown Item Icon" />
                  </div>
                  ||
                  <p>{sv.displayName}{i !== selectedValues.length - 1 ? ', ' : ''}</p>
                }
              </Fragment>
            ))}
            {selectedValues.length === 0 &&
              <p>None selected</p>
            }
            {selectedValues.length === values.length &&
              <p>Any</p>
            }
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
              {selectAll && selectNone &&
                <div className="flex justify-evenly mb-1">
                  <button
                    className="flex items-center p-1 focus:outline-none rounded-md text-sm cursor-pointer text-wt-light bg-wt-success-dark hover:bg-wt-success"
                    onClick={selectAll}>
                    Select All
                  </button>
                  <button
                    className="flex items-center p-1 focus:outline-none rounded-md text-sm cursor-pointer text-wt-light bg-wt-error-dark hover:bg-wt-error"
                    onClick={selectNone}>
                    Select None
                  </button>
                </div>
              }
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
