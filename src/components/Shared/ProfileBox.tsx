import classNames from 'classnames'
import { relative } from 'path'
import React from 'react'

interface ProfileBoxProps {
  size: 'small' | 'medium' | 'large'
  rounded?: 'empty' | 'light' | 'medium' | 'large'
  children: React.ReactNode
}

const ProfileBox = ({ size, rounded = 'empty', children }: ProfileBoxProps) => {
  const boxSize = {
    small: 'w-[60px] h-[60px]',
    medium: 'w-[80px] h-[80px]',
    large: 'w-[100px] h-[100px]',
  }

  const boxRounded = {
    empty: 'rounded-none',
    light: 'rounded-[5px]',
    medium: 'rounded-[8px]',
    large: 'rounded-[10px]',
  }
  return (
    <div
      className={classNames(
        `inline-block relative bg-[#d1d1d1]`,

        boxSize[size],
        boxRounded[rounded],
      )}
    >
      {children}
    </div>
  )
}

export default ProfileBox
