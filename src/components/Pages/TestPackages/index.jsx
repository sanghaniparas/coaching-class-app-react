import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { BASE_URL } from './../../../config';
import Toast from '../Elements/Toast';
import Layout from '../../Core/Layout/Layout';
import AllTestPackages from './AllTestPackages';
import TestBanner from './TestBanner';
import TestFilter from './TestFilter';
import TestpackagesFilterwise from './TestpackagesFilterwise';
import TestPassSlider from './TestPassSlider';
import { RATINGCHOICE, FAQDUMMY } from '../Global/Constant';
import Faq from '../Faq/Faq';
import BannerSkeleton from './../../../skeletons/BannerSkeleton';
import PassFilterSkeleton from './../../../skeletons/Pass/PassFilterSkeleton';
import CardSkeleton from './../../../skeletons/CardSkeleton';
import FaqSkeleton from '../../../skeletons/FaqSkeleton';
import ReactMeta from '../../../utils/ReactMeta';

import CoachingItem from '../Coaching/CoachingItem';

export default function TestPackages() {
  const [isAllCoaching, getIsAllCoaching] = useState(null);
  const [totalCoaching, setTotalCoaching] = useState(null);

  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [examTypeList, setexamTypeList] = useState(null);

  const [packagePassList, setPackagePassList] = useState(null);
  const [packageAllList, setPackageAllByList] = useState(null);
  const [packageBySelection, setPackageBySelection] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(8);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchKey, setSearchKey] = useState('');
  const [packageSeclection, setPackageselection] = useState(1);
  const [language, setLanguage] = useState(1);
  const [price, setPrice] = useState(2);
  const [examType, setExamType] = useState('');
  const [examPackageType, setPackageExamType] = useState('');
  const [coachingRating, setcoachingRating] = useState('');
  const [coachingSortBy, setcoachingSortBy] = useState('');
  const [packageRating, setPackageRating] = useState('');
  const [packageSortBy, setPackageSortBy] = useState(2);
  const [selectedSortBy, setSelectedSortBy] = useState('package');
  const [ratingSelected, setRatingSelected] = useState('');
  const [sortbySelected, setSortbySelected] = useState('');
  const [totalTestPackege, setTotalTestPackege] = useState(0);

  const history = useHistory();
  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 5000);
  };

  useEffect(() => {
    async function getAllCoaching() {
      try {
        const res = await axios.get(`${BASE_URL}/coachingPage`);
        getIsAllCoaching(res.data.data);
        const coachingData = res.data.data.coachingPageCoachingSection;

        const coachingItemList = coachingData.filter(
          (el) => el.sectionName === 'Popular'
        );

        setTotalCoaching(coachingItemList);
      } catch (error) {
        showErrorToast('Something went wrong. Please try again later !');
      }
    }

    getAllCoaching();
  }, []);

  useEffect(() => {
    const getExamTypeList = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/testpackagePage`);
        if (!res.data.data) {
          history.push('/coaching');
          return false;
        }
        setexamTypeList(res.data.data);
        setIsPageLoaded(true);
      } catch (error) {
        showErrorToast('Something went wrong. Please try again later !');
      }
    };
    const getPassList = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/testpackagePage/pass_list`);
        if (!res.data.data) {
          showErrorToast('Something went wrong. Please try again later !');
          return false;
        }
        setPackagePassList(res.data.data);
      } catch (error) {
        showErrorToast('Something went wrong. Please try again later !');
      }
    };
    getExamTypeList();
    getPassList();
  }, []);

  const getPackageList = async () => {
    const mainapi = `${BASE_URL}/testpackagePage/test_package_sorting`;
    const payload = {
      exam_type: examPackageType,
      package_sort_by: packageSeclection,
    };
    try {
      const res = await axios.post(mainapi, payload);
      if (!res.data.data) {
        showErrorToast('Something went wrong. Please try again later !');
        return false;
      }
      setPackageBySelection(res.data.data);
    } catch (error) {
      showErrorToast('Something went wrong. Please try again later !');
    }
  };
  useEffect(() => {
    getPackageList();
  }, [examPackageType, packageSeclection]);

  const getPackageAllList = async () => {
    const mainapi = `${BASE_URL}/testpackagePage/all_test_packages`;
    const payload = {
      search_key: searchKey,
      exam_type: examType,
      page: page,
      per_page: itemPerPage,
      price_sort_by: price,
      coaching_rating: coachingRating,
      coaching_sort_by: coachingSortBy,
      package_rating: packageRating,
      package_sort_by: packageSortBy,
      language: language,
    };
    try {
      const res = await axios.post(mainapi, payload);
      if (!res.data.data) {
        showErrorToast('Something went wrong!');
        return false;
      }
      setPackageAllByList(res.data.data.all_test_packages);
      setTotalPage(Math.ceil(res.data.data.total_count / 8));
      setTotalTestPackege(res.data.data.total_count);
    } catch (error) {
      showErrorToast('Something went wrong. Please try again later !');
    }
  };
  useEffect(() => {
    getPackageAllList();
  }, [
    examType,
    language,
    page,
    selectedSortBy,
    ratingSelected,
    sortbySelected,
    price,
    searchKey,
  ]);

  const handlePageClick = (page) => setPage(page.selected + 1);
  const filterLanguage = (selectedValue) => setLanguage(selectedValue);
  const filterPrice = (selectedValue) => setPrice(selectedValue);
  const filterExamType = (selectedValue) => setExamType(selectedValue);
  const setPackageExaxType = (selectedValue) =>
    setPackageExamType(selectedValue);
  const searchByKeyword = (selectedValue) => setSearchKey(selectedValue);
  const selectedPackageSection = (selectedValue) =>
    setPackageselection(selectedValue);

  const respondChoice = (choice) => {
    setcoachingRating('');
    setcoachingSortBy('');
    setPackageRating('');
    setPackageSortBy('');
    if (RATINGCHOICE.PACKAGE == choice) {
      setPackageRating('');
      setPackageSortBy(2);
    }
    if (RATINGCHOICE.COACHING == choice) {
      setcoachingRating('');
      setcoachingSortBy(3);
    }
    setSortbySelected('');
    setSelectedSortBy(choice);
  };

  const respondRating = (rating) => {
    setcoachingRating('');
    setPackageRating('');
    setRatingSelected(rating);
    if (RATINGCHOICE.PACKAGE == selectedSortBy) {
      setPackageRating(rating);
      setPackageSortBy(sortbySelected || 2);
    }
    if (RATINGCHOICE.COACHING == selectedSortBy) {
      setcoachingRating(rating);
      setcoachingSortBy(sortbySelected || 3);
    }
  };
  const respondSortBy = (sortBy) => {
    setcoachingSortBy('');
    setPackageSortBy('');

    if (RATINGCHOICE.PACKAGE == selectedSortBy) {
      setPackageRating(ratingSelected);
      setPackageSortBy(sortBy);
    }
    if (RATINGCHOICE.COACHING == selectedSortBy) {
      setcoachingRating(ratingSelected);
      setcoachingSortBy(sortBy);
    }
    setSortbySelected(sortBy);
  };

  const packageAllExamType = examTypeList?.all_exam_types;

