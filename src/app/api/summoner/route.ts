import { NextResponse, NextRequest } from 'next/server'
import axios, { AxiosError } from 'axios'
import { asia_api_url } from '@/constants/constants'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url) //요청 url
    const gameName = searchParams.get('gameName') //유저 아이디
    const tagLine = searchParams.get('tagLine') //게임 태그
    const apiKey = process.env.NEXT_PUBLIC_API_KEY

    // gameName과 tagLine이 null이 아닌지 확인
    if (gameName === null || tagLine === null) {
      return NextResponse.json(
        //태그나 유저 아이디가 없다면 오류 출력
        { message: 'Invalid gameName or tagLine' },
        { status: 400 }, // Bad Request
      )
    }

    const encodedGameName = encodeURIComponent(gameName) // 인코딩된 유저 아이디 값ㄴ

    const response = await axios.get(
      `${asia_api_url}riot/account/v1/accounts/by-riot-id/${encodedGameName}/${tagLine}?api_key=${apiKey}`,
    )

    return NextResponse.json(response.data, { status: 200 }) // 요청 성공 200출력
  } catch (error) {
    // error가 AxiosError인지 확인하는 타입 가드 추가
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.response ? error.response.status : 500 },
      )
    }

    // AxiosError가 아닌 경우 일반 오류 처리
    return NextResponse.json(
      { message: 'An unknown error occurred' },
      { status: 500 },
    )
  }
}
