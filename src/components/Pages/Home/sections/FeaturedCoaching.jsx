import React from 'react';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../../Elements/Carousel';
import { Arrow } from '../../../Core/Layout/Icon';
import FeaturedCoachingItem from '../components/FeaturedCoachingItem';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectFeaturedCoaching } from '../../../../redux/homepage/homepage.selectors';
import CardSkeleton from './../../../../skeletons/CardSkeleton';
import { useHistory } from 'react-router-dom';

const FeaturedCoaching = ({ featuredCoaching }) => {
  const history = useHistory();
  const myArrow = ({ type, onClick, isEdge }) => {
    const carlPointer = type === consts.PREV ? <Arrow /> : <Arrow />;
    const carlClass = type === consts.PREV ? 'prev' : 'next';
    return (
      <button
        className={`a-btn-arrow ${carlClass}`}
        onClick={onClick}
        disabled={isEdge}>
        {carlPointer}
      </button>
    );
  };

  const breakPoints = [
    { width: 2, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 1 },
    { width: 850, itemsToShow: 4, itemsToScroll: 1 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ];

  return (
    <div className="a-wrapper featured-wrapper featured-coaching">
      <div className="a-container">
        <a
          className="viewall"

          onClick={() => history.push('/coaching')}>
          View All
        </a>
        {featuredCoaching === '' ? (
          <CardSkeleton />
        ) : (
            <Carousel heading={'Featured Coaching'}>
              <ReactCarousel
                itemsToShow={4}
                itemsToScroll={1}
                breakPoints={breakPoints}
                renderArrow={myArrow}>
                {featuredCoaching &&
                  featuredCoaching.map((item) => (
                    <FeaturedCoachingItem key={item.id} item={item} />
                  ))}
              </ReactCarousel>
            </Carousel>
          )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  featuredCoaching: selectFeaturedCoaching,
});

export default connect(mapStateToProps)(FeaturedCoaching);
