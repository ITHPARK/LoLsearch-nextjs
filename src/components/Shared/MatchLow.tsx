import React, { useState, useEffect } from 'react'
import {useRecoilValue} from 'recoil'
import {summonerPuuid} from '@/atom/summoner'

interface MatchListProps {
  [key: string]: any
}

const MatchLow = ({ matchInfo }: MatchListProps) => {
  const [isWin, setIsWin] = useState<boolean>()
  const playerPuuid = useRecoilValue(summonerPuuid)

  useEffect(() => {

    console.log(matchInfo.info.participants)
    // const matchWin = matchInfo.info.participants.filter((item) => {
    //   console.log(item.puuid)
    //   return item.puuid == playerPuuid
    // })

  }, [matchInfo, playerPuuid])

  //경기 승패 컬러
  const matchResultColor = {
    win: 'bg-[#5383e8]',
    lose: 'bg-[#fff1f3]',
  }
  return <div className="asd">123123</div>
}

export default MatchLow
