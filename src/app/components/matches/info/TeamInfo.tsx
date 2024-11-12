'use client'

import React, { useState, useEffect } from 'react'
import Flex from '@/app/components/shared/Flex'
import Text from '@/app/components/shared/Text'
import ChampionProfile from '@/app/components/shared/ChampionProfile'
import { matchInfoProps } from '@/models/type'
import { useRouter } from 'next/navigation'

interface SummonerTeam {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const TeamInfo = ({ matchInfo }: matchInfoProps) => {
  const router = useRouter()

  const [team, setTeam] = useState({
    team1: [] as SummonerTeam[],
    team2: [] as SummonerTeam[],
  })

  //팀 별로 구분
  const [team1, team2] = [
    matchInfo.info.participants.filter(
      (item: SummonerTeam) => item.teamId == 100,
    ),
    matchInfo.info.participants.filter(
      (item: SummonerTeam) => item.teamId == 200,
    ),
  ]

  useEffect(() => {
    setTeam({
      team1: team1,
      team2: team2,
    })
  }, [matchInfo])

  return (
    <Flex className="gap-[10px]">
      <Flex direction="col" justify="between">
        {team.team1.map((item: SummonerTeam, index: number) => (
          <Flex align="center" key={index}>
            <button
              onClick={() => {
                router.push(
                  `/summoners/${item.riotIdGameName}-${item.riotIdTagline}`,
                )
              }}
              className="flex items-center"
            >
              <ChampionProfile
                name={item.championName}
                className="w-[15px] h-[15px]"
              />
              <Text
                size="t1"
                className="text-[#4D4D4D] ml-[5px] w-[70px] text-ellipsis overflow-hidden whitespace-nowrap"
              >
                {/* {item.riotIdGameName} */}
                유저 이름
              </Text>
            </button>
          </Flex>
        ))}
      </Flex>
      <Flex direction="col" justify="between">
        {team.team2.map((item: SummonerTeam, index: number) => (
          <Flex align="center" key={index}>
            <button
              onClick={() => {
                router.push(
                  `/summoners/${item.riotIdGameName}-${item.riotIdTagline}`,
                )
                // window.open(
                //   `/summoners/${item.riotIdGameName}-${item.riotIdTagline}`,
                //   '_blank',
                // )
              }}
              className="flex items-center"
            >
              <ChampionProfile
                name={item.championName}
                className="w-[15px] h-[15px]"
              />
              <Text
                size="t1"
                className="text-[#4D4D4D] ml-[5px] w-[70px] text-ellipsis overflow-hidden whitespace-nowrap"
              >
                {/* {item.riotIdGameName} */}
                유저 이름
              </Text>
            </button>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default TeamInfo