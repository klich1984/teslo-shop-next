'use client'
// Import Swiper React components
import React, { useState } from 'react'

import { Swiper as SwiperObject } from 'swiper' // Objeto pcon la funcionalidad para el tipado
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import './slideshow.css'
import Image from 'next/image'

interface ProductSlidesshowProps {
  images: string[]
  title: string
  className?: string
}

export const ProductSlidesshow = ({
  images,
  title,
  className,
}: ProductSlidesshowProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>()

  return (
    <div className={className}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 3000,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className='mySwiper2'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={1024}
              height={800}
              src={`/products/${image}`}
              alt={title}
              className='rounded-lg object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={300}
              height={300}
              src={`/products/${image}`}
              alt={title}
              className='rounded-lg object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
