import React, { useState, useEffect } from 'react'
import Flex from '@/app/components/shared/Flex'
import Text from '@/app/components/shared/Text'
import { playerProps } from '@/models/type'

const KillDeathInfo = ({ player }: playerProps) => {
  //연속킬 정보
  const [kills, setKills] = useState<React.ReactNode>(null)

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
  return (
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
  )
}

export default KillDeathInfo
