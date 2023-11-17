import React, { Fragment, useState, useEffect } from "react";

import { Dialog, Transition } from "@headlessui/react";

const SuccessModal = ({ isOpen, setIsOpen }) => {

  const handleCloseAndReopen = () => {
    setIsOpen(false);
  };
  

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900">
                  🎉 Congrats
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-md text-gray-500">You have successfully completed this module 😎😎</p>
                  <p className="text-md text-gray-500">
                    Now you can proceed with the next module
                  </p>
                </div>
                
                <div className="mt-4">
                  <button
                    
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleCloseAndReopen}
                    
                  >
                    
                       Go Back !
              
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SuccessModal;
