import React, { Fragment, useState } from 'react';
import { FeedBack } from './../../../../Core/Layout/Icon';
import axios from 'axios';
import { BASE_URL } from './../../../../../config';
import { ToastProvider, useToasts } from 'react-toast-notifications';

const ReportModal = ({ reportTypeId, singleQuestion, reportModalClose }) => {
  const [reportSubmitModal, setReportSubmitModal] = useState(false);
  const [issue, setIssue] = useState('');
  const { addToast } = useToasts();
  // For submitting issue
  const handleSubmit = async () => {
    if(!issue.length)
    {
      return addToast('Please write an issue before submitting', {
        appearance: 'error',
        autoDismissTimeout: 4000,
        autoDismiss: true,
      }); 
    }
    setReportSubmitModal(!reportSubmitModal);
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      practiceSetResultId: localStorage.getItem('practiceSetResultId'),
      practiceSetQuestionId: singleQuestion.id.toString(),
      questionReportsTypeId: reportTypeId,
      otherIssueDesc: issue,
    });
    try {
      const response = await axios.post(
        `${BASE_URL}/exam/practiceSet/reportQuestion`,
        body,
        config
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setIssue(e.target.value);
  };

  return (
    <Fragment>
      {!reportSubmitModal && (
        <Fragment>
          <div className="modal-header">
            <h3>Submit Issue</h3>
          </div>

          <div className="modal-body">
            <div className="form-group mb-0">
              <label>Write Your Issue</label>
              <textarea
                onChange={handleChange}
                maxLength="250"
                placeholder="Tell about your issue..."></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <div className="btn-group">
              <button className="btn-grey" onClick={() => reportModalClose()}>
                Close
              </button>
              <button
                className="btn-primary radius"
                // disabled={issue.length === 0 ? true : false}
                onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </Fragment>
      )}

      {reportSubmitModal && (
        <Fragment>
          <div className="modal-body feedback-body">
            <span className="feedback">
              <FeedBack />
            </span>
            <p className="submit-text">
              Thank You for submitting your feedback
            </p>
          </div>
          <div className="modal-footer text-center">
            <button
              className="btn-primary radius"
              onClick={() => reportModalClose()}>
              Ok, Thanks
            </button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ReportModal;
