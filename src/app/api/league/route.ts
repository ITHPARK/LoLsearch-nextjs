import { NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'
import { kr_api_url, asia_api_url } from '@/constants/constants'

export const GET = async () => {
  try {
    //챌린저 랭커들의 Id를 가져온다. (총 302개)
    const rankerIdResponse = await axios.get(
      `${kr_api_url}lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    )

    //10개만 추려낸다.
    const data = rankerIdResponse.data.entries.slice(0, 10)

    //가져온 랭커들의 Id로 puuid를 가져온다.
    const rankerPuuidResponse = await Promise.all(
      data.map(async (data: Record<string, string | number | boolean>) => {
        const response = await axios.get(
          `${kr_api_url}lol/summoner/v4/summoners/${data.summonerId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        )
        return response.data.puuid
      }),
    )

    //가져온 랭커들의 puuid로 닉내임과 게임태그를 가져온다.
    const rankerData = await Promise.all(
      rankerPuuidResponse.map(async (data: string) => {
        const response = await axios.get(
          `${asia_api_url}riot/account/v1/accounts/by-puuid/${data}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        )

        return [response.data.gameName, response.data.tagLine]
      }),
    )

    return NextResponse.json(rankerData, { status: 200 }) // 요청 성공 200출력
  } catch (error) {
    // error가 AxiosError인지 확인하는 타입 가드 추가
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 404) {
        // 클라이언트에게 404 상태와 명확한 메시지 전송
        return NextResponse.json(
          { message: '일치하는 소환사가 없습니다.' },
          { status: 404 },
        )
      }
      return NextResponse.json(
        { message: error.message },
        { status: error.response ? error.response.status : 500 },
      )
    }

    // AxiosError가 아닌 경우 일반 오류 처리
    return NextResponse.json(
      { message: '데이터 요청에 실패하였습니다.' },
      { status: 500 },
    )
  }
}
