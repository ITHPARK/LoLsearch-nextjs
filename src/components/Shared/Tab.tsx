import React, { useState } from 'react'
import Flex from './Flex'

// 컴포넌트 타입. 확장이 불가능하도록 type사용
type TabComponents = {
  [key: string]: React.ReactNode // 문자열 키에 React 컴포넌트를 매핑
}

interface TabComponentProps {
  labels: string[]
  components: TabComponents
}

const Tab = ({ labels, components }: TabComponentProps) => {
  const [focusTab, setFocusTab] = useState<string>(Object.keys(components)[0])

  const focusColor = {
    focused: 'bg-[#363742]',
    unFocused: 'bg-[#24252F]',
  }

  return (
    <Flex direction="col">
      <Flex>
        {labels.map((label, index) => {
          return (
            <button
              key={index}
              onClick={() => setFocusTab(Object.keys(components)[index])}
              className={`px-[15px] py-[10px]  rounded-tl-[5px] rounded-tr-[5px] ${focusTab == Object.keys(components)[index] ? focusColor.focused : focusColor.unFocused}  `}
            >
              {label}
            </button>
          )
        })}
      </Flex>

      <div className=" p-[15px] bg-[#363742] overflow-hidden rounded-tr-[10px] rounded-bl-[5px] rounded-br-[5px]">
        {components[focusTab]}
      </div>
    </Flex>
  )
}

export default Tab
