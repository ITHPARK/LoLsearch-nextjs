import React, { useState, useEffect } from 'react'
import Flex from '@/app/components/shared/Flex'
import Text from '@/app/components/shared/Text'
import classNames from 'classnames'
import { matchInfoProps } from '@/models/type'
import { playerProps } from '@/models/type'

const GameCategory = ({
  player,
  matchInfo,
}: {
  player: playerProps
  matchInfo: matchInfoProps
}) => {
  const [gameMode, setGameMode] = useState<string>('')

  useEffect(() => {
    if (matchInfo && player) {
      if (matchInfo.data.info.gameMode == 'CLASSIC') {
        setGameMode('클래식 모드')
      } else if (matchInfo.data.info.gameMode == 'ARAM') {
        setGameMode('무작위 총력전')
      } else {
        setGameMode('특별 게임 모드')
      }
    }
  }, [matchInfo, player])

  return (
    <Flex direction="col" justify="center" className="w-[150px]">
      <Text display="block" size="t2" className="text-[#4D4D4D]" weight="bold">
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
            player?.win ? 'bg-decoWin' : 'bg-decoLose',
          )}
        >
          {player?.win ? '승리' : '패배'}
        </Text>
      </div>
    </Flex>
  )
}

export default GameCategory
