import { FunctionComponent } from 'react'

interface Props {
  placeholder: string
  value: boolean
  setValue: (value: boolean) => void
}

const CheckboxInput: FunctionComponent<Props> = ({
  value,
  placeholder,
  setValue,
}) => {
  return (
    <div className='flex items-center h-11'>
      <input
        id={placeholder}
        className='mr-2 w-7 h-7 text-wt-accent-light bg-wt-accent-light focus:outline-none focus:ring-2 focus:ring-wt-accent'
        type='checkbox'
        checked={value}
        onChange={() => setValue(!value)}
      />
      <label htmlFor={placeholder}>{placeholder}</label>
    </div>
  )
}

export default CheckboxInput
