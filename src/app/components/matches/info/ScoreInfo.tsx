'use client'

import React from 'react'
import Flex from '@/app/components/shared/Flex'
import Text from '@/app/components/shared/Text'
import { playerProps } from '@/models/type'
import { matchInfoProps } from '@/models/type'

const ScoreInfo = ({
  player,
  matchInfo,
}: {
  player: playerProps
  matchInfo: matchInfoProps
}) => {
  return (
    <Flex direction="col" justify="center" className=" gap-[5px]">
      <Text size="t2" className="text-[#4D4D4D]" weight="bold">
        평점 :&nbsp;
        {player?.deaths
          ? ((player?.kills + player?.assists) / player?.deaths).toFixed(2)
          : 'Perfect'}
      </Text>
      <Text size="t2" className="text-[#4D4D4D]">
        CS : {player?.totalMinionsKilled} &nbsp;
        {`(${(player?.totalMinionsKilled / Math.floor(matchInfo.info.gameDuration / 60)).toFixed(1)})`}
      </Text>
      <Text size="t2" className="text-[#4D4D4D]">
        골드 : {player?.goldEarned}
      </Text>
    </Flex>
  )
}

export default ScoreInfo
