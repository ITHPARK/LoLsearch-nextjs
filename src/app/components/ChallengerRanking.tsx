'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Flex from '@/app/components/shared/Flex'
import '@/app/swiper.css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const ChallengerRanking = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      //   pagination={{ clickable: true }}
      //   scrollbar={{ draggable: true }}
      className="p-[20px] border-[1px] border-solid border-[#fff] rounded-[5px]"
    >
      <SwiperSlide>
        <Flex>
          <div>순위</div>
          <div>티어로고</div>
          <div>KR</div>
          <div>닉네임</div>
          <div>태그</div>
        </Flex>
      </SwiperSlide>
      <SwiperSlide>
        <Flex>
          <div>순위</div>
          <div>티어로고</div>
          <div>KR</div>
          <div>닉네임</div>
          <div>태그</div>
        </Flex>
      </SwiperSlide>
      <SwiperSlide>
        <Flex>
          <div>순위</div>
          <div>티어로고</div>
          <div>KR</div>
          <div>닉네임</div>
          <div>태그</div>
        </Flex>
      </SwiperSlide>
    </Swiper>
  )
}

export default ChallengerRanking
