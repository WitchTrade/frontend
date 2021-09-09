import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import SettingNav from '../../../components/navs/SettingNav';
import Dropdown from '../../../components/styles/Dropdown';
import PageHeader from '../../../components/styles/PageHeader';
import { Theme } from '../../../shared/models/theme.model';
import themeService from '../../../shared/services/theme.service';

const Customization: NextPage = () => {
    const [selectedTheme, setSelectedTheme] = useState<Theme>();
    const themes = themeService.avaiableThemes;

    useEffect(() => {
        const themeSub = themeService.currentTheme$.subscribe(setSelectedTheme);

        return () => {
            themeSub.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (selectedTheme) {
            themeService.applyTheme(selectedTheme);
        }
    }, [selectedTheme]);

    return (
        <>
            <SettingNav />
            <div className="flex flex-col justify-center max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
                <PageHeader title="Customization" description="Customize your WitchTrade expirience" />
                {selectedTheme &&
                    <div className="w-3/4 self-center">
                        <Dropdown selectedValue={selectedTheme} setValue={setSelectedTheme} values={themes} />
                    </div>
                }
            </div>
        </>
    );
};

export default Customization;
