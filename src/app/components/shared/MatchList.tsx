'use client'

import React, { useEffect } from 'react'
import ContentTop from '@/app/components/shared/ContentTop'
import Tab from '@/app/components/shared/Tab'
import axios from 'axios'
import AllMatch from '../matches/AllMatch'

import { useQuery } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'
import { summonerPuuid } from '@/atom/summoner'

const fetchMatchIds = async (puuid: string) => {
  const response = await axios.get(`/api/match/matches/?puuid=${puuid}`)
  return response.data
}

// Props 타입 정의
interface MatchListProps {
  playerPuuid: string // matchList가 string 배열 타입임을 명시
}

const MatchList = ({ playerPuuid }: MatchListProps) => {
  const setPuuid = useSetRecoilState(summonerPuuid) //Recoil에 추가

  //매치 id 10개를 가져오는 함수
  const { data: matchIds, isLoading: matchIdsLoading } = useQuery({
    queryKey: ['matchIds', playerPuuid],
    queryFn: () => fetchMatchIds(playerPuuid),
    enabled: Boolean(playerPuuid), // summonerPuuid값이 있을 때 실행
  })

  //Props로 puuid가 넘어왔다면 Rcoil에 추가
  useEffect(() => {
    if (playerPuuid != null) {
      setPuuid(playerPuuid)
    }
  }, [playerPuuid, setPuuid])

  if (matchIdsLoading) {
    return <ContentTop>로딩중입니다.</ContentTop>
  }

  return (
    <ContentTop>
      <Tab
        labels={['전체', '솔로랭크']}
        components={{
          일반: <AllMatch matchIds={matchIds ?? []} />,
          랭크: <div />,
        }}
      />
    </ContentTop>
  )
}

export default MatchList
