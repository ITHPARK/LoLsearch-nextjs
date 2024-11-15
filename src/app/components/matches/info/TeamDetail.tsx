'use client'

import React, { useState, useEffect } from 'react'
import Flex from '../../shared/Flex'
import Text from '../../shared/Text'
import { infoCommonType } from '@/models/type'
import ChampionProfile from '@/app/components/shared/ChampionProfile'
import ImageBox from '@/app/components/shared/ImageBox'
import { useRouter } from 'next/navigation'
import { fetchSpell, fetchPerks } from '@/apiFunction/index'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'

interface playersProps {
  teamInfo: infoCommonType
  divide: infoCommonType[]
  bestDamage: number[]
}

//팀 전체 스펠 가져오기
const fetchSpells = async (divide: infoCommonType[]) => {
  try {
    const response = await Promise.all(
      divide.map((player) => {
        return fetchSpell(player.summoner1Id, player.summoner2Id)
      }),
    )

    return response.map((item) => [item.spells1[0], item.spells2[0]])
  } catch (error) {
    console.error('잠시휴 다시 시도해주세요.', error)
  }
}

//팀 전체 룬 정보 가져오기
const fetchTeamPerks = async (divide: infoCommonType[]) => {
  try {
    const response = await Promise.all(
      divide.map((player) => {
        return fetchPerks(
          player.perks.styles[0].style,
          player.perks.styles[1].style,
        )
      }),
    )

    return response.map((item) => item)
  } catch (error) {
    console.error('잠시휴 다시 시도해주세요.', error)
  }
}

