import React from 'react';
import BannerBottom from '../sections/BannerBottom';
import { LineArrow } from '../../../Core/Layout/Icon';
import SwiperCore, { Pagination, EffectFade, Autoplay, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectHomeSliders } from './../../../../redux/homepage/homepage.selectors';
import BannerSkeleton from './../../../../skeletons/BannerSkeleton';

// For carousel sliders
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/thumbs/thumbs.scss';
import Login from '../../Login/Login';

SwiperCore.use([Pagination, EffectFade, Autoplay, Thumbs]);

const Banner = ({ sliders }) => {
  console.log("testslide", sliders);
  return (
    <div className="banner-section">
      {sliders === undefined ? (
        <BannerSkeleton />
      ) : (
          <>
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              speed={1000}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              effect={'slide'}
              loop={true}
              allowTouchMove={true}
              uniqueNavElements={true}
              pagination={false}
              thumbs={{ autoScrollOffset: 1 }}>
              {sliders &&
                sliders.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    {item !== null ? (

                      <a   {...item.targetUrl ? {href: `https://${item.targetUrl}`} : {}}   style={{cursor: item.targetUrl ? '' : 'none'}} target="_blank">
                        <div className="banner-top">
                          <img src={item.sliderImageUrl} alt="" />
                        </div>
                      </a>
                    ) : (
                        <a {...item.targetUrl ? {href: `https://${item.targetUrl}`} : {}} target="_blank" style={{cursor: item.targetUrl ? '' : 'none'}}>
                          <div
                            style={{
                              backgroundImage: `url('https://via.placeholder.com/1920x340?text=${item.sliderName}')`,
                            }}></div>
                        </a>
                      )}
                  </SwiperSlide>
                ))}
            </Swiper>
            <BannerBottom />
          </>
        )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sliders: selectHomeSliders,
});

export default connect(mapStateToProps)(Banner);
