import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import './Cube.module.css';
import { EffectCube, Pagination } from 'swiper/modules';

export default function Cube({ images }) {
  return (
    <Swiper
      effect={'cube'}
      grabCursor={true}
      cubeEffect={{
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      }}
      pagination={true}
      modules={[EffectCube, Pagination]}
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
