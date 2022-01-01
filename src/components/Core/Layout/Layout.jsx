import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SignUp from './../../Pages/SignUp/SignUp';
import Login from './../../Pages/Login/Login';
import { Modal } from './Modal/Modal';
import { toggleSignUp } from '../../../redux/actions/auth';

const Layout = ({ children, loading, popup }) => {
  const [openPopup, toggleOpenPopup] = useState(false);
  const [login, setLogin] = useState(false);

  const dispatch = useDispatch();

  const openLoginPopup = () => {
    setLogin(!login);
    localStorage.removeItem("otpSection")
  };
  const closeLoginPopup = () => {
    setLogin(false);
    localStorage.removeItem("otpSection")
  };

  const openPopups = () => {
    toggleOpenPopup(!openPopup);
    localStorage.removeItem("otpSection")
  };

  const closeSignUp = () => {
    toggleOpenPopup(false);
    dispatch(toggleSignUp(false));
    localStorage.removeItem("otpSection")
  };


  

  const closePopup = () => {
    toggleOpenPopup(false);
    dispatch(toggleSignUp(false));
    localStorage.removeItem("otpSection");
  };

  useEffect(() => {
    if (popup) {
      toggleOpenPopup(true);
    }
  }, [popup]);
  console.log(children)
  return (
    <div className="a-layout">
      <Header openPopup={openPopups} openLoginPopup={openLoginPopup} />
      <div className="a-fullwidth">
        {children}
        </div>
      <Footer />

      {openPopup && (
         <Modal addClass="login-modal">
         <Login closeLogin={closePopup} openPopups={openLoginPopup} closeSignUp={closeSignUp} toggleOpenPopup={toggleOpenPopup} />
       </Modal>
      )}

      {login && (
       
        <Modal addClass="login-modal">
        <SignUp closePopup={closeLoginPopup} openLoginPopup={openPopups} />
      </Modal>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    popup: state.auth.popup,
  };
};

export default connect(mapStateToProps)(Layout);
