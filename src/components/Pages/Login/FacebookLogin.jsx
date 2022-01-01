import React, { useState, useEffect } from 'react';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uploadProfileImage } from '../../../redux/MyProfile/profile.actions';
import { BASE_URL } from './../../../config';
import axios from 'axios';
import { openOtpModal } from './../../../redux/actions/auth';

const FacebookLoginAuth = ({ closeLogin, openPopups }) => {
  const [dataImg, setDataImg] = useState('');
  const [profileObj, setProfileObj] = useState(null);
  const [authResponse, setAuthResponse] = useState(null);
  const dispatch = useDispatch();

  const responseFacebook = async (response) => {
    console.log(response);
    setProfileObj(response);
    try {
      const config = {
        headers: {
          'Content-Type': 'Application/json',
        },
      };
      let body = JSON.stringify({
        name: response.name,
        email: response.email,
        mobile: '',
        socialProviderId: response.userID,
        socialProviderType: 'FACEBOOK',
      });

      const { data } = await axios.post(
        `${BASE_URL}/student/social`,
        body,
        config
      );

      setAuthResponse(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.data.name);
      if (data.newStudent === false) {
        closeLogin();
        window.location.reload();
      }
      if (data.newStudent === true) {
        dispatch(openOtpModal(true));
        toDataUrl(response.picture.data.url, (myBase64) => {
          setDataImg(myBase64); // myBase64 is the base64 string
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //   For converting image url to data image url
  const toDataUrl = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  };

  useEffect(() => {
    if (dataImg !== '') {
      let file = dataURLtoFile(dataImg, 'auth.png');
      sendAuthData(file, authResponse.data.id);
    }
  }, [dataImg, authResponse]);

  function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const sendAuthData = async (file, num) => {
    try {
      let obj = {
        student_id: num,
        file_name: file,
      };
      await dispatch(uploadProfileImage(obj));
      closeLogin();
      openPopups();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FacebookLogin
      appId="1569013943287937"
      fields="name,email,picture"
      callback={responseFacebook}
      render={(renderProps) => (
        <span onClick={renderProps.onClick}>
          <img
            src={require('../../../assets/images/facebook-btn.svg')}
            alt=""
          />
        </span>
      )}
    />
  );
};

export default FacebookLoginAuth;

// <Link to="/">
//   <img src={require('../../../assets/images/facebook-btn.svg')} alt="" />
// </Link>
