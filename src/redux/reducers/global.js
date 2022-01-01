import {
  FETCHSEARCHDATASUCCESS,
  FETCHSEARCHDATAFAILURE,
  FETCHCARTDATASUCCESS,
  FETCHCARTDATAFAILURE,
  SAVECARTDATAFAILURE,
  VALIDATECOUPONFAILURE,
  COUPONINVALID,
  RESETCOUPONERRORMSG,
  REMOVECOUPONCODEFAILURE
} from './../actions/types';

const initialState = {
  searchData: {},
  keywords:'',
  cart:'',
  loading: true,
  couponErrorMsg:''
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) { 
    case RESETCOUPONERRORMSG:
      return {
        ...state,
        couponErrorMsg: ''
      };
    case COUPONINVALID:
      return {
        ...state,
        couponErrorMsg: 'Sorry,you need to add more items to apply this coupon!',
        loading: false,
      };
    case FETCHSEARCHDATASUCCESS:
      return {
        ...state,
        searchData: payload.response,
        keywords: payload.keywords,
        loading: false,
      };
    case FETCHCARTDATASUCCESS:
      return {
        ...state,
        cart: payload.response,
        loading: false,
      };
    case FETCHSEARCHDATAFAILURE:
    case FETCHCARTDATAFAILURE:
    case SAVECARTDATAFAILURE:
    case VALIDATECOUPONFAILURE:
    case REMOVECOUPONCODEFAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
