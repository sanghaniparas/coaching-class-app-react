import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
//import { Modal } from '../../Core/Layout/Modal/Modal';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import {
  Share,
  Star,
  Student,
  TestSeries,
  PracticeChapter,
  Quizz,
  User,
  Math,
  Physic,
  Chemist,
  Biology,
  WhatsApp,
  TeleGramRound,
  FacebookRound,
  GmailRound,
  CopyLinkRound,
} from '../../Core/Layout/Icon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from './../../../config';
import TestDetailsAcademySkeleton from './../../../skeletons/TestDetails/TestDetailsAcademySkeleton';
import TestDetailsFacultySkeleton from './../../../skeletons/TestDetails/TestDetailsFacultySkeleton';

const site_url = 'https://admisure.com/coaching/';
const shareLink = {
  whatApp: 'whatApp',
  facebook: 'facebook',
  gmail: 'gmail',
};
const TestSeriesAcademy = ({ testDetails, match, coachingId, history }) => {
  const [toggleShare, settoggleShare] = useState(false);
  const [newRes, setNewRes] = useState({});
  const [toggleFollow, setToggleFollow] = useState(0);
  const [followCount, setFollowCount] = useState(0);
  const [unFollowCount, setUnFollowCount] = useState(0);
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const togglehandler = () => {
    settoggleShare(!toggleShare);
  };
  const config = {
    headers: {
      Authorization: `${localStorage.token}`,
    },
  };
  const payload = {
    coachingId: testDetails?.coachingDetails?.id,
  };

  const followClick = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem('token')) {
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
        `${BASE_URL}/testPackage/details/${match.params.id}`
      );
      setNewRes(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const notify = () =>
    toast.info('You have succesfully Followed !', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const notify2 = () =>
    toast.info('You have succesfully Unfollowed !', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notify3 = () =>
    toast.error('You are not Logged In !', {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      async function fetchFollow() {
        try {
          const config = {
            headers: {
              Authorization: `${localStorage.token}`,
            },
          };

          const coachingId = localStorage.getItem('coachingId');

          const response = await axios.get(
            `${BASE_URL}/coaching/checkFollow/${coachingId}`,
            config
          );

          setToggleFollow(response.data.data.following);
        } catch (err) {
          console.log(err);
        }
      }

      fetchFollow();
    }
  }, [testDetails]);

  const shareURL = (siteOption) => {
    let newWindow = '';
    switch (siteOption) {
      case shareLink.whatApp:
        newWindow = window.open(
          `https://web.whatsapp.com/send?text=${site_url}${coachingId}`,
          '_blank',
          'test'
        );
        break;
      case shareLink.facebook:
        newWindow = window.open(
          `https://www.facebook.com/share.php?u=${site_url}${coachingId}`,
          '_blank',
          'test'
        );
        break;
      case shareLink.gmail:
        newWindow = window.open(
          `https://mail.google.com/mail/u/0/?view=cm&fs=1&to&body=${site_url}${coachingId}`,
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

  return (
    <div
      className={`a-academy-package card ${
        Object.keys(testDetails).length &&
        testDetails.subjectWithFaculty.length === 0
          ? 'full-width'
          : ''
      }`}>
      <div className="left-content">
        {Object.keys(testDetails).length === 0 && (
          <TestDetailsAcademySkeleton />
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

        <div className="a-academy-top">
          {Object.keys(testDetails).length === 0 ? null : (
            <img
              src={testDetails.coachingDetails.logoUrl}
              alt=""
              className="a-logo"
              style={{ cursor: 'pointer' }}
              onClick={() =>
                history.push(`/coaching/${testDetails.coachingDetails.id}`)
              }
            />
          )}

          <div className="a-academy-content">
            {Object.keys(testDetails).length === 0 ? null : (
              <h2 className="a-name">
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    history.push(`/coaching/${testDetails.coachingDetails.id}`)
                  }>
                  {testDetails.coachingDetails.coachingName}
                </span>
                {toggleFollow ? (
                  <button
                    onClick={(e) => followClick(e)}
                    type="button"
                    className="edit-btn unfollow">
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      setUnFollowCount(0);
                      followClick(e);
                      setFollowCount((followCount) => followCount + 1);
                    }}
                    type="button"
                    className="edit-btn follow">
                    Follow
                  </button>
                )}
              </h2>
            )}
            {Object.keys(testDetails).length === 0 ? null : testDetails
                .coachingDetails.rating === 0 ? (
              <>
                <p className="a-rating">
                  <Star /> 0 <span>(0 Ratings)</span>
                </p>
              </>
            ) : (
              <>
                <p className="a-rating">
                  <Star />
                  {(testDetails.coachingDetails.rating &&
                    testDetails.coachingDetails.totalRatingCount.toFixed(1) >
                      2 &&
                    testDetails.coachingDetails.rating.toFixed(1)) ||
                    `-`}
                  {/* {testDetails.coachingDetails.rating.toFixed(1)}{' '} */}
                  <span>
                    (
                    {testDetails.coachingDetails.totalRatingCount.toFixed(1) > 2
                      ? `${testDetails.coachingDetails.totalRatingCount} Ratings`
                      : `Not Rated`}
                    )
                    {/* ({testDetails.coachingDetails.totalRatingCount} Ratings){' '} */}
                  </span>
                </p>
              </>
            )}

            <p className="location">
              {Object.keys(testDetails).length === 0 ? null : ' Location:'}
              {Object.keys(testDetails).length === 0 ? null : (
                <strong>
                
                  {testDetails.coachingDetails.city.city},{' '}
                  {testDetails.coachingDetails.state.name}{' '}
                  {/* {testDetails.coachingDetails.country.name} */}
                </strong>
              )}
            </p>
            <p className="location">
              {Object.keys(testDetails).length === 0 ? null : ' Exam:'}

              {Object.keys(testDetails).length === 0
                ? null
                : testDetails.coachingDetails.examTypes.map((el, idx) =>
                    idx === testDetails.coachingDetails.examTypes.length - 1 ? (
                      <strong key={idx}>{el.examType} </strong>
                    ) : (
                      <strong key={idx}>{el.examType}, </strong>
                    )
                  )}
            </p>
          </div>
        </div>
        <div className="a-academy-bottom">
          <div className="a-academy-info-detail">
            <ul>
              {Object.keys(testDetails).length === 0 ? null : (
                <>
                  <li>
                    <p>
                      <User />
                      {Object.keys(newRes).length !== 0
                        ? newRes.coachingDetails.totalFollowers > 1
                          ? `${newRes.coachingDetails.totalFollowers - 1} +`
                          : newRes.coachingDetails.totalFollowers || 0
                        : testDetails.coachingDetails.totalFollowers > 1
                        ? `${testDetails.coachingDetails.totalFollowers - 1} +`
                        : testDetails.coachingDetails.totalFollowers || 0}
                    </p>
                    <span>Followers</span>
                  </li>
                </>
              )}

              {Object.keys(testDetails).length === 0 ? null : (
                <>
                  <li>
                    <p>
                      <Student />
                      {testDetails.coachingDetails.totalStudents > 1
                        ? `${testDetails.coachingDetails.totalStudents - 1} +`
                        : testDetails.coachingDetails.totalStudents || 0}
                    </p>
                    <span>Total Students</span>
                  </li>
                </>
              )}

              {Object.keys(testDetails).length === 0 ? null : (
                <>
                  <li>
                    <p>
                      <TestSeries />
                      {testDetails.coachingDetails.totalTestseries > 1
                        ? `${testDetails.coachingDetails.totalTestseries - 1} +`
                        : testDetails.coachingDetails.totalTestseries || 0}
                    </p>
                    <span>Test Series</span>
                  </li>
                </>
              )}

              {Object.keys(testDetails).length === 0 ? null : (
                <>
                  <li>
                    <p>
                      <PracticeChapter />
                      {testDetails.coachingDetails.totalPractice > 1
                        ? `${testDetails.coachingDetails.totalPractice - 1} +`
                        : testDetails.coachingDetails.totalPractice || 0}
                    </p>
                    <span>Practice Sets</span>
                  </li>
                </>
              )}

              {Object.keys(testDetails).length === 0 ? null : (
                <>
                  <li>
                    <p>
                      <Quizz />
                      {testDetails.coachingDetails.totalQuiz > 1
                        ? `${testDetails.coachingDetails.totalQuiz - 1} +`
                        : testDetails.coachingDetails.totalQuiz || 0}
                    </p>
                    <span>Quizzes</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      {Object.keys(testDetails).length === 0 ? (
        <TestDetailsFacultySkeleton />
      ) : (
        <div className="right-content">
          <h2>Package Collaborator's</h2>

          <div className="p-col-left">
            {testDetails.subjectWithFaculty.map((el, idx) => (
              <>
                <p key={idx}>
                  <Math /> {el.packageSubject.subject}
                </p>
              </>
            ))}
          </div>

          <div className="p-col-right">
            {testDetails.subjectWithFaculty.map((el, i) =>
              el.faculties.map((item, idx) =>
                item.pictureUrl === null ? (
                  <Fragment key={idx}>
                    <p>
                      <img
                        width="30"
                        src={require('../../../assets/images/no-image-icon-md.png')}
                        alt=""
                        className="avatar"
                      />
                      {item.facultyName}
                    </p>{' '}
                  </Fragment>
                ) : (
                  <Fragment key={idx}>
                    <p>
                      <img
                        width="30"
                        src={item.pictureUrl}
                        alt=""
                        className="avatar"
                      />
                      {item.facultyName}
                    </p>{' '}
                  </Fragment>
                )
              )
            )}
          </div>
        </div>
      )}
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
              }}>
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default withRouter(TestSeriesAcademy);

{
  /* <p>
            <Math /> Math
          </p>
          <p>
            <Physic /> Physics
          </p>
          <p>
            <Chemist /> Chemistory
          </p>
          <p>
            <Biology /> Biology
          </p> */
}

{
  /* <p key={idx}>
                  <img
                    width="30"
                    src={require('../../../assets/images/no-image-icon-md.png')}
                    alt=""
                    className="avatar"
                  />
                  Not Available
                </p>
              ) : (
                el.faculties.map((i, id) => (
                  <>
                    <p key={id}>
                      <img
                        width="30"
                        src={require('../../../assets/images/post-avatar.png')}
                        alt=""
                        className="avatar"
                      />
                      {i.facultyName}
                    </p>
                  </>
                ))
              ) */
}
