import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/css/Modal.css'

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') 
  );
};

export default Modal;