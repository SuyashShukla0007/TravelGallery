import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.module.css';
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';

export default function App({ images }) {
  return (
    <Swiper
      effect={'flip'}
      grabCursor={true}
      pagination={true}
      navigation={true}
      modules={[EffectFlip, Pagination, Navigation]}
      className="mySwiper overflow-hidden"
    >
      {images.map((img, key) => (
        <SwiperSlide key={key} className="flex items-center justify-center">
          <img
            src={img.urls.full}
            alt=""
            className="max-w-full max-h-full object-contain"
            style={{ height: '500px', width: 'auto' }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
