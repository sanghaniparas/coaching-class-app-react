import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "./../../../config";
import { Modal } from "react-responsive-modal";
import { Modal as ModalPass } from "../../Core/Layout/Modal/Modal";
import {
  Star,
  Verified,
  Student,
  TestSeries,
  PracticeChapter,
  Quizz,
  Facebook,
  WhatsApp,
  Gmail,
  Telegram,
  SocialShare,
  Share,
  FacebookRound,
  GmailRound,
} from "../../Core/Layout/Icon";
import { ToolTip } from "../../Core/Layout/Tooltip/ToolTip";
import CoachingInfoSkeleton from "../../../skeletons/CoachingInfoSkeleton";
import CoachingLogoSkeleton from "./../../../skeletons/CoachingLogoSkeleton";
import CoachingInfo2Skeleton from "./../../../skeletons/CoachingInfo2Skeleton";
import Toast from "../Elements/Toast";
import ReactCarousel, { consts } from "react-elastic-carousel";
import Carousel from "../Elements/Carousel";
import PassCard from "../Pass/PassCard";
import { Arrow, ModalClose } from "../../Core/Layout/Icon";
import { filterPassType } from "../Global/Formatter";



import {FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TelegramShareButton,TelegramIcon} from "react-share";

import HelmetMetaData from "../../Core/HelmetMetaData/HelmetMetaData";


const site_url = "https://admisure.com/coaching/";
const shareLink = {
  whatApp: "whatApp",
  facebook: "facebook",
  gmail: "gmail",
};

