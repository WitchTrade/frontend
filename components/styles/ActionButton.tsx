import { FunctionComponent, ReactNode } from 'react'

interface Types {
  [key: string]: string
}

interface Props {
  children: ReactNode
  onClick?: () => void
  type: string
  disabled?: boolean
  small?: boolean
}

const defaultStyle =
  'flex items-center focus:outline-none rounded-md text-sm cursor-pointer focus:ring-2 focus:ring-wt-accent font-medium disabled:cursor-not-allowed disabled:bg-wt-disabled '

const ActionButton: FunctionComponent<Props> = ({
  onClick,
  children,
  type,
  disabled,
  small,
}) => {
  const types: Types = {
    info: 'text-wt-light bg-wt-info-dark hover:bg-wt-info',
    success: 'text-wt-light bg-wt-success-dark hover:bg-wt-success',
    warning: 'text-wt-light bg-wt-warning-dark hover:bg-wt-warning',
    cancel: 'text-wt-light bg-wt-error-dark hover:bg-wt-error',
  }

  return (
    <button
      className={
        defaultStyle + types[type] + (small ? ' px-1 py-1' : ' px-3 py-2')
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default ActionButton
