'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

interface SummonerProps {
  summonerName: string
  summonerPuuid: string
  summonerTag: string
}

const Summoner = () => {
  const { id } = useParams() // 경로 파라미터에서 'id'를 가져옴\
  const [summonerInfo, setSummonerInfo] = useState<SummonerProps>({
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
        } catch (error) {
          console.log(error)
        }
      }

      fetchGameInfo()
    }
  }, [id])

  useEffect(() => {
    console.log('summonerInfo state:', summonerInfo) // 상태가 업데이트되는지 확인
  }, [summonerInfo])

  return <div>{summonerInfo?.summonerName}312321321</div>
}

export default Summoner
