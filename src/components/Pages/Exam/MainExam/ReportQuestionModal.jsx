import React, { Fragment, useState } from 'react';
import { FeedBack } from '../../../Core/Layout/Icon';

const ReportQuestionModal = ({ 
  close, 
  submitReport, 
  showThanksMsg,
  reportOption,
 }) => {
  const [otherIssue, setOtherIssue] = useState('');
  const handleChange = (event) => {
    setOtherIssue(event.target.value);
  };
  const submitHandler = () => {
    submitReport(otherIssue);
  };
  return (
    <Fragment>
      {!showThanksMsg && (
        <Fragment>
          <div className="modal-header">
            <h3>Submit Issue</h3>
          </div>

          <div className="modal-body">
            <div className="form-group mb-0">
              <label>Write Your Issue</label>
              <textarea
                value={otherIssue}
                onChange={handleChange}
                maxlength="250"
                placeholder="Tell about your issue..."></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <div className="btn-group">
              <button className="btn-grey" onClick={close}>
                Close
              </button>
              <button disabled={otherIssue.length === 0 ? true : false} className="btn-primary radius" onClick={submitHandler}>
                Submit
               </button>
            </div>
          </div>
        </Fragment>
      )}
      {showThanksMsg &&
        <Fragment>
          <div className="modal-body feedback-body">
            <span className="feedback">
              <FeedBack />
            </span>
            <p className="submit-text">Thank You for submitting your feedback</p>
          </div>
          <div className="modal-footer text-center">
            <button className="btn-primary radius" onClick={close}>
              Ok, Thanks
            </button>
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

export default ReportQuestionModal;
