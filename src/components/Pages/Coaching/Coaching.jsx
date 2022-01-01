/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../Core/Layout/Layout';
import Toast from '../Elements/Toast';
import Faq from '../Faq/Faq';
import ExamType from './ExamType';
import CoachingSlider from './CoachingSlider';
import PopularCoaching from './PopularCoaching';
import CoachingList from './CoachingList';
import { BASE_URL } from './../../../config';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { clearTestInstruction } from './../../../redux/actions/exam';
import { clearSolutionData } from '../../../redux/actions/solution';
import { connect } from 'react-redux';
import BannerSkeleton from './../../../skeletons/BannerSkeleton';
import ExamTypeSkeleton from './../../../skeletons/ExamTypeSkeleton';
import ReactMeta from '../../../utils/ReactMeta';

const Coaching = ({ clearTestInstruction, clearSolutionData }) => {
  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);
  const [isAllCoaching, getIsAllCoaching] = useState(null);
  const [totalCoaching, setTotalCoaching] = useState(null);
  const [activeTabClass, setActiveTabClass] = useState(null);
  const [loadCoachingData, setLoadCoachingData] = useState(false);

  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 5000);
  };

  const handleExamType = (item) => {
    isAllCoaching.examTypeWiseCoachings.filter(
      (idx) =>
        idx.sectionName === item.sectionName &&
        setActiveTabClass(idx.sectionName)
    );
    if (item.examTypeId === 0) {
      item.sectionName && setTotalCoaching(item.sections);
    } else {
      isAllCoaching.examTypeWiseCoachings.filter(
        (idx) =>
          idx.sectionName === item.sectionName && setTotalCoaching(idx.sections)
      );
    }
  };

  const handleAllData = (data) => {
    setTotalCoaching(data.section);
    setActiveTabClass(data.sectionName);
  };

  useEffect(() => {
    clearTestInstruction();
    clearSolutionData();
    localStorage.removeItem('langId');
    localStorage.removeItem('testId');
    async function getAllCoaching() {
      try {
        const res = await axios.get(`${BASE_URL}/coachingPage`);
        getIsAllCoaching(res.data.data);

        setTotalCoaching(res.data.data.coachingPageCoachingSection);
        setLoadCoachingData(true);
        setActiveTabClass('All');
      } catch (error) {
        showErrorToast('Something went wrong. Please try again later !');
      }
    }

    getAllCoaching();
  }, []);

  return (
    <Layout>
      <React.Fragment>
        {!loadCoachingData ? (
          <BannerSkeleton />
        ) : (
            <CoachingSlider sliderCoaching={isAllCoaching} />
          )}
        {!loadCoachingData ? (
          <ExamTypeSkeleton />
        ) : (
            <ExamType
              examType={isAllCoaching}
              handleAllData={handleAllData}
              handleExamType={handleExamType}
              activeTabClass={activeTabClass}
            />
          )}
        <CoachingList allCoaching={totalCoaching} />
        <Faq faqCoaching={isAllCoaching} addCoachingClass="coaching-faq" />
        <PopularCoaching popularCoachings={isAllCoaching} />
      </React.Fragment>

      <Toast isVisible={isVisible} toastMessage={toastMessage} />
      {isAllCoaching && isAllCoaching.coaching_page_seos.length > 0 && (
       
        <ReactMeta title={isAllCoaching?.coaching_page_seos[0]?.seoTitle} description={isAllCoaching?.coaching_page_seos[0]?.seoDesc} />
      )}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearTestInstruction: () => dispatch(clearTestInstruction()),
    clearSolutionData: () => dispatch(clearSolutionData()),
  };
};

export default connect(null, mapDispatchToProps)(Coaching);
