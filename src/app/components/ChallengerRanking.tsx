'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Flex from '@/app/components/shared/Flex'
import '@/app/swiper.css'
import 'swiper/css/navigation'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import ImageBox from '@/app/components/shared/ImageBox'
import Text from '@/app/components/shared/Text'
import { IoMdArrowDropleft } from '@react-icons/all-files/io/IoMdArrowDropleft'
import { IoMdArrowDropright } from '@react-icons/all-files/io/IoMdArrowDropright'
import { useRouter } from 'next/navigation'

const fetchChallengerRanking = async () => {
  const response = await axios.get('/api/league')

  return response.data
}

const ChallengerRanking = () => {
  const router = useRouter()

  //swiper navigation에 적용할 ref
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  //랭킹 데이터 호출
  const { data: ranking, isLoading: rankingLoading } = useQuery({
    queryKey: ['ranking'],
    queryFn: fetchChallengerRanking,
  })

  useEffect(() => {
    if (ranking != null) {
      //summonerid만 골라낸다.
      console.log(ranking)
    }
  }, [ranking])

  //랭킹 api 호출중이면
  if (rankingLoading) {
    return (
      <div className="p-[20px] border-[1px] border-solid border-[#fff] rounded-[5px]">
        로딩중,,,
      </div>
    )
  }

  return (
    <Flex className="p-[20px] border-[1px] border-solid border-[#fff] rounded-[5px] shadow-rankingShadow">
      <Swiper
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current as HTMLElement | null,
          nextEl: nextRef.current as HTMLElement | null,
        }}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== 'boolean'
          ) {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
          }
        }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
      >
        {ranking.map((item: string[], index: number) => {
          return (
            <SwiperSlide key={item[0]}>
              <Flex align="center">
                <div className="w-[50px] h-[50px] mr-[15px]">
                  <ImageBox src={`/tier/CHALLENGER.png`} />
                </div>
                <Text
                  size="t2"
                  className="px-[4px] py-[3px] mr-[5px] bg-decoLose rounded-[3px]"
                >
                  No.{index + 1}
                </Text>
                <Text
                  size="t2"
                  className="px-[4px] py-[3px] mr-[15px] bg-decoWin rounded-[3px]"
                >
                  KR
                </Text>
                <button
                  onClick={() => {
                    router.push(`/summoners/${item[0]}-${item[1]}`)
                  }}
                >
                  <Text
                    size="t3"
                    weight="bold"
                    className="mr-[10px] hover:underline  cursor-pointer"
                  >
                    {item[0]}
                  </Text>

                  <Text size="t2" className="cursor-pointer">
                    #{item[1]}
                  </Text>
                </button>
              </Flex>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Flex className="swiper-navigation ">
        <button className="swiper_prev" ref={prevRef}>
          <IoMdArrowDropleft size={24} />
        </button>
        <button className="swiper_next" ref={nextRef}>
          <IoMdArrowDropright size={24} />
        </button>
      </Flex>
    </Flex>
  )
}

export default ChallengerRanking
