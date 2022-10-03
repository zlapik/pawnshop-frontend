import { Dialog, Transition } from '@headlessui/react'
import { Fragment, Dispatch, SetStateAction, FC } from 'react'
import { Button } from '@components/small/Button'
import clsx from 'clsx'

interface InformationModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  title?: string
  subtitle?: string
  isError?: boolean
  isSuccess?: boolean
}

const InformationModal: FC<InformationModalProps> = ({
  isOpen,
  setIsOpen,
  title = '',
  subtitle = '',
  isError = false,
  isSuccess = false
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative  z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center ml-64 p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  '"w-full max-w-md min-w-[405px] transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow  transition-all text-red-700',
                  { 'border border-red-400 bg-red-100': isError },
                  { 'border border-green-400 bg-green-100': isSuccess }
                )}
              >
                <Dialog.Title as="h3" className="text-2xl font-medium leading-10 text-gray-900 text-center">
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-black text-center text-lg">{subtitle}</p>
                </div>
                <div className=" flex mt-4 space-x-6 justify-center text-black">
                  <Button
                    text="Zatvoriť"
                    onClick={() => setIsOpen(false)}
                    className="w-32"
                    submit={isSuccess}
                    cancel={isError}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default InformationModal