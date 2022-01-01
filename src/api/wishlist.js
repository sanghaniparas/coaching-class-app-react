import axios from 'axios';
import { BASE_URL } from './../config';

const checkWishList = async (obj) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };
    const body = JSON.stringify({
      itemType: obj.itemType,
      itemId: obj.itemId,
    });

    const response = await axios.post(
      `${BASE_URL}/wishlist/checkWishList`,
      body,
      config
    );

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

const addToWishList = async (obj) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      itemType: obj.itemType,
      itemId: obj.itemId,
    });

    const response = await axios.post(
      `${BASE_URL}/wishlist/add-to-wishlist`,
      body,
      config
    );
  } catch (error) {
    console.log(error);
  }
};

const removeFromWishList = async (obj) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      itemType: obj.itemType,
      itemId: obj.itemId,
    });

    const response = await axios.post(
      `${BASE_URL}/wishlist/remove-from-wishlist`,
      body,
      config
    );
  } catch (error) {
    console.log(error);
  }
};

export default {
  checkWishList,
  addToWishList,
  removeFromWishList,
};
