import SearchUser from '@/app/components/shared/SearchUser'
// import Test from '@/app/components/Test'
import LotationChampion from '@/app/components/shared/LotationChampion'
import ContentTop from '@/app/components/shared/ContentTop'
import ChallengerRanking from '@/app/components/ChallengerRanking'
import Flex from '@/app/components/shared/Flex'
import Text from '@/app/components/shared/Text'
// import { Suspense } from 'react'

const Home = () => {
  return (
    <div className="h-full">
      <SearchUser />

      <Flex direction="col" className=" pt-[50px] h-full  flex-1 bg-[#000]">
        <ContentTop className="mb-[50px] w-[500px]">
          <Text size="t3" weight="bold" display="block mb-[15px]">
            챌린저 TOP 10
          </Text>
          <ChallengerRanking />
        </ContentTop>

        <ContentTop className="w-[500px]">
          <Text size="t3" weight="bold" display="block mb-[15px]">
            로테이션 챔피언
          </Text>
          <LotationChampion />
        </ContentTop>
      </Flex>
    </div>
  )
}

export default Home