const TeamDetail = ({ teamInfo, divide, bestDamage }: playersProps) => {
  const router = useRouter()
  const [perksArr, setpPerksArr] = useState<string[]>([])

  const { data: teamSpell = [], isLoading: teamSpellLoading } = useQuery({
    queryKey: ['spells', divide],
    queryFn: () => fetchSpells(divide),
    enabled: Boolean(divide.length > 0), // divide.length > 0일 때 실행
  })

  // 룬 데이터 가져오기
  const { data: teamPerks, isLoading: teamPerksLoading } = useQuery({
    queryKey: ['perk', divide], // matchInfo가 변경되면 쿼리 다시 실행
    queryFn: () => {
      if (divide != null) {
        return fetchTeamPerks(divide)
      }
      return [] // 데이터가 없으면 빈 배열을 반환
    },
    enabled: Boolean(divide.length > 0), // player가 있을 때만 실행
  })

  useEffect(() => {
    if (teamPerks != null) {
      //각 소환사의 메인 룬 이미지 경로
      const mainPerkImg = teamPerks.map((item, index) => {
        return item.mainPerkData[0].slots[0].runes.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (data: infoCommonType) =>
            data.id == divide[index].perks.styles[0].selections[0].perk,
        )[0]?.icon
      })

      setpPerksArr(mainPerkImg)
    }
  }, [teamPerks, divide])

  // useEffect(() => {
  //   console.log(divide)
  // }, [divide])

  // useEffect(() => {
  //   console.log(teamInfo)
  // }, [teamInfo])

  if (teamSpellLoading || teamPerksLoading) {
    return <div className="text-[#4D4D4D]">로딩중</div>
  }

  return (
    <Flex
      direction="col"
      className={classNames(
        teamInfo.win ? 'bg-matchResultWin' : 'bg-matchResultLose',
      )}
    >
      <Flex
        align="center"
        className={classNames(
          'p-[10px] flex-1  bg-white border-solid border-[1px] border-[#ddd]',
          teamInfo.win
            ? 'shadow-[0_1px_0px_rgba(83,131,232,0.4)]'
            : 'shadow-[0_1px_0px_rgba(232,64,87,0.4)]',
        )}
      >
        <Flex className="w-[245px]">
          <Text
            size="t2"
            weight="bold"
            className={classNames(
              teamInfo.win ? 'text-decoWin' : 'text-decoLose',
            )}
          >
            {teamInfo.win ? '승리' : '패배'}
          </Text>
          <Text size="t1" className="text-[#4D4D4D]">
            {teamInfo.teamId == 200 ? '(레드팀)' : '(블루팀)'}
          </Text>
        </Flex>
        <Text size="t2" className="w-[65px] text-[#4D4D4D] text-center">
          스코어
        </Text>
        <Text
          size="t2"
          className="ml-[35px] w-[228px] text-[#4D4D4D] text-center"
        >
          아이템
        </Text>
        <Text size="t2" className="ml-[40px] flex-1 text-[#4D4D4D] text-center">
          설치/파괴/제어
        </Text>
        <Text
          size="t2"
          className="ml-[40px] w-[220px] text-[#4D4D4D] text-center"
        >
          피해량
        </Text>
      </Flex>
      <Flex direction="col" justify="center" className="p-[10px] gap-[5px]">
        {divide.map((item: infoCommonType, index: number) => {
          // 챔피언 이름과 레벨이 존재하고 string값과 number 값일 때 출력

          return (
            <Flex key={index}>
              <Flex>
                {/* 챔피언 사진 */}
                <div className="w-[40px] h-[40px]">
                  <ChampionProfile
                    name={item.championName}
                    level={item.champLevel}
                    className="w-[40px] h-[40px]"
                    levelClass="w-[14px] h-[14px] flex justify-center items-center absolute right-[3px] bottom-[3px] text-[10px] bg-[#000]"
                  />
                </div>

                {/* 스펠 정보  */}
                {teamSpell && (
                  <Flex direction="col" justify="between" className="ml-[4px]">
                    <div className="w-[18px] h-[18px]">
                      <ImageBox
                        src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/${teamSpell[index][0]?.id}.png`}
                      />
                    </div>
                    <div className="w-[18px] h-[18px]">
                      <ImageBox
                        src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/${teamSpell[index][1]?.id}.png`}
                      />
                    </div>
                  </Flex>
                )}

                {/* 룬 정보  */}
                {perksArr && teamPerks != null ? (
                  <Flex direction="col" justify="between" className="ml-[4px]">
                    <div className="p-[2px] w-[19px] h-[19px] bg-[#000] rounded-[50%]">
                      <ImageBox
                        src={`https://ddragon.leagueoflegends.com/cdn/img/${perksArr[index]}`}
                      />
                    </div>
                    <div className="p-[4px] w-[19px] h-[19px] bg-[#000] rounded-[50%]">
                      <ImageBox
                        src={`https://ddragon.leagueoflegends.com/cdn/img/${teamPerks[index]?.subPerkData[0].icon}`}
                      />
                    </div>
                  </Flex>
                ) : null}
              </Flex>

              {/* 소환사 이름 */}
              <button
                className="ml-[20px] w-[140px] text-left"
                onClick={() => {
                  router.push(
                    `/summoners/${item.riotIdGameName}-${item.riotIdTagline}`,
                  )
                }}
              >
                <Text size="t2" weight="bold" className="text-[#4D4D4D]">
                  {item.riotIdGameName}
                </Text>
              </button>

              {/* 소환사 킬뎃  */}

              <Flex
                direction="col"
                justify="center"
                align="center"
                className="w-[65px]"
              >
                <Flex justify="center" align="center">
                  <Text size="t1" className="text-[#4D4D4D]">
                    {item.kills}
                  </Text>
                  <Text size="t1" className="mx-[3px] text-[#4D4D4D]">
                    /
                  </Text>
                  <Text size="t1" className="text-[#4D4D4D]">
                    {item.deaths}
                  </Text>
                  <Text size="t1" className="mx-[3px] text-[#4D4D4D]">
                    /
                  </Text>
                  <Text size="t1" className="text-[#4D4D4D]">
                    {item.assists}
                  </Text>
                </Flex>
                <Text
                  size="t1"
                  weight="bold"
                  className="mt-[5px] text-[#7A7A7A]"
                >
                  {item.deaths > 0
                    ? ((item.kills + item.assists) / item.deaths).toFixed(2)
                    : (item.kills + item.assists).toFixed(2)}
                </Text>
              </Flex>

              {/* 아이템  */}
              <Flex align="center" className="ml-[35px] gap-[3px]">
                {Array.from({ length: 7 }).map((_, index: number) => {
                  return (
                    <div
                      key={index}
                      className="w-[30px] h-[30px] rounded-[3px] overflow-hidden"
                    >
                      {item['item' + index] > 0 ? (
                        <ImageBox
                          src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/item/${item['item' + index]}.png`}
                        />
                      ) : (
                        <div className="w-[30px] h-[30px] bg-[#c4c2be] shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]"></div>
                      )}
                    </div>
                  )
                })}
              </Flex>

              {/* 시야 */}
              <Flex
                direction="col"
                align="center"
                justify="center"
                className=" ml-[40px] flex-1 gap-[3px]"
              >
                <Text size="t1" className="text-[#4D4D4D]">
                  시야
                </Text>
                <Flex className="gap-[5px] text-[#4D4D4D]">
                  <Text size="t1" className="text-[#4D4D4D]">
                    {item.wardsPlaced}
                  </Text>
                  /
                  <Text size="t1" className="text-[#4D4D4D]">
                    {item.wardsKilled}
                  </Text>
                  /
                  <Text size="t1" className="text-[#4D4D4D]">
                    {item.visionWardsBoughtInGame}
                  </Text>
                </Flex>
              </Flex>

              {/* 챔피언 피해량 */}
              <Flex align="center" className="ml-[40px] gap-[20px]">
                {/* 입힌 피해량 */}
                <Flex direction="col" align="center" className="gap-[3px]">
                  <Text size="t1" className="text-[#4D4D4D] tracking-[-0.03em]">
                    {item.totalDamageDealtToChampions.toLocaleString()}
                  </Text>
                  <div className="w-[100px] h-[10px] bg-[#ddd]">
                    <div
                      style={{
                        width: `${parseFloat((item.totalDamageDealtToChampions / bestDamage[0]).toFixed(2)) * 100}%`,
                        height: '100%',
                        background: 'red',
                      }}
                    ></div>
                  </div>
                </Flex>
                {/* 받은 피해량 */}
                <Flex direction="col" align="center" className="gap-[3px]">
                  <Text size="t1" className="text-[#4D4D4D] tracking-[-0.03em]">
                    {item.totalDamageTaken.toLocaleString()}
                  </Text>
                  <div className="w-[100px] h-[10px] bg-[#ddd]">
                    <div
                      style={{
                        width: `${parseFloat((item.totalDamageTaken / bestDamage[1]).toFixed(2)) * 100}%`,
                        height: '100%',
                        background: 'red',
                      }}
                    ></div>
                  </div>
                </Flex>
              </Flex>
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default TeamDetail
