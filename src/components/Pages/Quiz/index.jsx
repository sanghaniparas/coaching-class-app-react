import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Toast from '../Elements/Toast';
import { BASE_URL } from './../../../config';
import Layout from '../../Core/Layout/Layout';
import QuizBanner from './QuizBanner';
import QuizListContainer from './QuizListContainer';
import QuizSidebar from './QuizSidebar';
import { RATINGCHOICE } from '../Global/Constant';
import BannerSkeleton from '../../../skeletons/BannerSkeleton';
import SideBarSkeleton from './../../../skeletons/Quiz/SideBarSkeleton';
import PassFilterSkeleton from './../../../skeletons/Pass/PassFilterSkeleton';
import CardSkeleton from '../../../skeletons/CardSkeleton';
import ReactMeta from '../../../utils/ReactMeta';

export default function QuizListing() {
  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);
  const [examTypeListing, setExamTypeListing] = useState(null);
  const [examNameListing, setExamNameListing] = useState([]);
  const [examNameListingOg, setExamNameListingOg] = useState([]);
  const [subjectListing, setSubjectListing] = useState(null);
  const [quizListing, setQuizListing] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [examType, setExamType] = useState('');
  const [subject, setSubject] = useState('');
  const [page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(6);
  const [language, setLanguage] = useState(0);
  const [coachingRating, setcoachingRating] = useState('');
  const [coachingSortBy, setcoachingSortBy] = useState('');
  const [quizRating, setquizRating] = useState('');
  const [quizSortBy, setquizSortBy] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState('quiz');
  const [ratingSelected, setRatingSelected] = useState('');
  const [sortbySelected, setSortbySelected] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const history = useHistory();


  useEffect(() => {
      localStorage.removeItem('quizquestions');
      localStorage.removeItem('QuizTime');
      localStorage.removeItem('pTime');
  }, []);


  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 5000);
  };

  // QUIZ Filter Toggle
  const [quizfilter, setquizfilter] = useState(false);
  const filterToggle = () => {
    setquizfilter(!quizfilter);
  };
  const filterClose = () => {
    setquizfilter(false);
  };
  useEffect(() => {
    const getQuizSideFilterMenuData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/quizPage/`);
        if (!res.data.data) {
          history.push('/coaching');
          return false;
        }
        let examNameArrayList = [];
        if(res.data.data) {
          res.data.data.quiz_page_exam_types.map(examTypesData => {
            examTypesData.examNames.map(examNameData => {
              examNameArrayList.push(examNameData);
            })
          })
        }
        setExamTypeListing(res.data.data?.quiz_page_exam_types);
        setSubjectListing(res.data.data?.quiz_page_subjects);
        setExamNameListing(examNameArrayList);
        setExamNameListingOg(examNameArrayList);
        setIsPageLoaded(true);
      } catch (error) {
        showErrorToast('Something went wrong. Please try again later !');
      }
    };
    getQuizSideFilterMenuData();
  }, []);
  const getAllQuizListing = async () => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
         Authorization: `${localStorage.token}`,
      },
    };
    // setQuizListing(null);
    const mainapi = `${BASE_URL}/quizPage/all_quizzes`;
    const payload = {
      search_key: searchKey,
      exam_type: examType,
      subject: subject,
      page: page,
      per_page: itemPerPage,
      language: language==='0'?'':language,
      ratingType: selectedSortBy,
      coaching_rating: coachingRating,
      coaching_sort_by: coachingSortBy,
      quiz_rating: quizRating,
      quiz_sort_by: quizSortBy,
    };
    try {
      const res = await axios.post(mainapi, payload,config);
      if (!res.data.data) {
        history.push('/coaching');
        return false;
      }
      setQuizListing(res.data.data);
      setTotalPage(Math.ceil(res.data.data.total_count / itemPerPage));
      setIsPageLoaded(true);
      
    } catch (error) {
      showErrorToast('Something went wrong. Please try again later !');
    }
  };
  useEffect(() => {
    getAllQuizListing();
  }, [
    subject,
    examType,
    language,
    page,
    selectedSortBy,
    ratingSelected,
    sortbySelected,
    searchKey,
  ]);

  const selectedSubject = (event) => {
    setTotalPage(0);
    handlePageClick({selected: 0});
    setSubject(event.target.id)
  };
  // const filterLanguage = (selectedValue) => setLanguage(selectedValue);
  const filterLanguage = (selectedValue) => {
    setTotalPage(0);
    handlePageClick({selected: 0});
    setLanguage(selectedValue)
  };
  const filterExamType = (selectedValue) => {
    let rearrangeExamTypeArray = [];
    if(selectedValue==='') {
      rearrangeExamTypeArray = examNameListingOg;
    } else {
      let splitValue = selectedValue.split(',');
      splitValue.map(splitData => {
        examNameListingOg.map(examData => {
          if(examData.examTypeId === parseInt(splitData)) {
            rearrangeExamTypeArray.push(examData);
          }
        })
      })
    }
    setExamNameListing(rearrangeExamTypeArray);
    setTotalPage(0);
    handlePageClick({selected: 0});
    setExamType(selectedValue)
  };
  const filterExamName = (selectedValue) => {
    console.log('Selected Value ==> ', selectedValue);
  }
  const handlePageClick = (page) => {
    setPage(page.selected + 1)
  };
  const searchByKeyword = (selectedValue) => {
    setTotalPage(0);
    handlePageClick({selected: 0});
    setSearchKey(selectedValue)
  };
  const respondChoice = (choice) => {
    setTotalPage(0);
    handlePageClick({selected: 0});
    setcoachingRating('');
    setcoachingSortBy('');
    setquizRating('');
    setquizSortBy('');
    // if (RATINGCHOICE.QUIZ == choice) {
    //   setquizRating(ratingSelected);
    // }
    // if (RATINGCHOICE.COACHING == choice) {
    //   setcoachingRating(ratingSelected);
    // }
    setSortbySelected('');
    setSelectedSortBy(choice);
  };
  const respondRating = (rating) => {
    setTotalPage(0);
    handlePageClick({selected: 0});
    setcoachingRating('');
    setquizRating('');
    setRatingSelected(rating);
    if (RATINGCHOICE.QUIZ == selectedSortBy) {
      setquizRating(rating);
      setquizSortBy(sortbySelected);
    }
    if (RATINGCHOICE.COACHING == selectedSortBy) {
      setcoachingRating(rating);
      setcoachingSortBy(sortbySelected);
    }
  };
  const respondSortBy = (sortBy) => {
    setTotalPage(0);
    handlePageClick({selected: 0});
    setcoachingSortBy('');
    setquizSortBy('');
    if (RATINGCHOICE.QUIZ == selectedSortBy) {
      setquizRating(ratingSelected);
      setquizSortBy(sortBy);
    }
    if (RATINGCHOICE.COACHING == selectedSortBy) {
      setcoachingRating(ratingSelected);
      setcoachingSortBy(sortBy);
    }
    setSortbySelected(sortBy);
  };
  return (
    <Layout>
      <React.Fragment>
        <div className="pass-wrapper quiz-listing-wrapper">
          {!isPageLoaded ? <BannerSkeleton /> : <QuizBanner />}
          <div className={`quiz-body-wrapper ${quizfilter ? 'open' : ''}`}>
            {!isPageLoaded ? (
              <SideBarSkeleton />
            ) : (
              <QuizSidebar
                examTypeListing={examTypeListing}
                examNameListing={examNameListing}
                subjectListing={subjectListing}
                selectedSubject={selectedSubject}
                filterExamType={filterExamType}
                filterExamName={filterExamName}
                filterClose={filterClose}
              />
            )}
            {!!quizListing ? (
              <QuizListContainer
                quizListing={quizListing}
                filterLanguage={filterLanguage}
                handlePageClick={handlePageClick}
                totalPage={totalPage}
                respondChoice={respondChoice}
                respondRating={respondRating}
                selectedSortBy={selectedSortBy}
                respondSortBy={respondSortBy}
                searchByKeyword={searchByKeyword}
                filterToggle={filterToggle}
              />
            ) : (
              <>
                <div
                  style={{ width: '900px', margin: 'auto', marginTop: '2rem' }}>
                  <div style={{ marginBottom: '2rem' }}>
                    <PassFilterSkeleton />
                  </div>
                  <CardSkeleton />
                </div>
              </>
            )}
          </div>
        </div>
      </React.Fragment>

      <Toast isVisible={isVisible} toastMessage={toastMessage} />
      <ReactMeta data={'Quiz Page Description'} />
    </Layout>
  );
}
