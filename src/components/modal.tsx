import React from 'react';

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  title: string;
  imageSrc: string;
  description: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, toggleModal, title, imageSrc, description }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm ">
          <div className="p-5 border-2 rounded-lg bg-slate-800 w-96 border-slate-600">
            <h2 className="flex items-center justify-center mb-3 text-2xl font-bold">{title}</h2>
            
            <div className="flex items-center justify-center">
              <img
                alt=""
                src={imageSrc}
                className="w-10 h-10" // Adjust the size as needed
              />
            </div>
            <p className="flex items-center justify-center pt-4 text-white-600">{description}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={toggleModal}
                className="px-4 py-2 text-white rounded-lg bg-slate-700 hover:brightness-150"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;