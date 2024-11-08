'uss client'

import Flex from './Flex'
import React from 'react'
import { Kanit } from 'next/font/google'

const fontKanit = Kanit({
  weight: ['700'],
  subsets: ['latin'],
})

const NavBar = () => {
  return (
    <Flex
      justify="center"
      className="w-full py-[10px] h-[60px] bg-darkGray fixed left-0 top-0 border-solid border-b-[1px] border-[#4B4F5C] z-10"
    >
      <Flex
        justify="between"
        align="center"
        className="max-w-[1080px] w-full h-full"
      >
        <h1 className={`${fontKanit.className} text-[36px] `}>LoLs</h1>

        <Flex as="ul">
          <li>로그인</li>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NavBar
