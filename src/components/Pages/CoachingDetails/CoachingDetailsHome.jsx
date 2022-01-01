import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Toast from '../Elements/Toast';
import Trending from './Trending';
import MostAttempted from './MostAttempted';
import HighestRate from './HighestRate';
import CoachingDetailsAllExam from './CoachingDetailsAllExam';
import { BASE_URL } from './../../../config';
import CardSkeleton from './../../../skeletons/CardSkeleton';
import Loader from 'react-loader-spinner';

export default function CoachingDetailsHome({
  idTab,
  homePage,
  handleWishlist,
  wishList,
  pageDetails,
}) {
  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);
  const [isSubTab, setIsSubTab] = useState('trending');
  const [dataList, setDataList] = useState(null);
  const [isTrue, setIsTrue] = useState(true);

  const [loading, setLoading] = useState(false);


  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 5000);
  };

  const getAllHomeCoaching = async (payloadType = 'trending', examId = '') => {

    //  if()

    try {
      setLoading(true);
      const mainapi = `${BASE_URL}/coaching/calculatedArea`;
      const payload = {
        coachingId: idTab,
        type: payloadType,
        examTypeId: examId,
      };
      const res = await axios.post(mainapi, payload);
      
      


      setDataList(res.data.data);
      setIsTrue(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showErrorToast('Something went wrong. Please try again later !');
    }
  };

  const handleTrending = () => {
    getAllHomeCoaching('trending');
    setIsSubTab('trending');
  };
  const handleHighestrate = () => {
    getAllHomeCoaching('highestRated');
    setIsSubTab('highestRated');
  };
  const handleMostattempted = () => {
    getAllHomeCoaching('mostAttempted');
    setIsSubTab('mostAttempted');
  };

  const filterChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    getAllHomeCoaching(undefined, e.target.value);
  };

  useEffect(() => {
    console.log('home', homePage);
    getAllHomeCoaching();
    window.scrollTo(0, 0);
  }, []);











  

  return (

    loading ?   <div style={{ minHeight: '100vh' }}>
    <Loader
      style={{
        position: 'absolute',
        top: '90%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      type="Oval"
      color="#FF7249"
      height={40}
      width={40}
    />
  </div> :
    <React.Fragment> 
   
      <React.Fragment>
        <div className="a-wrapper">
          <div className="a-select-choices">
            <div className="a-container">
              {dataList && dataList.length > 0 &&
              <div className="a-content">
                <ul>
                  <li
                    className={isSubTab === 'trending' ? 'active' : ''}
                    onClick={() => handleTrending()}>
                    Trending
                  </li>
                  <li
                    className={isSubTab === 'highestRated' ? 'active' : ''}
                    onClick={() => handleHighestrate()}>
                    Highest Rated
                  </li>
                  <li
                    className={isSubTab === 'mostAttempted' ? 'active' : ''}
                    onClick={() => handleMostattempted()}>
                    Most Attempted
                  </li>
                </ul>
                <div className="filter-group">
                  <p>Filter By </p>
                  <select name="" id="" onChange={(e) => filterChange(e)}>
                    <option value="">All</option>
                    {pageDetails?.examTypes?.map((el, idx) => (
                      <option key={idx} value={el.id}>
                        {el.examType}
                      </option>
                    ))}
                  </select>
                </div>
              </div>}
            </div>
          </div>
        </div>
        {homePage.length > 0 || (dataList && dataList.length > 0) ? (
          <>
            <div className="a-fullWidth-area details-filter-card">
              {isSubTab === 'trending' && !isTrue && (
                <>
                  <Trending pageDetails={pageDetails} trandList={dataList} />
                </>
              )}
              {isSubTab === 'highestRated' && !isTrue && (
                <HighestRate
                  pageDetails={pageDetails}
                  highestRateList={dataList}
                />
              )}
              {isSubTab === 'mostAttempted' && !isTrue && (
                <MostAttempted
                  pageDetails={pageDetails}
                  mostAttempedList={dataList}
                />
              )}
            </div>
            
            <CoachingDetailsAllExam
              dataPage={homePage}
              handleWishlist={handleWishlist}
              wishList={wishList}
              pageDetails={pageDetails}
            />
          </>
        ) : (
            <div>
              {/* <CardSkeleton /> */}
              <div className="a-nodata-Content">No Data  Available</div>
            </div>
          )}
      </React.Fragment>

      <Toast isVisible={isVisible} toastMessage={toastMessage} />

    </React.Fragment>
  
  );
}
