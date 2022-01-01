import React, { Fragment, useState, useCallback } from 'react';
import { ModalClose, Star,TickCircle,Linecircle,CheckCircle } from '../../Core/Layout/Icon';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BASE_URL } from './../../../config';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const ProductReviewModal = ({
  modalClose,
  testDetails,
  percent,
  practicePage,
  practiceDetails,
  match,
  stats
}) => {

  console.log("practiceDetails **", stats);

  const [stars, setStars] = useState([]);
  const [review, setReview] = useState('');
  const [counter, setCounter] = useState(0);
  const [submitModal, setSubmitModal] = useState(false);
  const { addToast } = useToasts();

  const selectStars = (el) => {
    if (el === 1) {
      if (stars.includes(el)) {
        setStars([]);
      } else {
        setStars([1]);
      }
    } else if (el === 2) {
      setStars([1, 2]);
    } else if (el === 3) {
      setStars([1, 2, 3]);
    } else if (el === 4) {
      setStars([1, 2, 3, 4]);
    } else {
      setStars([1, 2, 3, 4, 5]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setReview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('token') === '') {
      setCounter(0);
      return addToast('Please login to rate this practice set', {
        appearance: 'error',
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }
    if (testDetails !== undefined) {
      if (stars.length === 0 || review.length === 0) {
        setCounter(0);
        return addToast('Please provide a review before submitting', {
          appearance: 'error',
          autoDismissTimeout: 4000,
          autoDismiss: true,
        });
      }
    }

    if (testDetails !== undefined) {
      if (testDetails.reviewPercentage === 0) {
        setCounter(0);
        return addToast('You have not appeared for any test', {
          appearance: 'error',
          autoDismissTimeout: 4000,
          autoDismiss: true,
        });
      }
    } 
    else {
      if (Math.floor(Number(stats.percentComplete)) < 50) {
        setCounter(0);
        return addToast('Minimum test appearing rate is 50 % ', {
          appearance: 'error',
          autoDismissTimeout: 4000,
          autoDismiss: true,
        });
      }
    }

    try {
      const config = {
        headers: {
          Authorization: `${localStorage.token}`,
        },
      };

      if (practicePage === undefined) {
        
        const payload = {
          coachingId: testDetails.coachingDetails.id,
          testPackageId: testDetails.testpackageDetails.id,
          rating: `${stars[stars.length - 1]}`,
          review: review,
        };

        console.log(payload);
        if(stars[stars.length - 1]){
          
          const response = await axios.post(
            `${BASE_URL}/testPackage/sumbitReview`,
            payload,
            config
          );
          setSubmitModal(true)
        }else{
          return addToast('Please rate  this practice sets', {
                  appearance: 'error',
                  autoDismissTimeout: 4000,
                  autoDismiss: true,
                });
        }
       
      }

      if (practicePage === true) {
       
        const payload = {
          coachingId: practiceDetails.coaching.id,
          practiceId: match.params.id,
          rating: `${stars[stars.length - 1]}`,
          review: review,
        };

        
        if(stars[stars.length - 1]){
         
          const response = await axios.post(
            `${BASE_URL}/practiceSet/sumbitReview`,
            payload,
            config
          );
          setSubmitModal(true)
        }else{
         
          return addToast('Please rate  this practice sets  ', {
            appearance: 'error',
            autoDismissTimeout: 4000,
            autoDismiss: true,
          });
        }
      }
      
      
    } catch (err) {
      setCounter(0);
      console.log(err);
    }
  };

 const closeModal = () => {
    setCounter(0);
    setStars([]);
    setReview('');
    modalClose();
    setSubmitModal(false)
    window.location.reload();
 }

  return (
   

    <Fragment>
      { !submitModal &&
        <Fragment>

        
       <div className="pr-header">
        <h3>Product Review</h3>
        <span onClick={modalClose}>
          <ModalClose />
        </span>
      </div>
      <div className="pr-body">
        <div className="pr-ratings">
          <p className="pr-rating-text">Product Overall Rating</p>
          <span className="stars">
            {[1, 2, 3, 4, 5].map((el, i) => (
              <Fragment key={i}>
                <span onClick={() => selectStars(el)}>
                  <Star fill={stars.includes(el) ? '#fe9554' : '#ddd'} />
                </span>
              </Fragment>
            ))}
          </span>
          <span className="pr-rating-point">
            ({stars.length === 0 ? 0 : stars[stars.length - 1]} Rating)
          </span>
        </div>
        <div className="pr-rating-progressbar">
          <p className="pr-appearing">
            Test Appearing Rate{' '}
            <span>
              {testDetails !== undefined
                ? Math.floor(testDetails?.reviewPercentage || 0)
                : Math.floor(Number(stats?.percentComplete || 0))}{' '}
              %
            </span>
          </p>
          <div className="progressbar">
            <span
              style={{
                width: `${testDetails !== undefined
                  ? Math.floor(testDetails?.reviewPercentage || 0)
                  : Math.floor(Number(stats?.percentComplete || 0))
                  }%`,
              }}></span>
          </div>
          <p className="percent">
            <span>0</span>
            <span>100</span>
          </p>
        </div>
        {testDetails !== undefined &&
          <textarea
            name="review"
            id=""
            className="pr-comment"
            onChange={(e) => handleChange(e)}
            value={review}
            placeholder="Tell us about your experience..."></textarea>}
        <div className="pr-footer">
          <button className="btn-transparent" onClick={modalClose}>
          Cancel
          </button>
          <button
            // disabled={counter ? true : false}
            type="submit"
            className="btn-primary radius"
            onClick={(e) => {
              setCounter((counter) => counter + 1);
              handleSubmit(e);
            }}>
            Submit
          </button>
        </div>
        <ToastContainer />
      </div> 
      </Fragment>
    }

      { submitModal && (<Fragment>
       
       <div className="modal-body" style={{height:'200px',overflow:'hidden'}}>  
         <div className="feedback" style={{textAlign: 'center',padding: '20px'}}>
             <CheckCircle />
           </div>
         <h3 style={{textAlign: 'center',fontWeight: '700',fontSize: '24px'}}>Thank You!</h3>
         <p style={{textAlign: 'center',fontSize: '16px',color: '#79797a',padding: '20px'}}>You have successfully submitted your rating.</p>
       </div>
       <div className="modal-footer text-center" style={{height:'60px'}}>
         <button 
           className="btn-primary radius"
           onClick={() => closeModal()}>
           Done
         </button>
       </div>
   </Fragment>
   )} 

    </Fragment>
    
  );

};

const mapStateToProps = (state) => {
  return {
    stats: state.practiceData?.practiceStats?.chapterStat
  }

}

export default connect(mapStateToProps)(withRouter(ProductReviewModal));
