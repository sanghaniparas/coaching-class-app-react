import React, { useEffect, useState } from 'react';
import {
  CameraEdit,
  CalenderIcon,
  PhoneIcon,
  MobileVerify,
  EditIcon,
} from '../../../Core/Layout/Icon';
import useForm from './../../../../Hooks/useForm';
import { BASE_IMAGE_UPLOAD, BASE_URL } from './../../../../config';
import axios from 'axios';
import Toast from '../../Elements/Toast';
import { useToasts } from 'react-toast-notifications';
import Timer from 'react-compound-timer';
import { Modal } from '../../../Core/Layout/Modal/Modal';

const EditProfile = ({ profile, handleUpdatedData, handleIsMobileVerify }) => {
  const [data, handleChange, cityList] = useForm(profile);
  const [smsDetails, setSmsDetails] = useState({});
  const [stateList, setStateList] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showVerifyMobile, setShowVerifyMobile] = useState(false);
  const [otpBtnDisable, setOtpBtnDisable] = useState(true);
  const [resendOTPcount, setResenOTPCount] = useState(1);
  const [mobileVerifyError, setMobileVerifyError] = useState('');
  const [otp, setOtp] = useState('');
  const [isMobileVerified, setMobileVerifed] = useState(profile.isMobileVerified);
  const [disableVerify, setDisableVerify] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const { addToast } = useToasts();

  useEffect(() => {
    handleUpdatedData(data);
  }, [data]);

  // useEffect(() => {
  //   (async function fetchStates() {
  //     try {
  //       const {
  //         data: { data },
  //       } = await axios.get(`${BASE_URL}/misc/state/105`);
  //       setStateList(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    async function getApiKey() {
      try {
        const response = await axios.get(
          `${BASE_URL}/misc/getSmsGatewayApiKey`
        );
        setApiKey(response.data.data);
      } catch (err) {
        addToast('Something went wrong. Please try again later !', {
          appearance: 'error',
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        // showErrorToast('Something went wrong. Please try again later !');
      }
    }

    async function fetchStates() {
      try {
        const {
          data: { data },
        } = await axios.get(`${BASE_URL}/misc/state/105`);
        setStateList(data);
      } catch (err) {
        console.log(err);
      }
    }
    setImagePreview('')
    fetchStates();
    getApiKey();
    handleIsMobileVerify(data.isMobileVerified);
  }, []);

  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 6000);
  };

  const verifyMobile = async (e) => {
    e.preventDefault();
    if (data.mobile.length !== 10) {
      // showErrorToast('Please enter valid mobile number' );
      addToast('Please enter valid mobile number', {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    } else {
      const sendOtpRes = await axios.post(
        `https://2factor.in/API/V1/${apiKey}/SMS/+91${data.mobile}/AUTOGEN/OTP Verification Admisure`
      );
      handleIsMobileVerify(1);
      setSmsDetails(sendOtpRes.data);
      setShowVerifyMobile(true);
    }
  };
  const onChangeOtp = (e) => {
    e.preventDefault();
    setMobileVerifyError('');
    setOtp(e.target.value);
  };
  const resendOtp = async (reset) => {
    document.getElementById('resetTimer').click();
    setResenOTPCount((resendOTPcount) => resendOTPcount + 1);
    try {
      const sendOtpRes = await axios.post(
        `https://2factor.in/API/V1/${apiKey}/SMS/+91${data.mobile}/AUTOGEN/OTP Verification Admisure`
      );
      setSmsDetails(sendOtpRes.data);
      return notify();
    } catch (err) {
      console.log(err);
    }
  };
  const notify = () => {
    addToast('An OTP has been sent !', {
      appearance: 'success',
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
  };
  const notify2 = () => {
    addToast('Please change mobile number and try again !', {
      appearance: 'error',
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
    // showErrorToast('Please change mobile number and try again !');
  };
  const notify3 = () => {
    addToast('OTP has expired !', {
      appearance: 'error',
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
    // showErrorToast('OTP has expired !');
  };
  const closePopup = () => {
    setMobileVerifyError('');
    setShowVerifyMobile(false);
  };
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setMobileVerifyError('');
    if (otpBtnDisable === false) {
      setOtp('');
      return notify3();
    }
    try {
      const response = await axios.post(
        `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${smsDetails.Details}/${otp}`
      );

      if (response.data.Details === 'OTP Expired') {
        addToast('OTP Expired ! Click on resend to resend an otp', {
          appearance: 'error',
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        // showErrorToast('OTP Expired ! Click on resend to resend an otp');
        return setOtp('');
      }

      if (response.data.Status === 'Success') {
        setDisableVerify(true);
        setSmsDetails({});
        let sendVerifedMobile = JSON.stringify({
          mobile: parseInt(data.mobile)
        });
        let headerConfig = {
          headers: {
            'Content-Type': 'Application/json',
            Authorization: `${localStorage.token}`,
          },
        };
        try {
          const getResponse = await axios.post(
            `${BASE_URL}/profile/mobileVerification`,
            sendVerifedMobile,
            headerConfig
          );
          if(getResponse.data.message==='success') {
            handleIsMobileVerify(1);
            setMobileVerifed(1);
            addToast('Your mobile number is successfully verified.', {
              appearance: 'success',
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          } else {
            addToast('Unable to verify the mobile number.', {
              appearance: 'error',
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          }
          setMobileVerifyError('');
          setShowVerifyMobile(false);
        } catch (err) {
          setDisableVerify(false);
          addToast('Something went wrong. Please try again later !', {
            appearance: 'error',
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
        }
      } else {
        setDisableVerify(false);
      }
    } catch (err) {
      //   showErrorToast('Something went wrong. Please enter a valid otp !');
      if (err.response.data.Status === 'Error') {
        setMobileVerifyError('Wrong OTP, Try again!');
      }
      setDisableVerify(false);
      setOtp('');
    }
  };

  return (
    <>
      <div className="profile-avt-info">
        <span
          className="avt"
          style={{
            backgroundImage: `url(${
              imagePreview!==''?
                imagePreview
                :
                profile.avatarUrl !== null
                  ? profile.avatarUrl
                  : require('../../../../assets/images/avatar-1577909_1280.webp')
            })`,
          }}>
          <label htmlFor="editprofile" className="edit">
            <input
              type="file"
              className="d-none"
              name="file_name"
              onChange={(e) => {
                var file = e.target.files[0];
                var reader = new FileReader();
                var url = reader.readAsDataURL(file);
                reader.onloadend = function (e) {
                    setImagePreview(reader.result);
                  }.bind(this);
                console.log(url);
                handleChange(e)
              }}
              id="editprofile"
              accept="image/*"
            />
            <CameraEdit />
          </label>
        </span>
        <h2>{data.name}</h2>
      </div>
      <div className="edit-profile-details">
        <div className="form-wrap one">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={data.name}
              name="name"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-wrap three">
          <div className="form-group">
            <label htmlFor="name">Gender</label>
            <select
              id=""
              value={data.gender}
              name="gender"
              onChange={handleChange}>
              <option disabled selected>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Date of Birth</label>
            <div className="input-group">
              <input
                type="date"
                value={data.dob}
                name="dob"
                max={`${
                  new Date(
                    new Date().getTime() -
                      new Date().getTimezoneOffset() * 60000
                  )
                    .toISOString()
                    .split('T')[0]
                }`}
                onChange={handleChange}
              />
              {/* <CalenderIcon /> */}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">User ID</label>
            <div className="input-group">
              <input type="text" disabled value={profile.userId} />
            </div>
          </div>
        </div>

        <div className="form-wrap two">
          <div className="form-group">
            <label htmlFor="name">Email ID</label>
            <div className="input-group verify">
              <input
                type="text"
                value={data.email}
                name="email"
                disabled
                onChange={handleChange}
              />
              {/* <span className="verify">Verify</span> */}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Mobile Number</label>
            <div className="input-group pdleft">
              <div className="country-code">
                +91
                <img
                  src={require('../../../../assets/images/india-flag.png')}
                  alt=""
                />
              </div>
              <input
                type="text"
                value={data.mobile}
                name="mobile"
                onChange={handleChange}
                minLength="10"
                maxLength="10"
              />
              {isMobileVerified===0 && <span className="verify" onClick={(e) => verifyMobile(e)}>Verify</span>}
              {/* <span className="verify">Verify</span> */}
            </div>
          </div>
        </div>

        <div className="form-wrap two">
          <div className="form-group address">
            <label htmlFor="name">Address</label>
            <input
              type="text"
              value={data.address}
              name="address"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Zip Code</label>
            <input
              type="text"
              value={data.zipCode}
              name="zipCode"
              onChange={handleChange}
              minLength="6"
              maxLength="6"
            />
          </div>
        </div>

        <div className="form-wrap three">
          <div className="form-group">
            <label htmlFor="name">Country</label>
            <input
              type="text"
              disabled
              value={'India'}
              name="countryId"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">State</label>
            <select
              name="stateId"
              id=""
              value={data.stateId}
              onChange={handleChange}>
              <option disabled selected>
                Select State
              </option>
              {stateList.length &&
                stateList.map((el) => <option value={el.id}>{el.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">City</label>
            <select value={data.cityId} name="cityId" onChange={handleChange}>
              <option disabled selected>
                Select City
              </option>
              {cityList.map((el) => (
                <option value={el.id}>{el.city}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="info">
          * Please provide us with your correct phone number as it will be used
          to notify you of any changes in your test schedule.
        </p>
      </div>
      <Toast isVisible={isVisible} toastMessage={toastMessage} />
      {showVerifyMobile && (
        <Modal addClass="mobile-verify" /*closePopup={closePopup}*/ >
          <span className="icon">
            <MobileVerify />
          </span>
          <h2 className="title">Please Verify Your Number</h2>
          <p className="info">
            A verification code has been sent via SMS your mobile Number
            <span className="edit-icon">
              +91 {data.mobile}{' '}
              <i onClick={() => closePopup()}>
                <EditIcon />
              </i>
            </span>
          </p>
          <div className="input-group">
            <Timer initialTime={90000} direction="backward">
              {({ start, resume, pause, stop, reset, getTimerState }) => {
                {
                  /* otpBtnDisable, setOtpBtnDisable; */
                }
                if (getTimerState() === 'STOPPED') {
                  setOtpBtnDisable(false);
                }
                if (getTimerState() === 'PLAYING') {
                  setOtpBtnDisable(true);
                }
                return (
                  <React.Fragment>
                    <span style={{ color: 'red' }} className="time-count">
                      {' '}
                      0<Timer.Minutes /> : <Timer.Seconds />
                    </span>
                    <div>
                      <button
                        style={{ display: 'none' }}
                        id="resetTimer"
                        onClick={() => {
                          reset();
                          start();
                        }}>
                        RESET
                      </button>
                    </div>
                  </React.Fragment>
                );
              }}
            </Timer>
            {/* <span className="time-count">00:45</span> */}
            <input
              type="text"
              placeholder="Enter 6 digit OTP code"
              name="otp"
              value={otp}
              onChange={(e) => onChangeOtp(e)}
            />
            {mobileVerifyError && (
              <span className="error-text">Wrong OTP, Try again!</span>
            )}
          </div>
          <button
            className={`btn-block ${
              // otp.length > 0 || disableVerify ? 'btn-primary' : 'disableVerify'
              disableVerify?'disableVerify':otp.length > 0 ? 'btn-primary' : 'disableVerify'
            }`}
            disabled={otp.length > 0 ? false : true}
            onClick={(e) => handleVerifySubmit(e)}>
            Verify
          </button>
          <p className="resend">
            Didn't receive OTP Code?
            <span
              className={`${resendOTPcount >= 3 && 'not-active'} ${
                otpBtnDisable ? 'btnNotActive' : ''
              }`}
              onClick={() => {
                if (resendOTPcount >= 3) {
                  return notify2();
                }
                resendOtp();
              }}>
              Resend
            </span>
          </p>
        </Modal>
      )}
    </>
  );
};

export default EditProfile;
