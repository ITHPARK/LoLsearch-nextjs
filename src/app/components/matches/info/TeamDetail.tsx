import React, { useEffect } from 'react'
import Flex from '../../shared/Flex'
import { playerInfoProps } from '@/models/type'

interface playersProps {
  teamInfo: Record<string, (string | null)[] | boolean | number | null>
  players: playerInfoProps
  divide: playerInfoProps[]
}

const TeamDetail = ({ teamInfo, players, divide }: playersProps) => {
  useEffect(() => {
    console.log(divide)
  }, [teamInfo, players, divide])

  return (
    <Flex direction="col">
      {divide.map((item: playerInfoProps, index: number) => {
        console.log(typeof item)
        return (
          <Flex key={index}>
            {item.championName && <div>{item.championName}</div>}
          </Flex>
        )
      })}
    </Flex>
  )
}

export default TeamDetail
