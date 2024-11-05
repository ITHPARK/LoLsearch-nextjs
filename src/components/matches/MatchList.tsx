'use client'

import React, { useState, useEffect } from 'react'
import ContentTop from '@/components/shared/ContentTop'
import Tab from '@/components/shared/Tab'
import axios from 'axios'
import AllMatch from './AllMatch'
import RankMatch from './RankMatch'

// Props 타입 정의
interface MatchListProps {
  matchList: string[] // matchList가 string 배열 타입임을 명시
}

const MatchList = ({ matchList }: MatchListProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [matchDataList, setMatchDataList] = useState<any[]>([])

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        //각 매치id에 대한 정보를 가져온다.
        const request = matchList.map(async (match) => {
          const url = `/api/match/matchInfo/?matchId=${match}`
          return await axios.get(url)
        })

        // 모든 요청이 완료될 때까지 기다린 후 응답 데이터를 배열로 받음
        const responses = await Promise.all(request)

        // 응답 데이터에서 matchData를 추출하여 matchDataList 상태에 설정
        const matchData = responses.map((response) => response.data)

        setMatchDataList(matchData) // 상태 업데이트
      } catch (error) {
        console.log(error)
      }
    }

    if (matchList) {
      fetchMatchInfo()
    }
  }, [matchList])

  return (
    <ContentTop>
      <Tab
        labels={['전체', '솔로랭크']}
        components={{
          일반: <AllMatch matchData={matchDataList} />,
          랭크: <RankMatch />,
        }}
      />
    </ContentTop>
  )
}

export default MatchList
