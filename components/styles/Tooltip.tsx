import { FunctionComponent, ReactNode } from 'react'

interface Props {
  children: ReactNode
  text: string
}

const Tooltip: FunctionComponent<Props> = ({ text, children }) => {
  return (
    <div className='group inline-block relative text-center whitespace-nowrap'>
      <div className='flex items-center transition duration-100 hover:scale-110'>
        {children}
      </div>
      <span className='hidden group-hover:block absolute left-1/2 z-20 py-1 px-2 mt-1 text-sm font-bold text-wt-accent bg-wt-surface-dark rounded-lg border border-wt-accent -translate-x-1/2'>
        {text}
      </span>
    </div>
  )
}

export default Tooltip
