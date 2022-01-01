import axios from 'axios';
import { BASE_URL } from './../config';

const getRating = async (bool) => {
  let value;
  try {
    const res = await axios.get(`${BASE_URL}/practicePage/rating_count`);

    value = res.data;

    if (bool) return value.totalPracticeCount;

    if (!bool) return value.totalCoachingCount;
  } catch (error) {
    console.log(error);
  }
};

export default {
  getRating,
};
