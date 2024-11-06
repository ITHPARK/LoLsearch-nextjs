import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { summonerPuuid } from '@/atom/summoner'
import classNames from 'classnames'
import Flex from '@/components/shared/Flex'

interface MatchListProps {
  [key: string]: any
}

const MatchLow = ({ matchInfo }: MatchListProps) => {
  const playerPuuid = useRecoilValue(summonerPuuid)
  const [player, setPlayer] = useState<any>(null)

  useEffect(() => {
    const playerInfo = matchInfo?.data.info.participants.filter(
      (item: MatchListProps) => {
        return item.puuid == playerPuuid
      },
    )

    console.log(playerInfo[0])
    console.log(matchInfo)

    setPlayer(playerInfo[0])
  }, [matchInfo, playerPuuid])

  //경기 승패 컬러
  const matchResultColor = {
    win: 'bg-[#ECF2FF]',
    lose: 'bg-[#fff1f3]',
  }

  const decoColor = {
    win: 'bg-[#5383E8]',
    lose: 'bg-[#E84057]',
  }

  return (
    <Flex direction="col" className="bg-transparent">
      <Flex
        className={classNames(
          'p-[10px] rounded-tl-[3px] rounded-tr-[3px]',
          player?.win ? matchResultColor['win'] : matchResultColor['lose'],
        )}
      >
        123
        <div></div>
        <div></div>
      </Flex>
      <div
        className={classNames(
          'w-full h-[20px] rounded-bl-[3px] rounded-br-[3px]',
          player?.win ? decoColor['win'] : decoColor['lose'],
        )}
      ></div>
    </Flex>
  )
}

export default MatchLow
