import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AlarmClock,
  Cart,
  DBlog,
  DCalender,
  DDiscuss,
  Mail,
  MobileMenu,
  Notification,
  Search,
} from '../../Core/Layout/Icon';
import { selectMainProfile } from './../../../redux/MyProfile/profile.selectors';
import { selectPackageName } from './../../../redux/Dashboard/dashboard.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import moment from 'moment';
import { BASE_URL } from './../../../config';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import TestScheduleModal from '../Pages/TestSeriesComponents/TestScheduleModal';

import SearchBar from '../../../components/Core/NavBar/SearchBar/SearchBar';
import ProfileMenu from '../../Core/NavBar/ProfileMenu/ProfileMenu';
import AddToCart from '../../Core/NavBar/AddToCart/AddToCart';
import {fetchCartItem} from '../../../redux/actions/global';


const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: `${localStorage.token}`,
  },
};
const Header = ({ sidebarToggle, mainProfile, getPackageName,cart }) => {
  const history = useHistory();
  const location = useLocation();
  const [schedule, toggleSchedule] = useState(false);
  const [toggleProfile, settoggleProfile] = useState(false);

  const [scheduleItems, setScheduleItems] = useState(null);
  const [packageName, setPackageName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [itemId, setItemId] = useState(0);

  const scheduleToggleHandler = () => {
    toggleSchedule(!schedule);
  };

  const toggleProfileHandler = () => {
    settoggleProfile(!toggleProfile);
  };

  //   For getting test scehdules
  useEffect(() => {
    (async function getTestSchedules() {
      try {
        const config = {
          headers: {
            'Content-Type': 'Application/json',
            Authorization: `${localStorage.token}`,
          },
        };
        const {
          data: { data },
        } = await axios.get(
          `${BASE_URL}/dashboard/dashboard/scheduled-test`,
          config
        );
        let sortDataObj = data.length ? data.sort((a,b) => new Date(b.scheduleDatetime).getTime() - new Date(a.scheduleDatetime).getTime()) : [];
        console.log('sortDataObj ===> ', sortDataObj);
        setScheduleItems(sortDataObj);
      } catch (error) {
        console.log(error);
      }
    })();
    async function emptyPackageName() {
      setPackageName('');
    }
    emptyPackageName();
  }, []);

  useEffect(() => {
    console.log(scheduleItems);
  }, [scheduleItems]);

  useEffect(() => {
    if (location.pathname.includes('/test-series/') || location.pathname.includes('/attempted-test')) {
      setPackageName(getPackageName);
    }
    // console.log('getPackageName ==> ', getPackageName)
  }, [getPackageName]);

  const renderData = (item, index) => {
    let currentDate = moment();
    let addOneDayCurrentDate = moment(item.scheduleDatetime).add(1, 'days');
    let scheduledDate = moment(item.scheduleDatetime);
    let headerText = '';
    let isReadonly = false;
    let buttonText = ''
    if (currentDate.diff(scheduledDate) >= 0 && currentDate.diff(addOneDayCurrentDate) < 0) {
      headerText = 'ATTEMPT NOW';
      buttonText = 'Attempt Now';
    } if (currentDate.diff(scheduledDate) < 0) {
      headerText = 'UPCOMING';
      buttonText = 'Attempt Now';
      isReadonly = true;
    } if (currentDate.diff(addOneDayCurrentDate) > 0) {
      headerText = 'MISSED';
      buttonText = 'Reschedule';
    }
    return (
      <div key={index} className={`schedule-card ${buttonText!=='Attempt Now'?'missed':''}`}>
        <p className="label">
          {/* {moment().isSame(item.scheduleDatetime, 'day') === true &&
            'START TEST'}
          {moment(item.scheduleDatetime).isBefore() === true &&
            'MISSED'}
          {moment(item.scheduleDatetime).isAfter() === true &&
            'UPCOMING'} */}
          {headerText}
        </p>
        <h4 className="title">{item.test.testName}</h4>
        <div className="schedule-card-bottom">
          <p className="date">
            <AlarmClock />
            <span>{moment(item.scheduleDatetime).format('lll')}</span>
          </p>
          {/* <button className="btn-warning btn-sm">
            {moment().isSame(item.scheduleDatetime, 'day') === true &&
              'Start Test'}{' '}
            {moment(item.scheduleDatetime).isBefore() === true &&
              'Reschedule'}{' '}
            {moment(item.scheduleDatetime).isAfter() === true &&
              'Upcoming'}
          </button> */}
          {
            buttonText==='Attempt Now'?
              <button className={`${isReadonly?'btn-disabled':'btn-warning'} btn-sm`}>
                {buttonText}
              </button>
              :
              <button className="btn-warning btn-sm" onClick={() => onOpenModal(item.id)}>
                {buttonText}
              </button>
          }
        </div>
      </div>
    )
  }

  const onOpenModal = (itemId) => {
    setItemId(itemId);
    setOpenModal(true);
  }

  const onCloseModal = () => {
    setItemId(0);
    setOpenModal(false);
  }



  return (
    <Fragment>
      <div className="a-dashboard-header">
        <div className="a-dash-header-top">
          <span className="dashbord-menu" onClick={sidebarToggle}>
            <MobileMenu />
          </span>
          <div className="a-dash-logo">
            <Link to="/">
              <img
                src={require('../../../assets/images/logo.svg')}
                alt="admisure"
              />
            </Link>
          </div>
         
          

            <div className="a-dash-search">
            <SearchBar />
           
            </div>
          <div className="a-dash-right">
            <ul className="a-dash-list-header">
              
               <li>
              <AddToCart/>
              </li> 
              {/* <li>
                <Mail fill="#707070" />
                <span>5</span>
              </li>
              <li>
                <Notification />
                <span>3</span>
              </li> */}
            </ul> 

            <div className="profile-login" onClick={toggleProfileHandler}>
              <span className="name">
                {mainProfile !== null && mainProfile.name}
              </span>
              <span className="avatar">
                {mainProfile !== null && mainProfile.avatarUrl === null && (
                  <img
                    src={require('../../../assets/images/no-image-icon-md.png')}
                    alt="profile pic"
                  />
                )}
                {mainProfile !== null && mainProfile.avatarUrl !== null && (
                  <img src={`${mainProfile.avatarUrl}`} alt="profile pic" />
                )}
              </span>
              <img
                src={require('../../../assets/images/dropdown.svg')}
                alt=""
                className="dropdown"
              />
              {toggleProfile && (
                <div className="dropdown-menu">
                 <ProfileMenu/>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="a-dash-navigation">
          <div className="a-dash-brdcum">
            {
              location.pathname.includes('/dashboard') && (
                <span>Dashboard</span>
              )
            } 
            {
              (location.pathname.includes('/test-series/') || location.pathname.includes('/test-series-package') || location.pathname.includes('/attempted-test')) && (
                <span><i style={{cursor: 'pointer'}} onClick={() => {
                  history.push(`/test-series-package`)
                }}>Test Series</i> {packageName!=='' && (<>&nbsp;&gt;</>)}</span>
              )
            }
            {
              location.pathname.includes('/pass-access') && (
                <span>Pass Access</span>
              )
            }
            {
              location.pathname.includes('/practice-dashboard') && (
                <span>Practice</span>
              )
            }
            {
              location.pathname.includes('/quizzes') && (
                <span>Quizzes</span>
              )
            }
            {
              location.pathname.includes('/save-question') && (
                <span>Saved Questions</span>
              )
            }
            
            
            {packageName!=='' && <h6>{packageName}</h6>}
          </div>
          <div className="a-dash-info-list">
            <ul>              
              <li onClick={scheduleToggleHandler} className={`${schedule ? 'active' : ''}`}>
                <span>
                  <DCalender />
                </span>
                <p>Test Schedule</p>
              </li>
              <li>
                <a href="https://admisure.com/blog" target="_blank">
                  <span>
                    <DBlog />
                  </span>
                  <p>Blog</p> 
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {schedule && (
        <div className="schedule-popup">
          <div className="schedule-container">
            {scheduleItems &&
              scheduleItems.map((item, index) => (
                renderData(item, index)
              ))}
          </div>
        </div>
      )}
      <TestScheduleModal
        open={openModal}
        onCloseModal={onCloseModal}
        testID={itemId}
      />
    </Fragment>
  );
};




const mapStateToProps =  createStructuredSelector({
  mainProfile: selectMainProfile,
  getPackageName: selectPackageName
  
});






export default connect(mapStateToProps)(Header);
