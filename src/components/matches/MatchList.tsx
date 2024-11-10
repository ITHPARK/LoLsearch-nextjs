'use client'

import React, { useEffect } from 'react'
import ContentTop from '@/components/shared/ContentTop'
import Tab from '@/components/shared/Tab'
import axios from 'axios'
import AllMatch from './AllMatch'
import RankMatch from './RankMatch'
import { useQuery } from '@tanstack/react-query'

const fetchMatchInfo = async (matchArr: string[]) => {
  const requests = matchArr.map(async (match) => {
    const url = `/api/match/matchInfo/?matchId=${match}`
    return await axios.get(url)
  })

  //비동기 요청을 병렬로 처리.(모든 요청이 완료되었을 때 반환)
  return Promise.all(requests)
}

// Props 타입 정의
interface MatchListProps {
  matchList: string[] // matchList가 string 배열 타입임을 명시
}

const MatchList = ({ matchList }: MatchListProps) => {
  const { data: matchInfo } = useQuery({
    queryKey: ['matchInfo', matchList],
    queryFn: () => fetchMatchInfo(matchList),
    enabled: matchList.length > 0 && matchList.every((match) => match), // matchList가 빈 값이 아니고, 유효한 값들이 있어야 실행
    staleTime: 1000 * 60 * 60 * 12, // 12시간 동안 데이터가 최신으로 간주되어 다시 요청하지 않음
    gcTime: 1000 * 60 * 60 * 12, // 캐시된 데이터는 12시간 동안 보관
  })

  return (
    <ContentTop>
      <Tab
        labels={['전체', '솔로랭크']}
        components={{
          일반: <AllMatch matchData={matchInfo ?? []} />,
          랭크: <RankMatch />,
        }}
      />
    </ContentTop>
  )
}

export default MatchList
