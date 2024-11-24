import axios, { AxiosError } from 'axios'
import { asia_api_url, kr_api_url } from '@/constants/constants'
import { notFound } from 'next/navigation'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { store } from '@/remote/firebase'

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
        // cache: 'force-cache', // 요청을 캐싱하도록 설정
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
        // cache: 'force-cache', // 요청을 캐싱하도록 설정
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

//puuid로 소환사 레벨과 아이콘 정보를 호출
export const fetchSummonerRank = async (summonerId: string) => {
  try {
    const response = await fetch(
      `${kr_api_url}lol/league/v4/entries/by-summoner/${summonerId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        // cache: 'force-cache', // 요청을 캐싱하도록 설정
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

//로테이션 챔피언 불러오기
export const fetchLotationChampion = async () => {
  try {
    //riot에 api 요청을 보내 로테이션 챔피언의 키값(숫자)을 가져오기
    const response = await fetch(
      `${kr_api_url}lol/platform/v3/champion-rotations?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        next: { revalidate: 60 * 60 * 24 }, //캐싱 유효기간은 24시간
      },
    )

    //api호출이 에러가 난다면
    if (!response.ok) {
      notFound()
    }

    const data = await response.json()

    //키값을 가지고 있는 배열을 순회하면서 챔피언 정보가 담긴 firebase 컬렉션에 접근하여 해당 키값을 가진 챔피언의 정보를 요청
    const champions = await Promise.all(
      data.freeChampionIds.map(async (item: number) => {
        //getDocs 특정 컬렉션의 모든 자료를 가져온다. (조건을 넣을려먼 query 사용)
        const champName = await getDocs(
          query(
            collection(store, 'champion'),
            where('key', '==', item.toString()),
          ),
        )

        return champName.docs.map((doc) => doc.data())
      }),
    )

    return champions
  } catch (error) {
    if (error instanceof AxiosError) {
      //에러 타입이 axios 타입일 때
      console.log('데이터 요청중 문제가 발생하였습니다.', error)
    } else {
      console.log('알 수 없는 오류가 발생했습니다.', error)
    }
  }
}
