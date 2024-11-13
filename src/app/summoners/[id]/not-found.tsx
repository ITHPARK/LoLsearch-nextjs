import React from 'react'
import Text from '../../components/shared/Text'

const NotFoundSummoner = () => {
  return (
    <Text
      display="block"
      size="t4"
      textAlign="center"
      weight="bold"
      className="pt-[50px]"
    >
      일치하는 소환사가 없습니다.
    </Text>
  )
}

export default NotFoundSummoner
