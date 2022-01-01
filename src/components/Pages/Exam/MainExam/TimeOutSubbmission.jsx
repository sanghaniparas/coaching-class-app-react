import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import TestSubmitModal from './TestSubmitModal';
import { Modal } from '../../../Core/Layout/Modal/Modal';
import {
  getTestSummary,
  setReportCardData,
} from './../../../../redux/actions/exam';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Toast from '../../Elements/Toast';

const TimeOutSubbmission = ({
  testInstructions,
  getTestSummary,
  setReportCardData,
  time,
}) => {
  const history = useHistory();
  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);

  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 5000);
  };

  useEffect(() => {
    getTestSummary(testInstructions.testInfo.testResultId);
  }, []);

  return (
    <Fragment>
      <Modal addClass="submitTest">
        <TestSubmitModal timeout={true} time={time} />
      </Modal>
      <Toast isVisible={isVisible} toastMessage={toastMessage} />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    testInstructions: state.exam.testInstructions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTestSummary: (testResultId) => dispatch(getTestSummary(testResultId)),
    setReportCardData: (reaportData) =>
      dispatch(setReportCardData(reaportData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeOutSubbmission);
