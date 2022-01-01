import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../../Core/Layout/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BASE_URL } from './../../../config';

const ResetPassword = ({ match }) => {
  const [passForm, setPassForm] = useState({
    newpassword: '',
    confirmpassword: '',
  });
  const [passError, setPassError] = useState('');

  const history = useHistory();

  const setPasswords = (e) => {
    e.preventDefault();
    setPassForm({ ...passForm, [e.target.name]: e.target.value });
  };

  const newPassSubmit = async (e) => {
    e.preventDefault();
    if (passForm.newpassword.length < 6) {
      return setPassError('Password must be minimum of 6 characters');
    }
    if (passForm.newpassword !== passForm.confirmpassword) {
      return setPassError('Your password did not match');
    }

    try {
      const payload = {
        token: match.params.id.toString(),
        password: passForm.newpassword,
      };
      const response = await axios.post(
        `${BASE_URL}/student/forgetPasswordUpdate`,
        payload
      );

      if (response.data.message === 'new password updated') {
        setPassForm({
          newpassword: '',
          confirmpassword: '',
        });
        setPassError('');
        notify();
        return history.push('/coaching');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const notify = () =>
    toast.success('Your password has been updated !', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <Layout>
      <div className="a-wrapper">
        <div className="a-container">
          <div className="card reset-container">
            <h2 style={{ marginBottom: '3rem' }}>Reset password</h2>
            <form onSubmit={(e) => newPassSubmit(e)}>
              <div className="form-group">
                <input
                  type="password"
                  value={passForm.newpassword}
                  name="newpassword"
                  onChange={(e) => setPasswords(e)}
                  placeholder="Enter your new password"
                />
                {passError.includes('minimum') ? (
                  <span className="error">{passError}</span>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  value={passForm.confirmpassword}
                  name="confirmpassword"
                  onChange={(e) => setPasswords(e)}
                  placeholder="Please confirm your password"
                />
                {passError.includes('match') ? (
                  <span className="error">{passError}</span>
                ) : null}
              </div>
              <button type="submit" className="btn-primary btn-block mt-30">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default ResetPassword;
