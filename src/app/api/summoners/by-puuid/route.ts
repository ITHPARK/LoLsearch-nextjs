import { NextRequest, NextResponse } from 'next/server'
import { kr_api_url } from '@/constants/constants'
import axios, { AxiosError } from 'axios'

//캐릭터 프로필 가져오기
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url) //쿼리 파라미터 추출
    const summonerPuuid = searchParams.get('puuid')

    const response = await axios.get(
      `${kr_api_url}lol/summoner/v4/summoners/by-puuid/${summonerPuuid}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    )

    return NextResponse.json(response.data, { status: 200 })
  } catch (error) {
    if (error instanceof AxiosError) {
    }

    return NextResponse.json(
      { message: '잠시 후 다시 시도해주세요' },
      { status: 500 },
    )
  }
}
