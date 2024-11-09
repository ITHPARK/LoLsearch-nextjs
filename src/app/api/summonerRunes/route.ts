import { NextRequest, NextResponse } from 'next/server'

import { store } from '@/remote/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

// 캐릭터 프로필 가져오기
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url) // 쿼리 파라미터 추출
    const mainPerk = searchParams.get('mainPerk') // mainPerk
    const subPerk = searchParams.get('subPerk') // subPerk

    // 문자열을 숫자로 변환 (타입 맞추기)
    const mainPerkId = Number(mainPerk)
    const subPerkId = Number(subPerk)

    // 조건에 맞는 문서 필터링
    const mainPerkQuery = await getDocs(
      query(
        collection(store, 'summonerRunes'),
        where('id', '==', mainPerkId), // id가 mainPerkId 또는 subPerkId 값과 일치하는 문서 필터링
      ),
    )
    const mainPerkData = mainPerkQuery.docs.map((doc) => doc.data())

    const subPerkQuery = await getDocs(
      query(
        collection(store, 'summonerRunes'),
        where('id', '==', subPerkId), // id가 mainPerkId 또는 subPerkId 값과 일치하는 문서 필터링
      ),
    )

    const subPerkData = subPerkQuery.docs.map((doc) => doc.data())

    return NextResponse.json({ mainPerkData, subPerkData }, { status: 200 })
  } catch (error) {
    const errorMessage = (error as Error).message
    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}
