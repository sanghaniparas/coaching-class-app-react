import React from 'react';
import { LineArrow } from '../../../Core/Layout/Icon';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectTestimonials,
  selectTestimonialImages,
} from '../../../../redux/homepage/homepage.selectors';

import SwiperCore, { Pagination, EffectFade, Autoplay, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/thumbs/thumbs.scss';

SwiperCore.use([Pagination, EffectFade, Autoplay, Thumbs]);

const AboutUs = ({ testimonials, testimonialImages }) => {

  // console.log(testimonialImages);
  return (
    <div className="student-say">
      <div className="a-container">
        {testimonialImages !== undefined &&
          testimonialImages.map((el, idx) => (
            <div key={idx}
              className={
                idx % 2 === 0
                  ? `student-img student-say-img${idx + 1}`
                  : `student-img student-say-img${idx}-r`
              }>
              <img src={el.ImageUrl} alt="profile pic" />
            </div>
          ))}

        <h2>What Students Say About Us</h2>
        <div className="stydent-say-block">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            speed={1000}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            effect={'slide'}
            loop={true}
            allowTouchMove={true}
            uniqueNavElements={true}
            pagination={{ clickable: true, type: 'bullets' }}
            thumbs={{ autoScrollOffset: 1 }}>
            {testimonials !== undefined &&
              testimonials.map((item) => (
                <SwiperSlide key={item}>
                  <div className="a-heroSlider">
                    <div className="say-box">
                      <p>{item.review}</p>
                      <h5>{item.address}</h5>
                      {/* <a className="readmore">
						  Read More <LineArrow fill="#FF7249" />
						</a> */}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        {/* {testimonials ?
          <div className="story-button-row">
            <button className="btn-primary text-capital">See All Stories</button>
            <button className="btn-secondary-pill">Share your Stories</button>
          </div> : ""} */}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  testimonials: selectTestimonials,
  testimonialImages: selectTestimonialImages,
});

export default connect(mapStateToProps)(AboutUs);
