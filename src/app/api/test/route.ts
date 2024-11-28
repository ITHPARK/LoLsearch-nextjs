import { NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'
import { kr_api_url } from '@/constants/constants'

export const GET = async () => {
  try {
    const encodedGameName = encodeURIComponent('조바이든') // 인코딩된 유저 아이디 값

    const response = await axios.get(
      `${kr_api_url}lol/summoner/v4/summoners/${encodedGameName}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
      //   /lol/summoner/v4/summoners/by-name/{summonerName}
    )

    return NextResponse.json(response.data, { status: 200 }) // 요청 성공 200출력
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
