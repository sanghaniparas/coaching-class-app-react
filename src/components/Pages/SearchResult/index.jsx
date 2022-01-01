import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import Layout from '../../Core/Layout/Layout';
import SearchMain from './SearchMain';
import SearchSidebar from './SearchSidebar';
import axios from 'axios';
import Toast from '../Elements/Toast';
import { BASE_URL } from './../../../config';
import {fetchSearchData} from '../../../redux/actions/global';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router'; //import Redirect

const SearchPage = ({searchData, fetchSearchData, keywords}) => {
  const history = useHistory()
  const [toastMessage, setToastMessage] = useState(null);
  const [serachKeyword, setSerachKeyword] = useState('');
  const [totalSearchResult, setTotalSearchResult] = useState(0);
  const [isVisible, toggleIsVisible] = useState(false);  
  const [searchHistoryData, setSearchHistoryData] = useState('');
  const [searchCoachingData, setSearchCoachingData] = useState('');
  const [searchQuizData, setSearchQuizData] = useState('');
  const [searchPracticeData, setSearchPracticeData] = useState('');
  const [searchTestPackageData, setSearchTestPackageData] = useState('');
  const [isRedirect, setIsRedirect]  = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [reset, setReset] = useState(false);
  const location = useLocation();
  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 5000);
  };
 

   console.log(searchData)


   console.log(keywords)



   console.log(fetchSearchData)

console.log(localStorage.getItem('serachResults'))
  useEffect(() => {
    if(serachKeyword!=='' && serachKeyword!==localStorage.getItem('serachResults')) {
      fetchSearchData(localStorage.getItem('serachResults'));
    }
  },[localStorage.getItem('serachResults')]);
  useEffect(() => {
    if(Object.keys(searchData).length !== 0){
      let totalSearch = (searchData?.coaching_search_data.length+searchData?.quiz_search_data.length+searchData?.practice_set_search_data.length+searchData?.test_package_search_data.length);
      setTotalSearchResult(totalSearch);
    }else{
      setTotalSearchResult(0);
    }  
    

    setSearchCoachingData(searchData?.coaching_search_data);
    setSearchHistoryData(searchData?.search_histry_data);
    setSearchQuizData(searchData?.quiz_search_data);
    setSearchPracticeData(searchData?.practice_set_search_data);
    setSearchTestPackageData(searchData?.test_package_search_data);
    setSerachKeyword(localStorage.getItem('serachResults') || keywords);
    setReset(true);
    
    // const getSearchData = async() => {
    //   try {
    //     const config = {
    //       headers: {
    //         'Content-Type': 'Application/json',
    //         Authorization: `${localStorage.token}`,
    //       },
    //     };
    //     const res = await axios.post(
    //       `${BASE_URL}/search/all-search-result`,
    //       {search_key: location.state.searchKeywords},
    //       config
    //     );
    //     if (!res.data.data) {
    //       showErrorToast('No Data Available !');
    //       return false;
    //     }     
    //     console.log('DATA', res.data);
    //     setSearchCoachingData(res?.data?.data?.coaching_search_data);
    //     setSearchHistoryData(res?.data?.data?.search_histry_data);
    //     setSearchQuizData(res?.data?.data?.quiz_search_data);
    //     setSearchPracticeData(res?.data?.data?.practice_set_search_data);
    //     setSearchTestPackageData(res?.data?.data?.test_package_search_data);
    //     setIsPageLoaded(true);
    //   } catch (error) {
    //     showErrorToast('Something went wrong. Please try again later !');
    //   }
    // }
    //getSearchData();
  }, [searchData]);
  const getRelatedResult = (event) => {
    fetchSearchData(event.target.id);    
  }
  const setResetFalse = () => setReset(false);
  return (
    <Layout>
        {isRedirect && <Redirect push to="/searchpage" />}
        {!searchData ? (
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
            timeout={3000} //3 secs
          />
        </div>
        ) : (
          <React.Fragment>
            <div className="search-wrapper">
              <div className="search-header">
              {serachKeyword && <h2>{totalSearchResult} results for <strong>"{serachKeyword}"</strong></h2>}
              </div>
              <div className="search-body">
                <SearchSidebar searchHistoryData={searchHistoryData} getRelatedResult={getRelatedResult}/>
                <SearchMain 
                  searchCoachingData={searchCoachingData}
                  searchQuizData={searchQuizData}
                  searchPracticeData={searchPracticeData}
                  searchTestPackageData={searchTestPackageData}
                  reset={reset}
                  setReset={setResetFalse}
                />
              </div>
            </div>
          </React.Fragment>
      )}
      <Toast isVisible={isVisible} toastMessage={toastMessage} />
    </Layout>
  )
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
   // loading: state.exam.loading,
    searchData: state.global.searchData,
    keywords: state.global.keywords,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchData: (keywords) => dispatch(fetchSearchData(localStorage.getItem('serachResults')))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);