console.log(packageAllExamType)

  return (
    <Layout>
      <React.Fragment>
        <div className="pass-wrapper testpackages">
          {!isPageLoaded ? (
            <BannerSkeleton />
          ) : (
            <TestBanner totalTestPackege={totalTestPackege} />
          )}
          {!isPageLoaded ? (
            <PassFilterSkeleton />
          ) : (
            <TestFilter
              packageAllExamType={packageAllExamType}
              filterLanguage={filterLanguage}
              filterPrice={filterPrice}
              filterExamType={filterExamType}
              respondChoice={respondChoice}
              respondRating={respondRating}
              searchByKeyword={searchByKeyword}
              totalTestPackege={totalTestPackege}
            />
          )}
          {!isPageLoaded ? (
            <div style={{ width: '900px', margin: 'auto', marginTop: '2rem' }}>
              <CardSkeleton />
            </div>
          ) : (
            <AllTestPackages
              respondSortBy={respondSortBy}
              selectedSortBy={selectedSortBy}
              handlePageClick={handlePageClick}
              totalPage={totalPage}
              packageAllList={packageAllList}
              totalTestPackege={totalTestPackege}
            />
          )}
          {!isPageLoaded ? (
            <div style={{ width: '900px', margin: 'auto', marginTop: '2rem' }}>
              <CardSkeleton />
            </div>
          ) : (
            <TestpackagesFilterwise
              setPackageExaxType={setPackageExaxType}
              packageAllExamType={packageAllExamType}
              selectedPackageSection={selectedPackageSection}
              packageBySelection={packageBySelection}
            />
          )}
          {/* {packagePassList && (
            <TestPassSlider packagePassList={packagePassList} />
          )} */}
          {!isPageLoaded ? (
            <div style={{ width: '1100px', margin: 'auto' }}>
              <FaqSkeleton />
            </div>
          ) : (
            <Faq faqCoaching={FAQDUMMY} addCoachingClass="coaching-faq" />
          )}

          <div className="a-coaching-list-cover">
            {totalCoaching !== null
              ? totalCoaching.map((item, idx) => {
                  return (
                    <React.Fragment key={idx}>
                      {item && (
                        <CoachingItem
                          itemCoaching={item.coachings}
                          title={item.sectionName}
                        />
                      )}
                    </React.Fragment>
                  );
                })
              : null}
          </div>
        </div>
        <Toast isVisible={isVisible} toastMessage={toastMessage} />
        <ReactMeta data={'Quiz page description'} />
      </React.Fragment>
    </Layout>
  );
}
