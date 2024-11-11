import React, { useState, useEffect } from 'react'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import ChampionProfile from '@/components/shared/ChampionProfile'
import { matchInfoProps } from '@/models/type'

interface SummonerTeam {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const TeamInfo = ({ matchInfo }: matchInfoProps) => {
  const [team, setTeam] = useState({
    team1: [] as SummonerTeam[],
    team2: [] as SummonerTeam[],
  })

  //팀 별로 구분
  const [team1, team2] = [
    matchInfo.data.info.participants.filter(
      (item: SummonerTeam) => item.teamId == 100,
    ),
    matchInfo.data.info.participants.filter(
      (item: SummonerTeam) => item.teamId == 200,
    ),
  ]

  useEffect(() => {
    setTeam({
      team1: team1,
      team2: team2,
    })
  }, [matchInfo, team1, team2])

  return (
    <Flex className="gap-[10px]">
      <Flex direction="col" justify="between">
        {team.team1.map((item: SummonerTeam, index: number) => (
          <Flex align="center" key={index}>
            <button
              onClick={() => {
                window.open(
                  `/summoners/${item.riotIdGameName}-${item.riotIdTagline}`,
                  '_blank',
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
                {item.riotIdGameName}
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
                window.open(
                  `/summoners/${item.riotIdGameName}-${item.riotIdTagline}`,
                  '_blank',
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
                {item.riotIdGameName}
              </Text>
            </button>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

export default TeamInfo
