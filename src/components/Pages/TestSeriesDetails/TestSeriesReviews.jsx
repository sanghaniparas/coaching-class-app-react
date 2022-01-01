import React, { useEffect, useState } from 'react';
import {
  AggregateReview,
  LineArrow,
  TestAppearing,
  TotalNumberReview,
} from '../../Core/Layout/Icon';
import { BASE_URL } from './../../../config';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Modal } from '../../Core/Layout/Modal/Modal';
import ProductReviewModal from './ProductReviewModal';
import TestDetailsReviewSkeleton from './../../../skeletons/TestDetails/TestDetailsReviewSkeleton';
import { ToastProvider, useToasts } from 'react-toast-notifications';


const TestSeriesReviews = ({ match, testDetails }) => {
  const [data, setData] = useState(null);
  const [modalToggle, setmodalToggle] = useState(false);
  const { addToast } = useToasts();

  const addnotification=()=>{
    return  addToast('Please login to submit a review', {
      appearance: 'error',
      autoDismissTimeout: 4000,
      autoDismiss: true,
    });
  }
  const fetchReviews = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(
        `${BASE_URL}/testPackage/reviewDetails/${match.params.id}`
      );

      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);


  const ratingModalHandler = () => {
    setmodalToggle(!modalToggle);
  };

  const modalCloseHandler = () => {
    setmodalToggle(false);
   
  };

  return data !== null ? (
    <div className="testseries-reviews">
      <h2>Reviews</h2>

      
       
        {testDetails?.existReview === 0 && (
          <p className="coaching-review" onClick={ratingModalHandler}>
            Rate This Package{'>>'}
          </p>
        )}
        {testDetails?.existReview !== 0 && (
          <p className="coaching-review" onClick={addnotification}>Rate This Package</p>
        )}
     



      <div className="card">
        <ul className="review-top-items">
          <li>
            <span className="review-icon">
              <TotalNumberReview />
            </span>
            <div className="review-info">
              <h2>{data.packageReviewCount}</h2>
              <p>Total Number of Reviews</p>
            </div>
          </li>
          <li>
            <span className="review-icon">
              <AggregateReview />
            </span>
            <div className="review-info">
              <h2>{data.packageAverageRating.toFixed(2)}</h2>
              <p>Aggregate Review Score</p>
            </div>
          </li>
          <li>
            <span className="review-icon">
              <TestAppearing />
            </span>
            <div className="review-info">
              <h2>{data?.testAppearingPercentage?.toFixed(2)}%</h2>
              <p>Test Appearing Rate</p>
            </div>
          </li>
        </ul>
      </div>
      {data.packageReview.length > 0 && (
        <div className="card">
          <ul className="review-items">
            {data.packageReview.map((item, idx) => (
              <li key={idx}>
                {item.student.studentAvatarUrl === null ? (
                  <img
                    className="avt-img"
                    src={require('../../../assets/images/no-image-icon-md.png')}
                    alt=""
                  />
                ) : (
                  <img
                    className="avt-img"
                    src={require('../../../assets/images/about-02.jpg')}
                    alt=""
                  />
                )}

                <div className="avt-review">
                  <h3>
                    <p>{item.student.name}</p>{' '}
                    <span className="ratign">
                      {item.rating === 1 && (
                        <img
                          src={require('../../../assets/images/2star.svg')}
                          alt=""
                        />
                      )}
                      {item.rating === 2 && (
                        <img
                          src={require('../../../assets/images/1star.svg')}
                          alt=""
                        />
                      )}
                      {item.rating === 3 && (
                        <img
                          src={require('../../../assets/images/3star.svg')}
                          alt=""
                        />
                      )}
                      {item.rating === 4 && (
                        <img
                          src={require('../../../assets/images/4star.svg')}
                          alt=""
                        />
                      )}
                      {item.rating === 5 && (
                        <img
                          src={require('../../../assets/images/5star.svg')}
                          alt=""
                        />
                      )}
                    </span>
                  </h3>
                  <p className="date">{moment(item.createdAt).format('LL')}</p>
                  <p>{item.review}</p>
                </div>
              </li>
            ))}
          </ul>
          
        </div>
      )}

{modalToggle && (
        <Modal addClass="package-rating">
          <ProductReviewModal
            testDetails={testDetails}
            modalClose={modalCloseHandler}
          />
        </Modal>
      )}


    </div>
  ) : (
    <TestDetailsReviewSkeleton />
  );
};

export default withRouter(TestSeriesReviews);
