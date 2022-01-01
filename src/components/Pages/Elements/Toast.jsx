import React from 'react';

export default function Toast({ isVisible, toastMessage }) {
  return (
    <div className={`${isVisible === true ? 
      'a-toast-message a-toast-active' : 
      'a-toast-message'}`}>
      <p>{toastMessage}</p>
    </div>
  )
}
