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
  [key: string]: string
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
    mainRune: '',
    subRune: '',
  })

  //연속킬 정보
  const [kills, setKills] = useState<React.ReactNode>(null)

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

  //룬 데이터 가져오기
  const { data: perksData } = useQuery({
    queryKey: ['perk', matchInfo],
    queryFn: () => {
      if (player != null) {
        return fetchPerks(
          player.perks.styles[0].style,
          player.perks.styles[1].style,
        )
      }
    },
    enabled: player != null,
  })

  useEffect(() => {
    if (matchInfo && playerPuuid) {
      const playerInfo = matchInfo.data.info.participants.filter(
        (item: MatchListProps) => {
          return item.puuid == playerPuuid
        },
      )
      console.log(playerInfo[0])

      setPlayer(playerInfo[0])
      if (matchInfo.data.info.gameMode == 'CLASSIC') {
        setGameMode('클래식 모드')
      } else if (matchInfo.data.info.gameMode == 'ARAM') {
        setGameMode('무작위 총력전')
      } else {
        setGameMode('특별 게임 모드')
      }
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
      const mainPerkImg = perksData.data.mainPerkData[0].slots[0].runes.filter(
        (data: any) => data.id == player.perks.styles[0].selections[0].perk,
      )[0].icon

      setRune({
        mainRune: mainPerkImg,
        subRune: perksData.data.subPerkData[0].icon,
      })
    }
  }, [player, perksData, rune])

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
        <Flex direction="col" justify="center" className="w-[110px]">
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

        <Flex>
          {/* 챔피언 이미지  */}
          <ChampionProfile
            name={player?.championName}
            level={player?.champLevel}
            className="w-[74px] h-[74px] "
          />

          {/* 스펠 정보  */}
          <Flex direction="col" justify="between" className="ml-[6px]">
            <div className="w-[33px] h-[33px]">
              <ImageBox
                src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/${spell.spell1}.png`}
              />
            </div>
            <div className="w-[33px] h-[33px]">
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

          {/* 킬뎃 정보  */}
          <Flex justify="center" align="center" className="w-[80px] ml-[40px]">
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
