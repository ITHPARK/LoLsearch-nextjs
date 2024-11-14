import React, { useState, useEffect } from 'react'
import Flex from '@/app/components/shared/Flex'
import ImageBox from '@/app/components/shared/ImageBox'
import ChampionProfile from '@/app/components/shared/ChampionProfile'
import { useQuery } from '@tanstack/react-query'
import { infoCommonType } from '@/models/type'
import { fetchSpell, fetchPerks } from '@/apiFunction'

interface SummonerSpellProps {
  [key: string]: string
}

interface SummonerRuneProps {
  [key: string]: string | null
}

const CharactorSet = ({ player }: infoCommonType) => {
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
    queryKey: ['perk', player], // matchInfo가 변경되면 쿼리 다시 실행
    queryFn: () => {
      if (player != null) {
        return fetchPerks(
          player.perks.styles[0].style,
          player.perks.styles[1].style,
        )
      }
    },
    enabled: player != null, // player가 있을 때만 실행
  })

  useEffect(() => {
    //스펠 state 업데이트
    if (spellData != null) {
      setSpell({
        spell1: spellData.spells1[0].id,
        spell2: spellData.spells2[0].id,
      })
    }
  }, [spellData])

  useEffect(() => {
    if (player != null && player.perks != null && perksData != null) {
      //룬 플레이어가 선택한 룬 카테고리를 순회하면서 플레이어가 선택한 룬 정보를 필터링함
      const mainPerkImg = perksData.mainPerkData[0].slots[0].runes.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any) => data.id == player.perks.styles[0].selections[0].perk,
      )[0]?.icon

      // console.log(player.championName) //챔피언 이름
      // console.log(perksData.data.mainPerkData[0].slots[0].runes) //해당 플레이어가 선택한 룬 카테고리 배열
      // console.log(player.perks.styles[0].selections[0].perk) //해당 플레이어가 선택한 룬정보

      setRune({
        mainRune: mainPerkImg,
        subRune: perksData.subPerkData[0].icon,
      })
    }
  }, [player, perksData])

  return (
    <Flex>
      {/* 챔피언 이미지  */}
      <ChampionProfile
        name={player?.championName}
        level={player?.champLevel}
        className="w-[80px] h-[80px]"
        levelClass="w-[20px] h-[20px] flex justify-center items-center absolute right-[3px] bottom-[3px] text-[14px] bg-[#000]"
      />

      {/* 스펠 정보  */}
      <Flex direction="col" justify="between" className="ml-[6px]">
        <div className="w-[37px] h-[37px]">
          {spell.spell1 && (
            <ImageBox
              src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/${spell.spell1}.png`}
            />
          )}
        </div>
        <div className="w-[37px] h-[37px]">
          {spell.spell2 && (
            <ImageBox
              src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/${spell.spell2}.png`}
            />
          )}
        </div>
      </Flex>

      {/* 룬 정보  */}
      <Flex direction="col" justify="between" className="ml-[8px]">
        <div></div>
        <div className="p-[4px] w-[33px] h-[33px] bg-[#000] rounded-[50%]">
          {rune.mainRune && (
            <ImageBox
              src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.mainRune}`}
            />
          )}
        </div>
        <div className="p-[6px] w-[33px] h-[33px] bg-[#000] rounded-[50%]">
          {rune.subRune && (
            <ImageBox
              src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.subRune}`}
            />
          )}
        </div>
      </Flex>
    </Flex>
  )
}

export default CharactorSet
