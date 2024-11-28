import React from 'react'
import Text from './components/shared/Text'

const NotFoundSummoner = () => {
  return (
    <div className="h-[100vh] bg-black">
      <Text
        display="block"
        size="t4"
        textAlign="center"
        weight="bold"
        className="pt-[50px]"
      >
        페이지를 찾을 수 없습니다.
      </Text>
    </div>
  )
}

export default NotFoundSummoner