const CoachingDetailsInformation = ({
  detailsInformation,
  pageDetails,
  coachingRelatedPass,
  match,
}) => {
  const [newRes, setNewRes] = useState({});
  const [toggleFollow, setToggleFollow] = useState(0);
  const [followCount, setFollowCount] = useState(0);
  const [unFollowCount, setUnFollowCount] = useState(0);
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const [showPassToUnlockModal, setShowPassToUnlockModal] = useState(false);
  const [passSelected, setPassSelected] = useState("");
  const [isVisible, toggleIsVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [passItems, setPassItems] = useState("");
  const history = useHistory();
  const { addToast } = useToasts();

  const config = {
    headers: {
      Authorization: `${localStorage.token}`,
    },
  };
  const payload = {
    coachingId: match.params.id,
  };

  const breakPoints = [
    { width: 2, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 1 },
    { width: 850, itemsToShow: 2, itemsToScroll: 1 },
    { width: 1150, itemsToShow: 2, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 2 },
    { width: 1750, itemsToShow: 2 },
  ];

  const myArrow = ({ type, onClick, isEdge }) => {
    const carlPointer = type === consts.PREV ? <Arrow /> : <Arrow />;
    const carlClass = type === consts.PREV ? "prev" : "next";
    return (
      <button
        className={`a-btn-arrow ${carlClass}`}
        onClick={onClick}
        disabled={isEdge}
      >
        {carlPointer}
      </button>
    );
  };

  const followClick = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem("token")) {
      return notify3();
    }
    try {
      if (toggleFollow) {
        setOpen(true);
      }
      if (followCount < 1) {
        if (!toggleFollow) {
          const response = await axios.post(
            `${BASE_URL}/coaching/follow`,
            payload,
            config
          );
          setToggleFollow(response.data.data.following);
          getNewResponse();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const unfollowCoaching = async () => {
    try {
      if (unFollowCount < 1) {
        const response = await axios.post(
          `${BASE_URL}/coaching/unfollow`,
          payload,
          config
        );
        setToggleFollow(response.data.data.following);
        getNewResponse();
        onCloseModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getNewResponse = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/coaching/details/${match.params.id}`
      );
      setNewRes(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const notify3 = () =>
    toast.error("You are not Logged In !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    async function fetchFollow() {
      try {
        const config = {
          headers: {
            Authorization: `${localStorage.token}`,
          },
        };

        const response = await axios.get(
          `${BASE_URL}/coaching/checkFollow/${match.params.id}`,
          config
        );
        setToggleFollow(response.data.data.following);
      } catch (err) {
        console.log(err);
      }
    }

    fetchFollow();
  }, [detailsInformation]);

  const countFormat = (countItem) => (
    <>{countItem < 2 ? countItem : `${countItem - 1}+`}</>
  );

   
  

  const shareURL = (siteOption) => {


   


    let newWindow = "";
    switch (siteOption) {
     
      case shareLink.gmail:
        newWindow = window.open(
          `https://mail.google.com/mail/u/0/?view=cm&fs=1&to&body=${site_url}${match.params.id}`,
          "_blank",
          "test"
        );
        break;
      default:
        break;
    }
    if (newWindow) {
      //registerlinkShare();
      newWindow.opener = null;
    }
  };

  const showSelction = () => {
    setShowPassToUnlockModal(true);
  };

  const modalCloseHandler = () => {
    setShowPassToUnlockModal(false);
  };

  const changePass = (item) => setPassSelected(item);

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
        console.log("err", err);
      }
    } else {
      addToast("Please Login to add product in cart", {
        appearance: "warning",
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }
  };
  useEffect(() => {
    let itemList = [];
    coachingRelatedPass &&
      coachingRelatedPass.map((item) => {
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
  }, [coachingRelatedPass]);

  useEffect(() => {
    return ()=>{
      document.title = "Admisure";
    }
  }, []);
  return (
    <>
      <div className="a-wrapper a-coaching-details">
        <div className="a-container">
          <div className="a-coaching-details-top">
            <div className="a-coaching-logo">
              {detailsInformation === null ? (
                <CoachingLogoSkeleton />
              ) : detailsInformation.logoUrl !== null ? (
                <img
                  src={detailsInformation.logoUrl}
                  alt={detailsInformation.coachingName}
                />
              ) : (
                    <img
                      src={`https://via.placeholder.com/40x40?text=${detailsInformation.coachingName}`}
                      alt={detailsInformation.coachingName}
                    />
                  )}
              {/* <img
                src={require('../../../assets/images/railway.png')}
                alt="avatar logo"
              /> */}
            </div>
            <div className="a-coaching-info">
              {detailsInformation === null ? (
                <CoachingInfoSkeleton />
              ) : (
                <>
                  <HelmetMetaData
                    title={detailsInformation.coachingName}
                    description={ detailsInformation.coachingName }
                    image={detailsInformation.logoUrl}
    
                  ></HelmetMetaData>
                  <div className="a-coaching-title-info">
                    <h2>
                      {detailsInformation.coachingName}
                      {detailsInformation.coachingVerification === 1 && (
                        <span className="varify">
                          <ToolTip message="Verified" position={"top"}>
                            {/* <Verified /> */}
                            <img
                              style={{  width: "20px",
                              height: "20px",  
                              backgroundPosition: 'center center',
                              backgroundSize: "cover",
                              borderRadius: "20px",
                              marginTop: "-5px" }}
                              src={require('../../../assets/images/verified-icon.jpg')}            
            />
                          </ToolTip>
                        </span>
                      )}
                      {/* {detailsInformation.coachingVerification === 1 ? (
                        <span className="varify">
                          <ToolTip message="Verified" position={"top"}>
                            <Verified fill={"#6da544"} />
                          </ToolTip>
                        </span>
                      ) : (
                        <span className="varify">
                          <ToolTip message="Not Verified" position={"top"}>
                            <Verified />
                          </ToolTip>
                        </span>
                      )} */}
</h2>
                      {detailsInformation.rating > 3 && <p className="a-coaching-rating">
                        <Star />
                        <strong>
                          {" "}
                          {(detailsInformation.rating &&
                            detailsInformation.totalRatingCount.toFixed(1) >
                            2 &&
                            detailsInformation.rating.toFixed(1)) ||
                            `-`}
                        </strong>
                             (
                          {detailsInformation.totalRatingCount.toFixed(1) > 2
                          ? `${detailsInformation.totalRatingCount} Ratings`
                          : `Not Rated`}
                        )



                      </p>}


                      <div className="a-coaching-flw-group">
                        <span>
                          {Object.keys(newRes).length !== 0
                            ? newRes.totalFollowers > 1
                            ? `${newRes.totalFollowers - 1} +`
                            : newRes.totalFollowers || 0
                          : detailsInformation.totalFollowers > 1
                          ? `${detailsInformation.totalFollowers - 1} +`
                          : detailsInformation.totalFollowers || 0}
                        Followers
                      </span>
                        {/* <span>{detailsInformation.totalFollowing} Following</span> */}
                      </div>
                    </div>
                    <div className="a-coaching-btn-group">
                      {toggleFollow ? (
                        <button
                          onClick={(e) => followClick(e)}
                          className="edit-btn unfollow"
                        >
                          Unfollow
                        </button>
                      ) : (
                          <button
                            onClick={(e) => {
                              setUnFollowCount(0);
                              followClick(e);
                              setFollowCount((followCount) => followCount + 1);
                            }}
                            className="edit-btn follow"
                          >
                            Follow
                          </button>
                        )}


                      {detailsInformation.passCount > 0 && (<button
                        className="btn-primary text-capital"
                        onClick={() => showSelction()}
                      >
                        Buy Pass
                      </button>)}
                      {/* {detailsInformation.testPackageCount} */}
                    </div>
                  </>
                )}
            </div>
          </div>
          <div className="a-coaching-detail-bottom">
            {detailsInformation === null ? (
              <CoachingInfo2Skeleton />
            ) : (
                <div className="a-coaching-info-detail">
                  <ul>
                    <li>
                      <p>
                        <Student />{" "}
                        {countFormat(detailsInformation.studentCount)}
                        {/* {detailsInformation.studentCount === 0
                          ? 0
                          : `${detailsInformation.studentCount - 1}+`} */}
                      </p>
                      <span>Total Students</span>
                    </li>
                    <li>
                      <p>
                        <TestSeries />{" "}
                        {countFormat(detailsInformation.testPackageCount)}
                        {/* {detailsInformation.testPackageCount === 0
                      ? 0
                      : detailsInformation.testPackageCount - 1}
                    + */}
                      </p>
                      <span>Test Series</span>
                    </li>
                    <li>
                      <p>
                        <PracticeChapter />{" "}
                        {countFormat(detailsInformation.practiceSetCount)}
                        {/* {detailsInformation.totalPracticeChapters === 0
                      ? 0
                      : detailsInformation.totalPracticeChapters - 1}
                    + */}
                      </p>
                      <span>Practice Chapter</span>
                    </li>
                    <li>
                      <p>
                        <Quizz /> {countFormat(detailsInformation.quizCount)}
                        {/* {detailsInformation.quizCount === 0
                      ? 0
                      : detailsInformation.quizCount - 1}
                    + */}
                    </p>
                    <span>Quizzes</span>
                  </li>
                  <li>
                    <span className="share">
                      Share with your friends
                      <div className="toggle">
                        <span
                          style={{ marginRight: "0.8rem" }}
                          onClick={() => shareURL(shareLink.whatApp)}
                        >
                            <WhatsappShareButton
                              url={`https://www.admisure.com/coaching/${match.params.id}`}
                              title={`${detailsInformation.coachingName}`}
                              separator=":: "
                              className="Demo__some-network__share-button"
                            >
                            <WhatsappIcon size={32} round />
                          </WhatsappShareButton>
                        </span>

                        <span
                          style={{ marginRight: "0.8rem" }}
                          onClick={() => shareURL(shareLink.whatApp)}
                        >
                        <TelegramShareButton
                        url={`https://www.admisure.com/coaching/${match.params.id}`}
                        title={`${detailsInformation.coachingName}`}
                       
                      >
                        <TelegramIcon size={32} round />
                      </TelegramShareButton>
                      </span>


                        <span
                          style={{ marginRight: "0.8rem" }}
                          onClick={() => shareURL(shareLink.facebook)}
                        >
                        
                           
                           <FacebookShareButton
                           
                          url={`https://www.admisure.com/coaching/${match.params.id}`}
                          quote={`${detailsInformation.coachingName}`}
                          hashtag={detailsInformation.details}
                          image={`https://via.placeholder.com/40x40?text=${detailsInformation.coachingName}`}
                        >
                        <FacebookIcon size={36} round={true}/>
                        </FacebookShareButton> 
                        </span>
                        <span
                          style={{ marginRight: "0.8rem" }}
                          onClick={() => shareURL(shareLink.gmail)}
                        >
                          <GmailRound />
                        </span>
                        {/* <CopyLinkRound /> */}
                      </div>
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="language-modal">
          <p> Do you want to unfollow it? </p>
          <div className="language-btn">
            <button className="btn-no radius" onClick={() => onCloseModal()}>
              No
            </button>
            <button
              className="btn-primary radius"
              onClick={() => {
                setFollowCount(0);
                unfollowCoaching();
                setUnFollowCount((unFollowCount) => unFollowCount + 1);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      {showPassToUnlockModal && (
        <ModalPass addClass="shareunlock-modal">
          <div className="modal-header">
            <span className="close" onClick={() => modalCloseHandler()}>
              <ModalClose />
            </span>
            <h2>{detailsInformation.coachingName} Membership Plan</h2>
            {/* <p> 
              You have successfully unlock the 
              <strong>"{testDetails.testpackageDetails.packageName}"</strong>
              with validity of 3 months. 
            </p> */}
          </div>
          <div className="a-wrapper pass-slider-wrapper">
            {passItems && (
              <div className="a-container">
                <Carousel heading={``}>
                  <ReactCarousel
                    itemsToShow={4}
                    itemsToScroll={1}
                    breakPoints={breakPoints}
                    renderArrow={myArrow}
                  >
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
              onClick={() => buyPass()}
            >
              Continue
            </button>
          </div>
        </ModalPass>
      )}
      <Toast isVisible={isVisible} toastMessage={toastMessage} />
      <ToastContainer />
    </>
  );
};

export default withRouter(CoachingDetailsInformation);
