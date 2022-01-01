import {
  FETCHSEARCHDATASUCCESS,
  FETCHSEARCHDATAFAILURE,
  FETCHCARTDATASUCCESS,
  FETCHCARTDATAFAILURE,
  SAVECARTDATASUCCESS,
  SAVECARTDATAFAILURE,
  REMOVECARTDATAFAILURE,
  VALIDATECOUPONFAILURE,
  COUPONINVALID,
  RESETCOUPONERRORMSG,
  REMOVECOUPONCODEFAILURE
} from './types';
import axios from 'axios';
import { BASE_URL } from './../../config';
import { useHistory } from 'react-router-dom';

// For loading solution data
// @access: Private
const config = {
  headers: {
    'Content-Type': 'Application/json',
    Authorization: `${localStorage.token}`,
  },
};
//const history = useHistory();

export const fetchSearchData = (keywords) => async (dispatch) => {
  const body = {search_key: keywords.toString()};
  try {
    const response = await axios.post(
      `${BASE_URL}/search/all-search-result`,
      body,
      config
    );
    dispatch({
      type: FETCHSEARCHDATASUCCESS,
      payload: {response:response.data.data, keywords:keywords},
    });
  } catch (err) {
    dispatch({
      type: FETCHSEARCHDATAFAILURE,
    });
  }
};

export const fetchExamTypeData = (keywords) => async (dispatch) => {
  const body = {search_key: keywords.toString(), exam_type: 5};
  try {
    const response = await axios.post(
      `${BASE_URL}/search/exam-type-search`,
      body,
      config
    );
    dispatch({
      type: FETCHSEARCHDATASUCCESS,
      payload: {response:response.data.data, keywords:keywords},
    });
  } catch (err) {
    dispatch({
      type: FETCHSEARCHDATAFAILURE,
    });
  }
};

export const fetchCartItem = () => async (dispatch) => {
  const body = {};
  try {
    const response = await axios.post(
      `${BASE_URL}/subscription/cart-items`,
      body,
      config
    );
    console.log('response', response);
    dispatch({
      type: FETCHCARTDATASUCCESS,
      payload: {response:response.data.data},
    });
  } catch (err) {
    dispatch({
      type: FETCHCARTDATAFAILURE,
    });
  }
};

export const saveToCart = (item) => async (dispatch) => {
  const body = {itemId: item.id,itemType:item.type};
  try {
    const response = await axios.post(
      `${BASE_URL}/subscription/add-to-cart`,
      body,
      config
    );
    dispatch(fetchCartItem());
  } catch (err) {
    dispatch({
      type: SAVECARTDATAFAILURE,
    });
  }
};

export const removeItemFromCart = (item) => async (dispatch) => {
  const body = item;
  try {
    const response = await axios.post(
      `${BASE_URL}/subscription/remove-from-cart`,
      body,
      config
    );
    console.log('response--', response);
    dispatch(fetchCartItem());
  } catch (err) {
    dispatch({
      type: REMOVECARTDATAFAILURE,
    });
  }
};

export const addToWishListDB = (item) => async (dispatch) => {
  const body = item;
  try {
    const response = await axios.post(
      `${BASE_URL}/subscription/cart-to-wishlist`,
      body,
      config
    );
    console.log('response--', response);
    dispatch(fetchCartItem());
  } catch (err) {
    dispatch({
      type: REMOVECARTDATAFAILURE,
    });
  }
};

export const validateCoupon = (item) => async (dispatch) => {
  const body = item;
  try {
    const response = await axios.post(
      `${BASE_URL}/subscription/apply-order-coupon`,
      body,
      config
    );
    if(response.data.code===300){
      dispatch({
        type: COUPONINVALID,
        payload: response.data
      });
    }else{
      dispatch(fetchCartItem());
    }
  } catch (err) {
    dispatch({
      type: VALIDATECOUPONFAILURE,
    });
  }
};

export const removeCouponCode = (item) => async (dispatch) => {
  const body = item;
  try {
    const response = await axios.post(
      `${BASE_URL}/subscription/remove-order-coupon`,
      body,
      config
    );    
    dispatch(fetchCartItem());
  } catch (err) {
    dispatch({
      type: REMOVECOUPONCODEFAILURE,
    });
  }
};

export const resetCouponErrMsg = () =>  (dispatch) => {  
  dispatch({type: RESETCOUPONERRORMSG  });
};