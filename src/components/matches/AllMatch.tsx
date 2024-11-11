import React from 'react'
import MatchLow from '@/components/shared/MatchLow'
import Flex from '@/app/components/shared/Flex'

interface AllMatchProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  matchIds: string[]
}

const AllMatch = ({ matchIds }: AllMatchProps) => {
  console.log(matchIds)
  return (
    <Flex direction="col" className="gap-[5px]">
      {matchIds.map((item: string, index: number) => {
        return <MatchLow key={index} matchid={item} />
      })}
    </Flex>
  )
}

export default AllMatch
