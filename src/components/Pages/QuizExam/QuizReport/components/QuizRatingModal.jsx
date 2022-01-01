import React, { Fragment, useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { ToastProvider, useToasts } from 'react-toast-notifications';
import { selectQuizReport } from '../../../../../redux/quiz/quiz.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { ModalClose, Star } from './../../../../Core/Layout/Icon';
import { BASE_URL } from './../../../../../config';

const QuizRatingModal = ({ modalClose, match, report,setrate }) => {
  const [stars, setStars] = useState([]);
  const [review, setReview] = useState('');
  const [counter, setCounter] = useState(0);

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
      return addToast('Please login to submit a review', {
        appearance: 'error',
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }
    if (stars.length === 0) {
      setCounter(0);
      return addToast('Please rate before submitting', {
        appearance: 'error',
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }

    // if (report.reviewPercentage === 0) {
    //   setCounter(0);
    //   return addToast('You have not appeared for any test', {
    //     appearance: 'error',
    //     autoDismissTimeout: 4000,
    //     autoDismiss: true,
    //   });
    // }

    try {
      const config = {
        headers: {
          Authorization: `${localStorage.token}`,
        },
      };

      const payload = {
        coachingId: report.similarQuiz[0].coaching.id,
        quizId: match.params.quizId,
        rating: `${stars[stars.length - 1]}`,
        review: review,
      };

      console.log(payload);

      const response = await axios.post(
        `${BASE_URL}/exam/quiz/sumbitReview`,
        payload,
        config
      );
      addToast('You have successfully rated this quiz', {
        appearance: 'success',
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });

      setCounter(0);
      setStars([]);
      setReview('');
      modalClose();
      setrate(true)
    } catch (err) {
      setCounter(0);
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="pr-header">
        <h3>Quiz Review</h3>
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
            <span>{Math.floor(report.reviewPercentage) || 0} %</span>
          </p>
          <div className="progressbar">
            <span
              style={{
                width: `${Math.floor(report.reviewPercentage) || 0}%`,
              }}></span>
          </div>
          <p className="percent">
            <span>0</span>
            <span>100</span>
          </p>
        </div>
        {/* <textarea
          name="review"
          id=""
          className="pr-comment"
          onChange={(e) => handleChange(e)}
          value={review}
          placeholder="Tell us about your experience..."></textarea> */}
        <div className="pr-footer">
          <button  onClick={modalClose} style={{padding:"0 10px", outline:"none", border:"none"}}>
            Cancel
          </button>
          <button
            disabled={counter ? true : false}
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
  );
};

const mapStateToProps = createStructuredSelector({
  report: selectQuizReport,
});

export default connect(mapStateToProps)(QuizRatingModal);
