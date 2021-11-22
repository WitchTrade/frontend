import { FunctionComponent } from 'react';
import DefaultHeader from './DefaultHeader';
import Navbar from './Navbar';
import Footer from './Footer';
import Notification from './Notification';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div>
      <DefaultHeader />
      <Navbar />
      <main className="mt-16" style={{ minHeight: 'calc(100vh - 64px - 284px)' }}>{children}</main>
      <Footer />
      <Notification />
    </div>
  );
};

export default Layout;
