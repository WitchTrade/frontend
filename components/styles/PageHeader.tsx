import { FunctionComponent } from 'react'

interface Props {
  title: string
  description?: string
}

const PageHeader: FunctionComponent<Props> = ({ title, description }) => {
  return (
    <>
      <p
        className={`text-center text-3xl font-bold text-wt-accent pt-3${
          !description ? ' pb-3' : ''
        }`}
      >
        {title}
      </p>
      {description && (
        <p className='pb-3 text-sm text-center text-wt-accent-light'>
          {description}
        </p>
      )}
    </>
  )
}

export default PageHeader
