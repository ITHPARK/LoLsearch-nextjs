'use client'

import React, { useEffect, useState } from 'react'
import Flex from '@/app/components/shared/Flex'
import Text from '@/app/components/shared/Text'
import TeamDetail from '@/app/components/matches/info/TeamDetail'

const AllInfo = ({
  matchInfo,
  playerTeamId, //플레이어의 팀 id
}: {
  matchInfo: Record<string, any>
  playerTeamId: number
}) => {
  const [sortedTeam, setSortedTeam] = useState<Record<string, any>>([])
  const [divideTeam, setDivideTeam] = useState<Record<string, any>[]>([])

  useEffect(() => {
    const team = matchInfo.info.teams.sort(
      (a: Record<string, any>, b: Record<string, any>) => {
        //a의 팀id가 플레이어 팀 아이디와 같은지
        const hasPlayer1 = a.teamId == playerTeamId

        //b의 팀id가 플레이어 팀 아이디와 같은지
        const hasPlayer2 = b.teamId == playerTeamId

        if (hasPlayer1 && !hasPlayer2) return -1 //a가 플레이어 팀이므로 a가 b보다 앞에 위치
        if (!hasPlayer1 && hasPlayer2) return 1 //b가 플레이어 팀이므로 a가 b보다 앞에 위치

        return 0
      },
    )

    const divide: Record<string, any>[] = []

    team.map(
      (item: Record<string, (string | null)[] | boolean | number | null>) => {
        const arr = matchInfo.info.participants.filter(
          (arrItem: Record<string, any>) => {
            return arrItem.teamId == item.teamId
          },
        )

        divide.push(arr)
      },
    )

    setDivideTeam(divide)
    setSortedTeam(team)
  }, [matchInfo, playerTeamId])

  return (
    <div>
      {sortedTeam != null
        ? sortedTeam.map(
            (
              item: Record<string, (string | null)[] | boolean | number | null>,
              index: number,
            ) => {
              return (
                <TeamDetail
                  key={index}
                  teamInfo={item}
                  players={matchInfo.info.participants}
                  divide={divideTeam[index]}
                />
              )
            },
          )
        : ''}
    </div>
  )
}

export default AllInfo
