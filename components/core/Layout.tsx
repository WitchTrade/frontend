import { FunctionComponent } from 'react';
import DefaultHeader from './DefaultHeader';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: FunctionComponent = ({ children }) => {
    return (
        <>
            <DefaultHeader />
            <Navbar />
            <main className="mt-16 bg-wt-surface" style={{ minHeight: 'calc(100vh - 64px - 184px)' }}>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;