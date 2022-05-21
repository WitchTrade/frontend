import { FunctionComponent, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Note: FunctionComponent<Props> = ({ children }) => {
  return <p className='text-sm text-center text-wt-accent'>{children}</p>
}

export default Note
