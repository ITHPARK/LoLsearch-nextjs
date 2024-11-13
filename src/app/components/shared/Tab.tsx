'use client'

import React, { useState } from 'react'
import Flex from '@/app/components/shared/Flex'
import classNames from 'classnames'

// 컴포넌트 타입. 확장이 불가능하도록 type사용
type TabComponents = {
  [key: string]: React.ReactNode // 문자열 키에 React 컴포넌트를 매핑
}

interface TabComponentProps {
  labels: string[]
  components: TabComponents
  flexoption?: string
  buttonClass?: string
  pageClass?: string
  focusColor?: string
  unFocusColor?: string
}

const Tab = ({
  labels,
  components,
  flexoption,
  buttonClass,
  pageClass,
  focusColor,
  unFocusColor,
}: TabComponentProps) => {
  const [focusTab, setFocusTab] = useState<string>(Object.keys(components)[0])

  return (
    <Flex direction="col">
      <Flex className={classNames(flexoption)}>
        {labels.map((label, index) => {
          return (
            <button
              key={index}
              onClick={() => setFocusTab(Object.keys(components)[index])}
              className={classNames(buttonClass)}
              style={{
                backgroundColor:
                  focusTab === Object.keys(components)[index]
                    ? focusColor
                    : unFocusColor,
              }}
            >
              {label}
            </button>
          )
        })}
      </Flex>

      <div className={classNames(pageClass)}>{components[focusTab]}</div>
    </Flex>
  )
}

export default Tab
