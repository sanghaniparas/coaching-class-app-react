import React from 'react';

export const Modal = ({ children, addClass, closePopup }) => {

  return (
    <div className="modal-wrapper" onClick={() => {
      closePopup && closePopup();
    }}>
      <div className={`modal-content ${addClass}`}>{children}</div>
    </div>
  );
};
