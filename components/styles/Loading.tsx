import { FunctionComponent } from 'react'

interface Props {
  text?: string
}

const Loading: FunctionComponent<Props> = ({ text }) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='loadingAnim'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {text && <p className='m-3 text-2xl font-bold'>{text}</p>}
    </div>
  )
}

export default Loading
