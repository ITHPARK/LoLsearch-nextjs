import classNames from 'classnames'
import React from 'react'
import ImageBox from '@/app/components/shared/ImageBox'

interface ChampionProfileProps {
  name: string
  level?: number
  rounded?: 'circle' | 'square'
  className?: string
  levelClass?: string
}

const ChampionProfile = ({
  name,
  level,
  rounded = 'square',
  className = '',
  levelClass = '',
}: ChampionProfileProps) => {
  //챔피언 초상화 모양
  const championProfileShape = {
    circle: 'rounded-[50%]',
    square: 'rounded-[5px]',
  }

  return (
    <div
      className={classNames(
        championProfileShape[rounded],
        className,
        'relative',
      )}
    >
      <ImageBox
        src={`https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/${name}.png`}
        alt={name}
      />
      {level && <span className={levelClass}>{level || ''}</span>}
    </div>
  )
}

export default ChampionProfile
