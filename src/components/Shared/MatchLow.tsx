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

  //소환사 룬
  const [rune, setRune] = useState<SummonerRuneProps>({
    mainRune: '',
    subRune: '',
  })

  useEffect(() => {
    const playerInfo = matchInfo?.data.info.participants.filter(
      (item: MatchListProps) => {
        return item.puuid == playerPuuid
      },
    )

    console.log(playerInfo[0])
    console.log(matchInfo)

    setPlayer(playerInfo[0])
    if (matchInfo.data.info.gameMode == 'CLASSIC') {
      setGameMode('클래식 모드')
    } else if (matchInfo.data.info.gameMode == 'ARAM') {
      setGameMode('무작위 총력전')
    } else {
      setGameMode('특별 게임 모드')
    }
  }, [matchInfo, playerPuuid])

  const { data: spellData } = useQuery({
    queryKey: ['spell', player?.summoner1Id, player?.summoner2Id],
    queryFn: () => {
      if (player?.summoner1Id && player?.summoner2Id) {
        //player가 있을 때 실행
        return fetchSpell(player.summoner1Id, player.summoner2Id)
      }
    },
    enabled: Boolean(player?.summoner1Id && player?.summoner2Id), // only run when player and both summoner IDs are available
  })

  const { data: perksData } = useQuery({
    queryKey: ['perk', matchInfo],
    queryFn: () => {
      if (player != null) {
        return fetchPerks(
          player.perks.styles[0].selections[0].perk,
          player.perks.styles[1].style,
        )
      }
    },
    enabled: player != null,
  })

  useEffect(() => {
    if (player != null && player.perks != null) {
      console.log(perksData)
      setRune({
        mainRune: perksData?.data.mainPerkData[0],
        subRune: perksData?.data.subPerkData[0],
      })
    }
  }, [player, perksData])

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
          <ChampionProfile
            name={player?.championName}
            level={player?.champLevel}
            className="w-[74px] h-[74px] "
          />
          <Flex direction="col" justify="between" className="ml-[6px]">
            <div className="w-[33px] h-[33px]">
              <ImageBox
                src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/${spellData?.data[0].id}.png`}
              />
            </div>
            <div className="w-[33px] h-[33px]">
              <ImageBox
                src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/${spellData?.data[1].id}.png`}
              />
            </div>
          </Flex>

          <Flex direction="col" justify="between" className="ml-[8px]">
            <div className="w-[33px] h-[33px]">
              <ImageBox
                src={`https://ddragon.leagueoflegends.com/cdn/img/${perksData?.data.mainPerkData[0].slots[0].runes[0].icon}`}
              />
            </div>
            <div className="w-[33px] h-[33px]">
              <ImageBox
                src={`https://ddragon.leagueoflegends.com/cdn/img/${perksData?.data.subPerkData[0].icon}`}
              />
            </div>
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
