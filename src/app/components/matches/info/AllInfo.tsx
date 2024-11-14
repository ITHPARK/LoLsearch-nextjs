'use client'

import React, { useEffect, useState } from 'react'
import Flex from '@/app/components/shared/Flex'
import TeamDetail from '@/app/components/matches/info/TeamDetail'
import { infoCommonType } from '@/models/type'

const AllInfo = ({
  matchInfo,
  playerTeamId, //플레이어의 팀 id
}: {
  matchInfo: infoCommonType
  playerTeamId: number
}) => {
  const [sortedTeam, setSortedTeam] = useState<infoCommonType[]>([])
  const [divideTeam, setDivideTeam] = useState<infoCommonType[][]>([])
  const [bestDamage, setBestDamage] = useState<number>(0)

  useEffect(() => {
    const team = matchInfo.info.teams.sort(
      (a: infoCommonType, b: infoCommonType) => {
        //a의 팀id가 플레이어 팀 아이디와 같은지
        const hasPlayer1 = a.teamId == playerTeamId

        //b의 팀id가 플레이어 팀 아이디와 같은지
        const hasPlayer2 = b.teamId == playerTeamId

        if (hasPlayer1 && !hasPlayer2) return -1 //a가 플레이어 팀이므로 a가 b보다 앞에 위치
        if (!hasPlayer1 && hasPlayer2) return 1 //b가 플레이어 팀이므로 b가 a보다 앞에 위치

        return 0
      },
    )

    const divide: infoCommonType[][] = []

    team.map(
      (item: Record<string, (string | null)[] | boolean | number | null>) => {
        const arr = matchInfo.info.participants.filter(
          (arrItem: infoCommonType) => {
            return arrItem.teamId == item.teamId
          },
        )

        divide.push(arr)
      },
    )

    //게임내 최고 피해량 구하기
    const maxDamage = [...matchInfo.info.participants].sort(
      //각 챔프의 피해량을 기준으로 정렬
      (a: infoCommonType, b: infoCommonType) => {
        const damageA =
          a.magicDamageDealtToChampions + a.physicalDamageDealtToChampions
        const damageB =
          b.magicDamageDealtToChampions + b.physicalDamageDealtToChampions

        if (damageA > damageB) return -1 //damageA가 damageB 보다 크면 damageA가 앞에 위치
        if (damageA < damageB) return 1 //damageB가 damageA 보다 크면 damageB가 앞에 위치

        return 0
      },
    )

    setBestDamage(
      maxDamage[0].magicDamageDealtToChampions +
        maxDamage[0].physicalDamageDealtToChampions,
    )

    setDivideTeam(divide)
    setSortedTeam(team)
  }, [matchInfo, playerTeamId])

  return (
    <Flex direction="col" className="gap-[20px]">
      {sortedTeam != null
        ? sortedTeam.map((item: infoCommonType, index: number) => {
            return (
              <TeamDetail
                key={index}
                teamInfo={item}
                divide={divideTeam[index]}
                bestDamage={bestDamage}
              />
            )
          })
        : ''}
    </Flex>
  )
}

export default AllInfo
