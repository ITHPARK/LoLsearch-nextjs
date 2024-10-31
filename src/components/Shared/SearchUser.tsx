'use client'

import React, { useState, useEffect } from 'react'
import Flex from './Flex'
import { IoSearch } from '@react-icons/all-files/io5/IoSearch'
import { useRouter } from 'next/navigation'

const SearchUser = () => {
  const [search, setSearch] = useState<string>()
  const router = useRouter()

  //e는 이벤트 핸들러 타입
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleClickSearch = () => {
    if (search != null && search.includes('#')) {
      const [name, tag] = search.split('#') as string[]
      router.push(`/summoners/${name}-${tag}`)
    } else {
      alert('소환사 이름과 태그를 입력해 주세요')
    }
  }

  return (
    <Flex className="px-[15px] py-[8px] mx-auto w-[500px] bg-white rounded-[25px]  overflow-hidden">
      <input
        type="text"
        className=" w-full block outline-none"
        placeholder="소환사 이름+태그"
        value={search}
        onChange={handleChangeValue}
      />
      <button
        type="button"
        className="p-[6px] cursor-pointer bg-darkGray rounded-[50%]"
        onClick={handleClickSearch}
      >
        <IoSearch className="text-white text-[20px]" />
      </button>
    </Flex>
  )
}

export default SearchUser
