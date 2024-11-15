'use client'

import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { summonerPuuid } from '@/atom/summoner'
import classNames from 'classnames'
import Flex from '@/app/components/shared/Flex'
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown'
import GameCategory from '@/app/components/matches/info/GameCategory'
import CharactorSet from '@/app/components/matches/info/CharactorSet'
import KillDeathInfo from '@/app/components/matches/info/KillDeathInfo'
import ItemInfo from '@/app/components/matches/info/ItemInfo'
import ScoreInfo from '@/app/components/matches/info/ScoreInfo'
import TeamInfo from '@/app/components/matches/info/TeamInfo'
import AllInfo from '@/app/components/matches/info/AllInfo'
import Tab from '@/app/components/shared/Tab'
import Skeleton from './Skeleton'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const fetchGameInfo = async (matchid: string) => {
  const response = await axios.get(`/api/match/matchInfo/?matchId=${matchid}`)
  return response.data
}

const MatchLow = ({ matchid }: { matchid: string }) => {
  //low의 화살표을 눌러을때 상세정보를 펼치는 상태
  const [Detail, setDetail] = useState<boolean>(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [player, setPlayer] = useState<any>(null)
  const playerPuuid = useRecoilValue(summonerPuuid) //플레이어의 puuid

  const { data: matchInfo, isLoading: matchInfoLoading } = useQuery({
    queryKey: ['matchInfo', matchid],
    queryFn: () => fetchGameInfo(matchid),
  })

  useEffect(() => {
    if (matchInfo != null && playerPuuid != null) {
      const playerFilter = matchInfo.info.participants.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: { [key: string]: any }) => {
          //매치 정보에서 검색한 소환사의 정보를 찾는다.
          return item.puuid == playerPuuid
        },
      )
      setPlayer(playerFilter[0]) //검색한 소환사의 정보를 state에 저장
    }
  }, [matchInfo, playerPuuid, player])

  if (matchInfoLoading) {
    return <Skeleton height={120} />
  }

  return (
    <Flex direction="col" className="bg-transparent">
      <Flex
        className={classNames(
          'p-[10px] rounded-tl-[3px] rounded-tr-[3px] ',
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
      </Flex>
      {Detail && (
        <div className="p-[15px] bg-white shadow-detailBox">
          <Tab
            labels={['종합']}
            components={{
              종합: (
                <AllInfo matchInfo={matchInfo} playerTeamId={player.teamId} />
              ),
            }}
            flexoption="gap-[10px]"
            buttonClass="px-[40px] py-[10px]  rounded-tl-[3px] rounded-[3px] text-[#4D4D4D]"
            pageClass="mt-[10px] "
            focusColor={player.win ? '#ECF2FF' : '#fff1f3'}
          />
        </div>
      )}

      <Flex
        justify="center"
        align="center"
        className={classNames(
          'w-full h-[20px] rounded-bl-[3px] rounded-br-[3px]',
          player?.win ? 'bg-decoWin' : 'bg-decoLose',
        )}
      >
        <button
          className="w-full h-full flex justify-center items-center"
          onClick={() => setDetail((prev) => !prev)}
        >
          <IoIosArrowDown
            fill="#fff"
            className={classNames(Detail ? 'rotate-180' : '')}
          />
        </button>
      </Flex>
    </Flex>
  )
}

export default MatchLow
