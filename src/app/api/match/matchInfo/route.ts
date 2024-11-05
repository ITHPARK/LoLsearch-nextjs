import { NextRequest, NextResponse } from 'next/server'
import { asia_api_url } from '@/constants/constants'
import axios, { AxiosError } from 'axios'

//캐릭터 프로필 가져오기
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url) //쿼리 파라미터 추출
    const matchId = searchParams.get('matchId')

    console.log(searchParams)

    const response = await axios.get(
      `${asia_api_url}lol/match/v5/matches/${matchId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    )

    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      // API의 상태 코드와 메시지를 그대로 전달
      const { status, data } = error.response
      return NextResponse.json(
        { message: data.message || error.message },
        { status },
      )
    }

    return NextResponse.json(
      { message: '데이터 요청에 실패하였습니다.' },
      { status: 500 },
    )
  }
}
