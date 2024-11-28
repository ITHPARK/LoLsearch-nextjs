'use client'

import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { ChartData } from '@/models/type'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// 등록
ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
  responsive: true,
  maintainAspectRatio: false, // 차트의 비율 유지 비활성화
}

const DoughnutChart = ({ labels, chartData, backgroundColor }: ChartData) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: '승률',
        data: chartData,
        backgroundColor: backgroundColor,
      },
    ],
  }
  return (
    <div style={{ width: '200px', height: '200px', overflow: 'visible' }}>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default DoughnutChart
