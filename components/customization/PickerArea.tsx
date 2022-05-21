import { FunctionComponent, ReactNode } from 'react'

interface Props {
  children: ReactNode
  areaTitle: string
}

const PickerArea: FunctionComponent<Props> = ({ children, areaTitle }) => {
  return (
    <div className='p-2 m-1 bg-wt-surface-dark rounded-lg border-2 border-wt-accent'>
      <p className='text-sm text-center text-wt-accent-light'>{areaTitle}</p>
      <div className='flex flex-wrap justify-center'>{children}</div>
    </div>
  )
}

export default PickerArea
