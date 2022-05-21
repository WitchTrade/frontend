import { FunctionComponent, ReactNode } from 'react'
import DefaultHeader from './DefaultHeader'
import Footer from './Footer'
import Navbar from './Navbar'
import Notification from './Notification'

interface Props {
  children: ReactNode
}

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <DefaultHeader />
      <Navbar />
      <main
        className='mt-16'
        style={{ minHeight: 'calc(100vh - 64px - 284px)' }}
      >
        {children}
      </main>
      <Footer />
      <Notification />
    </>
  )
}

export default Layout
