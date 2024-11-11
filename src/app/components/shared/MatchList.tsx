import React from 'react'
import ContentTop from '@/app/components/shared/ContentTop'
import Tab from '@/components/shared/Tab'
import axios from 'axios'
import AllMatch from '../../../components/matches/AllMatch'
import RankMatch from '../../../components/matches/RankMatch'
import { asia_api_url } from '@/constants/constants'

// const fetchMatchInfo = async (matchArr: string[]) => {
//   const requests = matchArr.map(async (match) => {
//     const url = `/api/match/matchInfo/?matchId=${match}`
//     return await axios.get(url)
//   })

//   //비동기 요청을 병렬로 처리.(모든 요청이 완료되었을 때 반환)
//   return Promise.all(requests)
// }

// Props 타입 정의
interface MatchListProps {
  summonerPuuid: string // matchList가 string 배열 타입임을 명시
}

const MatchList = async ({ summonerPuuid }: MatchListProps) => {
  //매치 id 10갸를 가져오는 함수
  const fetchMatchIds = async (summonerPuuid: string) => {
    try {
      const response = await axios.get(
        `${asia_api_url}lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=10&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      )

      return response.data
    } catch (error) {
      console.error('데이터 요청에 실패하였습니다.', error)
      throw error
    }
  }

  //매치 id를 담고있는 배열
  const matchIds: string[] = await fetchMatchIds(summonerPuuid)

  return (
    <ContentTop>
      <Tab
        labels={['전체', '솔로랭크']}
        components={{
          일반: <AllMatch matchIds={matchIds ?? []} />,
          랭크: <RankMatch />,
        }}
      />
    </ContentTop>
  )
}

export default MatchList
