import { FunctionComponent } from 'react';
import DefaultHeader from './DefaultHeader';
import Footer from './Footer';

const Layout: FunctionComponent = ({ children }) => {
    return (
        <>
            <DefaultHeader />
            <main className="mt-16 bg-wt-5" style={{ minHeight: 'calc(100vh - 64px - 184px)' }}>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;