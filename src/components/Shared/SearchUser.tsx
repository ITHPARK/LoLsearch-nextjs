'use client'

import React, { useState, useEffect } from 'react'
import Flex from './Flex'
import { IoSearch } from '@react-icons/all-files/io5/IoSearch'

const SearchUser = () => {
  const [search, setSearch] = useState<string>()

  //e는 이벤트 핸들러 타입
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  useEffect(() => {}, [search, setSearch])

  const handleClick = () => {}

  return (
    <Flex className="px-[15px] py-[8px] mx-auto w-[500px] bg-white rounded-[25px]  overflow-hidden">
      <input
        type="text"
        className=" w-full block outline-none"
        placeholder="소환사 이름을 입력해주세요"
        value={search}
        onChange={handleChangeValue}
      />
      <button
        type="button"
        className="p-[6px] cursor-pointer bg-darkGray rounded-[50%]"
      >
        <IoSearch className="text-white text-[20px]" />
      </button>
    </Flex>
  )
}

export default SearchUser
