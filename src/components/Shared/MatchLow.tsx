'use client'

import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { summonerPuuid } from '@/atom/summoner'
import classNames from 'classnames'
import Flex from '@/app/components/shared/Flex'
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown'
import GameCategory from '@/components/matches/info/GameCategory'
import CharactorSet from '@/components/matches/info/CharactorSet'
import KillDeathInfo from '@/components/matches/info/KillDeathInfo'
import ItemInfo from '@/components/matches/info/ItemInfo'
import ScoreInfo from '@/components/matches/info/ScoreInfo'
import TeamInfo from '@/components/matches/info/TeamInfo'
import { matchInfoProps } from '@/models/type'

const MatchLow = ({ matchInfo }: matchInfoProps) => {
  const playerPuuid = useRecoilValue(summonerPuuid)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [player, setPlayer] = useState<any>(null)

  useEffect(() => {
    if (matchInfo && playerPuuid) {
      const playerInfo = matchInfo.data.info.participants.filter(
        (item: matchInfoProps) => {
          return item.puuid == playerPuuid
        },
      )

      setPlayer(playerInfo[0])
    }
  }, [matchInfo, playerPuuid])

  return (
    <Flex direction="col" className="bg-transparent">
      123213
      {/* <Flex
        className={classNames(
          'p-[10px] rounded-tl-[3px] rounded-tr-[3px]',
          player?.win ? 'bg-matchResultWin' : 'bg-matchResultLose',
        )}
      >
        <GameCategory player={player} matchInfo={matchInfo} />

        <Flex justify="between" className="w-full">
          <CharactorSet player={player} />

          <KillDeathInfo player={player} />

          <ItemInfo player={player} />

          <ScoreInfo player={player} matchInfo={matchInfo} />

          <TeamInfo matchInfo={matchInfo} />
        </Flex>
      </Flex> */}
      {/* <Flex
        justify="center"
        align="center"
        className={classNames(
          'w-full h-[20px] rounded-bl-[3px] rounded-br-[3px]',
          player?.win ? 'bg-decoWin' : 'bg-decoLose',
        )}
      >
        <IoIosArrowDown fill="#fff" />
      </Flex> */}
    </Flex>
  )
}

export default MatchLow
