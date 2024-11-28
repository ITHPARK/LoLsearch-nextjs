'use client'

import React, { useState, useEffect } from 'react'
import Flex from '@/app/components/shared/Flex'
import Text from '@/app/components/shared/Text'
import ImageBox from '@/app/components/shared/ImageBox'
import DoughnutChart from '@/app/components/chart/DonutChart '
import { SummonerRankProps, ChartData } from '@/models/type'

const SummonerRank = ({ summonerRank }: SummonerRankProps) => {
  const [cartDataArr, setCartDataArr] = useState<ChartData>({
    labels: [],
    chartData: [],
    backgroundColor: [],
    hoverBackgroundColor: [],
  })
  useEffect(() => {
    //랭크 정보가 있을 때  state 업데이트
    if (summonerRank.length > 0) {
      setCartDataArr({
        labels: ['승리', '패배'],
        chartData: [summonerRank[0].wins, summonerRank[0].losses],
        backgroundColor: ['#5383E8', '#E84057'],
      })
    }
  }, [summonerRank])

  return (
    <Flex className="mt-[30px]">
      <Flex className="p-[15px] gap-[20px] bg-[#363742] rounded-[5px] ">
        <div className="flex flex-col justify-center">
          <div className="w-[150px] h-[150px]">
            {summonerRank.length > 0 ? (
              <ImageBox src={`/tier/${summonerRank[0].tier}.png`} />
            ) : (
              <ImageBox src={`/tier/UNRANKED.png`} />
            )}
          </div>
          {summonerRank.length > 0 ? (
            <Text size="t2" display="block" textAlign="center">
              {summonerRank[0].tier}&nbsp;
              {summonerRank[0].rank}
            </Text>
          ) : (
            <Text size="t2" display="block" textAlign="center">
              UNRANKED
            </Text>
          )}
        </div>
        <Flex direction="col">
          <Text size="t2" textAlign="center">
            개인 / 랭크
          </Text>
          <Flex justify="center" align="center" className="flex-1">
            {summonerRank.length > 0 ? (
              <DoughnutChart
                labels={cartDataArr?.labels}
                chartData={cartDataArr?.chartData}
                backgroundColor={cartDataArr?.backgroundColor}
              />
            ) : (
              <Text display="block" size="t2">
                랭크게임 정보가 없습니다.
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SummonerRank
