'use client'

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import ContentTop from '@/components/shared/ContentTop'
import Text from '@/components/shared/Text'
import Flex from '@/components/shared/Flex'
import ProfileBox from '@/components/shared/ProfileBox'
import ImageBox from '@/components/shared/ImageBox'
import MatchList from '@/components/matches/MatchList'
import { useSetRecoilState } from 'recoil'
import { summonerPuuid } from '@/atom/summoner'
import { useQuery } from '@tanstack/react-query'

const fetchSummoner = async ({
  gameName,
  tagLine,
}: {
  gameName: string
  tagLine: string
}) => {
  return await axios.get(
    `/api/account/by-riot-id/?gameName=${gameName}&tagLine=${tagLine}`,
  )
}

const fetchSummonerInfo = async (summonerPuuid: string) => {
  //소환사 레벨과 아이콘 정보를 가져오는 함수
  return await axios.get(`/api/summoners/by-puuid/?puuid=${summonerPuuid}`)
}

const fetchMatchData = async (summonerPuuid: string) => {
  return await axios.get(`/api/match/matches/?puuid=${summonerPuuid}`)
}

const Summoner = () => {
  const { id } = useParams() // 경로 파라미터에서 'id'를 가져옴

  const setPuuid = useSetRecoilState(summonerPuuid)
  const [gameName, tagLine] = (id as string).split('-')

  //소환사 정보(puuid) 요청
  const {
    data: summonerDataPuuid,
    isError: summonerDataPuuidError,
    isLoading: summonerDataPuuidLoading,
  } = useQuery({
    queryKey: ['summonerPuuid'],
    queryFn: () => fetchSummoner({ gameName, tagLine }),
  })

  //puuid로 데이터(아이콘 정보, 레벨) 추가
  const {
    data: summonerProfile,
    isError: summonerProfileError,
    isLoading: summonerProfileLoading,
  } = useQuery({
    queryKey: ['summonerProfile', summonerDataPuuid?.data.puuid],
    queryFn: () => fetchSummonerInfo(summonerDataPuuid?.data.puuid),
    enabled: summonerDataPuuid?.data.puuid != null, //fetchSummoner로 소환사 정보를 받아서 puuid의 값이 있을 때만 실행
  })

  //puuid로 매치 데이터 요청
  const {
    data: summonerMatchData,
    isError: summonerMatchDataError,
    isLoading: summonerMatchDataLoading,
  } = useQuery({
    queryKey: ['summonerMatch', summonerDataPuuid?.data.puuid],
    queryFn: () => fetchMatchData(summonerDataPuuid?.data.puuid),
    enabled:
      summonerDataPuuid?.data.puuid != null &&
      summonerDataPuuid?.data.puuid !== '', //fetchSummoner로 소환사 정보를 받아서 puuid의 값이 있을 때만 실행
  })

  //소환사 정보를 가져오면 recoil에 puuid를 설정
  useEffect(() => {
    if (summonerDataPuuid) {
      setPuuid(summonerDataPuuid.data.puuid)
    }
  }, [summonerDataPuuid, setPuuid])

  // 에러가 발생하면 에러 메시지 출력
  if (
    summonerDataPuuidError ||
    summonerProfileError ||
    summonerMatchDataError
  ) {
    return <div>오류가 발생했습니다. 잠시 후 다시 시도해주세요.</div>
  }

  // 로딩 중일 때는 로딩 메시지 출력
  if (
    summonerDataPuuidLoading ||
    summonerProfileLoading ||
    summonerMatchDataLoading
  ) {
    return <div>일치하는 소환사를 찾고 있습니다...</div>
  }

  return (
    <>
      <ContentTop>
        <Flex align="end" className="gap-[10px]">
          <ProfileBox className="w-[80px] h-[80px]">
            <ImageBox
              src={`http://ddragon.leagueoflegends.com/cdn/14.22.1/img/profileicon/${summonerProfile?.data.profileIconId}.png`}
            />
            <Text
              size="t1"
              className="px-[5px] py-[3px] absolute right-[5px] bottom-[5px] bg-[#000] rounded-[3px]"
            >
              {summonerProfile?.data.summonerLevel}
            </Text>
          </ProfileBox>
          {summonerDataPuuid?.data.gameName && (
            <Flex align="end" className="gap-[5px]">
              <Text size="t3" weight="bold" className="mr-[5px]">
                {/* {summonerDataPuuid?.data.gameName} */}
                유저 이름
              </Text>
              <Text size="t2" weight="light">
                #{summonerDataPuuid?.data.tagLine}
              </Text>
            </Flex>
          )}
        </Flex>
      </ContentTop>

      <MatchList matchList={summonerMatchData?.data} />
    </>
  )
}

export default Summoner
