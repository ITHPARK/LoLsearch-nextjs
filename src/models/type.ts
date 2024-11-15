export interface infoCommonType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface SummonerRankProps {
  summonerRank: {
    leagueId: string
    queueType: string
    tier: string
    rank: string
    summonerId: string
    leaguePoints: number
    wins: number
    losses: number
    veteran: boolean
    inactive: boolean
    freshBlood: boolean
    hotStreak: boolean
  }[]
}

export interface ChartData {
  labels: string[]
  chartData: number[]
  backgroundColor: string[]
  hoverBackgroundColor?: string[]
}
