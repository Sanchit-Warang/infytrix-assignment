import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Sales } from '@/types'
import { getRandomColor } from '@/utils'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export type ProductsBarChartProps = {
  data: Sales[]
}

const ProductsBarChart = ({ data }: ProductsBarChartProps) => {
  const aggregatedData = data.reduce((acc, item) => {
    const existingProduct = acc.find(
      (product) => product.productName === item.productName
    )
    if (existingProduct) {
      existingProduct.sales += item.sales
    } else {
      acc.push({ productName: item.productName, sales: item.sales })
    }
    return acc
  }, [] as { productName: string; sales: number }[])

  const colors = aggregatedData.map(() => getRandomColor())

  const chartData = {
    labels: aggregatedData.map((product) => product.productName),
    datasets: [
      {
        label: 'Sales',
        data: aggregatedData.map((product) => product.sales),
        backgroundColor: colors.map((color) => `${color}66`), // 0.6 opacity
        borderColor: colors, // Fully opaque
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    indexAxis: 'y' as const,
  }

  return <Bar data={chartData} options={options} />
}

export default ProductsBarChart
