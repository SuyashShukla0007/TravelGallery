import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import './styles.module.css';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

export default function Fade({ images }) {
  return (
    <Swiper
      spaceBetween={30}
      effect={'creative'}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Navigation, Pagination]}
      className="mySwiper"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index} className="flex items-center justify-center">
          <img
            src={img.urls.full}
            alt={`Slide ${index + 1}`}
            className="max-w-full max-h-full object-contain"
            style={{ height: '500px', width: 'auto' }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
