import { FunctionComponent } from 'react';
import DefaultHeader from './DefaultHeader';

const Layout: FunctionComponent = ({ children }) => {
    return (
        <>
            <DefaultHeader />
            <main>{children}</main>
        </>
    );
};

export default Layout;