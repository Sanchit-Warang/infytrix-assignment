import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Sales } from '@/types'
import { getRandomColor } from '@/utils'

ChartJS.register(ArcElement, Title, Tooltip, Legend)

export type CategoriesPieChartProps = {
  data: Sales[]
}

const CategoriesPieChart = ({ data }: CategoriesPieChartProps) => {
  const aggregatedData = data.reduce((acc, item) => {
    const existingProduct = acc.find((sale) => sale.category === item.category)
    if (existingProduct) {
      existingProduct.sales += item.sales
    } else {
      acc.push({ category: item.category, sales: item.sales })
    }
    return acc
  }, [] as { category: string; sales: number }[])

  const totalSales = aggregatedData.reduce((acc, item) => acc + item.sales, 0)

  const colors = aggregatedData.map(() => getRandomColor())

  const chartData = {
    labels: aggregatedData.map((product) => product.category),
    datasets: [
      {
        label: 'Category',
        data: aggregatedData.map((product) => {
          return (product.sales / totalSales) * 360
        }),
        backgroundColor: colors.map((color) => `${color}66`), // 0.6 opacity
        borderColor: colors, // Fully opaque
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    // indexAxis: 'y' as const,
  }

  return (
    <div>
      <Pie data={chartData} options={options} />{' '}
    </div>
  )
}

export default CategoriesPieChart
