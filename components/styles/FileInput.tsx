import { FunctionComponent } from 'react'

interface Props {
  inputId: string
  text: string
  inputChanged?: () => void
  inputRef: any
}

const FileInput: FunctionComponent<Props> = ({
  inputId,
  text,
  inputChanged,
  inputRef,
}) => {
  return (
    <div className='relative'>
      <input
        id={inputId}
        type='file'
        className='hidden'
        accept='application/json'
        ref={inputRef}
        onChange={inputChanged}
      />
      <label
        htmlFor={inputId}
        tabIndex={0}
        className='flex py-2 px-3 text-sm font-medium text-wt-light bg-wt-success-dark hover:bg-wt-success rounded-md focus:outline-none focus:ring-2 focus:ring-wt-accent cursor-pointer'
      >
        <p>{text}</p>
      </label>
    </div>
  )
}

export default FileInput
