import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { uploadProfileImage } from '../../../redux/MyProfile/profile.actions';
import { BASE_URL } from './../../../config';
import axios from 'axios';
import { openOtpModal } from './../../../redux/actions/auth';

const GoogleLoginAuth = ({ closeLogin, openPopups,toggleOpenPopup }) => {
  const [dataImg, setDataImg] = useState('');
  const [profileObj, setProfileObj] = useState(null);
  const [authResponse, setAuthResponse] = useState(null);
  const dispatch = useDispatch();

  const responseGoogle = async (response) => {
    console.log(response)
    
    if(response && response.profileObj){
      setProfileObj(response.profileObj);
      try {
        const config = {
          headers: {
            'Content-Type': 'Application/json',
          },
        };
        let body = JSON.stringify({
          name: response.profileObj.name,
          email: response.profileObj.email,
          mobile: '',
          socialProviderId: response.profileObj.googleId,
          socialProviderType: 'GOOGLE',
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
          localStorage.setItem("otpSection",true);
          toDataUrl(response.profileObj.imageUrl, (myBase64) => {
            setDataImg(myBase64); // myBase64 is the base64 string
          });
        }
      } catch (err) {
        console.log(err);
      }
    }else{
      localStorage.setItem("otpSection",true);
      dispatch(openOtpModal(false));
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
    <Link to="/">
      <GoogleLogin
        clientId="770870482230-j9jq69n3sftqu2ern0bioc3hnvuub8qt.apps.googleusercontent.com"
        buttonText="Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <span onClick={renderProps.onClick}>
            <img
              src={require('../../../assets/images/googleplus-btn.svg')}
              alt=""
            />
          </span>
        )}
      />
    </Link>
  );
};

export default GoogleLoginAuth;

{
  /* <Link className="ml-10" to="/">
      <img src={require('../../../assets/images/googleplus-btn.svg')} alt="" />
    </Link> */
}
