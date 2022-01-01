import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Share,
  Star,
  WhatsApp,
  TeleGramRound,
  FacebookRound,
  GmailRound,
  CopyLinkRound,
} from '../../Core/Layout/Icon';
import Toast from '../Elements/Toast';
import { Modal } from '../../Core/Layout/Modal/Modal';
import ProductReviewModal from './ProductReviewModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BASE_URL } from './../../../config';
import moment from 'moment';
import 'moment-precise-range-plugin';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { saveToCart } from '../../../redux/actions/global';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../Elements/Carousel';
import PassCard from '../Pass/PassCard';
import { Arrow, ModalClose } from '../../Core/Layout/Icon';
import { filterPassType } from '../Global/Formatter';
import TestDetailsLogoSkeleton from './../../../skeletons/TestDetails/TestDetailsLogoSkeleton';
import TestDetailsInfoSkeleton from './../../../skeletons/TestDetails/TestDetailsInfoSkeleton';
import TestDetailsInfoRightSkeleton from './../../../skeletons/TestDetails/TestDetailsInfoRightSkeleton.js';

const items = [
  {
    id: 1,
    passName: 'Sure Plus',
    passImgName: 'plus',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12',
  },
  {
    id: 2,
    passName: 'Sure Pro',
    passImgName: 'pro',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12',
  },
  {
    id: 3,
    passName: 'Sure Premium',
    passImgName: 'premium',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12',
  },
  {
    id: 4,
    passName: 'Sure Plus 2',
    passImgName: 'plus',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12 Months',
  },
];

const shareLink = {
  whatApp: 'whatApp',
  facebook: 'facebook',
  gmail: 'gmail',
};

const site_url = 'https://admisure.com/testdetails/';

