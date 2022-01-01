import React, { useState, useEffect } from 'react';
import { CloseCircle } from './../../../Core/Layout/Icon';
// import passwordStrength from 'check-password-strength';
import { BASE_URL } from './../../../../config';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

const ChangePassword = () => {
  //^Added Change Sukrit
  const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [wrongOldPassword, setWrongOldPassword] = useState(false);
  const { addToast } = useToasts();

  const handleChange = (e) => {
    e.persist();
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setWrongOldPassword(false);

    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      newPasswordConfirmation: formData.newPasswordConfirmation,
    });
    try {
      const { data } = await axios.post(
        `${BASE_URL}/profile/changePassword`,
        body,
        config
      );

      if (data.message === 'VALIDATION ERROR') {
        setWrongOldPassword(true);
      }

      if (data.code === 200) {
        addToast('Password updated successfully!', {
          appearance: 'success',
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      }

      setFormData({
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    //^Removed formData.newPassword Change - Sukrit

    if (
      formData.oldPassword === undefined ||
      formData.newPassword === undefined ||
      formData.newPasswordConfirmation === undefined ||
      formData.newPassword !== formData.newPasswordConfirmation
    ) {
      return setError(true);
    } else {
      setError(false);
    }
  }, [formData]);

  return (
    <div className="card">
      <h3>Change your Password</h3>
      <div className="input-wrapper">
        <div className="input-group">
          <label htmlFor="oldPassword">Old Password</label>
          {wrongOldPassword === true && <CloseCircle />}
          <input
            type="password"
            name="oldPassword"

            value={formData.oldPassword}
            onChange={handleChange}
          />
          {wrongOldPassword === true && (
            <p className="error">Invalid Password</p>
          )}
        </div>
        {/* added regex */}
        <div
          className={`input-group ${formData.newPassword &&
            formData.newPassword.length >= 1 &&
            !passwordRegex.test(formData.newPassword) &&
            'error'
            }`}>
          <label htmlFor="newPassword">Enter New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
          {/*Commented and added error */}
          {/*<span className="pass-strength">
            {formData.newPassword &&
              passwordStrength(formData.newPassword).value}
            </span>*/}
          {error && <p className="error">
            Password should be minimum 8 characters with 1 integer, 1 capital letter, 1 special character
          </p>}
        </div>
        <div
          className={`input-group ${formData.newPasswordConfirmation &&
            formData.newPasswordConfirmation.length >= 1 &&
            formData.newPasswordConfirmation !== formData.newPassword &&
            'error'
            }`}>
          <label htmlFor="newPasswordConfirmation">Retype New Password</label>
          <input
            disabled={!passwordRegex.test(formData.newPassword) === true ? true : false}
            type="password"
            name="newPasswordConfirmation"
            value={formData.newPasswordConfirmation}
            onChange={handleChange}
          />
          <p className="error">
            {formData.newPasswordConfirmation &&
              formData.newPasswordConfirmation.length >= 1 &&
              formData.newPasswordConfirmation !== formData.newPassword &&
              'Password did not match'}
          </p>
        </div>
      </div>
      <button
        className={`btn-warning-line changepassword-btn ${error === true && 'disable-pass-btn'
          }`}
        onClick={handleSubmit}
      >
        Change Password
      </button>
    </div>
  );
};

export default ChangePassword;