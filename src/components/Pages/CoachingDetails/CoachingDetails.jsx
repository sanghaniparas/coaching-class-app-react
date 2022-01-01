/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Layout from '../../Core/Layout/Layout';
import Toast from '../Elements/Toast';
import CoachingDetailSlider from './CoachingDetailSlider';
import CoachingDetailsInformation from './CoachingDetailsInformation';
import CoachingDetailsTab from './CoachingDetailsTab';
import CoachingDetailsHome from './CoachingDetailsHome';
import CoachingDetailsTestSeries from './CoachingDetailsTestSeries';
import CoachingDetailsPracticeSets from './CoachingDetailsPracticeSets';
import CoachingDetailsQuizzes from './CoachingDetailsQuizzes';
import CoachingDetailsAbout from './CoachingDetailsAbout';
import { BASE_URL } from './../../../config';
import BannerSkeleton from '../../../skeletons/BannerSkeleton';
import useWindowDimensions from './../../../Hooks/useWindowDimensions';

export default function CoachingDetails(props) {
  const { height, width } = useWindowDimensions();
  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [pageDetails, setPageDetails] = useState(null);
  const [isMainTab, setIsMainTab] = useState('home');
  const [dataPage, setDataPage] = useState(null);
  const [isTrue, setIsTrue] = useState(true);
  const [wishList, setWishList] = useState(false);
  const [coachingRelatedPass, setPassList] = useState(null);
  const history = useHistory();
  const cardItemNumber = 4;
  const incrementItemNumber = 2;
  const config = {
    headers: {
      Authorization: `${localStorage.token}`,
    },
  };

  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 5000);
  };

  const getPageCoaching = async (payloadType = 'home') => {
    try {
      const mainapi = `${BASE_URL}/coaching/sections/`;
      const payload = { coachingId: props.match.params.id, page: payloadType };
      const res = await axios.post(mainapi, payload);
      console.log(res.data.data);
      if(res && res.data && res.data.data){
        setDataPage(res.data.data);
        setIsTrue(false);
      }
     
     
    } catch (error) {
      showErrorToast('Something went wrong. Please try again later !');
    }
  };

  const getPassCoaching = async (payloadType = 'home') => {
    try {
      const mainapi = `${BASE_URL}/coaching/coaching-related-pass`;
      const payload = { coachingId: props.match.params.id };
      const res = await axios.post(mainapi, payload, config);
      console.log(res.data.data);
      setPassList(res.data.data);
    } catch (error) {
      showErrorToast('Something went wrong. Please try again later !');
    }
  };

  const handleWishlist = () => {
    setWishList(!wishList);
  };

  const sectionHome = () => {
    setIsMainTab('home');
    getPageCoaching('home');
  };

  const sectionTestSeries = () => {
    setIsMainTab('testSeries');
    getPageCoaching('testSeries');
  };

  const sectionPracticeSet = () => {
    setIsMainTab('practiceSet');
    getPageCoaching('practiceSet');
  };

  const sectionQuizzes = () => {
    setIsMainTab('quizzes');
    getPageCoaching('quizzes');
  };

  useEffect(() => {
    async function getAllCoachingDetails() {
      try {
        const res = await axios.get(
          `${BASE_URL}/coaching/details/${props.match.params.id}`
        );
        if (!res.data.data) {
          history.push('/coaching');
          return false;
        }

        console.log(res.data.data);
        setPageDetails(res.data.data);
        setIsPageLoaded(true);
      } catch (error) {
        showErrorToast('Something went wrong. Please try again later !');
      }
    }
    getPageCoaching();
    getAllCoachingDetails();
    getPassCoaching();
    localStorage.setItem('coachingID', props.match.params.id);
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    console.log('width ==> ', width);
  }, []);

  return (
    <Layout>
      <React.Fragment>
        {!isPageLoaded ? (
          <BannerSkeleton />
        ) : (
            <CoachingDetailSlider detailsPageSlider={pageDetails} />
          )}

        <CoachingDetailsInformation
          pageDetails={pageDetails}
          detailsInformation={pageDetails}
          coachingRelatedPass={coachingRelatedPass}
        />
        <CoachingDetailsTab
          isMainTab={isMainTab}
          setIsMainTab={setIsMainTab}
          sectionHome={sectionHome}
          sectionTestSeries={sectionTestSeries}
          sectionPracticeSet={sectionPracticeSet}
          sectionQuizzes={sectionQuizzes}
        />
        {isMainTab === 'home' && !isTrue && (
          <CoachingDetailsHome
            idTab={props.match.params.id}
            homePage={dataPage}
            handleWishlist={handleWishlist}
            wishList={wishList}
            pageDetails={pageDetails}
          />

        )}
        {isMainTab === 'testSeries' && (
          <CoachingDetailsTestSeries
            testSeriesPage={dataPage}
            pageDetails={pageDetails}
            cardItemNumber={width < 768 ? 2 : 20}
            incrementItemNumber={width < 768 ? 2 : 20}
          />
        )}
        {isMainTab === 'practiceSet' && (
          <React.Fragment>
            <CoachingDetailsPracticeSets
            pageDetails={pageDetails}
            practisePage={dataPage}
            cardItemNumber={width < 768 ? 2 : 20}
            incrementItemNumber={width < 768 ? 2 : 20}
          />
          </React.Fragment>
         
        )}
        {isMainTab === 'quizzes' && (
          <CoachingDetailsQuizzes
            pageDetails={pageDetails}
            quizzesPage={dataPage}
            cardItemNumber={width < 768 ? 2 : 20}
            incrementItemNumber={width < 768 ? 2 : 20}
          />
        )}
        {isMainTab === 'about' && (
          <CoachingDetailsAbout detailsAbout={pageDetails} />
        )}
      </React.Fragment>

      <Toast isVisible={isVisible} toastMessage={toastMessage} />
    </Layout>
  );
}
