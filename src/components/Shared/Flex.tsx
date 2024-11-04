import React, { ElementType } from 'react'

import classNames from 'classnames'

interface FlexProps {
  as?: ElementType // HTML 태그나 React 컴포넌트를 허용하는 타입
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  direction?: 'row' | 'col'
  className?: string
  children: React.ReactNode
}

const Flex: React.FC<FlexProps> = ({
  as: Component = 'div', // as Props를 받아서 원하는 태그로 리턴할 수 있도록 한다.
  align,
  justify,
  direction = 'column',
  className,
  children,
}) => {
  const flexAlign = {
    //align-items 속성
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    baseline: 'items-baseline',
    stretch: 'items-stretch',
  }

  const flexJustify = {
    //justify-content 속성
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }

  const flexDirection = {
    //flex-direction속성
    row: 'flex-row',
    col: 'flex-col',
  }

  return (
    <Component
      className={classNames(
        'flex',
        align ? flexAlign[align] : '',
        justify ? flexJustify[justify] : '',
        direction ? flexDirection[direction as keyof typeof flexDirection] : '', // flex-direction에서 row와 col만 사용하도록 타입 지정
        className,
      )}
    >
      {children}
    </Component>
  )
}

export default Flex
