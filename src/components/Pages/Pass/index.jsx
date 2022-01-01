import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { BASE_URL } from './../../../config';
import Toast from '../Elements/Toast';
import Layout from '../../Core/Layout/Layout';
import { FAQDUMMY } from '../Global/Constant';

import PassBanner from './PassBanner';
import PassFilter from './PassFilter';
import PassSlider from './PassSlider';
import PassBodyContent from './PassBodyContent';
import PassFeatures from './PassFeatures';
import HowItWordks from './HowItWordks';
import PassPromoCard from './PassPromoCard';
import PassTestimonials from './PassTestimonials';
import PassQuestion from './PassQuestion';
import PassPopular from './PassPopular';
import BannerSkeleton from './../../../skeletons/BannerSkeleton';
import PassFilterSkeleton from './../../../skeletons/Pass/PassFilterSkeleton';
import PassCardSkeleton from './../../../skeletons/Pass/PassCardSkeleton';
import CardSkeleton from './../../../skeletons/CardSkeleton';
import ReactMeta from '../../../utils/ReactMeta';
import Faq from '../Faq/Faq';
import PassGotAQuestion from './PassGotAQuestion';
import FaqSkeleton from './../../../skeletons/FaqSkeleton';



export default function Pass() {
  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(true);
  const [passDetails, setPassDetails] = useState(null);
  const [setExam, setExamType] = useState('');
  const [setPass, setPassType] = useState('');
  const [totalQuestion, setTotalQuestion] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [rating, setRating] = useState('');
  const [selectedCoaching, setCoaching] = useState('');
  const [resetFilter, setResetFilter] = useState(false);
  const [passSearchDetails, setPassSearchDetails] = useState('');

  const [toggle, setToggle] = useState(false);

  const toggleSection = () => {
    setToggle(!toggle);
  };

  // For wireframe loader
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 5000);
  };

  const getPassDetails = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/passPage`);
      if (!res.data.data) {
        history.push('/coaching');
        return false;
      }
      setPassDetails(res.data.data);
      setPassSearchDetails(res.data.data);
      setIsPageLoaded(true);
    } catch (error) {
      showErrorToast('Something went wrong. Please try again later !');
    }
  };
  useEffect(() => {
    getPassDetails();
    setLoading(true);
    const timing = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timing);
  }, []);
  const getSearchDetails = async (payload) => {
    console.log('resetFilter', resetFilter);
    const mainapi = `${BASE_URL}/passPage/pass_search`;
    // const payload = {
    //   coaching_id: selectedCoaching,
    //   coaching_rating: rating,
    //   exam_types: setExam,
    //   pass_type: setPass,
    //   all_test: totalQuestion,
    //   sort_by: sortBy
    // };
    try {
      const res = await axios.post(mainapi, payload);
      if (!res.data.data) {
        console.log('NO DATA');
      }
      console.log('res.data.data', res.data.data);
      setPassSearchDetails(res.data.data);
      setIsPageLoaded(true);
    } catch (error) {
      showErrorToast('Something went wrong. Please try again later !');
    }
  };

  const examTypeList = passDetails?.pass_page_exam_types;
  const passTypeList = passDetails?.pass_page_pass_types;
  const recommendedPass = passDetails?.passPageRecomendedPass;
  const popularCoachingList = passDetails?.passPagePopularCoaching;
  const studentTestimonial = passDetails?.passPageTestimonial;
  const passPageFaqs = passDetails?.passPageFaqs;
  const searchPassList = passSearchDetails?.passPagePassSearchList;
  const searchSimilarPassList =
    passSearchDetails?.passPageSimilarPassFromDifferentCoachingList;

  const passSeo = passDetails?.pass_page_seos[0];

  const filterExamType = (selectedValue) => setExamType(selectedValue);
  const filterPassType = (selectedValue) => setPassType(selectedValue);
  const filterTotalQuestion = (selectedValue) =>
    setTotalQuestion(selectedValue);
  const filterSortBy = (selectedValue) => setSortBy(selectedValue);
  const filterRating = (selectedValue) => setRating(selectedValue);
  const filterCoaching = (selectedValue) => setCoaching(selectedValue);
  const resetFilterAll = () => {
    setResetFilter(true);
    setExamType('');
    setPassType('');
    setTotalQuestion('');
    setSortBy('');
    setRating('');
    setCoaching('');
    const payload = {
      coaching_id: '',
      coaching_rating: '',
      exam_types: '',
      pass_type: '',
      all_test: '',
      sort_by: '',
    };
    // getSearchDetails(payload);
    window.location.reload();
  };
  const filterPass = () => {
    const payload = {
      coaching_id: selectedCoaching,
      coaching_rating: rating,
      exam_types: setExam==='0'?'':setExam,
      pass_type: setPass==='0'?'':setPass,
      all_test: totalQuestion==='0'?'':totalQuestion,
      sort_by: sortBy==='0'?'':sortBy,
    };
    getSearchDetails(payload);
  };
  // console.log('passSearchDetails', passSearchDetails);
  // console.log('passDetails', passDetails);

  return (
    <Layout>
 

      {passSeo !== undefined ? (
       <ReactMeta title={passSeo?.seoTitle} description={passSeo?.seoDesc} />
      ) : (
          ''
        )}

      {!isPageLoaded ? (
        <div style={{ minHeight: '100vh' }}>
          <Loader
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            type="Oval"
            color="#FF7249"
            height={100}
            width={100}
           
          />
        </div>
      ) : (
        <React.Fragment>
          <div className="pass-wrapper">
            {loading ? (
              <BannerSkeleton />
            ) : (
              <PassBanner
                recommendedPass={recommendedPass}
                searchPassList={searchPassList}
              />
            )}
            {loading ? (
              <PassFilterSkeleton />
            ) : (
              <PassFilter
                examTypeList={examTypeList}
                passTypeList={passTypeList}
                filterExamType={filterExamType}
                filterPassType={filterPassType}
                filterTotalQuestion={filterTotalQuestion}
                filterSortBy={filterSortBy}
                filterRating={filterRating}
                filterCoaching={filterCoaching}
                filterPass={filterPass}
                resetFilter={resetFilter}
                resetFilterAll={resetFilterAll}
              />
            )}
            {!loading ? (
              <PassSlider
                recommendedPass={recommendedPass}
                searchPassList={searchPassList}
                toggleSection={toggleSection}
                toggle={toggle}
              />
            ) : (
              <PassCardSkeleton />
            )}

            {searchSimilarPassList && toggle && (
              <PassBodyContent searchSimilarPassList={searchSimilarPassList} />
            )}
            <PassFeatures />
            <HowItWordks />
            {/* <PassPromoCard /> */}
            {studentTestimonial && !loading ? (
              <PassTestimonials studentTestimonial={studentTestimonial} />
            ) : (
              <BannerSkeleton />
            )}
            <PassGotAQuestion />
            {!isPageLoaded ? (
              <div style={{ width: '1100px', margin: 'auto' }}>
                <FaqSkeleton />
              </div>
            ) : (
              <Faq
              
                addCoachingClass="coaching-faq"
                faqs={passPageFaqs}
              />
            )}
            {/* <PassQuestion /> */}
            {popularCoachingList && !loading ? (
              <PassPopular
                itemCoaching={popularCoachingList}
                title={'Popular Coaching'}
                //practicePopuparExamType={practicePopuparExamType}
              />
            ) : (
              <div
                style={{ width: '900px', margin: 'auto', paddingTop: '2rem' }}>
                <CardSkeleton />
              </div>
            )}
          </div>
          <Toast isVisible={isVisible} toastMessage={toastMessage} />
          {passDetails && passDetails?.pass_page_seos?.length > 0 && (
            <ReactMeta data={passDetails.pass_page_seos[0].seoDesc} />
          )}
        </React.Fragment>
      )}
    </Layout>
  );
}
