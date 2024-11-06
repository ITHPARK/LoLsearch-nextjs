'use client'
import React from 'react'
import MatchLow from '@/components/shared/MatchLow'
import Flex from '@/components/shared/Flex'

interface AllMatchProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  matchData: any[]
}

const AllMatch = ({ matchData }: AllMatchProps) => {
  return (
    <Flex direction="col" className="gap-[5px]">
      {matchData.map((item, index) => {
        return <MatchLow key={index} matchInfo={item} />
      })}
    </Flex>
  )
}

export default AllMatch
