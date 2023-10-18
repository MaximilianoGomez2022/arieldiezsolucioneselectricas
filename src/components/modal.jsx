import React from 'react';

const Modal = ({ isOpen, imageSrc, onClose }) => {
    
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content" onClick={onClose}>
        <img src={`../src/assets/${imageSrc}`} alt="Imagen modal" onClick={onClose} />
        <img src='../src/assets/cerrar-modal.png' className='modal-button' onClick={onClose}></img>
      </div>
    </div>
  );
};

export default Modal;