import SearchUser from '@/app/components/shared/SearchUser'
// import Test from '@/app/components/Test'
import LotationChampion from '@/app/components/shared/LotationChampion'
import ContentTop from '@/app/components/shared/ContentTop'
import ChallengerRanking from '@/app/components/ChallengerRanking'
import Flex from '@/app/components/shared/Flex'
import { Suspense } from 'react'

const Home = () => {
  return (
    <div className="h-full">
      <SearchUser />

      <Flex direction="col" className=" pt-[30px] h-full  flex-1 bg-[#000]">
        <ContentTop className="w-[500px]">
          {/* Suspense를 사용하면 감싸준 컴포넌트는 로딩이 모두 되지 않아도 fallback 컴포넌트를 출력하면서 다른 요소들이 렌더링 됨  */}
          {/* <Suspense fallback={<p>Loading...</p>}> */}
          <ChallengerRanking />
          {/* </Suspense> */}
          {/* <Test></Test> */}
        </ContentTop>

        <ContentTop className="w-[1080px]">
          {/* Suspense를 사용하면 감싸준 컴포넌트는 로딩이 모두 되지 않아도 fallback 컴포넌트를 출력하면서 다른 요소들이 렌더링 됨  */}
          {/* <Suspense fallback={<p>Loading...</p>}> */}
          <LotationChampion />
          {/* </Suspense> */}
          {/* <Test></Test> */}
        </ContentTop>

        <ContentTop className="w-[1080px]">
          {/* Suspense를 사용하면 감싸준 컴포넌트는 로딩이 모두 되지 않아도 fallback 컴포넌트를 출력하면서 다른 요소들이 렌더링 됨  */}
          {/* <Suspense fallback={<p>Loading...</p>}> */}
          <LotationChampion />
          {/* </Suspense> */}
          {/* <Test></Test> */}
        </ContentTop>
      </Flex>
    </div>
  )
}

export default Home
