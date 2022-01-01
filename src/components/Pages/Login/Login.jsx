import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { SentMail } from "../../Core/Layout/Icon";
import { BASE_URL } from "../../../config";
import GoogleLoginAuth from "./GoogleLogin";
import FacebookLoginAuth from "./FacebookLogin";

const Login = ({ closeLogin, openPopups, closeSignUp,toggleOpenPopup }) => {
  const [formData, setFormData] = useState({
    emailOrMob: localStorage.getItem("emailOrMob") || "",
    pass: localStorage.getItem("password") || "",
    remember: localStorage.getItem("remember") || false,
  });
  const [res, setRes] = useState({});
  const [forgot, setForgot] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailOrMob, setEmailOrMob] = useState(localStorage.getItem("emailOrMob") || "");
  




  const [forgotPassRes, setForgotPassRes] = useState("");

  const [formError, setFormError] = useState({
    emailOrMob: "",
    passLength: "",
    invalidCredential: "",
  });
  const history = useHistory();

  const onChange = (e) => {
    if (e.target.type === "checkbox" && !e.target.checked) {
      setFormData({ ...formData, [e.target.name]: false });
      localStorage.removeItem('emailOrMob', '');
      localStorage.removeItem('password', '');
      localStorage.removeItem('remember', false);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    //setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
  


      // const rememberMe = localStorage.getItem('remember') === true;

      // console.log(rememberMe);
      //   const userEmailOrMob = rememberMe ? localStorage.getItem('emailOrMob') : '';
      //   const userPassword = rememberMe ? localStorage.getItem('password') : '';
      //   localStorage.setItem('emailOrMob', userEmailOrMob);
      //   localStorage.setItem('password', userPassword);
      //   localStorage.setItem('remember', rememberMe);


  
   
    
     
  },[])




  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    if (formData.remember === "on") {
      formData.remember = true;
    }else{
      formData.remember = false;
    }

    const payload = {
      emailOrMobile: formData.emailOrMob,
      password: formData.pass,
      remember: formData.remember,
    };
    console.log(payload);
   if(formData.remember){
    localStorage.setItem('emailOrMob', formData.emailOrMob);
    localStorage.setItem('password', formData.pass);
    localStorage.setItem('remember', formData.remember);
   }
 


    if (formData.pass === "" && formData.emailOrMob === "") {
      return setFormError({
        passLength: "Please enter valid password",
        emailOrMob: "Please enter valid email address or mobile number.",
      });
    }
    if (formData.pass.length < 6 && formData.emailOrMob === "") {
      return setFormError({
        passLength: "Password must be of minimum 6 characters",
        emailOrMob: "Please enter valid email address or mobile number.",
      });
    }

    if (formData.emailOrMob !== "" && formData.pass.length === 0) {
      return setFormError({
        passLength: "Please enter valid password",
      });
    }
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (
      formData.emailOrMob !== "" &&
      pattern.test(formData.emailOrMob) &&
      formData.pass !== "" &&
      formData.pass.length < 6
    ) {
      return setFormError({
        passLength: "Password must be of minimum 6 characters",
      });
    }

    if (
      formData.emailOrMob === "" &&
      formData.pass !== "" &&
      formData.pass.length > 5
    ) {
      return setFormError({
        emailOrMob: "Please enter valid email address or mobile number.",
      });
    }

    if (
      isNaN(formData.emailOrMob) &&
      !pattern.test(formData.emailOrMob) &&
      formData.pass !== "" &&
      formData.pass.length < 6
    ) {
      return setFormError({
        emailOrMob: "Please enter valid email address.",
        passLength: "Password must be of minimum 6 characters",
      });
    }

    if (
      isNaN(formData.emailOrMob) &&
      !pattern.test(formData.emailOrMob) &&
      formData.pass !== "" &&
      formData.pass.length > 5
    ) {
      return setFormError({
        emailOrMob: "Please enter valid email address.",
      });
    }

    if (
      !isNaN(formData.emailOrMob) &&
      formData.emailOrMob.length !== 10 &&
      formData.pass !== "" &&
      formData.pass.length < 6
    ) {
      return setFormError({
        emailOrMob: "Please enter valid mobile number.",
        passLength: "Password must be of minimum 6 characters",
      });
    }

    if (
      !isNaN(formData.emailOrMob) &&
      formData.emailOrMob.length === 10 &&
      formData.pass !== "" &&
      formData.pass.length < 6
    ) {
      return setFormError({
        passLength: "Password must be of minimum 6 characters",
      });
    }

    if (
      !isNaN(formData.emailOrMob) &&
      formData.emailOrMob.length !== 10 &&
      formData.pass !== "" &&
      formData.pass.length > 5
    ) {
      return setFormError({
        emailOrMob: "Please enter valid mobile number.",
      });
    }

    if (
      isNaN(formData.emailOrMob) &&
      formData.emailOrMob !== "" &&
      pattern.test(formData.emailOrMob) &&
      formData.pass !== "" &&
      formData.pass.length > 5
    ) {
      try {
        const payload2 = {
          emailOrMobile: formData.emailOrMob,
          password: formData.pass,
        };
        const response = await axios.post(
          `${BASE_URL}/student/login`,
          payload2
        );

        console.log(response);

       

        if (response.data.data === null) {
          return setFormError({
            invalidCredential: "Please check your  email/ mobile ",
            invalidPassword: "Please check your password",
          });
        }

        setRes(response.data);
        localStorage.setItem("username", response.data.data.name);
        localStorage.setItem("token", response.data.token);
        // history.push('/coaching');
        window.location.reload();

        setFormError({
          emailOrMob: "",
          passLength: "",
          invalidCredential: "",
          invalidPassword: "",
        });
        setFormData({
          emailOrMob: "",
          pass: "",
        });
        closeLogin();
      } catch (err) {
        console.log(err);
      }
    }

    if (
      !isNaN(formData.emailOrMob) &&
      formData.emailOrMob !== "" &&
      formData.emailOrMob.length === 10 &&
      formData.pass !== "" &&
      formData.pass.length > 5
    ) {
      try {
        const payload2 = {
          emailOrMobile: formData.emailOrMob,
          password: formData.pass,
        };
        const response = await axios.post(
          `${BASE_URL}/student/login`,
          payload2
        );

        console.log(response);

        if (response.data.data === null) {
          return setFormError({
            invalidCredential: "Please check your  email/ mobile ",
            invalidPassword: "Please check your password",
          });
        }

        setRes(response.data);
        localStorage.setItem("username", response.data.data.name);
        localStorage.setItem("token", response.data.token);
        // history.push('/coaching');
        window.location.reload();

        setFormError({
          emailOrMob: "",
          passLength: "",
          invalidCredential: "",
          invalidPassword: "",
        });
        setFormData({
          emailOrMob: "",
          pass: "",
        });
        closeLogin();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const forgotPassSubmit = async (e) => {
    e.preventDefault();
    if (forgotPassRes.length === 0) {
      if (emailOrMob.length === 0) {
        return setFormError({
          emailOrMob: "Please enter your Email / Mobile",
        });
      }
    }

    try {
      const payload = {
        // emailOrMobile: emailOrMob || forgotPassRes,
        emailOrMobile: emailOrMob || forgotPassRes,
        url: `${window.location.origin}/resetpassword/`,
      };

      const response = await axios.post(
        `${BASE_URL}/student/forgetPassword`,
        payload
      );

      const splitResponse = response.data.data.email.split("@");

      if (splitResponse[0].length >= 4) {
        let replaceStr = response.data.data.email
          .slice(3)
          .match(/[^@]*/i)[0]
          .split("")
          .map((el) => el.replace(el, "*"));

        let result =
          response.data.data.email.slice(0, 3) +
          replaceStr.join("") +
          "@" +
          splitResponse[1];

        setForgotPassRes(result);
      }

      if (splitResponse[0].length < 4) {
        let replaceStr = response.data.data.email
          .slice(2)
          .match(/[^@]*/i)[0]
          .split("")
          .map((el) => el.replace(el, "*"));

        let result =
          response.data.data.email.slice(0, 2) +
          replaceStr.join("") +
          "@" +
          splitResponse[1];

        setForgotPassRes(result);
      }

      setForgot(false);
      setEmailSent(true);
      // setEmailOrMob("");
      setFormError({
        emailOrMob: "",
        passLength: "",
        invalidCredential: "",
        invalidPassword: "",
      });
    } catch (err) {
      if (err) {
        return setFormError({ emailOrMob: "User not found !" });
      }
    }
  };

  return (
    <div>
      {forgot || emailSent ? null : (
        <div className="a-login-wrapper">
          <div className="login-slider">
            <img
              src={require("../../../assets/images/login-slider.jpg")}
              alt=""
            />
          </div>
          <div className="login-content">
            <div className="login-header">
              <span className="close" onClick={() => closeLogin()}>
                <img
                  src={require("../../../assets/images/close.svg")}
                  alt="close"
                />
              </span>
              <p className="text-grey">Hey There, Welcome to</p>
              <img src={require("../../../assets/images/logo.svg")} alt="" />
            </div>
            <div className="login-body">
               <div className="tabGroup">
              <span className="active">Student</span>
              <span>Coaching</span>
            </div>
              <h2 className="login-title">Sign In as Student</h2>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="email">Enter Email/Mobile Number</label>
                  <input
                    type="text"
                    name="emailOrMob"
                    value={formData.emailOrMob}
                    onChange={(e) => onChange(e)}
                    placeholder="Enter your Email/Mobile numer"
                  />
                  {formError.emailOrMob ? (
                    <span className="error">{formError.emailOrMob}</span>
                  ) : null}
                  {formError.invalidCredential ? (
                    <span className="error">{formError.invalidCredential}</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Enter Password</label>
                  <input
                    type="password"
                    name="pass"
                    value={formData.pass}
                    onChange={(e) => onChange(e)}
                    placeholder="Enter Password"
                  />
                  {formError.invalidCredential ? (
                    <span className="error">{formError.invalidPassword}</span>
                  ) : null}
                  {formError.passLength ? (
                    <span className="error">{formError.passLength}</span>
                  ) : null}
                </div>
                <div className="custom-checkbox">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={!!formData.remember }
                    onChange={(e) => onChange(e)}
                    style={{ cursor: "default" }}
                  />
                  <label style={{ cursor: "default" }} htmlFor="remember">
                    Remember Me  
                  </label>
                </div>
                <Link
                  to="#"
                  className="text-blue float-right forgot-link"
                  onClick={() => setForgot(true)}
                >
                  Forgot Your Password?
                </Link>
                <button type="submit" className="btn-primary btn-block mt-30">
                  Sign In
                </button>

                <p className="signupwith">
                  <span>Or login with</span>
                </p>
                <div className="a-social-btn-group">
                  <FacebookLoginAuth
                    closeLogin={closeLogin}
                    openPopups={openPopups}
                  />
                  <GoogleLoginAuth
                    closeLogin={closeLogin}
                    openPopups={openPopups}
                    toggleOpenPopup={toggleOpenPopup}
                  />
                </div>
              </form>
              <p className="create-account">
                Don't have an account?{" "}
                <Link
                  style={{ color: "red" }}
                  to="#"
                  className="text-warning"
                  onClick={() => {
                    closeLogin();
                    openPopups();
                    closeSignUp()
                  }}
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      {forgot ? (
        <div className="a-login-wrapper">
          <div className="login-slider">
            <img
              src={require("../../../assets/images/signup-slider-bg.jpg")}
              alt=""
            />
          </div>
          <div className="login-content">
            <div className="login-header">
              <span className="close" onClick={() => closeLogin()}>
                <img
                  src={require("../../../assets/images/close.svg")}
                  alt="close"
                />
              </span>
            </div>
            <div className="login-body">
              <div
                style={{ textAlign: "center" }}
                className="forgot-icon text-center"
              >
                <img
                  src={require("../../../assets/images/forgot-password-icon.svg")}
                  alt=""
                />
              </div>
              <h2 className="text-center mt-30" style={{ textAlign: "center" }}>
                Forgot your Password?
              </h2>
              <p
                className="text-center my-30 text-grey"
                style={{ textAlign: "center" }}
              >
                Enter your email or phone number. You will receive a code to
                create a new password.
              </p>
              <form onSubmit={(e) => forgotPassSubmit(e)}>
                <div className="form-group">
                  <input
                    type="text"
                    value={emailOrMob}
                    name="emailOrMob"
                    onChange={(e) => setEmailOrMob(e.target.value)}
                    placeholder="Enter your Email/Mobile numer"
                  />
                  {formError.emailOrMob ? (
                    <span className="error">{formError.emailOrMob}</span>
                  ) : null}
                </div>
                <button type="submit" className="btn-primary btn-block mt-30">
                  Reset password
                </button>
              </form>
              <p className="create-account">
                <Link
                  to="#"
                  className="text-blue"
                  onClick={() => setForgot(false)}
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {emailSent ? (
        <div className="a-login-wrapper">
          <div className="login-slider">
            <img
              src={require("../../../assets/images/signup-slider-bg.jpg")}
              alt=""
            />
          </div>
          <div className="login-content">
            <div className="login-header">
              <span className="close" onClick={() => closeLogin()}>
                <img
                  src={require("../../../assets/images/close.svg")}
                  alt="close"
                />
              </span>
            </div>
            <div className="login-body">
              <div
                style={{ textAlign: "center" }}
                className="forgot-icon text-center"
              >
                <SentMail />
              </div>
              <h2 className="text-center mt-30" style={{ textAlign: "center" }}>
                Check your inbox
              </h2>
              <p
                className="text-center my-30 text-grey"
                style={{ textAlign: "center" }}
              >
                We have sent a verification link to{" "}
                <span style={{ fontSize: "15.8px", fontWeight: "bold" }}>
                  {forgotPassRes}
                </span>
                . Please check your email for the password setup.
              </p>

              <button
                type="submit"
                onClick={(e) => forgotPassSubmit(e)}
                className="btn-primary btn-block mt-30"
              >
                Resend email
              </button>

              <p className="create-account">
                <Link
                  to="#"
                  className="text-blue"
                  onClick={() => {
                    setEmailOrMob("");
                    setEmailSent(false);
                    setForgot(false);
                  }}
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Login;
