import React, { useState, useRef, useEffect } from 'react';
import ratingApi from '../../../api/ratingCount';

export default function CustomRating({
  defaultSelectedPractice,
  ratingItem,
  respondChoice,
  respondRating,
  ratingStar,
  packageBySelectionRating,
  totalTestPackege,
  reset,
  setDefaultSelection
}) {
  const wrapperRef = useRef(null);
  const [dropdown, setdropdown] = useState(false);
  const [typeSeclected, setTypeSelected] = useState(
    packageBySelectionRating || ''
  );
  const [ratingSeclected, setRatingSelected] = useState('');

  const [label, setLabelSelected] = useState('Ratings');
  const [total, setTotalTestPackege] = useState(totalTestPackege || 0);

  const [ratings, setRatings] = useState({});

  useEffect(() => {
    if (totalTestPackege) {
      setTotalTestPackege(totalTestPackege);
    }
  }, [totalTestPackege]);

  useEffect(() => {
    if (reset) {
      !ratingItem && setTypeSelected('');
      setRatingSelected('');
      setLabelSelected('Ratings');
    }
  }, [reset]);

  useEffect(() => {
    // if (defaultSelectedPractice) setTypeSelected('practice');
    if (defaultSelectedPractice === 'package') setTypeSelected('package');
    else {
      defaultSelectedPractice
        ? setTypeSelected('practice')
        : setTypeSelected('quiz');
    }
  }, [defaultSelectedPractice]);

  // useEffect(() => {
  //   if (typeSeclected === 'practice') {
  //     getRatingCount(true);
  //   }
  //   // if (typeSeclected === 'coaching') {
  //   //   getRatingCount(false);
  //   // }
  //   if (typeSeclected === 'quiz') {
  //     getRatingCount(false);
  //   }
  // }, [typeSeclected]);

  useEffect(() => {
    // if (defaultSelectedPractice) setTypeSelected('practice');
    //defaultSelectedPractice? setTypeSelected('practice'):setTypeSelected('quiz');
    if (defaultSelectedPractice === 'package') setTypeSelected('package');
    else {
      defaultSelectedPractice
        ? setTypeSelected('practice')
        : setTypeSelected('quiz');
    }
  }, [defaultSelectedPractice]);


  const getRatingCount = async (bool) => {
    let result = await ratingApi.getRating(bool);
    setRatings(result);
  };

  const handleChoice = (el) => {
    console.log(el)
    setDefaultSelection(el.id);
    setRatingSelected('');
    setTypeSelected(el.id);
    setLabelSelected(el.label);
    setdropdown(!dropdown);
    respondChoice(el.id);
  };


  const handleRanting = (event) => {

    setRatingSelected(event.target.id);
    !ratingItem && setLabelSelected(event.target.id);
    respondRating(event.target.id.split('-')[0]);
    setdropdown(!dropdown);
  };
  const dropdownToggleHandler = () => setdropdown(!dropdown);
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setdropdown(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(wrapperRef);


  const showLabel = (label) => {

    if (label === '4-star') {
      return <React.Fragment><img src={require('../../../assets/images/4star.svg')} alt="" /></React.Fragment>
    }
    else if (label === '3-star') {
      return <React.Fragment><img src={require('../../../assets/images/3star.svg')} alt="" /> </React.Fragment>
    }
    else if (label === '2-star') {
      return <React.Fragment><img src={require('../../../assets/images/2star.svg')} alt="" /></React.Fragment>
    }
    else if (label === '1-star') {
      return <React.Fragment><img src={require('../../../assets/images/1star.svg')} alt="" /></React.Fragment>
    } else {
      return <React.Fragment>{label}</React.Fragment>
    }

  }



  return (
    <div className="custom-dropdown rating" ref={wrapperRef}>
      <button className="btn" onClick={dropdownToggleHandler}>
        {showLabel(label)}
      </button>
      {dropdown && (
        <ul>
          <li className="select-package">
            {ratingItem &&
              ratingItem.map((el, idx) => (
                <p className="custom-radio" key={idx}>
                  <input
                    type="radio"
                    name="rating"
                    id={el.id}
                    value={el.label}
                    onChange={(event) => handleChoice(el)}
                    checked={typeSeclected === el.id}
                  />
                  <label htmlFor={el.id}>{el.label}</label>
                </p>
              ))}
          </li>
          <li>
            <p className="custom-radio">
              <input
                type="radio"
                name="star"
                id="4-star"
                onChange={(event) => handleRanting(event)}
                checked={ratingSeclected == '4-star'}
              />
              <label htmlFor="4-star">
                <img src={require('../../../assets/images/4star.svg')} alt="" />
                <span>
                  4.0 &amp; up
                  {/* <i>{total || 360}</i> */}
                </span>
              </label>
            </p>
          </li>
          <li>
            <p className="custom-radio">
              <input
                type="radio"
                name="star"
                id="3-star"
                onChange={(event) => handleRanting(event)}
                checked={ratingSeclected == '3-star'}
              />
              <label htmlFor="3-star">
                <img src={require('../../../assets/images/3star.svg')} alt="" />
                <span>
                  3.0 &amp; up
                  {/* <i>{total || 480}</i> */}
                </span>
              </label>
            </p>
          </li>
          <li>
            <p className="custom-radio">
              <input
                type="radio"
                name="star"
                id="2-star"
                onChange={(event) => handleRanting(event)}
                checked={ratingSeclected == '2-star'}
              />
              <label htmlFor="2-star">
                <img src={require('../../../assets/images/2star.svg')} alt="" />
                <span>
                  2.0 &amp; up
                  {/* <i>{total || 480}</i> */}
                </span>
              </label>
            </p>
          </li>
          <li>
            <p className="custom-radio">
              <input
                type="radio"
                name="star"
                id="1-star"
                onChange={(event) => handleRanting(event)}
                checked={ratingSeclected == '1-star'}
              />
              <label htmlFor="1-star">
                <img src={require('../../../assets/images/1star.svg')} alt="" />
                <span>
                  1.0 &amp; up
                  {/* <i>{total || 480}</i> */}
                </span>
              </label>
            </p>
          </li>

          {/* {ratingStar && ratingStar.map((el, idx) => (                
            <li>
              <p className="custom-radio">
                <input type="radio" name="star" id={el.id} 
                  onChange={(event)=>handleRanting(event)} 
                  checked={ratingSeclected==el.id}
                />
                <label htmlFor={el.id}>
                  <img src={require(`'../../../assets/images/${el.imageSrc}.svg'`)} alt="" />
                  <span>4.5 &amp; up <i>360</i></span>
                </label>
              </p>
            </li>
          ))} */}
          {/* <li className="select-package">
            <p className="custom-radio">
              <input type="radio" name="rating" id="package" value="package" />
              <label htmlFor="package">Package</label>
            </p>
            <p className="custom-radio">
              <input type="radio" name="rating" id="coaching" value="coaching" />
              <label htmlFor="coaching">Coaching</label>
            </p>
          </li> */}
        </ul>
      )}
    </div>
  );
}
