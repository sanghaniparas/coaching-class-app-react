import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './../config';

const ACTIONS = {
  MAKE_REQUEST: 'MAKE_REQUEST',
  GET_SEARCH_DATA: 'GET_SEARCH_DATA',
  REQUEST_FAILED: 'REQUEST_FAILED',
  GET_PASS_SEARCH_DATA: 'GET_PASS_SEARCH_DATA',
};

function searchReducer(state, action) {
  console.log('action', action);
  
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        loading: true,
        searchData: [],
        searchHistory: [],
        examTypeSearch: []
      };
    case ACTIONS.GET_SEARCH_DATA:
      return {
        ...state,
        loading: false,
        searchData: [
          ...action.payload.data.coaching_search_data,
          ...action.payload.data.test_package_search_data,
          //...action.payload.data.search_histry_data
        ],
        searchHistory: [...action.payload.data.search_histry_data
        ],
        examTypeSearch:[...action.payload.data.examtype_search_data],
      };
    case ACTIONS.GET_PASS_SEARCH_DATA:
      
      return {
        ...state,
        loading: false,
        searchData: [
          ...action.payload.data
        ],
      };
    case ACTIONS.REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        searchData: [],
      };
  }
}

export default function useFetchSearch(searchValue, URL, isGolbal) {
  const [state, dispatch] = useReducer(searchReducer, {
    searchData: [],
    loading: true,
  });

  useEffect(() => {
    if (searchValue.length) {
      const cancelToken = axios.CancelToken.source();
      async function fetchSearchData() {
        try {
          dispatch({
            type: ACTIONS.MAKE_REQUEST,
          });

          const response = await axios.post(
            `${BASE_URL}${URL}`,
            {
              cancelToken: cancelToken.token,
              search_key: searchValue.trim(),
            }
          );

          if (response.data) {
            dispatch({
              type: isGolbal && ACTIONS.GET_SEARCH_DATA || ACTIONS.GET_PASS_SEARCH_DATA,
              payload: response.data,
            });
          }
        } catch (err) {
          if (axios.isCancel(err)) return;
          dispatch({
            type: ACTIONS.REQUEST_FAILED,
          });
        }
      }

      fetchSearchData();

      return () => {
        cancelToken.cancel();
      };
    }
  }, [searchValue]);

  return state;
}
