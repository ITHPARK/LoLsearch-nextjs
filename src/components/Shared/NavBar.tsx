'uss client'

import Flex from './Flex'
import React from 'react'

const NavBar = () => {
  return (
    <Flex
      justify="center"
      className="w-full py-[10px] h-[60px] bg-darkGray fixed left-0 top-0 border-solid border-b-[1px] border-white"
    >
      <Flex
        justify="between"
        align="center"
        className="max-w-[1200px] w-full h-full"
      >
        <h1>Logo</h1>

        <Flex as="ul">
          <li>로그인</li>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NavBar
