import React from 'react';
import { LineArrow } from '../../Core/Layout/Icon';

import SwiperCore, { Pagination, EffectFade, Autoplay, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/thumbs/thumbs.scss';

SwiperCore.use([Pagination, EffectFade, Autoplay, Thumbs]);
export default function PassTestimonials({studentTestimonial}) {
  return (
    <div className="student-say pass">
      <div className="a-container">
        <h2>What Students Say</h2>
        <div className="stydent-say-block">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            speed={1000}
            //autoplay={{ delay: 3000, disableOnInteraction: false }}
            effect={'slide'}
            loop={true}
            allowTouchMove={true}
            uniqueNavElements={true}
            pagination={{ clickable: true, type: 'bullets' }}
            thumbs={{ autoScrollOffset: 1 }}>
            {studentTestimonial.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="a-heroSlider" >
                  <div className="say-box">
                    <p class="testinominal">{`"${item.review}"`}</p>
                    
                    <div className="testimonial-info">
                      <h5>{`${item.name}, ${item.examDetails}, ${item.address}`}</h5>
                      {/* <img className="student-img" src={require('../../../assets/images/about-02.jpg')} alt="" /> */}
                      <img className="student-img" 
                      src={item.profileImageUrl && item.profileImageUrl || `https://via.placeholder.com/272x150?text=${item.name}`} 
                      onError={e => { e.currentTarget.src = require('../../../assets/images/about-02.jpg') }}
                      alt="" />
                    </div>
                    
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
