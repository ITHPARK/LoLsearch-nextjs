import axios from 'axios'
import { asia_api_url, kr_api_url } from '@/constants/constants'
import { notFound } from 'next/navigation'

//소환사 스펠 정보 요청
export const fetchSpell = async (spell1: string, spell2: string) => {
  const response = await axios.get(
    `/api/summonerSpell/?spell1=${spell1}&spell2=${spell2}`,
  )
  return response.data
}

//소환사 룬 정보 api 요청
export const fetchPerks = async (mainPerk: string, subPerk: string) => {
  const response = await axios.get(
    `/api/summonerRunes/?mainPerk=${mainPerk}&subPerk=${subPerk}`,
  )
  return response.data
}

//소환사 매치 id정보 요청
export const fetchMatchIds = async (puuid: string) => {
  const response = await axios.get(`/api/match/matches/?puuid=${puuid}`)
  return response.data
}

//소환사 정보 불러오기 (puuid 받아오기)
export const fetchSummoner = async ({
  gameName,
  tagLine,
}: {
  gameName: string
  tagLine: string
}) => {
  try {
    const response = await fetch(
      `${asia_api_url}riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        cache: 'force-cache', // 요청을 캐싱하도록 설정
        next: { revalidate: 60 * 60 * 12 }, // 캐시 유효시간을 12시간으로 설정
      },
    )

    if (!response.ok) {
      notFound()
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('데이터 불러오기에 실패하였습니다.', error)
    throw error
  }
}

//puuid로 소환사 레벨과 아이콘 정보를 호출
export const fetchSummonerInfo = async (summonerPuuid: string) => {
  try {
    const response = await fetch(
      `${kr_api_url}lol/summoner/v4/summoners/by-puuid/${summonerPuuid}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        cache: 'force-cache', // 요청을 캐싱하도록 설정
        next: { revalidate: 60 * 60 * 12 }, // 캐시 유효시간을 12시간으로 설정
      },
    )

    //잘못된 api 요청일 때
    if (!response.ok) {
      throw new Error('데이터 불러오기 실패')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('데이터 불러오기에 실패하였습니다.', error)
    throw error
  }
}
