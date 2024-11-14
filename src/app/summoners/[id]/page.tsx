import ContentTop from '@/app/components/shared/ContentTop'
import Flex from '@/app/components/shared/Flex'
import ProfileBox from '@/app/components/shared/ProfileBox'
import ImageBox from '@/app/components/shared/ImageBox'
import Text from '@/app/components/shared/Text'
import MatchList from '@/app/components/shared/MatchList'
import { fetchSummoner, fetchSummonerInfo } from '@/apiFunction'

const Summoner = async ({ params }: { params: { id: string } }) => {
  const { id } = params // 경로 파라미터에서 'id'를 가져옴

  const [gameName, gameTag] = id.split('-')

  const encodedGameName = decodeURIComponent(gameName)

  //소환사 데이터 요청
  const summonerData = await fetchSummoner({
    gameName: encodedGameName,
    tagLine: gameTag,
  })

  const summonerInfo = await fetchSummonerInfo(summonerData.puuid)

  return (
    <>
      <ContentTop>
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
            <Text size="t3" weight="bold" className="mr-[5px]">
              {summonerData.gameName}
            </Text>
            <Text size="t2" weight="light">
              #{summonerData.tagLine}
            </Text>
          </Flex>
        </Flex>
      </ContentTop>

      <MatchList playerPuuid={summonerData.puuid} />
    </>
  )
}

export default Summoner
