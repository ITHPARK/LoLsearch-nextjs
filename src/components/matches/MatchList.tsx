'use client'

import React, { useState, useEffect } from 'react'
import ContentTop from '@/components/shared/ContentTop'
import Tab from '@/components/shared/Tab'
import axios from 'axios'

// Props 타입 정의
interface MatchListProps {
  matchList: string[] // matchList가 string 배열 타입임을 명시
}

interface MatchData {
  // 각 매치 데이터에 대한 타입을 정의
  matchId: string
  // 여기에 API에서 반환되는 매치 데이터의 필드를 추가
}

const MatchList = ({ matchList }: MatchListProps) => {
  const [matchDataList, setMatchDataList] = useState<MatchData[]>([])

  const fetchMatchInfo = () => {
    try {
      const request = matchList.map((match) => {
        return axios.get('')
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {}, [])

  return (
    <ContentTop>
      <Tab
        labels={['전체', '솔로랭크']}
        components={{ 일반: <div>asd</div>, 랭크: <div>123</div> }}
      />
    </ContentTop>
  )
}

export default MatchList
