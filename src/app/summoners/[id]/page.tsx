import axios from 'axios'
import ContentTop from '@/app/components/shared/ContentTop'
import Flex from '@/app/components/shared/Flex'
import { asia_api_url, kr_api_url } from '@/constants/constants'
import ProfileBox from '@/app/components/shared/ProfileBox'
import ImageBox from '@/app/components/shared/ImageBox'
import Text from '@/app/components/shared/Text'
import MatchList from '@/app/components/shared/MatchList'

const Summoner = async ({ params }: { params: { id: string } }) => {
  const { id } = params // 경로 파라미터에서 'id'를 가져옴

  const [gameName, gameTag] = id.split('-')

  const encodedGameName = decodeURIComponent(gameName)
  const apiKey = process.env.NEXT_PUBLIC_API_KEY

  //소환사 정보 불러오기 (puuid 받아오기)
  const fetchSummoner = async ({
    gameName,
    tagLine,
  }: {
    gameName: string
    tagLine: string
  }) => {
    try {
      const response = await axios.get(
        `${asia_api_url}riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${apiKey}`,
      )

      return response.data
    } catch (error) {
      console.error('데이터 불러오기에 실패하였습니다.', error)
      throw error
    }
  }

  //puuid로 소환사 레벨과 아이콘 정보를 호출
  const fetchSummonerInfo = async (summonerPuuid: string) => {
    try {
      const response = await axios.get(
        `${kr_api_url}lol/summoner/v4/summoners/by-puuid/${summonerPuuid}?api_key=${apiKey}`,
      )

      return response.data
    } catch (error) {
      console.error('데이터 불러오기에 실패하였습니다.', error)
      throw error
    }
  }

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

      <MatchList summonerPuuid={summonerData.puuid} />
    </>
  )
}

export default Summoner
