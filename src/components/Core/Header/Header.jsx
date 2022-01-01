import React from 'react';
import Topbar from '../TopBar/TopBar';
import NavBar from '../NavBar/NavBar';

export default function Header({ openPopup, openLoginPopup }) {
  return (
    <div className="a-fixedHeader">
      <Topbar />
      <NavBar openPopup={openPopup} openLoginPopup={openLoginPopup} />
    </div>
  );
}
