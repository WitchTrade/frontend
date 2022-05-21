import { FunctionComponent } from 'react'
import { HexColorPicker } from 'react-colorful'
import useDetectOutsideClick from '../../shared/hooks/useDetectOutsideClick'

interface Props {
  title: string
  hexColor: string
  setHexColor: (value: string) => void
}

const ColorPicker: FunctionComponent<Props> = ({
  title,
  hexColor,
  setHexColor,
}) => {
  const { show, nodeRef, secondNodeRef, toggleRef } =
    useDetectOutsideClick(false)

  const validateHexInput = (hexInput: string) => {
    if (/^[0-9A-Fa-f]*$/.test(hexInput)) {
      setHexColor(`#${hexInput.toUpperCase()}`)
    }
  }

  return (
    <div className='relative'>
      <p className='text-xs'>{title}</p>
      <div className='flex mb-1 align-middle'>
        <div
          className='w-10 h-10 rounded-l-lg border-y border-l border-wt-accent-light cursor-pointer'
          style={{ backgroundColor: hexColor }}
          ref={toggleRef}
        ></div>
        <div className='relative' ref={nodeRef}>
          <input
            className={`w-24 h-10 pl-5 pr-3 text-base placeholder-wt-text border-t border-r border-b border-wt-accent-light rounded-r-lg bg-wt-surface-dark focus:outline-none focus:ring-1 focus:ring-wt-accent`}
            type='input'
            maxLength={6}
            value={hexColor.substring(1)}
            onChange={(e) => validateHexInput(e.target.value)}
          />
          <p className='absolute top-0 left-1 h-10 text-xl font-bold leading-10'>
            #
          </p>
        </div>
      </div>
      {show && (
        <div
          className='absolute z-50'
          ref={secondNodeRef}
          style={{ height: '200px', width: '200px' }}
        >
          <HexColorPicker
            color={hexColor}
            onChange={(hexColor) => setHexColor(hexColor.toUpperCase())}
          />
        </div>
      )}
    </div>
  )
}

export default ColorPicker
