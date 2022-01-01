import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { BASE_URL } from './../../../config';
import Toast from '../Elements/Toast';
import Layout from '../../Core/Layout/Layout';
import PracticePass from './PracticePass';
import PracticePopular from './PracticePopular';
import PracticeTab from './PracticeTab';
import PracticeTypeAll from './PracticeTypeAll';
import PracticeTypeBanner from './PracticeTypeBanner';
import PracticeExamCategories from './PracticeExamCategories';
import { RATINGCHOICE, FAQDUMMY } from '../Global/Constant';
import Faq from '../Faq/Faq';
import BannerSkeleton from '../../../skeletons/BannerSkeleton';
import PassFilterSkeleton from '../../../skeletons/Pass/PassFilterSkeleton';
import PassCardSkeleton from './../../../skeletons/Pass/PassCardSkeleton';
import CardSkeleton from './../../../skeletons/CardSkeleton';
import FaqSkeleton from './../../../skeletons/FaqSkeleton';
import ReactMeta from '../../../utils/ReactMeta';
import PopularCoaching from './../Coaching/PopularCoaching';

export default function PracticeType() {
  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [practiceDetails, setPracticeDetails] = useState(null);

  const [searchKey, setSearchKey] = useState('');
  const [itemPerPage, setItemPerPage] = useState(8);
  const [practiceAllList, setPracticeAllByList] = useState(null);
  const [examType, setExamType] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [language, setLanguage] = useState('');
  const [coachingRating, setcoachingRating] = useState('');
  const [coachingSortBy, setcoachingSortBy] = useState('');
  const [practiceRating, setPracticeRating] = useState('');
  const [practiceSortBy, setPracticeSortBy] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState('practice');
  const [ratingSelected, setRatingSelected] = useState('');
  const [sortbySelected, setSortbySelected] = useState('');

  const [isAllCoaching, getIsAllCoaching] = useState(null);

  const history = useHistory();
  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 5000);
  };
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `${localStorage.token}`,
    },
  };
  useEffect(() => {
    const getAllPracticeDetails = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/practicePage/`, config);
        console.log(res)
        if (!res.data.data) {
          history.push('/coaching');
          return false;
        }
        if(res && res.data){
          setPracticeDetails(res.data.data);
         
        }
        setIsPageLoaded(true);
        
      } catch (error) {
        showErrorToast('Something went wrong. Please try again later !');
      }
    };

    async function getAllCoaching() {
      try {
        const res = await axios.get(`${BASE_URL}/coachingPage`);
        getIsAllCoaching(res.data.data);
      } catch (error) {
        showErrorToast('Something went wrong. Please try again later !');
      }
    }

    getAllCoaching();
    getAllPracticeDetails();
  }, []);



  const getPracticeAllList = async () => {
    const mainapi = `${BASE_URL}/practicePage/all_practices`;

    const payload = {
      search_key: searchKey,
      exam_type: examType,
      page: page,
      per_page: itemPerPage,
      language: language,
      coaching_rating: coachingRating,
      coaching_sort_by: coachingSortBy,
      practice_rating: practiceRating,
      practice_sort_by: practiceSortBy,
    };
    try {
      const res = await axios.post(mainapi, payload, config);
      if (!res.data.data) {
        showErrorToast('Something went wrong!');
        return false;
      }
      setPracticeAllByList(res.data.data);
      setTotalPage(Math.ceil(res.data.data.total_count / 8));
    } catch (error) {
      showErrorToast('Something went wrong. Please try again later !');
    }
  };
  useEffect(() => {
    getPracticeAllList();
  }, [
    examType,
    language,
    page,
    selectedSortBy,
    ratingSelected,
    sortbySelected,
    searchKey,
  ]);
  const handlePageClick = (page) => setPage(page.selected + 1);
  const filterExamType = (selectedValue) => setExamType(selectedValue);
  const filterLanguage = (selectedValue) => setLanguage(selectedValue);
  const searchByKeyword = (selectedValue) => setSearchKey(selectedValue);
  const respondChoice = (choice) => {
    setcoachingRating('');
    setcoachingSortBy('');
    setPracticeRating('');
    setPracticeSortBy('');
    if (RATINGCHOICE.PRACTICE == choice) {
      //setPracticeRating(ratingSelected);
      setRatingSelected("");
      setPracticeRating("");
    }
    if (RATINGCHOICE.COACHING == choice) {
      setRatingSelected("");
      setcoachingRating("");
      //setcoachingRating(ratingSelected);
    }
    setSortbySelected('');
    setSelectedSortBy(choice);
  };
  const respondRating = (rating) => {
    setcoachingRating('');
    setPracticeRating('');
    setRatingSelected(rating);
    if (RATINGCHOICE.PRACTICE == selectedSortBy) {
      setPracticeRating(rating);
      setPracticeSortBy(sortbySelected);
    }
    if (RATINGCHOICE.COACHING == selectedSortBy) {
      setcoachingRating(rating);
      setcoachingSortBy(sortbySelected);
    }
  };
  const respondSortBy = (sortBy) => {
    setcoachingSortBy('');
    setPracticeSortBy('');
    if (RATINGCHOICE.PRACTICE == selectedSortBy) {
      setPracticeRating(ratingSelected);
      setPracticeSortBy(sortBy);
    }
    if (RATINGCHOICE.COACHING == selectedSortBy) {
      setcoachingRating(ratingSelected);
      setcoachingSortBy(sortBy);
    }
    setSortbySelected(sortBy);
  };
  const startPractice = (item) => { history.push(`/practice-details/${item.practiceId}`) };
  const startPracticeAll = (item) => { history.push(`/practice-details/${item.id}`) };

  const popularCoachingList =
    practiceDetails?.practice_page_popular_coaching_lists;
  const practicePageFaqs = practiceDetails?.practice_page_faqs;
  const practiceSection = practiceDetails?.practice_page_practice_set_sections;
  const practiceExamType = practiceDetails?.practice_page_exam_types;
  const practicePassList = practiceDetails?.practice_page_pass_lists ||  [];
  console.log(practicePassList)
  const practiceAllExamType =
    practiceDetails?.practice_page_all_practices_exam_types;
  const practicePopuparExamType =
    practiceDetails?.practice_page_popular_coaching_exam_types;

  const practicePopuparExamCategories =
    practiceDetails?.practice_page_popular_exam_categories;

  return (
    <Layout>
      <React.Fragment>
        <div className="pass-wrapper practiceType">
          {!isPageLoaded ? <BannerSkeleton /> : <PracticeTypeBanner />}
          {!isPageLoaded ? (
            <div style={{ width: '900px', margin: 'auto', marginTop: '2rem' }}>
              <CardSkeleton />
            </div>
          ) : (
              <PracticeTab
                practiceSection={practiceSection}
                practiceExamType={practiceExamType}
                startPractice={startPractice}
              />
            )}
          {!isPageLoaded ? (
            <div style={{ width: '900px', margin: 'auto', marginTop: '2rem' }}>
              <CardSkeleton />
            </div>
          ) : (
              <PracticePopular
                itemCoaching={popularCoachingList}
                title={'Popular Coaching'}
                practicePopuparExamType={practicePopuparExamType}
              />
            )}

          {!isPageLoaded ? (
            <>
              <PassFilterSkeleton />
              <div
                style={{ width: '900px', margin: 'auto', marginTop: '2rem' }}>
                <CardSkeleton />
              </div>
            </>
          ) : (
              <PracticeTypeAll
                practiceAllList={practiceAllList}
                handlePageClick={handlePageClick}
                totalPage={totalPage}
                practiceAllExamType={practiceAllExamType}
                filterExamType={filterExamType}
                filterLanguage={filterLanguage}
                respondChoice={respondChoice}
                respondRating={respondRating}
                selectedSortBy={selectedSortBy}
                respondSortBy={respondSortBy}
                searchByKeyword={searchByKeyword}
                startPractice={startPractice}
                startPracticeAll={startPracticeAll}
              />
            )}
          {practicePassList ? (
            <PracticePass practicePassList={practicePassList} />
          ) : (
              <PassCardSkeleton />
            )}

          {!isPageLoaded ? (
            <div style={{ width: '1100px', margin: 'auto' }}>
              <FaqSkeleton />
            </div>
          ) : (
              <Faq faqCoaching={FAQDUMMY} addCoachingClass="coaching-faq" faqs={practicePageFaqs} />
            )}


          {!isPageLoaded ? (
            <div style={{ width: '1100px', margin: 'auto' }}>
              <CardSkeleton />
            </div>
          ) : (
              <PracticeExamCategories popularCoachings={practicePopuparExamCategories} />
            )}


        </div>
        <Toast isVisible={isVisible} toastMessage={toastMessage} />

        {practiceDetails && practiceDetails.practice_page_seos.length > 0 && (
          <ReactMeta title={practiceDetails.practice_page_seos[0]?.seoTitle} description={practiceDetails.practice_page_seos[0]?.seoDesc} />
        )}
      </React.Fragment>
    </Layout>
  );
}
