import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { summonerPuuid } from '@/atom/summoner'
import classNames from 'classnames'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import ImageBox from '@/components/shared/ImageBox'
import { IoIosArrowDown } from '@react-icons/all-files/io/IoIosArrowDown'
import ChampionProfile from '@/components/shared/ChampionProfile'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

interface MatchListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

interface SummonerSpellProps {
  [key: string]: string
}

interface SummonerRuneProps {
  [key: string]: string | null
}

interface SummonerItem {
  [key: string]: number[]
}
interface SummonerTeam {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const fetchSpell = async (spell1: string, spell2: string) => {
  return await axios.get(
    `/api/summonerSpell/?spell1=${spell1}&spell2=${spell2}`,
  )
}
const fetchPerks = async (mainPerk: string, subPerk: string) => {
  return await axios.get(
    `/api/summonerRunes/?mainPerk=${mainPerk}&subPerk=${subPerk}`,
  )
}

const MatchLow = ({ matchInfo }: MatchListProps) => {
  const playerPuuid = useRecoilValue(summonerPuuid)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [player, setPlayer] = useState<any>(null)
  //게임 모드
  const [gameMode, setGameMode] = useState<string>('')

  //소환사 스펠
  const [spell, setSpell] = useState<SummonerSpellProps>({
    spell1: '',
    spell2: '',
  })

  //소환사 룬
  const [rune, setRune] = useState<SummonerRuneProps>({
    mainRune: null,
    subRune: null,
  })

  //연속킬 정보
  const [kills, setKills] = useState<React.ReactNode>(null)

  //아이템 정보
  const [itemData, setitemData] = useState<SummonerItem>({
    line1: [],
    line2: [],
  })

  const [team, setTeam] = useState<SummonerTeam>({
    team1: [],
    team2: [],
  })

  //스펠 데이터 가져오기
  const { data: spellData } = useQuery({
    queryKey: ['spell', player?.summoner1Id, player?.summoner2Id],
    queryFn: () => {
      if (player?.summoner1Id && player?.summoner2Id) {
        //player가 있을 때 실행
        return fetchSpell(player.summoner1Id, player.summoner2Id)
      }
    },
    enabled: Boolean(player?.summoner1Id && player?.summoner2Id), // player?.summoner1Id && player?.summoner2Id값이 있을 때 실행
  })

  // 룬 데이터 가져오기
  const { data: perksData } = useQuery({
    queryKey: ['perk', matchInfo], // matchInfo가 변경되면 쿼리 다시 실행
    queryFn: () => {
      if (player != null) {
        return fetchPerks(
          player.perks.styles[0].style,
          player.perks.styles[1].style,
        )
      }
    },
    enabled: player != null && matchInfo != null, // player와 matchInfo가 모두 있을 때만 실행
  })

  useEffect(() => {
    if (matchInfo && playerPuuid) {
      const playerInfo = matchInfo.data.info.participants.filter(
        (item: MatchListProps) => {
          return item.puuid == playerPuuid
        },
      )

      setPlayer(playerInfo[0])
      if (matchInfo.data.info.gameMode == 'CLASSIC') {
        setGameMode('클래식 모드')
      } else if (matchInfo.data.info.gameMode == 'ARAM') {
        setGameMode('무작위 총력전')
      } else {
        setGameMode('특별 게임 모드')
      }

      //팀 별로 구분
      const [team1, team2] = [
        matchInfo.data.info.participants.filter(
          (item: SummonerTeam) => item.teamId == 100,
        ),
        matchInfo.data.info.participants.filter(
          (item: SummonerTeam) => item.teamId == 200,
        ),
      ]

      setTeam({
        team1: team1,
        team2: team2,
      })
    }
  }, [matchInfo, playerPuuid])

  useEffect(() => {
    //스펠 state 업데이트
    if (spellData != null) {
      setSpell({
        spell1: spellData.data.spells1[0].id,
        spell2: spellData.data.spells2[0].id,
      })
    }
  }, [spellData])

  //룬 state 업데이트
  useEffect(() => {
    if (player != null && player.perks != null && perksData != null) {
      //룬 플레이어가 선택한 룬 카테고리를 순회하면서 플레이어가 선택한 룬 정보를 필터링함
      const mainPerkImg = perksData.data.mainPerkData[0].slots[0].runes.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any) => data.id == player.perks.styles[0].selections[0].perk,
      )[0]?.icon
      setRune({
        mainRune: mainPerkImg,
        subRune: perksData.data.subPerkData[0].icon,
      })
    }
  }, [player, perksData])

  //연속킬 정보
  useEffect(() => {
    if (player != null) {
      const arr = [
        player.doubleKills,
        player.tripleKills,
        player.quadraKills,
        player.pentaKills,
      ]

      let result: React.ReactNode = null

      arr.map((item, index) => {
        if (item > 0) {
          if (index == 0)
            result = (
              <Text
                size="t2"
                weight="bold"
                className="px-[5px] py-[2px] bg-[#E84057] rounded-[3px]"
              >
                더블킬
              </Text>
            )
          if (index == 1)
            result = (
              <Text
                size="t2"
                weight="bold"
                className="px-[5px] py-[2px] bg-[#E84057] rounded-[3px]"
              >
                트리플킬
              </Text>
            )
          if (index == 2)
            result = (
              <Text
                size="t2"
                weight="bold"
                className="px-[5px] py-[2px] bg-[#E84057] rounded-[3px]"
              >
                쿼드라킬
              </Text>
            )
          if (index == 3)
            result = (
              <Text
                size="t2"
                weight="bold"
                className="px-[5px] py-[2px] bg-[#E84057] rounded-[3px]"
              >
                펜타킬
              </Text>
            )
        }
      })

      setKills(result)

      //아이템 데이터 추가
      const [itemData1, itemData2] = [
        [player.item0, player.item1, player.item2, player.item6],
        [player.item3, player.item4, player.item5],
      ]

      setitemData({
        line1: itemData1,
        line2: itemData2,
      })
    }
  }, [player])

  //경기 승패 컬러
  const matchResultColor = {
    win: 'bg-[#ECF2FF]',
    lose: 'bg-[#fff1f3]',
  }

  const decoColor = {
    win: 'bg-[#5383E8]',
    lose: 'bg-[#E84057]',
  }

  return (
    <Flex direction="col" className="bg-transparent">
      <Flex
        className={classNames(
          'p-[10px] rounded-tl-[3px] rounded-tr-[3px]',
          player?.win ? matchResultColor['win'] : matchResultColor['lose'],
        )}
      >
        <Flex direction="col" justify="center" className="w-[150px]">
          <Text
            display="block"
            size="t2"
            className="text-[#4D4D4D]"
            weight="bold"
          >
            {gameMode}
          </Text>
          <Text display="block" size="t1" className="mt-[6px] text-[#4D4D4D]">
            {`${Math.floor(matchInfo.data.info.gameDuration / 60)}분 ${matchInfo.data.info.gameDuration % 60}초`}
          </Text>
          <div className="mt-[10px]">
            <Text
              size="t2"
              className={classNames(
                'inline-block p-[5px] rounded-[3px]',
                player?.win ? decoColor['win'] : decoColor['lose'],
              )}
            >
              {player?.win ? '승리' : '패배'}
            </Text>
          </div>
        </Flex>

        <Flex justify="between" className="w-full">
          <Flex>
            {/* 챔피언 이미지  */}
            <ChampionProfile
              name={player?.championName}
              level={player?.champLevel}
              className="w-[80px] h-[80px] "
            />

            {/* 스펠 정보  */}
            <Flex direction="col" justify="between" className="ml-[6px]">
              <div className="w-[37px] h-[37px]">
                <ImageBox
                  src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/${spell.spell1}.png`}
                />
              </div>
              <div className="w-[37px] h-[37px]">
                <ImageBox
                  src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/${spell.spell2}.png`}
                />
              </div>
            </Flex>

            {/* 룬 정보  */}
            <Flex direction="col" justify="between" className="ml-[8px]">
              <div></div>
              <div className="p-[4px] w-[33px] h-[33px] bg-[#000] rounded-[50%]">
                <ImageBox
                  src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.mainRune}`}
                />
              </div>
              <div className="p-[6px] w-[33px] h-[33px] bg-[#000] rounded-[50%]">
                <ImageBox
                  src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.subRune}`}
                />
              </div>
            </Flex>
          </Flex>

          {/* 킬뎃 정보  */}
          <Flex justify="center" align="center" className="w-[80px] ">
            <Flex direction="col" align="center" className="gap-[5px]">
              <Flex>
                <Text size="t3" weight="bold" className="text-[#4D4D4D]">
                  {player?.kills}
                </Text>
                <Text className="px-[5px] text-[#4D4D4D]">/</Text>
                <Text size="t3" weight="bold" className="text-[#4D4D4D]">
                  {player?.deaths}
                </Text>
                <Text className="px-[5px] text-[#4D4D4D]">/</Text>
                <Text size="t3" weight="bold" className="text-[#4D4D4D]">
                  {player?.assists}
                </Text>
              </Flex>
              {kills != null ? kills : ''}
            </Flex>
          </Flex>

          {/* 아이템 정보 */}
          <Flex direction="col" className=" gap-[6px]">
            {Object.entries(itemData).map(([item, data]) => {
              return (
                <Flex key={item} className="gap-[5px]">
                  {data.map((a, idx) => (
                    <div
                      key={`item-${idx}`}
                      className="w-[37px] h-[37px] rounded-[3px] overflow-hidden"
                    >
                      {a ? (
                        <ImageBox
                          src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/item/${a}.png`}
                        />
                      ) : (
                        <div className="w-[37px] h-[37px] bg-[#c4c2be] shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]"></div>
                      )}
                    </div>
                  ))}
                </Flex>
              )
            })}
          </Flex>

          {/* 평점, cs, 골드 */}
          <Flex direction="col" justify="center" className=" gap-[5px]">
            <Text size="t2" className="text-[#4D4D4D]" weight="bold">
              평점 :&nbsp;
              {((player?.kills + player?.assists) / player?.deaths).toFixed(2)}
            </Text>
            <Text size="t2" className="text-[#4D4D4D]">
              CS : {player?.totalMinionsKilled} &nbsp;
              {`(${(player?.totalMinionsKilled / Math.floor(matchInfo.data.info.gameDuration / 60)).toFixed(1)})`}
            </Text>
            <Text size="t2" className="text-[#4D4D4D]">
              골드 : {player?.goldEarned}
            </Text>
          </Flex>

          {/* 챔피언 리스트 */}
          <Flex className="gap-[10px]">
            <Flex direction="col" justify="between">
              {team.team1.map((item: SummonerTeam, index: number) => (
                <Flex align="center" key={index}>
                  <button
                    onClick={() => {
                      window.open(
                        `/summoners/${item.riotIdGameName}-${item.riotIdTagline}`,
                        '_blank',
                      )
                    }}
                    className="flex items-center"
                  >
                    <ChampionProfile
                      name={item.championName}
                      className="w-[15px] h-[15px]"
                    />
                    <Text
                      size="t1"
                      className="text-[#4D4D4D] ml-[5px] w-[70px] text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      {/*{item.riotIdGameName} */}
                      유저 이름
                    </Text>
                  </button>
                </Flex>
              ))}
            </Flex>
            <Flex direction="col" justify="between">
              {team.team2.map((item: SummonerTeam, index: number) => (
                <Flex align="center" key={index}>
                  <button
                    onClick={() => {
                      window.open(
                        `/summoners/${item.riotIdGameName}-${item.riotIdTagline}`,
                        '_blank',
                      )
                    }}
                    className="flex items-center"
                  >
                    <ChampionProfile
                      name={item.championName}
                      className="w-[15px] h-[15px]"
                    />
                    <Text
                      size="t1"
                      className="text-[#4D4D4D] ml-[5px] w-[70px] text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      {/*{item.riotIdGameName} */}
                      유저 이름
                    </Text>
                  </button>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        justify="center"
        align="center"
        className={classNames(
          'w-full h-[20px] rounded-bl-[3px] rounded-br-[3px]',
          player?.win ? decoColor['win'] : decoColor['lose'],
        )}
      >
        <IoIosArrowDown fill="#fff" />
      </Flex>
    </Flex>
  )
}

export default MatchLow
