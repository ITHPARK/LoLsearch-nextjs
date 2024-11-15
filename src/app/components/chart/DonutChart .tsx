'use client'

import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { ChartData } from '@/models/type'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// 등록
ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({ labels, chartData, backgroundColor }: ChartData) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset',
        data: chartData,
        backgroundColor: backgroundColor,
        hoverOffset: 4,
      },
    ],
  }
  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Doughnut data={data} />
    </div>
  )
}

export default DoughnutChart
