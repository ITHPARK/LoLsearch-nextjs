import React, { useEffect } from 'react'
import Flex from '../../shared/Flex'
import { playerInfoProps } from '@/models/type'
import ImageBox from '@/app/components/shared/ImageBox'
import ChampionProfile from '@/app/components/shared/ChampionProfile'

interface playersProps {
  teamInfo: Record<string, (string | null)[] | boolean | number | null>
  players: playerInfoProps
  divide: playerInfoProps[]
}

const TeamDetail = ({ teamInfo, players, divide }: playersProps) => {
  useEffect(() => {
    console.log(divide)
    console.log(Array.isArray(divide)) // true
  }, [teamInfo, players, divide])

  return (
    <Flex direction="col" className="flex-1 gap-[5px]">
      {divide.map((item, index) => {
        // 챔피언 이름과 레벨이 존재하고 string값과 number 값일 때 출력
        if (
          item.championName &&
          typeof item.championName === 'string' &&
          item.champLevel &&
          typeof item.champLevel === 'number'
        ) {
          return (
            <Flex key={index}>
              <div className="text-[#333]">
                <div className="w-[40px] h-[40px]">
                  {/* <ImageBox
                    src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/${item.championName}.png`}
                  /> */}

                  <ChampionProfile
                    name={item.championName}
                    level={item.champLevel}
                    className="w-[40px] h-[40px]"
                    levelClass="w-[14px] h-[14px] flex justify-center items-center absolute right-[3px] bottom-[3px] text-[10px] bg-[#000]"
                  />
                </div>
              </div>
            </Flex>
          )
        }

        return null // `championName`이 없거나 string이 아닌 경우 null 반환
      })}
    </Flex>
  )
}

export default TeamDetail
