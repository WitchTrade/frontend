import Image from 'next/image'
import { FunctionComponent } from 'react'

interface Props {
  name: string
  value: boolean
  trueIconPath: string
  falseIconPath: string
}

const BooleanDisplay: FunctionComponent<Props> = ({
  name,
  value,
  trueIconPath,
  falseIconPath,
}) => {
  return (
    <div className='flex justify-between items-center px-2 h-11 bg-wt-surface-dark rounded-lg'>
      <p className='ml-1'>{name}:</p>
      <Image
        src={value ? trueIconPath : falseIconPath}
        height='24px'
        width='24px'
        alt='Boolean Icon'
      />
    </div>
  )
}

export default BooleanDisplay
