import React from 'react';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none py-10">
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className={`relative w-full ${maxWidth} mx-auto z-50 px-4 sm:px-0 max-h-full flex flex-col`}>
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-xl outline-none focus:outline-none overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-solid border-gray-200 rounded-t bg-white z-10 w-full">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-gray-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none hover:text-gray-900 transition-colors"
              onClick={onClose}
            >
              <span className="block w-6 h-6 text-2xl -mt-1">&times;</span>
            </button>
          </div>
          <div className="relative p-6 flex-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
