import React, { useState, useEffect } from 'react'

interface MatchListProps {
  [key: string]: any
}

const MatchLow = ({ matchInfo }: MatchListProps) => {
  const [isWin, setIsWin] = useState()

  useEffect(() => {
    const myId = 123
  }, [])

  //경기 승패 컬러
  const matchResultColor = {
    win: 'bg-[#5383e8]',
    lose: 'bg-[#fff1f3]',
  }
  return <div className="asd">123123</div>
}

export default MatchLow
