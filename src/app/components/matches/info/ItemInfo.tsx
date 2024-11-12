import React, { useState, useEffect } from 'react'
import Flex from '@/app/components/shared/Flex'
import ImageBox from '@/app/components/shared/ImageBox'
import { playerProps } from '@/models/type'

interface SummonerItem {
  line1: number[]
  line2: number[]
}

const ItemInfo = ({ player }: playerProps) => {
  //아이템 정보
  const [itemData, setitemData] = useState<SummonerItem>({
    line1: [],
    line2: [],
  })

  useEffect(() => {
    if (player != null) {
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

  return (
    <Flex direction="col" className=" gap-[6px]">
      {Object.entries(itemData).map(([item, data]) => {
        return (
          <Flex key={item} className="gap-[5px]">
            {data.map((a: number, idx: number) => (
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
  )
}

export default ItemInfo
