import React from 'react';
import { useHistory } from 'react-router-dom';
import SwiperCore, { Pagination, EffectFade, Autoplay, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/thumbs/thumbs.scss';

SwiperCore.use([Pagination, EffectFade, Autoplay, Thumbs]);
export default function CoachingSlider({ sliderCoaching }) {
  const history = useHistory();
  return (
    <div className="a-slider">
      <div className="a-brdcum">
        <div className="a-container">
          <div className="a-inner-brdcum">
            <ul>
              <li>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => history.push('/')}>
                  Home &nbsp;&gt;
                </span>
              </li>
              <li>
                <b>Coaching</b>
              </li>
            </ul>
            {/* <h5>Coachings</h5> */}
          </div>
        </div>
      </div>
      {sliderCoaching.sliders.length > 0 ? (
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
          {sliderCoaching &&
            sliderCoaching.sliders.map((item, idx) => (
              <SwiperSlide key={idx}>
                {item !== null ? (
                  <div
                    className="a-heroSlider"
                    style={{
                      backgroundImage: `url(${item.sliderImageUrl})`,
                    }}></div>
                ) : (
                  <div
                    style={{
                      backgroundImage: `url('https://via.placeholder.com/1920x340?text=${item.sliderName}')`,
                    }}></div>
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <div className="no-Slider">
          <img
            style={{
              backgroundImage: `url(${require(`../../../assets/images/CoachingPage.png`)})`,
            }}
            alt="No Data"
          />
        </div>
      )}
    </div>
  );
}