const TestSeriesHeader = ({
  testDetails,
  setTestEnrolled,
  saveToCart,
  packageRelatedPass,
  shareCount,
  cart
}) => {
  const [toggleShare, settoggleShare] = useState(false);
  const [modalToggle, setmodalToggle] = useState(false);
  const [enrollModal, setEnrollModal] = useState(false);
  const [showPassToUnlockModal, setShowPassToUnlockModal] = useState(false);
  const [enroll, setEnroll] = useState(false);
  const [validity, setValidity] = useState({});
  const history = useHistory();
  const [passItems, setPassItems] = useState('');
  const [passSelected, setPassSelected] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);
  const { addToast } = useToasts();

  const [cartItem, setCartItem] = useState(false);


  const myArrow = ({ type, onClick, isEdge }) => {
    const carlPointer = type === consts.PREV ? <Arrow /> : <Arrow />;
    const carlClass = type === consts.PREV ? 'prev' : 'next';
    return (
      <button
        className={`a-btn-arrow ${carlClass}`}
        onClick={onClick}
        disabled={isEdge}>
        {carlPointer}
      </button>
    );
  };

  const config = {
    headers: {
      Authorization: `${localStorage.token}`,
    },
  };

  const breakPoints = [
    { width: 2, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 1 },
    { width: 850, itemsToShow: 2, itemsToScroll: 1 },
    { width: 1150, itemsToShow: 2, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 2 },
    { width: 1750, itemsToShow: 2 },
  ];
  useEffect(() => {
    setTestEnrolled(enroll);
  }, [enroll]);

  useEffect(() => {
    if (
      Object.keys(testDetails).length &&
      testDetails.testpackageDetails.validityType !== 1
    ) {
      let start = moment();
      let end = moment().add(
        parseInt(testDetails.testpackageDetails.validity),
        'days'
      );

      let years = end.diff(start, 'year');
      start.add(years, 'years');

      let months = end.diff(start, 'months');
      start.add(months, 'months');

      let days = end.diff(start, 'days');

      setValidity({ months, days });
    }

    if (
      Object.keys(testDetails).length &&
      testDetails.testpackageDetails.validityType === 1
    ) {
      let starts = moment();
      let ends = moment(testDetails.testpackageDetails.expireDate);

      // or as string:
      let diffHuman = moment.preciseDiff(starts, ends, true);
      // example: 2 years 7 months 6 hours 29 minutes 17 seconds

      setValidity({ months: diffHuman.months, days: diffHuman.days });
    }

    if(cart && cart?.cart_data && testDetails && testDetails?.testpackageDetails){
      const cartItem = cart?.cart_data;
      const checkId= cartItem.some(x => x?.package_data?.package_id === testDetails?.testpackageDetails?.id ? true : false);
      setCartItem(checkId);
    }

   

  }, [testDetails]);

  const togglehandler = () => {
    settoggleShare(!toggleShare);
  };

  const ratingModalHandler = () => {
    setmodalToggle(!modalToggle);
  };
  const modalCloseHandler = () => {
    setmodalToggle(false);
    setShowPassToUnlockModal(false);
  };

  console.log(testDetails);

  const enrollTest = async (details) => {
   
    console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
      try {
        const payload = {
          testPackageId: details.testpackageDetails.id.toString(),
          coachingId: details.coachingDetails.id.toString(),
        };
        const response = await axios.post(
          `${BASE_URL}/testPackage/enroll`,
          payload,
          config
        );
  
        if (response.data.message === 'enrolled') {
          setEnroll(true);
          setEnrollModal(true);
          window.scrollTo({ top: 560, behavior: 'smooth' });
  
          return;
          //  notify();
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
      
    }else{
      return notify2();
    }
   
  };

  const notify = () => {
    toast.info('You have successfullly enrolled ! ', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notify2 = () => {
    toast.error('You are not Logged In ! ', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const savetoCart = (item) => {
    if (!!localStorage.token) {
      if(cartItem){
        history.push('/cart')
      }else{
        saveToCart({ id: item.testpackageDetails.id, type: 2 });
        setCartItem(true);
      }
      
    } else {
      addToast('Please Login to add product in cart', {
        appearance: 'warning',
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }
  };

  const buyNow = (item) => {
    if (!!localStorage.token) {
      history.push({
        pathname: `/cart`,
        state: { id: item.testpackageDetails.id, type: 2 },
      });
    } else {
      addToast('Please Login to add product in cart', {
        appearance: 'warning',
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }
  };
  const buyPass = async () => {
    if (!!localStorage.token) {
      try {
        const response = await axios.post(
          `${BASE_URL}/subscription/add-to-cart`,
          { itemId: passSelected.id, itemType: passSelected.passTypeId },
          config
        );
        if (response.data.code == 300) {
          toggleIsVisible(true);
          setToastMessage(response.data.message);
          setTimeout(() => toggleIsVisible(false), 5000);
        } else {
          history.push({
            pathname: `/cart`,
          });
        }
      } catch (err) {
        console.log('err', err);
      }
    } else {
      addToast('Please Login to add product in cart', {
        appearance: 'warning',
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }
  };
  const showSelction = () => {
    setShowPassToUnlockModal(true);
  };
  console.log('testDetails-->', testDetails);
  useEffect(() => {
    let itemList = [];
    packageRelatedPass &&
      packageRelatedPass.map((item) => {
        console.log('item', item);
        item?.passType?.passTypeName &&
          itemList.push({
            id: item.passId,
            passName: item?.passType?.passTypeName,
            passImgName: filterPassType(item?.passType?.passTypeName),
            instName: item?.coachings?.coachingName,
            price: item?.discountedPrice
              ? item?.discountedPrice
              : item?.productPrice,
            month: item?.passType?.validity,
            passTypeId: 3,
          });
      });
    setPassItems(itemList);
    setPassSelected(itemList && itemList[0]);
  }, [packageRelatedPass]);

  const [toggle, setToggle] = useState(false);
  const [reportModal, setreportModal] = useState(false);
  const toggleModal = () => {
    setreportModal(!reportModal);
  };
  const closeModal = () => {
    setreportModal(false);
  };
  const submitModal = () => {
    addToast('Report submitted successfully!', {
      appearance: 'success',
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
    setreportModal(false);
  }


  const changePass = (item) => setPassSelected(item);

  const shareURL = (siteOption) => {
    let newWindow = '';
    switch (siteOption) {
      case shareLink.whatApp:
        newWindow = window.open(
          `https://web.whatsapp.com/send?text=${site_url}${testDetails.testpackageDetails.id || 0}`,
          '_blank',
          'test'
        );
        break;
      case shareLink.facebook:
        newWindow = window.open(
          `https://www.facebook.com/share.php?u=${site_url}${testDetails.testpackageDetails.id || 0}`,
          '_blank',
          'test'
        );
        break;
      case shareLink.gmail:
        newWindow = window.open(
          `https://mail.google.com/mail/u/0/?view=cm&fs=1&to&body=${site_url}${testDetails.testpackageDetails.id || 0}`,
          '_blank',
          'test'
        );
        break;
      default:
        break;
    }
    if (newWindow) {
      settoggleShare(!toggleShare);
    }
  };


  const checkValidity = (validity) => {
    
    let start = moment();
    let end = moment().add(parseInt(validity), 'days');

    let years = end.diff(start, 'year');
    start.add(years, 'years');

    let months = end.diff(start, 'months');
    start.add(months, 'months');

    let days = end.diff(start, 'days');

    if (months === 0 && days === 0) {
      return `Validity  : ${validity}days`;
    }
    return (
      <li>
        {'Validity  :'}
        {months ? `${months} months` : ''} {days ? ` ${days} days` : ''}{' '}
      </li>
    );
  };

  const checkValidity2 = (expireDate) => {
    let starts = moment();
    let ends = moment(expireDate);

    let diffHuman = moment.preciseDiff(starts, ends, true);
    return (
      <li>
        {'Validity  :'}
        {diffHuman.months ? `${diffHuman.months} months` : ''}{' '}
        {diffHuman.days ? ` ${diffHuman.days} days` : ''}{' '}
      </li>
    );
  };
  


  

  return (
    <>
   <div className="testHeader-group">
        <ul className="bredCrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          {Object.keys(testDetails).length === 0 ? null : (
            <li>{testDetails.testpackageDetails.packageName}</li>
          )}
        </ul>
        {/* {testDetails?.existReview === 0 && (
          <span className="p-rat-coaching" onClick={ratingModalHandler}>
            Rate This Package
          </span>
        )}
        {testDetails?.existReview !== 0 && (
          <span className="p-rat-coaching">You Rate This Package</span>
        )} */}
      </div> 

      <div className="testpackage-wrapper">
        {/* <div className="badge">
          <span>Hot and New</span>
        </div> */}
        <div className="testpackage-top-container">
          <div className="left-content">
            <div className="p-img">
              {Object.keys(testDetails).length === 0 ? (
                <TestDetailsLogoSkeleton />
              ) : (
                  <img
                    src={testDetails.testpackageDetails.packageImageUrl}
                    alt=""
                  />
                  // <p>Hello world</p>
                )}
            </div>
            <div className="p-container test-header">
              {Object.keys(testDetails).length === 0 && (
                <TestDetailsInfoSkeleton />
              )}
               <span className="share" onClick={togglehandler}>
                <Share />
                Share
                {toggleShare && (
                  <div className="toggle">
                    <span onClick={() => shareURL(shareLink.whatApp)}>
                      <WhatsApp />
                    </span>
                    <span onClick={() => shareURL(shareLink.facebook)}>
                      <FacebookRound />
                    </span>
                    <span onClick={() => shareURL(shareLink.gmail)}>
                      <GmailRound />
                    </span>
                    {/* <CopyLinkRound /> */}
                  </div>
                )}
              </span>

              {Object.keys(testDetails).length === 0 ? null : (
                <h4 className="p-title">
                  {testDetails.testpackageDetails.packageName}
                </h4>
              )}
              <div className="p-exam-covered">
                {Object.keys(testDetails).length > 0 && `Exam Covered:`}
                {Object.keys(testDetails).length === 0
                  ? null
                  : testDetails.testpackageDetails.examTypes.map((el, idx) =>
                    idx ===
                      testDetails.testpackageDetails.examTypes.length - 1 ? (
                        <strong key={idx}>{el.examType} </strong>
                      ) : (
                        <strong key={idx}>{el.examType}, </strong>
                      )
                  )}
              </div>
              {Object.keys(testDetails).length > 0 &&
                testDetails.testpackageDetails.rating && (
                  <p className="rating">
                    {Object.keys(testDetails).length > 0 &&
                      testDetails.testpackageDetails.rating && <Star />}{' '}
                    {Object.keys(testDetails).length === 0 ? null : testDetails
                      .testpackageDetails.rating === null ? (
                        <strong></strong>
                      ) : (
                        <strong>
                          {' '}
                          {testDetails.testpackageDetails.rating && testDetails.testpackageDetails.ratingCount.toFixed(1) > 2   && `${testDetails.testpackageDetails.rating} `
                                     || `-`}
                        </strong>
                      )}{' '}
                    {Object.keys(testDetails).length > 0 &&
                      testDetails.testpackageDetails.rating && (
                        <span>
                          {testDetails.testpackageDetails.ratingCount.toFixed(1) > 2   ? `(${testDetails.testpackageDetails.rating} Ratings)`
                                      : `(Not Rated)`}
                        </span>
                      )}
                  </p>
                )}



              {/* {Object.keys(testDetails).length > 0 &&
                testDetails.testpackageDetails.rating == 0 ? <p className="rating">
                  <Star />
                  {"-"}
                  <span>
                    ({testDetails.testpackageDetails.ratingCount} Ratings)
                        </span>
                </p> : ""}

              {Object.keys(testDetails).length > 0 &&
                testDetails.testpackageDetails.rating == null ? <p className="rating">
                  <Star />
                  {"-"}
                  <span>
                    ({testDetails.testpackageDetails.ratingCount} Ratings)
                        </span>
                </p> : ""} */}
              {Object.keys(testDetails).length === 0 ? null : (
                <ul className="p-testList">
                  {testDetails.testpackageDetails.testPackageDetail.length > 0 &&
                    testDetails.testpackageDetails.testPackageDetail.map(
                      (el, i) => {
                        return <li>{el.packageDetails}</li>;
                      }
                    )}
                  <li>
                    {testDetails.testpackageDetails.languages.length === 1
                      ? testDetails.testpackageDetails.languages[0].languageName
                      : testDetails.testpackageDetails.languages.map(
                        (el, idx) =>
                          idx ===
                            testDetails.testpackageDetails.languages.length -
                            1 ? (
                              <React.Fragment key={idx}>
                                {el.languageName}{' '}
                              </React.Fragment>
                            ) : (
                              <React.Fragment key={idx}>
                                {el.languageName} <b>|</b>{' '}
                              </React.Fragment>
                            )
                      )}
                  </li>
                  
                  {testDetails.testpackageDetails.validityType === 0 &&
                          checkValidity(testDetails.testpackageDetails.validity)}

                        {testDetails.testpackageDetails.validityType === 1 &&
                          checkValidity2(testDetails.testpackageDetails.expireDate)}
                    {/* {testDetails.testpackageDetails.validityType === 0
                      ? 'Valid for '
                      : ' Expires in '}
                    {validity.months ? `${validity.months} months` : ''}{' '}
                    {validity.days ? ` ${validity.days} days` : ''}{' '} */}
                   
                 
                </ul>
              )}
            </div>
          </div>
          <div className="right-content">
            <p className="test-report">
            <small onClick={toggleModal}>
                        <i className="fas fa-flag"></i>
                       
                    </small>
            </p>
        

      



            {/* Normal Buy Now */}
            {Object.keys(testDetails).length === 0 && (
              <TestDetailsInfoRightSkeleton />
            )}
            <span className="top-group-container">
              {Object.keys(testDetails).length === 0 ? null : testDetails
                .testpackageDetails.saleType === 1 ? (
                  <>
                    <p className="p-price">
                      <span className="price-tag">Price</span>
                      {testDetails.testpackageDetails.discountPrice !== 0 ? (
                        <>
                          &#8377; {testDetails.testpackageDetails.discountPrice}
                          <span>
                            &#8377;{' '}
                            <strike>
                              {testDetails.testpackageDetails.productPrice}
                            </strike>
                          </span>
                        </>
                      ) : (

                          <>
                            &#8377; {testDetails.testpackageDetails.productPrice}
                            <span>
                              &#8377;{' '}
                              <strike>
                                {testDetails.testpackageDetails.discountPrice}
                              </strike>
                            </span>
                          </>
                        )}
                    </p>
                    {/* <p className="p-exp-label">20% off + Extra 20% off</p> */}
                  </>
                ) : null}
              {/* Sale through pass */}
              {Object.keys(testDetails).length === 0 ? null : testDetails
                .testpackageDetails.saleType === 3 ? (
                  <>
                    <p className="p-price">
                      <span className="price-tag">Price </span>
                      {testDetails.testpackageDetails.discountPrice !== 0 ? (
                        testDetails.testpackageDetails.discountPrice != null ?
                          <>
                            &#8377; {testDetails.testpackageDetails.discountPrice}
                            <span>
                              &#8377;{' '}
                              <strike>
                                {testDetails.testpackageDetails.productPrice}
                              </strike>
                            </span>
                          </> : <>
                            &#8377; {testDetails.testpackageDetails.productPrice}
                            {/* <span>
                              &#8377;{' '}
                              <strike>
                                {testDetails.testpackageDetails.productPrice}
                              </strike>
                            </span> */}
                          </>
                      ) : (
                          <>
                            &#8377; {testDetails.testpackageDetails.productPrice}
                            <span>
                              &#8377;{' '}
                              <strike>
                                {testDetails.testpackageDetails.discountPrice}
                              </strike>
                            </span>
                          </>
                        )}
                    </p>
                    <p className="p-exp-label">
                      {testDetails.testpackageDetails.discountPrice === null || testDetails.testpackageDetails.discountPrice === 0 ? "No Discount" : (Math.round(((testDetails.testpackageDetails.productPrice - testDetails.testpackageDetails.discountPrice) / testDetails.testpackageDetails.productPrice) * 100) + "% Discount")}
                    </p>
                  </>
                ) : null}

              {Object.keys(testDetails).length === 0 ? null : testDetails
                .testpackageDetails.saleType === 2 ? (
                  <>
                    <p className="p-price">
                      <span className="price-tag">Price</span>
                      {testDetails.testpackageDetails.discountPrice !== 0 ||
                        testDetails.testpackageDetails.shareUnlockDiscountPrice !==
                        null ? (
                          <>
                            &#8377;{' '}
                            {shareCount.length >= 5
                              ? testDetails.testpackageDetails
                                .shareUnlockDiscountPrice
                              : testDetails.testpackageDetails.discountPrice}
                            <span>
                              &#8377;{' '}
                              <strike>
                                {testDetails.testpackageDetails.productPrice}
                              </strike>
                            </span>
                          </>
                        ) : (
                          // <>
                          //   &#8377; {testDetails.testpackageDetails.discountPrice}
                          //   <span>
                          //     &#8377;{' '}
                          //     <strike>
                          //       {testDetails.testpackageDetails.productPrice}
                          //     </strike>
                          //   </span>
                          // </>

                          <>
                            &#8377; {testDetails.testpackageDetails.productPrice}
                            {/* <span>
                              &#8377;{' '}
                              <strike>
                                {testDetails.testpackageDetails.productPrice}
                              </strike>
                            </span> */}
                          </>
                        )}<br />

                      {testDetails.testpackageDetails.discountPrice != 0 ? shareCount < 5 ? <span>{Math.round(((testDetails.testpackageDetails.productPrice - testDetails.testpackageDetails.discountPrice) / testDetails.testpackageDetails.productPrice) * 100)}
                        % off </span> : <span>{Math.round(((testDetails.testpackageDetails.productPrice - testDetails.testpackageDetails.discountPrice) / testDetails.testpackageDetails.productPrice) * 100)}
                        % off + {Math.round(testDetails.testpackageDetails.shareUnlockDiscountPrice != null && ((testDetails.testpackageDetails.discountPrice - testDetails.testpackageDetails.shareUnlockDiscountPrice) / testDetails.testpackageDetails.discountPrice) * 100)}
                        % Extra  off </span> : ""}
                    </p>
                  </>
                ) : null}

              {Object.keys(testDetails).length === 0 ? null : testDetails
                .testpackageDetails.saleType === 4 ? (
                  <>
                    <p className="p-price">
                      <span className="price-tag">Price</span>
                    &#8377; <s>{testDetails.testpackageDetails.productPrice}</s>
                      <span className="free-tag">FREE</span>
                    </p>
                    {/* <p className="p-exp-label">100% OFF</p> */}
                  </>
                ) : null}
            </span>
            {/* <p className="p-ex-time">
                <AlarmClock fill="#ea5252" />
                Expires in 2 D : 06 H : 02 M : 40 S
              </p> */}

            {/* Button section */}
            <span className="button-group-container">
              {Object.keys(testDetails).length === 0
                ? null
                : testDetails.testpackageDetails.saleType === 1 &&
                testDetails.testpackageDetails.packageactive !== 1 && (
                  <>
                    <button
                      className="btn-secondary-pill"
                      onClick={() => savetoCart(testDetails)}>
                      {cartItem ? 'Go To Cart' : 'Add To Cart' }
                      </button>
                    <button
                      className="p-btn btn-primary"
                      onClick={() => buyNow(testDetails)}>
                      BUY NOW
                      </button>
                  </>
                )}
              {Object.keys(testDetails).length === 0
                ? null
                : testDetails.testpackageDetails.saleType === 1 &&
                testDetails.testpackageDetails.packageactive === 1 && (
                  <span
                    style={{
                      marginLeft: '-40px',
                      marginTop: '1rem',
                      fontWeight: '600',
                      fontSize: '16px',
                      color: 'green',
                      textTransform: 'uppercase',
                    }}>
                    purchased
                  </span>
                )}

              {Object.keys(testDetails).length === 0 ? null : testDetails
                .testpackageDetails.saleType === 3 &&
                testDetails.testpackageDetails.passAccess !== 1 && (
                  <>
                    <button
                      className="btn-secondary-pill"
                      onClick={() => savetoCart(testDetails)}>
                       {cartItem ? 'Go To Cart' : 'Add To Cart' }
                  </button>
                    <button
                      className="p-btn btn-primary"
                      onClick={() => showSelction()}>
                      BUY PASS TO UNLOCK
                  </button>
                  </>
                )}

              {Object.keys(testDetails).length === 0
                ? null
                : testDetails.testpackageDetails.saleType === 3 &&
                testDetails.testpackageDetails.passAccess === 1 && (
                  <span
                    style={{
                      marginLeft: '-40px',
                      marginTop: '1rem',
                      fontWeight: '600',
                      fontSize: '16px',
                      color: 'green',
                      textTransform: 'uppercase',
                    }}>
                    purchased
                  </span>
                )}

              {Object.keys(testDetails).length === 0 ? null : testDetails
                .testpackageDetails.saleType === 2 &&
                testDetails.testpackageDetails.packageactive !== 1 ? (
                  <>
                    <button
                      className="btn-secondary-pill"
                      onClick={() => savetoCart(testDetails)}>
                       {cartItem ? 'Go To Cart' : 'Add To Cart' }
                  </button>
                    <button
                      className="p-btn btn-primary"
                      onClick={() => buyNow(testDetails)}>
                      BUY NOW
                  </button>
                  </>
                ) : null}

              {Object.keys(testDetails).length === 0 ? null : testDetails
                .testpackageDetails.saleType === 4 ? (
                  enroll || testDetails.enrollStatus ? (
                    <>
                      <button
                        className="p-btn btn-primary btn-enrolled"
                      >
                        ENROLLED
                    </button>
                    </>
                  ) : (
                      <>
                        <button
                          className="p-btn btn-primary"
                          onClick={() => enrollTest(testDetails)}>
                          ENROLL NOW
                    </button>
                      </>
                    )
                ) : null}
            </span>
          </div>
        </div>
      </div>
      <Toast isVisible={isVisible} toastMessage={toastMessage} />
      {modalToggle && (
        <Modal addClass="package-rating">
          <ProductReviewModal
            testDetails={testDetails}
            modalClose={modalCloseHandler}
          />
        </Modal>
      )}
      {enrollModal && (
        <Modal addClass="enrolled-modal">
          <div className="enrolled-success">
            <img
              src={require('../../../assets/images/ArrowVerified.svg')}
              alt="verify"
            />
            <h2>Congratulations!</h2>
            <p>
              You have successfully unlock the{' '}
              <strong>
                {Object.keys(testDetails).length > 0 &&
                  testDetails.testpackageDetails.packageName}
              </strong>{' '}
              with validity of{' '}
              {validity.months ? `${validity.months} months` : ''}{' '}
              {validity.days ? ` ${validity.days} days` : ''} .
            </p>
            <button
              className="p-btn btn-primary"
              onClick={() => setEnrollModal(false)}>
              Close
            </button>
          </div>
        </Modal>
      )}

      {showPassToUnlockModal && (
        <Modal addClass="shareunlock-modal">
          <div className="modal-header">
            <span className="close" onClick={() => modalCloseHandler()}>
              <ModalClose />
            </span>
            <h2>{testDetails.coachingName} Membership Plan</h2>
            <p>
              You have successfully unlock the
              <strong>"{testDetails.testpackageDetails.packageName}"</strong>
              {/* with validity of 3 months. */}
            </p>
          </div>
          <div className="a-wrapper pass-slider-wrapper">
            {passItems && (
              <div className="a-container">
                <Carousel heading={``}>
                  <ReactCarousel
                    itemsToShow={4}
                    itemsToScroll={1}
                    breakPoints={breakPoints}
                    renderArrow={myArrow}>
                    {passItems.map((item, idx) => (
                      <React.Fragment>
                        <PassCard
                          key={item.id}
                          item={item}
                          key={idx}
                          hideBuyBtn={true}
                        />
                        <div className="select-pass">
                          <p className="custom-checkbox">
                            <input
                              type="checkbox"
                              checked={passSelected.id === item.id}
                              name=""
                              onClick={() => changePass(item)}
                              id={`item-${item.id}`}
                            />
                            <label htmlFor={`item-${item.id}`}>Select</label>
                          </p>
                        </div>
                      </React.Fragment>
                    ))}
                  </ReactCarousel>
                </Carousel>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <p className="note">
              {/* <strong>Note:</strong>Text will be change later. */}
            </p>
            <button
              className="btn btn-primary radius"
              onClick={() => buyPass()}>
              Continue
            </button>
          </div>
        </Modal>
      )}
         {reportModal && (
        <Modal addClass="report-modal modal-sm">
          <div className="modal-header">
            <h2>Report</h2>
            <span className="close" onClick={closeModal}>
              <ModalClose />
            </span>
          </div>
          <div className="modal-body">
            <h5 className="report-label">Choose Report Type:</h5>
            <ul className="roprt-list">
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="sexual-content" />
                  <label htmlFor="sexual-content">Sexual content</label>
                </p>
              </li>
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="Violent" />
                  <label htmlFor="Violent">Violent or repulsive content</label>
                </p>
              </li>
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="Hateful" />
                  <label htmlFor="Hateful">Hateful or abusive content</label>
                </p>
              </li>
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="harmful" />
                  <label htmlFor="harmful">Harmful dangerous content</label>
                </p>
              </li>
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="spam" />
                  <label htmlFor="spam">Spam or misleading</label>
                </p>
              </li>
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="infringes" />
                  <label htmlFor="infringes">Infringes my rights</label>
                </p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write your reason..."
                />
              </li>
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="captions" />
                  <label htmlFor="captions">Captions issue</label>
                </p>
              </li>
              <li>
                <p className="custom-radio">
                  <input type="radio" name="report" id="others" />
                  <label htmlFor="others">Others</label>
                </p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Leaving reason..."
                />
              </li>
            </ul>
            <p className="notes">
              Flagged coachings are reviewed by ADMISURE staff 24 hours a day,
              seven days a week to determine whether they violate Community
              Guidelines. Accounts are penalized for Community Guidelines
              violations, and serious or repeated violations can lead to account
              termination.
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn-white" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn-grey" onClick={submitModal}>Submit</button>
          </div>
        </Modal>
      )}

    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.global.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveToCart: (item) => dispatch(saveToCart(item)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestSeriesHeader);
