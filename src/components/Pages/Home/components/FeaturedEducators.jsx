import React from 'react';
import { LineArrow } from '../../../Core/Layout/Icon';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFeaturedEducators } from './../../../../redux/homepage/homepage.selectors';

const FeaturedEducators = ({ educatorsCount }) => {
  const history = useHistory();
  let splitFeaturedCoachingArr = educatorsCount !== undefined && educatorsCount.length && educatorsCount[0].home_page_featured_coaching_lists.length?
    educatorsCount[0].home_page_featured_coaching_lists.length > 5 ? educatorsCount[0].home_page_featured_coaching_lists.slice(0, 5) : educatorsCount[0].home_page_featured_coaching_lists
    :[];
  return (
    <div className="featured-educator">
      <ul>
        {educatorsCount !== undefined &&
          educatorsCount.length &&
          splitFeaturedCoachingArr.map((el) => (
            <li key={el.coachingId}
              style={{ cursor: 'pointer' }}
              onClick={() => history.push(`/coaching/${el.coachingId}`)}>
              {el.coachingLogoUrl === null ? (
                <img
                  src={`https://via.placeholder.com/40x40?text=${el.coachingName}`}
                  alt="profile pic"
                />
              ) : (
                <img src={`${el.coachingLogoUrl}`} alt="profile pic" />
              )}
            </li>
          ))}
      </ul>
      <span>50+ Featured Educators</span>
      <a
        className="viewall"
        style={{ cursor: 'pointer' }}
        onClick={() => history.push('/coaching')}>
        View All <LineArrow fill="#000000" />{' '}
      </a>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  educatorsCount: selectFeaturedEducators,
});

export default connect(mapStateToProps)(FeaturedEducators);
