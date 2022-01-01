import React from "react";
import {  useHistory } from "react-router-dom";

import {
  Phone,
  Mail,
  ModalClose,
  ArrowDown,
  MobileMenu,
  SearchResultIcon,
} from "../../Layout/Icon";

import {
  Search,
  Cart,
  Notification,
  WishList,
  DropDown,
  UserSm,
  Dashboard,
  ExamPref,
  Following,
  Purchase,
  MyWishlist,
  Settings,
  Refer,
  HelpCall,
  Logout,
  CloseCircle,
} from "../../Layout/Icon";




const ProfileMenu = () => {
  const history = useHistory();
  const handleSidebarClick = (selected, path) => {
    localStorage.setItem("myprofileSelect", selected);
    history.push(path);
  };

  const logout = () =>{
   
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    //localStorage.clear();

    history.replace('/');
    window.location.reload();
  }


  return (
    <React.Fragment>
      <ul>
        <li onClick={() => handleSidebarClick(1, "/profile")}>
          <span>
            <UserSm /> My Profile
          </span>
        </li>
        <li onClick={() => handleSidebarClick(2, "/profile")}>
          <span>
            <ExamPref /> Exam Preference
          </span>
        </li>
        <li onClick={() => handleSidebarClick(3, "/profile")}>
          <span>
            <Following /> Following
          </span>
        </li>
        <li onClick={() => handleSidebarClick(4, "/profile")}>
          <span>
            <Purchase /> Purchase History
          </span>
        </li>
        <li onClick={() => handleSidebarClick(5, "/profile")}>
          <span>
            <MyWishlist /> My Wishlist
          </span>
        </li>
        <li onClick={() => handleSidebarClick(6, "/profile")}>
          <span>
            <Settings /> Settings
          </span>
        </li>
        <li>
          {localStorage.getItem("token") ? (
            <span
              onClick={logout}
              className="logout"
            >
              <Logout />
              Logout
            </span>
          ) : null}
        </li>
      </ul>
    </React.Fragment>
  );
};

export default ProfileMenu;
