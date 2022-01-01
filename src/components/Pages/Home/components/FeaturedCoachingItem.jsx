import React from 'react';
import { Arrow, Heart, Star, Location } from '../../../Core/Layout/Icon';
import { Link } from 'react-router-dom';
import { ToolTip } from '../../../Core/Layout/Tooltip/ToolTip';
import { useHistory } from 'react-router-dom';

const FeaturedCoachingItem = ({ e,item }) => {
  const history = useHistory();
  const clickHandler = (event) => {
    event.preventDefault();
    const coachingName = item.coachingName.replaceAll(' ','-');
    console.log('coachingName', coachingName)
    history.push({
      pathname: `/coaching/${coachingName}`,
      state: {
        id: item.coachingId,
        name: coachingName
      },
    });
  }
  return (
    <Link
      to={`/coaching/${item.coachingId}`}
      //to='javascript:void(0);'
      //onClick={(e,item)=>clickHandler(e,item)}
      className="a-carousel-item"
      key={item}>
      {/* <div className="a-wishlist"><span><Heart /></span></div> */}
      {item.coachingBannerUrl === null ? (
        <span
          style={{
            backgroundImage: `url('https://via.placeholder.com/272x150?text=${item.coachingName}')`,
          }}></span>
      ) : (
        <span
          style={{
            backgroundImage: `url(${item.coachingBannerUrl})`,
          }}></span>
      )}

      <div className="a-listItem">
        <div className="a-listTop">
          <div className="a-itemHead">
            <h4>{item.coachingName}</h4>
            <div className="a-ratingandstars">
              <div className="a-avatarProfile">
                {item.coachingLogoUrl === null ? (
                  <span
                    style={{
                      backgroundImage: `url('https://via.placeholder.com/40x40?text=${item.coachingName}')`,
                    }}></span>
                ) : (
                  <span
                    style={{
                      backgroundImage: `url(${item.coachingLogoUrl})`,
                    }}></span>
                )}
              </div>
              <b>
                <span>
                  <Star />
                </span>{' '}
                {(item.coachingRating &&
                  item.coachingRating.toFixed(1) > 2 &&
                  item.coachingRating.toFixed(1)) ||
                  `-`}
              </b>
              <b>
                (
                {item.coachingRatingCount.toFixed(1) > 2
                  ? `${item.coachingRatingCount} Ratings`
                  : `Not Rated`}
                )
              </b>
            </div>
          </div>
          <p className="a-location">
            <span>
              <Location />
            </span>{' '}
            {item.cityName}, {item.stateName}
          </p>
          <p className="a-typeExam">
            {item.examTypes.length <= 2 ? (
              item.examTypes.map((i, idx) => (
                <React.Fragment key={idx}>
                  {i.examType} {idx !== item.examTypes.length - 1 ? '& ' : ''}{' '}
                </React.Fragment>
              ))
            ) : (
              <div>
                {item.examTypes.slice(0, 2).map((i, idx) => (
                  <React.Fragment key={idx}>
                    {i.examType}{' '}
                    {idx !== item.examTypes.slice(0, 2).length - 1 ? '& ' : ''}{' '}
                  </React.Fragment>
                ))}

                <ToolTip
                  message={`${item.examTypes
                    .slice(2)
                    .map((el) => el.examType)}`}
                  position={'top'}>
                  <p>
                    {'+'}
                    {item.examTypes
                      .slice(2)
                      .reduce((acc, current) => acc + 1, 0)}
                  </p>
                </ToolTip>
              </div>
            )}
          </p>
        </div>
        <div className="a-itemGroup">
          <div className="a-itemsGp">
            <h6>
              {item.coachingTestCount > 1
                ? `${item.coachingTestCount - 1} +`
                : item.coachingTestCount}
            </h6>
            <p>Test</p>
          </div>
          <div className="a-itemsGp">
            <h6>
              {item.coachingStudentCount > 1
                ? `${item.coachingStudentCount - 1} +`
                : item.coachingStudentCount}
            </h6>
            <p>Students</p>
          </div>
          <div className="a-itemsGp">
            <h6>
              {item.coachingFollowersCount > 1
                ? `${item.coachingFollowersCount - 1} +`
                : item.coachingFollowersCount}
            </h6>
            <p>Followers</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedCoachingItem;
