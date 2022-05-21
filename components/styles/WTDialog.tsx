import { Dialog, Transition } from '@headlessui/react'
import { Fragment, FunctionComponent, ReactNode } from 'react'

interface Props {
  children: ReactNode
  dialogOpen: boolean
  setDialogOpen: (dialogOpen: boolean) => void
  closeOnOutsideClick: boolean
  transition?: boolean
}

const WTDialog: FunctionComponent<Props> = ({
  dialogOpen,
  setDialogOpen,
  closeOnOutsideClick,
  transition = true,
  children,
}) => {
  const closeModal = () => {
    setDialogOpen(false)
  }

  return (
    <>
      <Transition appear show={dialogOpen} as={Fragment}>
        <Dialog
          as='div'
          className='overflow-y-auto fixed inset-0 z-40'
          onClose={() => {
            if (closeOnOutsideClick) {
              closeModal()
            }
          }}
          open={true}
        >
          <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
          <div className='flex justify-center items-center px-4 min-h-screen text-center'>
            {(transition && (
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-100'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-100'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                {children}
              </Transition.Child>
            )) || <>{children}</>}
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default WTDialog
