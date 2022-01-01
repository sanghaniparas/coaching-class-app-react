import React from 'react';
import SwiperCore, { Pagination, EffectFade, Autoplay, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/thumbs/thumbs.scss'

SwiperCore.use([Pagination, EffectFade, Autoplay, Thumbs]);
export default function CoachingDetailSlider({ detailsPageSlider }) {
    return (
        <div className="a-details-slider">
            {detailsPageSlider.banners.length > 0 ? (
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    speed={1000}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    effect={'fade'}
                    loop={true}
                    allowTouchMove={true}
                    uniqueNavElements={true}
                    pagination={{ clickable: true, type: 'bullets' }}
                    thumbs={{ autoScrollOffset: 1 }}>
                    {detailsPageSlider && detailsPageSlider.banners.map((item, idx) => (
                        <SwiperSlide key={idx}>
                            {item !== null ? (
                                <div
                                    className="a-heroSlider"
                                    style={{ backgroundImage: `url(${item.bannerUrl})` }}>
                                </div>
                            ) : (
                                <div
                                    style={{ backgroundImage: `url('https://via.placeholder.com/1920x260?text=${item.coachingName}')` }}>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <div className="no-Slider">
                    <img src="https://via.placeholder.com/1920x340?text=No Slider Available" alt="No Data" />
                </div>
            )}
        </div>
    )
}
