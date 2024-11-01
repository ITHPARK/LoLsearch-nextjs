import { NextResponse, NextRequest } from 'next/server'
import axios, { AxiosError } from 'axios'
import { asia_api_url } from '@/constants/constants'

export const GET = async (req: NextRequest) => {
  console.log(req.url)
  try {
    const { searchParams } = new URL(req.url)
    const summonerPuuid = searchParams.get('puuid') // 쿼리에서 'puuid' 가져오기

    console.log(summonerPuuid)
  } catch (error) {
    // error가 AxiosError인지 확인하는 타입 가드 추가
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.response ? error.response.status : 500 },
      )
    }

    return NextResponse.json(
      { message: '데이터 요청에 실패하였습니다.' },
      { status: 500 },
    )
  }
}
