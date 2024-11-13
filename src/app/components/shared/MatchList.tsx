'use client'

import React, { useEffect } from 'react'
import ContentTop from '@/app/components/shared/ContentTop'
import Tab from '@/app/components/shared/Tab'
import axios from 'axios'
import AllMatch from '../matches/AllMatch'

import { useQuery } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'
import { summonerPuuid } from '@/atom/summoner'
import Flex from './Flex'
import Skeleton from './Skeleton'

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
    return (
      <ContentTop>
        <Tab
          labels={['전체', '솔로랭크']}
          components={{
            일반: <TabSkeleton />,
            랭크: <TabSkeleton />,
          }}
        />
      </ContentTop>
    )
  }

  return (
    <ContentTop>
      <Tab
        labels={['전체', '솔로랭크']}
        components={{
          일반: <AllMatch matchIds={matchIds ?? []} />,
          랭크: <div />,
        }}
        buttonClass="px-[15px] py-[10px]  rounded-tl-[5px] rounded-tr-[5px]"
        pageClass="p-[15px] bg-[#363742] overflow-hidden rounded-tr-[10px] rounded-bl-[5px] rounded-br-[5px]"
        focusColor="#363742"
        unFocusColor="#24252F"
      />
    </ContentTop>
  )
}

export default MatchList

const TabSkeleton = () => {
  return (
    <Flex direction="col" className="gap-[5px]">
      {Array.from({ length: 10 }).map((_, index: number) => {
        return <Skeleton key={index} height={120} />
      })}
    </Flex>
  )
}
