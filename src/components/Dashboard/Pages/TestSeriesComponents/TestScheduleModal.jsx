import React, { useState, useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useToasts } from 'react-toast-notifications';
import { BigAlarm } from '../../../Core/Layout/Icon';
import { BASE_URL } from '../../../../config';
import axios from 'axios';

const TestScheduleModal = ({ open, onCloseModal, testID }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `${localStorage.token}`,
        },
      };

      const body = {
        testId: testID.toString(),
        scheduleDatetime: `${date} ${time}`,
      };
      const response = await axios.post(
        `${BASE_URL}/dashboard/dashboard/test-schedule`,
        body,
        config
      );

      console.log(response);
      setDate('');
      setTime('');
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal open={open} onClose={onCloseModal} center>
      <div className="choose-date">
        <span>
          <BigAlarm />
        </span>
        <h2>Choose Preferred Date and Time</h2>

        <div className="date-inputs">
          <strong>Select Date</strong>
          <input
            type="date"
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="date-inputs">
          <strong>Select Time</strong>
          <input type="time" onChange={(e) => setTime(e.target.value)} />
        </div>

        <button
          disabled={date === '' || time === '' ? true : false}
          onClick={handleSubmit}>
          Add Schedule
        </button>
      </div>
    </Modal>
  );
};

export default TestScheduleModal;
