import { Sales } from '@/types'
import { getRandomColor } from '@/utils'
import { timeSlots } from '@/utils'

export type TodaysProductsLineChartProps = {
  data: Sales[]
  data2?: Sales[]
  selectedProduct: string
}

import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const SalesChart = ({
  data,
  data2 = [],
  selectedProduct,
}: TodaysProductsLineChartProps) => {
  const salesData = data
  const salesData2 = data2

  const processedData = useMemo(() => {
    const dataMap = new Map(timeSlots.map((time) => [time, 0]))
    salesData.forEach((entry) => {
      const time = new Date(entry.time).getHours()
      if (entry.productName === selectedProduct) {
        dataMap.set(time, (dataMap.get(time) || 0) + entry.sales)
      }
    })

    return Array.from(dataMap, ([time, sales]) => ({ time, sales }))
  }, [selectedProduct])

  const processedData2 = useMemo(() => {
    const dataMap = new Map(timeSlots.map((time) => [time, 0]))
    salesData2.forEach((entry) => {
      const time = new Date(entry.time).getHours()
      if (entry.productName === selectedProduct) {
        dataMap.set(time, (dataMap.get(time) || 0) + entry.sales)
      }
    })

    return Array.from(dataMap, ([time, sales]) => ({ time, sales }))
  }, [selectedProduct])

  const color = getRandomColor()

  let totalSales = 0
  let totalSales2 = 0

  const chartData = {
    labels: processedData.map((entry) => entry.time),
    datasets: [
      {
        label: `Day 1 Sales`,
        data: processedData.map((entry) => {
          return (totalSales += entry.sales)
        }),
        borderColor: color,
        backgroundColor: `${color}66`,
        tension: 0.4, // Makes the line smooth
        fill: true,
      },
    ],
  }

  if (data2.length > 0) {
    chartData.datasets.push({
      label: `Day 2 Sales`,
      data: processedData2.map((entry) => {
        return (totalSales2 += entry.sales)
      }),
      borderColor: getRandomColor(),
      backgroundColor: `${getRandomColor()}66`,
      tension: 0.4, // Makes the line smooth
      fill: true,
    })
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'hours', // X-axis label
        },
      },
      y: {
        title: {
          display: true,
          text: 'sales', // Y-axis label
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Product Sales Throughout the Day',
      },
    },
  }
  return (
    <div className="md:w-3/4 h-[40vh] md:h-[60vh] w-full">
      <Line options={options} data={chartData} />
    </div>
  )
}

export default SalesChart
