import { useObservable } from '@ngneat/react-rxjs'
import Image from 'next/image'
import { FunctionComponent, KeyboardEvent } from 'react'
import { themeStore } from '../../shared/stores/theme/theme.store'

interface Props {
  type: string
  placeholder: string
  value: string
  setValue: (value: string) => void
  required: boolean
  svgPath?: string
  handleKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  autocompleteValue?: string
  clearOption?: boolean
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
}

const TextInput: FunctionComponent<Props> = ({
  type,
  placeholder,
  value,
  setValue,
  required,
  svgPath,
  handleKeyPress,
  autocompleteValue,
  clearOption,
  onKeyDown,
}) => {
  const [theme] = useObservable(themeStore)

  return (
    <div className='relative'>
      <input
        className={`w-full h-11 ${svgPath ? 'pl-9' : 'pl-3'} ${
          clearOption ? 'pr-8' : 'pr-3'
        } text-base placeholder-wt-text border border-wt-accent-light rounded-lg bg-wt-surface-dark focus:outline-none focus:ring-2 focus:ring-wt-accent`}
        type={type}
        placeholder={`${placeholder}${required ? '*' : ''}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        autoComplete={autocompleteValue}
        onKeyDown={onKeyDown}
      />
      {svgPath && (
        <div className='flex absolute inset-y-0 left-0 items-center px-2 pointer-events-none'>
          <Image src={svgPath} height='24px' width='24px' alt='Input Icon' />
        </div>
      )}
      {clearOption && value && (
        <button
          className='flex absolute inset-y-0 right-0 items-center px-2'
          onClick={() => setValue('')}
        >
          <Image
            src={`/assets/svgs/close/${
              theme?.type === 'light' ? 'black' : 'white'
            }.svg`}
            height='24px'
            width='24px'
            alt='Clear Input Icon'
          />
        </button>
      )}
    </div>
  )
}

export default TextInput
