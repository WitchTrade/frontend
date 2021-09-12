import { FunctionComponent, useEffect, useState } from 'react';
import DefaultHeader from './DefaultHeader';
import Navbar from './Navbar';
import Footer from './Footer';
import Notification from './Notification';
import useThemeProvider from '../../shared/providers/theme.provider';

const Layout: FunctionComponent = ({ children }) => {
    const { theme } = useThemeProvider();
    const [themeStyles, setThemeStyles] = useState<any>();

    useEffect(() => {
        if (theme) {
            setThemeStyles({
                '--wt-light': theme.colors.light,
                '--wt-dark': theme.colors.dark,
                '--wt-text': theme.colors.text,
                '--wt-selected-light': theme.colors.selectedLight,
                '--wt-selected': theme.colors.selected,
                '--wt-selected-dark': theme.colors.selectedDark,
                '--wt-surface': theme.colors.surface,
                '--wt-surface-dark': theme.colors.surfaceDark,
                '--wt-hover': theme.colors.hover,
                '--wt-hover-light': theme.colors.hoverLight,
                '--wt-accent-light': theme.colors.accentLight,
                '--wt-accent': theme.colors.accent,
                '--wt-info': theme.colors.info,
                '--wt-info-dark': theme.colors.infoDark,
                '--wt-info-light': theme.colors.infoLight,
                '--wt-success': theme.colors.success,
                '--wt-success-dark': theme.colors.successDark,
                '--wt-success-light': theme.colors.successLight,
                '--wt-warning': theme.colors.warning,
                '--wt-warning-dark': theme.colors.warningDark,
                '--wt-warning-light': theme.colors.warningLight,
                '--wt-error': theme.colors.error,
                '--wt-error-dark': theme.colors.errorDark,
                '--wt-error-light': theme.colors.errorLight
            });
        }
    }, [theme]);

    return (
        <div style={themeStyles}>
            <DefaultHeader />
            <Navbar />
            <main className="mt-16 bg-wt-surface text-wt-text" style={{ minHeight: 'calc(100vh - 64px - 184px)' }}>{children}</main>
            <Footer />
            <Notification />
        </div>
    );
};

export default Layout;