import React from 'react'
import classNames from 'classnames'

interface TextProps {
  display?: string
  size?: 't1' | 't2' | 't3' | 't4' | 't5' | 't6'
  weight?: 'light' | 'bold' //이 세개중 하나만 들어올 수 있음
  textAlign?: 'center' | 'left' | 'right'
  className?: string
  children: React.ReactNode
}

const Text: React.FC<TextProps> = ({
  display = 'inline-block',
  size,
  weight,
  textAlign,
  className,
  children,
}) => {
  const sizeClasses = {
    //font-size속성
    t1: 'text-[12px]',
    t2: 'text-[14px]',
    t3: 'text-[16px]',
    t4: 'text-[20px]',
    t5: 'text-[26px]',
    t6: 'text-[32px]',
    t7: 'text-[40px]',
  }

  const fontWeight = {
    //font-weight속성
    light: 'font-light',
    bold: 'font-bold',
  }

  const fontAlign = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  }

  return (
    <span
      className={classNames(
        display,
        size ? sizeClasses[size] : '',
        weight ? fontWeight[weight] : 'font-medium',
        textAlign ? fontAlign[textAlign] : '',
        className,
      )}
    >
      {children}
    </span>
  )
}

export default Text
