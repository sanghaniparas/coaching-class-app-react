import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Toast from "../Elements/Toast";
import { ToolTip } from "../../Core/Layout/Tooltip/ToolTip";
import axios from "axios";
import Timer from "react-compound-timer";
import { toggleView } from "../../../utils/PasswordToggle.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "./../../../config";
import { connect } from "react-redux";
import CoachingSignUp from "./CoachingSignUp";
import { EditIcon } from "../../Core/Layout/Icon";
import { Fragment } from "react";

const SignUp = ({ closePopup, openLoginPopup, otpModal, setExamSocial }) => {
  const [resendOTPcount, setResenOTPCount] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);
  // const [examType, setExamType] = useState(false);
  const [examType, setExamType] = useState(1); // 0 = Revert back to the Signup page, 1 = Show the OTP Section, 2 = SHow the Exam type section
  const [allExams, setAllExams] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    isMobileVerified: 0,
    password: "",
  });

  const [coachingFormData, setCoachingFormData] = useState({
    coachingName: "",
    address: "",
    cityId: "",
    stateId: "1",
    countryId: "105",
    zipcode: "",
  });
  const [formError, setFormError] = useState({
    nameerror: "",
    passerror: "",
    mobileerror: "",
    emailerror: "",
    otpError: "",
  });
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [smsDetails, setSmsDetails] = useState({});
  const [userData, setUserData] = useState("");
  const [res, setRes] = useState("");
  const [exams, setExams] = useState([]);
  const [otpBtnDisable, setOtpBtnDisable] = useState(true);

  const [switchTab, setSwitchTab] = useState(true);
  const [coachingType, setCoachingType] = useState(true);
  const [states, setStates] = useState([]);
  const [coachingTypeModal, setCoachingTypeModal] = useState(false);
  const [coachingAddExamType, setCoahingAddExamType] = useState(false);
  const [cityList, setCityList] = useState([]);

  const [otpSection, setOtpsection] = useState(false);
  const [showOtp, setShowotp] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("otpSection")) {
      setOtpsection(localStorage.getItem("otpSection"));
    }
  });

  useEffect(() => {
    async function fetchCityList() {
      try {
        const response = await axios.get(
          `${BASE_URL}/misc/city/${coachingFormData.stateId}`
        );

        setCityList(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchCityList();
  }, [coachingFormData]);

  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 6000);
  };

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError({
      nameerror: "",
      passerror: "",
      mobileerror: "",
      emailerror: "",
      otpError: "",
    });
  };
  const onCoachingChange = (e) => {
    e.preventDefault();
    setCoachingFormData({
      ...coachingFormData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    let passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (
      formData.password.length > 0 &&
      !passwordRegex.test(formData.password)
    ) {
      setFormError({
        passerror:
          "Password should be minimum 8 characters with 1 integer, 1 capital letter, 1 special character",
      });
    }
  }, [formData]);

  const onChangeOtp = (e) => {
    e.preventDefault();
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let regExp = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[A-Za-z]+$/;
    let passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (formData.name === "")
      return setFormError({ nameerror: "Please enter your name" });
    if (!regExp.test(formData.email))
      return setFormError({ emailerror: "Enter valid email address" });
    if (formData.mobile.length !== 10)
      return setFormError({ mobileerror: "Please enter valid mobile number" });
    //CHANGE SUKRIT
    if (!passwordRegex.test(formData.password))
      return setFormError({
        passerror:
          "Password should be minimum 8 characters with 1 integer, 1 capital letter, 1 special character ",
      });

    const payload = { email: formData.email, mobile: formData.mobile };

    try {
      let response;
      if (switchTab === true) {
        response = await axios.post(`${BASE_URL}/student/check`, payload);
      }

      if (switchTab === false) {
        response = await axios.post(
          `${BASE_URL}/coaching/registration/check`,
          payload
        );
      }

      if (response.data.valid === 0) {
        if (
          response.data.data.find((el) => el.field === "email") !== undefined
        ) {
          setFormError({
            emailerror: "Email already exists",
          });
        }
        if (
          response.data.data.find((el) => el.field === "mobile") !== undefined
        ) {
          setFormError({
            mobileerror: "Mobile already exists",
          });
        }
      }

      if (response.data.valid === 1) {
        const sendOtpRes = await axios.post(
          `https://2factor.in/API/V1/${apiKey}/SMS/+91${formData.mobile}/AUTOGEN/OTP Verification Admisure`
        );
        setSmsDetails(sendOtpRes.data);
        setUserData(formData);
        // setFormData({ name: '', email: '', mobile: '', password: '' });
        setFormData({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          isMobileVerified: 0,
          password: "",
        });
        setSuccess(true);
        setOtpsection(true);
        setExamType(1);
      }
    } catch (err) {
      showErrorToast("Something went wrong. Please try again later !");
    }
  };

  const coachingTypeSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...coachingFormData,
        id: res,
        type: coachingType === true ? "individual" : "organization",
      };

      const response = await axios.post(
        `${BASE_URL}/coaching/registration/step3`,
        payload
      );

      setRes(response.data.data.coachingId);
      setCoahingAddExamType(true);
    } catch (err) {
      showErrorToast("Something went wrong. Please try again later !");
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    if (otpBtnDisable === false) {
      setOtp("");
      return notify3();
    }

    try {
      const response = await axios.post(
        `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${smsDetails.Details}/${otp}`
      );

      console.log(response.status);

      if (response.data.Details === "OTP Expired") {
        showErrorToast("OTP Expired ! Click on resend to resend an otp");
        return setOtp("");
      }

      if (response.data.Status === "Success") {
        let confirmSignUp;
        userData.isMobileVerified = 1;
        setFormData({ ...formData, isMobileVerified: 1 });
        setUserData(formData);

        if (switchTab === true) {
          confirmSignUp = await axios.post(
            `${BASE_URL}/student/registration`,
            userData
          );
        }

        if (switchTab === false) {
          confirmSignUp = await axios.post(
            `${BASE_URL}/coaching/registration/step1`,
            userData
          );

          setCoachingTypeModal(true);
        }

        console.log(confirmSignUp.data);
        if (switchTab === true) {
          localStorage.setItem("token", confirmSignUp.data.token);
          localStorage.setItem("username", confirmSignUp.data.data.name);
        }
        setRes(confirmSignUp.data.data.id);
        console.log(confirmSignUp);
        setFormError({
          nameerror: "",
          passerror: "",
          mobileerror: "",
          emailerror: "",
          otpError: "",
        });

        setUserData("");
        setSmsDetails({});
        setFormData({
          name: "",
          email: "",
          mobile: "",
          isMobileVerified: 0,
          password: "",
        });
        // setExamType(true);
        setExamType(2);
      }
    } catch (err) {
      //   showErrorToast('Something went wrong. Please enter a valid otp !');
      // if (err.response.data.Status === 'Error') {
      //   setFormError({ otpError: 'Please enter a valid otp!' });
      // }
      setFormError({ otpError: "Please enter a valid otp!" });
      setOtp("");
    }
  };

  const resendOtp = async (reset) => {
    document.getElementById("resetTimer").click();
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
    toast.success("An OTP has been sent !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notify2 = () =>
    toast.error("Please change mobile number and try again !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notify3 = () => {
    setFormError({
      nameerror: "",
      passerror: "",
      mobileerror: "",
      emailerror: "",
      otpError: "",
    });
    toast.error("OTP has expired !", {
      position: "top-right",
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
        `${BASE_URL}/student/addExamType`,
        payload
      );

      setAllExams([]);
      closePopup();
      window.location.reload();
      history.push("/coaching");
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
        showErrorToast("Something went wrong. Please try again later !");
      }
    }

    async function getExamTypes() {
      try {
        const response = await axios.get(`${BASE_URL}/misc/examType`);
        setExams(response.data.data);
      } catch (err) {
        showErrorToast("Something went wrong. Please try again later !");
      }
    }

    async function fetchStates() {
      try {
        const response = await axios.get(`${BASE_URL}/misc/state/105`);
        setStates(response.data.data);
      } catch (err) {
        showErrorToast("Something went wrong. Please try again later !");
      }
    }

    fetchStates();
    getApiKey();
    getExamTypes();
    toggleView();
    setAllExams([]);
  }, []);

  const backSignUpSection = (e) => {
    setSuccess(false);
    setOtpsection(false);
    setExamType(0);
  };

  const handleSkip = async (e) => {
    try {
      let confirmSkipSignUp;
      userData.isMobileVerified = 0;
      setFormData({ ...formData, isMobileVerified: 0 });
      setUserData(formData);

      if (switchTab === true) {
        confirmSkipSignUp = await axios.post(
          `${BASE_URL}/student/registration`,
          userData
        );
      }

      if (switchTab === false) {
        confirmSkipSignUp = await axios.post(
          `${BASE_URL}/coaching/registration/step1`,
          userData
        );
        setCoachingTypeModal(true);
      }

      if (switchTab === true) {
        localStorage.setItem("token", confirmSkipSignUp.data.token);
        localStorage.setItem("username", confirmSkipSignUp.data.data.name);
      }
      setRes(confirmSkipSignUp.data.data.id);
      setFormError({
        nameerror: "",
        passerror: "",
        mobileerror: "",
        emailerror: "",
        otpError: "",
      });

      setUserData("");
      setSmsDetails({});
      setFormData({
        name: "",
        email: "",
        mobile: "",
        isMobileVerified: 0,
        password: "",
      });
      // setExamType(true);
      setExamType(2);
    } catch (err) {
      showErrorToast("Something went wrong. Please try again later !");
    }
  };
  return (
    <div className="a-signUp-wrapper">
      <div
        className="slider-popup"
        style={{
          display: examType == 2 || otpModal === true ? "none" : "block",
        }}
      >
        <ul>
          <li>
            Skill up with the world's <span>most effective</span> e-learning
            platform
          </li>
          <li>
            Trusted by <span>6000,000+</span> Satisfied Learners
          </li>
        </ul>
        <img
          src={require("../../../assets/images/signup-slider-bg.jpg")}
          alt=""
        />
      </div>
      <div className="signup-content">
        {/* SignUp Section */}
        {/* <div className={success || otpSection ? 'hidesignup' : 'signUp'}> */}
        <div
          className={
            success || otpSection || examType == 2 || otpModal === true
              ? "hidesignup"
              : "signUp"
          }
        >
          <div className="modal-heading">
            <span className="close" onClick={() => closePopup()}>
              <img
                src={require("../../../assets/images/close.svg")}
                alt="close"
              />
            </span>
            <h2>Create your Free Account</h2>
          </div>
          <div className="modal-body">
            <div className="tabGroup">
              <span
                className={switchTab === true && "active"}
                onClick={() => {
                  setFormData({
                    name: "",
                    email: "",
                    mobile: "",
                    isMobileVerified: 0,
                    password: "",
                  });

                  setFormError({
                    nameerror: "",
                    passerror: "",
                    mobileerror: "",
                    emailerror: "",
                    otpError: "",
                  });
                  setSwitchTab(true);
                }}
              >
                Student
              </span>
              {/* <span
               
                className={switchTab === false && 'active'}
                onClick={() => {
                  setFormData({
                    name: '',
                    email: '',
                    mobile: '',
                    password: '',
                  });
                  setCoachingFormData({
                    coachingName: '',
                    address: '',
                    cityId: '',
                    stateId: '1',
                    countryId: '105',
                    zipcode: '',
                  });
                  setFormError({
                    nameerror: '',
                    passerror: '',
                    mobileerror: '',
                    emailerror: '',
                    otpError: '',
                  });
                  setSwitchTab(false);
                }}>
                Coaching
              </span> */}
            </div>
            {switchTab === true && (
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
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
                      <img
                        src={require("../../../assets/images/flag.svg")}
                        alt=""
                      />{" "}
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
                        "The password should be at least 6-8 characters long. To make it stronger, use upper and lower case letters, numbers, and symbols(!*?$%^&)."
                      }
                      position={"right"}
                    >
                      <img
                        src={require("../../../assets/images/info.svg")}
                        alt=""
                      />
                    </ToolTip>
                  </label>
                  <div className="group-input">
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter password "
                      value={formData.password}
                      name="password"
                      onChange={(e) => onChange(e)}
                    />
                    <img
                      className="view"
                      src={require("../../../assets/images/eye.svg")}
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
                    By signing up, I agree to{" "}
                    <a
                      href="/terms-and-conditions"
                      style={{ color: "red", fontWeight: "bold" }}
                      className="text-warning"
                      target="_blank"
                    >
                      Terms &amp; conditions
                    </a>
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

                <p className="log-direct">
                  Already have an account?{" "}
                  <Link
                    to="#"
                    className="text-warning"
                    onClick={() => {
                      closePopup();
                      openLoginPopup();
                    }}
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            )}
            {switchTab === false && (
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
                      <img
                        src={require("../../../assets/images/flag.svg")}
                        alt=""
                      />{" "}
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
                        "The password should be at least 6-8 characters long. To make it stronger, use upper and lower case letters, numbers, and symbols(!*?$%^&)."
                      }
                      position={"right"}
                    >
                      <img
                        src={require("../../../assets/images/info.svg")}
                        alt=""
                      />
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
                      src={require("../../../assets/images/eye.svg")}
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
                    By signing up, I agree to{" "}
                    <Link
                      to="#"
                      style={{ color: "red", fontWeight: "bold" }}
                      className="text-warning"
                    >
                      Terms &amp; conditions
                    </Link>
                  </span>
                </div>
                <button type="submit" className="btn-primary btn-block">
                  Sign Up
                </button>

                <p className="log-direct">
                  Already have an account?{" "}
                  <Link
                    to="#"
                    className="text-warning"
                    onClick={() => {
                      closePopup();
                      openLoginPopup();
                    }}
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Verify Section */}
        <div className={success && examType === 1 ? "verify" : "hideverify"}>
          <div className="modal-heading">
            {/* <span className="close" onClick={() => closePopup()}>
              <img
                src={require('../../../assets/images/close.svg')}
                alt="close"
              />
            </span> */}
            <h2>Please verify your Number</h2>
          </div>
          <div className="modal-body">
            <p className="verify-number text-grey">
              A verification code has been sent via SMS to your mobile number{" "}
              <span className="text-blue">
                +91 {userData.mobile}{" "}
                <i onClick={(e) => backSignUpSection(e)}>
                  <EditIcon />
                </i>{" "}
              </span>
              {/* <button onClick={(e) => backSignUpSection(e)}>Go Back</button> */}
            </p>

            <div className="otb-box">
              <form onSubmit={(e) => handleVerifySubmit(e)}>
                <div className="form-group">
                  <label htmlFor="otp">Enter OTP</label>
                  <input
                    type="text"
                    placeholder="Enter 6 digit OTP"
                    name="otp"
                    value={otp}
                    onChange={(e) => onChangeOtp(e)}
                  />
                </div>
                {formError.otpError && (
                  <span className="error">{formError.otpError}</span>
                )}
                <p className="time-count text-warning">
                  {success ? (
                    <Timer initialTime={90000} direction="backward">
                      {({
                        start,
                        resume,
                        pause,
                        stop,
                        reset,
                        getTimerState,
                      }) => {
                        {
                          /* otpBtnDisable, setOtpBtnDisable; */
                        }
                        if (getTimerState() === "STOPPED") {
                          setOtpBtnDisable(false);
                        }
                        if (getTimerState() === "PLAYING") {
                          setOtpBtnDisable(true);
                        }
                        return (
                          <React.Fragment>
                            <span
                              style={{ color: "red" }}
                              className="time-count text-warning"
                            >
                              {" "}
                              0<Timer.Minutes /> : <Timer.Seconds />
                            </span>

                            <div>
                              <button
                                style={{ display: "none" }}
                                onClick={start}
                              >
                                Start
                              </button>
                              <button
                                style={{ display: "none" }}
                                id="resetTimer"
                                onClick={() => {
                                  reset();
                                  start();
                                }}
                              >
                                RESET
                              </button>
                              <button
                                style={{ display: "none" }}
                                onClick={resume}
                              >
                                Resume
                              </button>
                              <button
                                className="timer-stop"
                                style={{
                                  position: "absolute",
                                  right: "10px",
                                  opacity: "0",
                                  cursor: "default",
                                }}
                                onClick={stop}
                              >
                                Stop
                              </button>
                              <button
                                className="timer-reset"
                                style={{ display: "none" }}
                                onClick={() => {
                                  if (resendOTPcount >= 3) {
                                    return notify2();
                                  }
                                  resendOtp();
                                }}
                              >
                                Reset
                              </button>
                            </div>
                          </React.Fragment>
                        );
                      }}
                    </Timer>
                  ) : (
                    `00:00`
                  )}
                </p>
                <button
                  disabled={otp.length > 0 ? false : true}
                  type="submit"
                  className={`${
                    otp.length > 0
                      ? "btn-primary btn-block"
                      : "disableVerify btn-block"
                  }`}
                >
                  Verify
                </button>

                <p className="resend-otp">
                  Did not receive OTP?{" "}
                  <Link
                    to="/"
                    style={{ color: "#fd3737", fontWeight: "600" }}
                    onClick={() => {
                      if (resendOTPcount >= 3) {
                        return notify2();
                      }
                      resendOtp();
                    }}
                    id="resend"
                    className={`text-warning ${
                      resendOTPcount >= 3 && "not-active"
                    } ${otpBtnDisable ? "btnNotActive" : ""}`}
                  >
                    Resend
                  </Link>
                </p>
                <ToastContainer />
                <p className="skip text-blue" onClick={(e) => handleSkip(e)}>
                  Skip
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Choose coaching type */}
        {coachingTypeModal === true && coachingAddExamType === false && (
          <div className="coaching-type">
            <form>
              <input
                type="radio"
                id="individual"
                name="coachingtype"
                onClick={() => setCoachingType(true)}
              />
              <label for="individual">Individual</label>
              <input
                type="radio"
                id="organization"
                name="coachingtype"
                onClick={() => setCoachingType(false)}
              />
              <label for="organization">Organization</label>
            </form>

            <h4>Setup your coaching profile</h4>

            {coachingType === true && (
              <div className="individual-form">
                <form onSubmit={(e) => coachingTypeSubmit(e)}>
                  <div className="form-group">
                    <label>Coaching Name</label>
                    <input
                      type="text"
                      placeholder="Enter your coaching name"
                      value={coachingFormData.coachingName}
                      name="coachingName"
                      onChange={(e) => onCoachingChange(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <select
                      name="cityId"
                      value={coachingFormData.cityId}
                      onChange={(e) => onCoachingChange(e)}
                    >
                      {cityList.map((city) => (
                        <option value={city.id}>{city.city}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Zip/Pin Code</label>
                    <input
                      type="text"
                      placeholder="Enter pin code"
                      value={coachingFormData.zipcode}
                      name="zipcode"
                      onChange={(e) => onCoachingChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <select
                      name="stateId"
                      value={coachingFormData.stateId}
                      onChange={(e) => onCoachingChange(e)}
                    >
                      {states.map((state) => (
                        <option value={state.id}>{state.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      placeholder="Enter pin code"
                      value="India"
                      name="country"
                      disabled
                    />
                  </div>

                  <button type="submit" className="btn-primary btn-block">
                    Next
                  </button>
                </form>
              </div>
            )}

            {coachingType === false && (
              <div className="organization-form">
                <form onSubmit={(e) => coachingTypeSubmit(e)}>
                  <div className="form-group">
                    <label>Coaching Name</label>
                    <input
                      type="text"
                      placeholder="Enter your coaching name"
                      value={coachingFormData.coachingName}
                      name="coachingName"
                      onChange={(e) => onCoachingChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      placeholder="Enter your address"
                      value={coachingFormData.address}
                      name="address"
                      onChange={(e) => onCoachingChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <select
                      name="cityId"
                      value={coachingFormData.cityId}
                      onChange={(e) => onCoachingChange(e)}
                    >
                      {cityList.map((city) => (
                        <option value={city.id}>{city.city}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Zip/Pin Code</label>
                    <input
                      type="text"
                      placeholder="Enter pin code"
                      value={coachingFormData.zipcode}
                      name="zipcode"
                      onChange={(e) => onCoachingChange(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <select
                      name="stateId"
                      value={coachingFormData.stateId}
                      onChange={(e) => onCoachingChange(e)}
                    >
                      {states.map((state) => (
                        <option value={state.id}>{state.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      placeholder="Enter pin code"
                      value="India"
                      name="country"
                      disabled
                    />
                  </div>

                  <button type="submit" className="btn-primary btn-block">
                    Next
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Choose Exam Type */}
        {switchTab === true && (
          <div
            className={
              examType == 2 || otpModal === true
                ? "exam-teaching"
                : "hideexamtype"
            }
          >
            <div className="modal-heading">
              <h2>Which exam are you preparing for?</h2>
              <p className="text-grey">You can select multiple options</p>
            </div>
            <div className="modal-body exam-teaching">
              <div className="card-wrapper">
                {exams.length === 0
                  ? null
                  : exams.map((el, id) => (
                      <React.Fragment key={id}>
                        <div
                          className={
                            allExams.includes(el.id.toString())
                              ? "small-card active"
                              : "small-card"
                          }
                          onClick={() => chooseExamType(el.id)}
                        >
                          <img
                            className="check"
                            src={require("../../../assets/images/done.svg")}
                            alt=""
                          />
                          <img
                            className="card-img"
                            style={{ height: "30px", width: "30px" }}
                            src={el.logoUrl}
                            alt="logo"
                          />
                          <div className="card-content">
                            <p className="title">{el.examType}</p>
                            {/* <p className="description">Exam Description...</p> */}
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
              </div>
              <button
                type="submit"
                className="btn-primary btn-block  mt-20 mb-20"
                onClick={() => addExamType()}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {switchTab === false && coachingAddExamType === true && (
          <div
            className={
              examType || otpModal === true ? "exam-teaching" : "hideexamtype"
            }
          >
            <div className="modal-heading">
              <h2>Which exam are you preparing for?</h2>
              <p className="text-grey">You can select multiple options</p>
            </div>
            <div className="modal-body exam-teaching">
              <div className="card-wrapper">
                {exams.length === 0
                  ? null
                  : exams.map((el, id) => (
                      <React.Fragment key={id}>
                        <div
                          className={
                            allExams.includes(el.id.toString())
                              ? "small-card active"
                              : "small-card"
                          }
                          onClick={() => chooseExamType(el.id)}
                        >
                          <img
                            className="check"
                            src={require("../../../assets/images/done.svg")}
                            alt=""
                          />
                          <img
                            className="card-img"
                            style={{ height: "30px", width: "30px" }}
                            src={el.logoUrl}
                            alt="logo"
                          />
                          <div className="card-content">
                            <p className="title">{el.examType}</p>
                            {/* <p className="description">Exam Description...</p> */}
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
              </div>
              <button
                type="submit"
                className="btn-primary btn-block  mt-20 mb-20"
                onClick={() => addExamType()}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
      <Toast isVisible={isVisible} toastMessage={toastMessage} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    otpModal: state.auth.otpModal,
    setExamSocial: state.auth.setExamSocial,
  };
};

export default connect(mapStateToProps)(SignUp);
