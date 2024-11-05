'use client'

import React, { useState, useCallback } from 'react'
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

  const checkSearch = useCallback(() => {
    if (search != null && search.includes('#')) {
      const [name, tag] = search.split('#') as string[]
      router.push(`/summoners/${name}-${tag}`)
    } else {
      alert('소환사 이름과 태그를 입력해 주세요')
    }
  }, [search, router])

  const handleClickSearch = useCallback(() => {
    checkSearch()
  }, [checkSearch])

  //KeyboardEvent =  키보드 이벤트가 발생할 때 제공되는 이벤트 객체의 타입
  const handleKeyDouwn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //누른 키가 엔터라면
    if (e.key === 'Enter') {
      checkSearch()
    }
  }

  return (
    <Flex className="px-[15px] py-[8px] mx-auto w-[500px] bg-white rounded-[25px]  overflow-hidden">
      <input
        type="text"
        className=" w-full block outline-none"
        placeholder="소환사 이름+#태그"
        value={search}
        onChange={handleChangeValue}
        onKeyDown={handleKeyDouwn}
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
