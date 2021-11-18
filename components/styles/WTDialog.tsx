import { Dialog, Transition } from '@headlessui/react';
import { Fragment, FunctionComponent } from 'react';

interface Props {
  dialogOpen: boolean;
  setDialogOpen: (dialogOpen: boolean) => void;
  closeOnOutsideClick: boolean;
  transition?: boolean;
  opacity?: number;
};

const WTDialog: FunctionComponent<Props> = ({ dialogOpen, setDialogOpen, closeOnOutsideClick, transition = true, opacity = 30, children }) => {

  const closeModal = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Transition appear show={dialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => {
            if (closeOnOutsideClick) {
              closeModal();
            }
          }}
          open={true}
        >
          <Dialog.Overlay className={`fixed inset-0 bg-black opacity-${opacity}`} />
          <div className="flex justify-center items-center min-h-screen px-4 text-center">
            {transition &&
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {children}
              </Transition.Child>
              ||
              <>
                {children}
              </>
            }
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default WTDialog;
