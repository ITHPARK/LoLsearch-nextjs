'use client'
import React from 'react'
import MatchLow from '@/components/shared/MatchLow'

interface AllMatchProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  matchData: any[]
}

const AllMatch = ({ matchData }: AllMatchProps) => {
  return (
    <div>
      {matchData.map((item, index) => {
        return <MatchLow key={index} matchInfo={item} />
      })}
    </div>
  )
}

export default AllMatch
