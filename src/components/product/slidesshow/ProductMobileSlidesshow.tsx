'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import './slideshow.css'
import { ProductImage } from '../product-image/ProductImage'

interface ProductMobileSlidesshowProps {
  images: string[]
  title: string
  className?: string
}

export const ProductMobileSlidesshow = ({
  images,
  title,
  className,
}: ProductMobileSlidesshowProps) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: '100vw',
          height: '500px',
        }}
        pagination
        autoplay={{
          delay: 3000,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className='mySwiper2'
      >
        {images?.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              width={600}
              height={500}
              src={image}
              alt={title}
              className='object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
