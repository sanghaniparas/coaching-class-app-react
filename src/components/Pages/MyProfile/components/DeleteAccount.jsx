import React, { useState } from 'react';
import AccountDeleteModal from './AccountDeleteModal';

const DeleteAccount = () => {
  const [modalToggler, setModalToggler] = useState(false);

  const openDeleteClick = () => {
    setModalToggler(!modalToggler);
  };
  const closeDeleteClick = () => {
    setModalToggler(!modalToggler);
  };
  return (
    <>
      <div className="card">
        <h3>Delete Account</h3>
        <p className="info">Would you like to delete your admisure account?</p>
        <p>
          <span className="text-red">Warning:</span> If you delete your account,
          you will be unsubscribed from all subscribed packages, and will lose
          access forever.
        </p>
        <button className="btn-warning-line mt-20" onClick={openDeleteClick}>
          Delete Account
        </button>
      </div>

      {modalToggler && (
        <AccountDeleteModal closeDeleteClick={closeDeleteClick} />
      )}
    </>
  );
};

export default DeleteAccount;
