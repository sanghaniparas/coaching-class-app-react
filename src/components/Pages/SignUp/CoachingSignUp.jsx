import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Toast from '../Elements/Toast';
import { ToolTip } from '../../Core/Layout/Tooltip/ToolTip';
import axios from 'axios';
import Timer from 'react-compound-timer';
import { toggleView } from '../../../utils/PasswordToggle.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from './../../../config';
import { connect } from 'react-redux';

const CoachingSignUp = ({ closePopup, openLoginPopup, otpModal }) => {
  const [resendOTPcount, setResenOTPCount] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);
  const [examType, setExamType] = useState(false);
  const [allExams, setAllExams] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [formError, setFormError] = useState({
    nameerror: '',
    passerror: '',
    mobileerror: '',
    emailerror: '',
    otpError: '',
  });
  const [otp, setOtp] = useState('');
  const [success, setSuccess] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [smsDetails, setSmsDetails] = useState({});
  const [userData, setUserData] = useState('');
  const [res, setRes] = useState('');
  const [exams, setExams] = useState([]);
  const [otpBtnDisable, setOtpBtnDisable] = useState(true);

  const [switchTab, setSwitchTab] = useState(true);

  const history = useHistory();

  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 6000);
  };

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError({
      nameerror: '',
      passerror: '',
      mobileerror: '',
      emailerror: '',
      otpError: '',
    });
  };

  useEffect(() => {
    if (formData.password.length > 0 && formData.password.length < 6) {
      setFormError({
        passerror: 'Password should be atleast 6-8 characters long',
      });
    }
    if (formData.password.length >= 6) {
      setFormError({ passerror: '' });
    }

    // if (
    //   formData.password.length >= 6 &&
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*])[a-zA-Z0-9!@#$%&*]+$/.test(
    //     formData.password
    //   ) === false
    // ) {
    //   setFormError({
    //     passerror:
    //       'Password must include a uppercase, a lowercase, a number and a special character',
    //   });
    // }
    // if (
    //   formData.password.length >= 6 &&
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*])[a-zA-Z0-9!@#$%&*]+$/.test(
    //     formData.password
    //   ) === true
    // ) {
    //   setFormError({
    //     passerror: '',
    //   });
    // }
  }, [formData]);

  const onChangeOtp = (e) => {
    e.preventDefault();
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let regExp = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[A-Za-z]+$/;

    if (formData.name === '')
      return setFormError({ nameerror: 'Please enter your name' });
    if (!regExp.test(formData.email))
      return setFormError({ emailerror: 'Enter valid email address' });
    if (formData.mobile.length !== 10)
      return setFormError({ mobileerror: 'Please enter valid mobile number' });
    if (formData.password.length < 6)
      return setFormError({
        passerror: 'Password must be of atleast 6 characters',
      });

    const payload = { email: formData.email, mobile: formData.mobile };

    try {
      const response = await axios.post(
        `${BASE_URL}/coaching/registration/check`,
        payload
      );

      if (response.data.valid === 0) {
        if (
          response.data.data.find((el) => el.field === 'email') !== undefined
        ) {
          setFormError({
            emailerror: 'Email already exists',
          });
        }
        if (
          response.data.data.find((el) => el.field === 'mobile') !== undefined
        ) {
          setFormError({
            mobileerror: 'Mobile already exists',
          });
        }
      }

      if (response.data.valid === 1) {
        const sendOtpRes = await axios.post(
          `https://2factor.in/API/V1/${apiKey}/SMS/+91${formData.mobile}/AUTOGEN/OTP Verification Admisure`
        );
        setSmsDetails(sendOtpRes.data);
        setUserData(formData);
        setFormData({ name: '', email: '', mobile: '', password: '' });
        setSuccess(true);
      }
    } catch (err) {
      showErrorToast('Something went wrong. Please try again later !');
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    if (otpBtnDisable === false) {
      setOtp('');
      return notify3();
    }

    try {
      const response = await axios.post(
        `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${smsDetails.Details}/${otp}`
      );

      console.log(response.status);

      if (response.data.Details === 'OTP Expired') {
        showErrorToast('OTP Expired ! Click on resend to resend an otp');
        return setOtp('');
      }

      if (response.data.Status === 'Success') {
        const confirmSignUp = await axios.post(
          `${BASE_URL}/coaching/registration/step1`,
          userData
        );

        console.log(confirmSignUp.data);
        localStorage.setItem('token', confirmSignUp.data.token);
        localStorage.setItem('username', confirmSignUp.data.data.name);
        setRes(confirmSignUp.data.data.id);
        console.log(confirmSignUp);
        setFormError({
          nameerror: '',
          passerror: '',
          mobileerror: '',
          emailerror: '',
          otpError: '',
        });

        setUserData('');
        setSmsDetails({});
        setExamType(true);
      }
    } catch (err) {
      //   showErrorToast('Something went wrong. Please enter a valid otp !');
      if (err.response.data.Status === 'Error') {
        setFormError({ otpError: 'Please enter a valid otp!' });
      }
      setOtp('');
    }
  };

  const resendOtp = async (reset) => {
    document.getElementById('resetTimer').click();
    setResenOTPCount((resendOTPcount) => resendOTPcount + 1);
    try {
      const sendOtpRes = await axios.post(
        `https://2factor.in/API/V1/${apiKey}/SMS/+91${userData.mobile}/AUTOGEN/OTP Verification Admisure`
      );
      setSmsDetails(sendOtpRes.data);
      return notify();
    } catch (err) {
      console.log(err);
    }
  };

  const notify = () =>
    toast.success('An OTP has been sent !', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notify2 = () =>
    toast.error('Please change mobile number and try again !', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notify3 = () => {
    setFormError({
      nameerror: '',
      passerror: '',
      mobileerror: '',
      emailerror: '',
      otpError: '',
    });
    toast.error('OTP has expired !', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const chooseExamType = (examId) => {
    if (allExams.includes(examId.toString())) {
      let newArr = allExams.filter((el) => el !== examId.toString());
      return setAllExams(newArr);
    }
    setAllExams(allExams.concat(examId.toString()));
  };

  const addExamType = async () => {
    try {
      const payload = { id: res.toString(), examTypeIds: allExams };
      const response = await axios.post(
        `${BASE_URL}/coaching/registration/step4`,
        payload
      );

      setAllExams([]);
      closePopup();
      window.location.reload();
      history.push('/coaching');

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function getApiKey() {
      try {
        const response = await axios.get(
          `${BASE_URL}/misc/getSmsGatewayApiKey`
        );
        setApiKey(response.data.data);
      } catch (err) {
        showErrorToast('Something went wrong. Please try again later !');
      }
    }

    async function getExamTypes() {
      try {
        const response = await axios.get(`${BASE_URL}/misc/examType`);
        setExams(response.data.data);
      } catch (err) {
        showErrorToast('Something went wrong. Please try again later !');
      }
    }

    getApiKey();
    getExamTypes();
    toggleView();
    setAllExams([]);
  }, []);

  return (
    <>
      {!success && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Coaching Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your Name"
              value={formData.name}
              name="name"
              onChange={(e) => onChange(e)}
            />
            {formError.nameerror && (
              <span className="error">{formError.nameerror}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              value={formData.email}
              name="email"
              onChange={(e) => onChange(e)}
            />
            {formError.emailerror && (
              <span className="error">{formError.emailerror}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <div className="phone-group">
              <span className="country">
                <img src={require('../../../assets/images/flag.svg')} alt="" />{' '}
                +91
              </span>
              <input
                type="text"
                id="mobile"
                placeholder="Enter Phone Number"
                value={formData.mobile}
                name="mobile"
                onChange={(e) => onChange(e)}
              />
            </div>

            {formError.mobileerror && (
              <span className="error">{formError.mobileerror}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Password
              <ToolTip
                message={
                  'The password should be at least 6-8 characters long. To make it stronger, use upper and lower case letters, numbers, and symbols(!*?$%^&).'
                }
                position={'right'}>
                <img src={require('../../../assets/images/info.svg')} alt="" />
              </ToolTip>
            </label>
            <div className="group-input">
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={formData.password}
                name="password"
                onChange={(e) => onChange(e)}
              />
              <img
                className="view"
                src={require('../../../assets/images/eye.svg')}
                alt="view"
                id="view"
              />
            </div>
            {formError.passerror && (
              <span className="error">{formError.passerror}</span>
            )}
          </div>
          <div className="trms">
            <span>
              By signing up, I agree to{' '}
              <Link
                to="#"
                style={{ color: 'red', fontWeight: 'bold' }}
                className="text-warning">
                Terms &amp; conditions
              </Link>
            </span>
            {/* <span className="reffer" onClick={showReferral}>
                  Have a referral code?
                  {referral && (
                    <div className="reffer-box">
                      <h5>Referral Code</h5>
                      <form action="">
                        <input type="text" placeholder="Enter referral code" />
                        <span className="error">Referral code is invalid</span>
                        <div className="reffer-box-footer">
                          <button
                            type="button"
                            className="btn-transparent"
                            onClick={hideReferral}>
                            Cancel
                          </button>
                          <button className="btn-primary radius ml-10">
                            Apply
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </span> */}
          </div>
          <button type="submit" className="btn-primary btn-block">
            Sign Up
          </button>
          {/* <p className="signupwith">
                <span>Or sign up with</span>
              </p>
              <div className="a-social-btn-group">
                <Link to="/">
                  <img
                    src={require('../../../assets/images/facebook-btn.svg')}
                    alt=""
                  />
                </Link>
                <Link className="ml-10" to="/">
                  <img
                    src={require('../../../assets/images/googleplus-btn.svg')}
                    alt=""
                  />
                </Link>
              </div> */}
          <p className="log-direct">
            Already have an account?{' '}
            <Link
              to="#"
              className="text-warning"
              onClick={() => {
                closePopup();
                openLoginPopup();
              }}>
              Sign In
            </Link>
          </p>
        </form>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    otpModal: state.auth.otpModal,
  };
};

export default connect(mapStateToProps)(CoachingSignUp);
