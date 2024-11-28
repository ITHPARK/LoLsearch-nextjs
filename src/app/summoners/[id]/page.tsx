import ContentTop from '@/app/components/shared/ContentTop'
import ProfileBox from '@/app/components/shared/ProfileBox'
import ImageBox from '@/app/components/shared/ImageBox'
import Flex from '@/app/components/shared/Flex'
import Text from '@/app/components/shared/Text'
import MatchList from '@/app/components/shared/MatchList'
import SummonerRank from '@/app/components/summoner/SummonerRank'
import {
  fetchSummoner,
  fetchSummonerInfo,
  fetchSummonerRank,
} from '@/apiFunction'

const Summoner = async ({ params }: { params: { id: string } }) => {
  const { id } = params // 경로 파라미터에서 'id'를 가져옴

  const [gameName, gameTag] = id.split('-')

  const encodedGameName = decodeURIComponent(gameName)

  console.log(gameName, gameTag)

  //소환사 데이터 요청
  const summonerData = await fetchSummoner({
    gameName: encodedGameName,
    tagLine: gameTag,
  })

  //소환사의 레벨, 아이콘 정보 요청
  const summonerInfo = await fetchSummonerInfo(summonerData.puuid)

  //소환사의 랭크 정보 요청
  const summonerRank = await fetchSummonerRank(summonerInfo.id)

  console.log(summonerRank)

  return (
    <>
      <div className="py-[30px] bg-white">
        <ContentTop className="mx-auto w-[1080px]">
          <Flex align="end" className="gap-[10px]">
            <ProfileBox className="w-[80px] h-[80px]">
              <ImageBox
                src={`http://ddragon.leagueoflegends.com/cdn/14.22.1/img/profileicon/${summonerInfo.profileIconId}.png`}
              />
              <Text
                size="t1"
                className="px-[5px] py-[3px] absolute right-[5px] bottom-[5px] bg-[#000] rounded-[3px]"
              >
                {summonerInfo.summonerLevel}
              </Text>
            </ProfileBox>
            <Flex align="end" className="gap-[5px]">
              <Text size="t3" weight="bold" className="mr-[5px] text-[#333]">
                {summonerData.gameName}
              </Text>
              <Text size="t2" weight="light" className="text-[#333]">
                #{summonerData.tagLine}
              </Text>
            </Flex>
          </Flex>

          <SummonerRank summonerRank={summonerRank} />
        </ContentTop>
      </div>

      <div className=" bg-[#000]">
        <ContentTop className="pt-[50px] mx-auto w-[1080px]">
          <MatchList playerPuuid={summonerData.puuid} />
        </ContentTop>
      </div>
    </>
  )
}

export default Summoner
