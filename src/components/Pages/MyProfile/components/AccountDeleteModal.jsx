import React, { useEffect, useState } from 'react';
import { ModalClose } from './../../../Core/Layout/Icon';
import { CloseCircle, Modal } from './../../../Core/Layout/Modal/Modal';
import axios from 'axios';
import { BASE_URL } from './../../../../config';
import { useToasts } from 'react-toast-notifications';
import { Link, NavLink, useHistory } from 'react-router-dom';


const AccountDeleteModal = ({ closeDeleteClick }) => {
  const [reasons, setReasons] = useState(null);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    reasonId: '',
    otherReason: '',
    email: '',
    password: '',
  });
  const { addToast } = useToasts();

  const history = useHistory();
  useEffect(() => {
    (async function fetchReasons() {
      const config = {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `${localStorage.token}`,
        },
      };
      try {
        const {
          data: { data },
        } = await axios.get(
          `${BASE_URL}/profile/accountDeactivateReasons`,
          config
        );

        setReasons(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleSelectReason = (e) => {
    e.persist();
    setData((data) => ({ ...data, reasonId: e.target.id }));
  };

  const handleChange = (e) => {
    e.persist();
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/profile/deleteAccount`,
        data,
        config
      );

      if (
        response.data.message === 'VALIDATION ERROR' ||
        response.data.message === 'invalid email or password'
      ) {
        setError(true);
      }



      if (response.data.message === 'account deleted') {

        addToast('Account Deleted successfully!', {
          appearance: 'success',
          autoDismiss: 'true',
          autoDismissTimeout: 3000,
        });
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        console.log("response username", response);
        //window.location.reload();
        history.push(`/`);
      }

      setData({
        reasonId: '',
        otherReason: '',
        email: '',
        password: '',
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal addClass="modal-sm profile-delete-modal">
      <div className="modal-header">
        <span className="close" onClick={() => closeDeleteClick()}>
          <ModalClose />{' '}
        </span>
        <h3>Delete Your Account?</h3>
      </div>
      <div className="modal-body">
        <p>
          This account contains  Test packages,  Practice chapter and 
          Quiz. Deleting your account will remove all of your content and data
          associated with it
        </p>
        <h4>Tell us why you're leaving:</h4>
        {reasons !== null &&
          reasons.reasons.map((el) => (
            <p className="custom-radio">
              <input
                type="radio"
                name="delete"
                id={el.id}
                onClick={handleSelectReason}
              />
              <label htmlFor={el.id}>{el.reason}</label>
            </p>
          ))}
        <p className="custom-radio other-select">
          <input
            type="radio"
            name="delete"
            id="0"
            onClick={handleSelectReason}
          />
          <label htmlFor="0">
            Other{' '}
            <input
              type="text"
              name="otherReason"
              onChange={handleChange}
              value={data.otherReason}
              id=""
              placeholder="Leaving Reason"
              disabled={data.reasonId === '0' ? false : true}
            />
          </label>
          {data.reasonId === '0' && data.otherReason.length === 0 && (
            <p className="error">
              Please provide a reason before submitting!
            </p>
          )}
        </p>
        <h4>Enter your email address &amp; password to Continue</h4>
        <div className="input-group">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter email ID"
              name="email"
              onChange={handleChange}
              value={data.email}
            />
            {error && (
              <span className="error">Your email ID did not match</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {error && (
              <span className="error">Your password did not match</span>
            )}
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn-warning-line" onClick={() => closeDeleteClick()}>
          Cancel
        </button>
        {(data.reasonId === '0' && data.otherReason.length === 0) ||
          data.email.length === 0 ||
          data.password.length === 0 ? (
            <button
              className="btn-line"
              style={{
                pointerEvents: 'none',
                background: '#e0e0e0',
              }}>
              Delete my Account
            </button>
          ) : (
            <button className="btn-line" onClick={handleSubmit}>
              Delete my Account
            </button>
          )}
      </div>
    </Modal>
  );
};

export default AccountDeleteModal;
