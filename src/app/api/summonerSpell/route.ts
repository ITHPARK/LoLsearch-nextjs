import { NextRequest, NextResponse } from 'next/server'

import { store } from '@/remote/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
//query 함수는 특정 조건에 맞는 문서만 필터링할 수 있게 해주는 함수
//collection은 특정 컬렉션에 접근
//getDoc은 하나의 데이터만 가져오는 함수

//캐릭터 프로필 가져오기
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url) //쿼리 파라미터 추출
    const summonerSpell1 = searchParams.get('spell1')
    const summonerSpell2 = searchParams.get('spell2')

    // 조건에 맞는 문서 필터링
    const spellsQuery1 = await getDocs(
      query(
        collection(store, 'summonerSpell'),
        where('key', '==', summonerSpell1), //in: or과 같은 처리
      ),
    )

    // spellsQuery.docs에서 각 문서의 데이터를 가져와 배열로 변환
    const spells1 = spellsQuery1.docs.map((doc) => doc.data())

    const spellsQuery2 = await getDocs(
      query(
        collection(store, 'summonerSpell'),
        where('key', '==', summonerSpell2), //in: or과 같은 처리
      ),
    )

    const spells2 = spellsQuery2.docs.map((doc) => doc.data())

    return NextResponse.json({ spells1, spells2 }, { status: 200 })
  } catch (error) {
    const errorMessage = (error as Error).message
    return NextResponse.json({ message: errorMessage }, { status: 500 })
  }
}
