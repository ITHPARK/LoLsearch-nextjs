'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import ContentTop from '@/components/shared/ContentTop'
import Text from '@/components/shared/Text'

interface SummonerProps {
  summonerName: string
  summonerPuuid: string
  summonerTag: string
}

const Summoner = () => {
  const { id } = useParams() // 경로 파라미터에서 'id'를 가져옴
  const [isError, setIsError] = useState<string>('')
  const [summonerInfo, setSummonerInfo] = useState<SummonerProps>({
    //소환사 정보(이름,태그,puuid)
    summonerName: '',
    summonerPuuid: '',
    summonerTag: '',
  })

  useEffect(() => {
    if (id) {
      //id는 string
      const [gameName, tagLine] = (id as string).split('-')

      //유저의 닉네임과 태그를 추출해서 api를 요청
      const fetchGameInfo = async () => {
        try {
          const response = await axios.get(
            `/api/summoner?gameName=${gameName}&tagLine=${tagLine}`,
          )
          setSummonerInfo({
            summonerName: response.data.gameName,
            summonerPuuid: response.data.puuid,
            summonerTag: response.data.tagLine,
          })
        } catch (error: unknown) {
          //axios 에러인지 확인
          if (axios.isAxiosError(error)) {
            if (error.status === 404) {
              //404에러(요청하는 닉네임과 태그를 가진 소환사가 없다면) 메세지 넣기
              setIsError(error.response?.data.message)
            }
          } else {
            console.log('오류', error)
          }
        }
      }

      fetchGameInfo()
    }
  }, [id])

  useEffect(() => {
    console.log('summonerInfo state:', summonerInfo) // 상태가 업데이트되는지 확인
  }, [summonerInfo])

  if (isError.length > 0) {
    //에러시 메세지 출력
    return <div>{isError}</div>
  }

  return (
    <>
      <ContentTop>
        <Text size="t3" weight="bold" className="mr-[5px]">
          {summonerInfo?.summonerName}
        </Text>
        <Text size="t2" weight="light">
          #{summonerInfo?.summonerTag}
        </Text>
        <div className=""></div>
      </ContentTop>
    </>
  )
}

export default Summoner
