import { FunctionComponent } from 'react'

const KofiButton: FunctionComponent = () => {
  return (
    <div className='kofi-container'>
      <a
        title='Support me on ko-fi.com'
        className='kofi-button'
        style={{ backgroundColor: '#29abe0' }}
        href='https://ko-fi.com/K3K36ZJUZ'
        target='_blank'
        rel='noreferrer'
      >
        <span className='kofi-text'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='https://storage.ko-fi.com/cdn/cup-border.png'
            alt='Ko-fi donations'
            className='kofi-img'
          />
          Support Me on Ko-fi
        </span>
      </a>
    </div>
  )
}

export default KofiButton
