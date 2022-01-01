import React, { useState, useEffect } from 'react';
import { uploadProfileImage } from '../redux/MyProfile/profile.actions';
import { useDispatch } from 'react-redux';
import { BASE_URL } from './../config';
import axios from 'axios';

function useForm(profile) {
  const [data, setData] = useState(profile);
  const [cityList, setCityList] = useState([]);

  const dispatch = useDispatch();

  // For checking that state is populated, then populating the city
  useEffect(() => {
    if (profile.stateId !== null) {
      populateState(profile.stateId);
    }
  }, [profile]);

  const handleChange = (e) => {
    e.persist();

    if (e.target.files !== null && e.target.files !== undefined) {
      return uploadPhoto(e);
    }

    if (e.target.name === 'stateId') {
      populateState(e.target.value);
    }
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const uploadPhoto = async (e) => {
    try {
      let obj = {
        student_id: data.id,
        file_name: e.target.files[0],
      };
      await dispatch(uploadProfileImage(obj));
    } catch (err) {
      console.log(err);
    }
  };

  const populateState = async (id) => {
    try {
      const {
        data: { data },
      } = await axios.get(`${BASE_URL}/misc/city/${id}`);

      setCityList(data);
    } catch (err) {
      console.log(err);
    }
  };

  return [data, handleChange, cityList];
}

export default useForm;
