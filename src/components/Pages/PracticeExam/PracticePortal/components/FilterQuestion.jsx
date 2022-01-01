
import React, { useRef, useState, useEffect } from 'react';
import { FilterWhiteIcon } from '../../../../Core/Layout/Icon';
import {
  fetchQuestions,
  filterQuestions,
} from './../../../../../redux/practice/practice.actions';
import { useDispatch } from 'react-redux';

const FilterQuestion = ({ resetCount,pResultId,filterNumber }) => {
  const [filter, setfilter] = useState(false);
  const [selectFilter, setSelectFilter] = useState(0);
  const [number, setNumber] = useState(1);
  

  useEffect(() => {
    if(filterNumber!==null){
      setNumber(filterNumber)
    }
   
  }, [filterNumber])
  const dispatch = useDispatch();


  const filterToggle = () => {
    setfilter(!filter);
  };

  const handleFilter = (num) => {
    console.log("num **",num);
    resetCount();
    setNumber(num)
    
    if (num !== 1) {
      dispatch(filterQuestions(num));
    }

    if (num === 1) {
      dispatch(fetchQuestions(pResultId));
    }
  };

  useEffect(()=>{
    console.log("num",number);
  },[number])

    const useOutsideAlerter = (ref) => {
      

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            setfilter(false);
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

  return (
    <span className="filter" ref={wrapperRef}>
      <i onClick={filterToggle} >
        <FilterWhiteIcon />
      </i>
      {filter && (
        <div className="filter-dropdown" style={{ zIndex: '1' }}>
          <h5>Filter By</h5>
          <ul>
            <li>
              <p className="custom-radio">
                <input type="radio" name="filter" id="1" checked ={number===1?true:false }/>
                <label htmlFor="1" onClick={() => handleFilter(1)}>
                  All
                </label>
              </p>
            </li>
            <li>
              <p className="custom-radio">
                <input type="radio" name="filter" id="2" checked ={number===2?true:false }/>
                <label htmlFor="2" onClick={() => handleFilter(2)}>
                  Correct
                </label>
              </p>
            </li>
            <li>
              <p className="custom-radio">
                <input type="radio" name="filter" id="3" checked ={number===3?true:false }/>
                <label htmlFor="3" onClick={() => handleFilter(3)}>
                  Incorrect
                </label>
              </p>
            </li>
            <li>
              <p className="custom-radio">
                <input type="radio" name="filter" id="4" checked ={number===4?true:false }/>
                <label htmlFor="4" onClick={() => handleFilter(4)}>
                  Skipped
                </label>
              </p>
            </li>
            <li>
              <p className="custom-radio">
                <input type="radio" name="filter" id="5" checked ={number===5?true:false } />
                <label htmlFor="5" onClick={() => handleFilter(5)}>
                  Bookmarked
                </label>
              </p>
            </li>
            <li>
              <p className="custom-radio">
                <input type="radio" name="filter" id="6" checked ={number===6?true:false }/>
                <label htmlFor="6" onClick={() => handleFilter(6)}>
                  Unseen
                </label>
              </p>
            </li>
          </ul>
        </div>
      )}
    </span>
  );
};

export default FilterQuestion;

