import { Dialog, Transition } from '@headlessui/react';
import { Fragment, FunctionComponent } from 'react';

interface Props {
    dialogOpen: boolean;
    setDialogOpen: (dialogOpen: boolean) => void;
};

const WTDialog: FunctionComponent<Props> = ({ dialogOpen, setDialogOpen, children }) => {

    const closeModal = () => {
        setDialogOpen(false);
    };

    return (
        <>
            <Transition appear show={dialogOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                    open={true}
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-100"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >&#8203;</span>

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
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default WTDialog;