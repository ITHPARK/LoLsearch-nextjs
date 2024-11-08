import classNames from 'classnames'
import React from 'react'

interface ProfileBoxProps {
  rounded?: 'empty' | 'light' | 'medium' | 'large'
  children: React.ReactNode
  className?: string
}

const ProfileBox = ({
  rounded = 'empty',
  children,
  className,
}: ProfileBoxProps) => {
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
        boxRounded[rounded],
        className,
      )}
    >
      {children}
    </div>
  )
}

export default ProfileBox
