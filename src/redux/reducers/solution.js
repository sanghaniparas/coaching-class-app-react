import {
  FETCH_SOLUTION_DATA_SUCCESS,
  FETCH_SOLUTION_DATA_FAILURE,
  FETCHVIRIFYSAVEBUTTONSUCCESS,
  FETCHVIRIFYSAVEBUTTONFAILURE,
  BOOKMARKSOLUTONSUCCESS,
  BOOKMARKSOLUTONFAILURE
} from './../actions/types';

const initialState = {
  solutionData: JSON.parse(localStorage.getItem('solutionData')) || {}, //JSON.parse(localStorage.getItem('solutionData')) ||
  loading: false,
  showSaveButton:false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_SOLUTION_DATA_SUCCESS:
     
        //localStorage.setItem('solutionData', JSON.stringify(payload));
      
      return {
        ...state,
        solutionData: payload,
        loading: false,
      };
    case FETCH_SOLUTION_DATA_FAILURE:
      return {
        ...state,
        solutionData: {},
        loading: false,
      };
    case FETCHVIRIFYSAVEBUTTONSUCCESS:
      return {
        ...state,
        showSaveButton: payload.bookmarked === 1 ? false : true,
        loading: false,
      };  
    case BOOKMARKSOLUTONSUCCESS:
      return {
        ...state,
        showSaveButton: payload.code === 200 ? false : true,
        loading: false,
      };      
    case FETCHVIRIFYSAVEBUTTONFAILURE:
    case BOOKMARKSOLUTONFAILURE:
      return {
        ...state,
        loading: false,
      };  
    default:
      return state;
  }
}
