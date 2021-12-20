import Image from 'next/image';
import { Fragment, FunctionComponent } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useObservable } from '@ngneat/react-rxjs';
import { themeStore } from '../../shared/stores/theme/theme.store';
import { Theme } from '../../shared/stores/theme/theme.model';

interface Props {
  selectedTheme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeDropdown: FunctionComponent<Props> = ({ selectedTheme, setTheme, themes }) => {
  const [theme] = useObservable(themeStore);

  return (
    <Listbox value={selectedTheme} onChange={setTheme}>
      {({ open }) => (
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-wt-surface-dark rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-wt-accent sm:text-sm border border-wt-accent-light">
            <div className="flex flex-col justify-center">
              <span className="block truncate ml-1">{selectedTheme.displayName}</span>
              <span className="ml-1 text-xs text-wt-accent-light">{selectedTheme.creator}</span>
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
              {themes.map((theme, i) => (
                <Listbox.Option
                  key={i}
                  className={`select-none relative py-2 pl-10 pr-4 rounded-md ${theme.key === selectedTheme.key ? '' : 'hover:bg-wt-hover cursor-pointer'}`}
                  value={theme}
                >
                  {({ selected }) => (
                    <>
                      <div className="flex flex-col justify-center">
                        <span
                          className={`${selected ? "font-medium" : "font-normal"
                            } block truncate ml-1`}
                        >
                          {theme.displayName}
                        </span>
                        <span className="ml-1 text-xs text-wt-accent-light">{theme.creator}</span>
                      </div>
                      {theme.key === selectedTheme.key ? (
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

export default ThemeDropdown;
