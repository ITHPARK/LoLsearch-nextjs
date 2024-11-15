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
    console.log(summonerRank)

    setCartDataArr({
      labels: ['승리', '패배'],
      chartData: [summonerRank[0].wins, summonerRank[0].losses],
      backgroundColor: ['#5383E8', '#E84057'],
    })
  }, [summonerRank])

  return (
    <Flex className="mt-[30px]">
      <Flex className="p-[10px] bg-[#363742] rounded-[5px]">
        <div>
          <div className="w-[150px] h-[150px]">
            <ImageBox src={`/tier/${summonerRank[0].tier}.png`} />
          </div>
          <Text size="t2" display="block" textAlign="center">
            {summonerRank[0].tier}&nbsp;
            {summonerRank[0].rank}
          </Text>
        </div>
        <Flex>
          <Text size="t2">개인/랭크</Text>
          <div></div>
        </Flex>
      </Flex>
      <DoughnutChart
        labels={cartDataArr?.labels}
        chartData={cartDataArr?.chartData}
        backgroundColor={cartDataArr?.backgroundColor}
      />
    </Flex>
  )
}

export default SummonerRank
