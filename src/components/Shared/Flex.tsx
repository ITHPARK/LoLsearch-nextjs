'uss client'

import React, { ElementType } from 'react'

import { CSSProperties } from 'react'
import classNames from 'classnames'

interface FlexProps {
  as?: ElementType // HTML 태그나 React 컴포넌트를 허용하는 타입
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
  direction?: CSSProperties['flexDirection']
  gap?: CSSProperties['gap']
  children: React.ReactNode
}

const Flex: React.FC<FlexProps> = ({
  as: Component = 'div', //as Props를 받아서 원하는  태그로 리턴할 수 있도록 한다.
  align,
  justify,
  direction,
  gap,
  children,
}) => {
  return (
    <Component
      className={classNames(
        'flex',
        align ? `items-${align}` : '',
        justify ? `justify-${justify}` : '',
        direction ? `flex-${direction}` : '',
        gap ? `gap-${gap}` : '',
      )}
    >
      {children}
    </Component>
  )
}

export default Flex
