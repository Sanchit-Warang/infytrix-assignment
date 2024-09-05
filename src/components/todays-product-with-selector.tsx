import TodaysProductsLineChart from './graphs/todays-products-line-graph'
import { Sales } from '@/types'
import { useState, useMemo } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const TodaysProductsLine = ({
  data,
  data2 = [],
}: {
  data: Sales[]
  data2?: Sales[]
}) => {
  const [selectedProduct, setSelectedProduct] = useState('')

  const products = useMemo(() => {
    const temp = Array.from(new Set(data.map((entry) => entry.productName)))
    setSelectedProduct(temp[0])
    return temp
  }, [])

  return (
    <div>
      <Select onValueChange={setSelectedProduct} value={selectedProduct}>
        <SelectTrigger className="w-[10rem] mb-4">
          <SelectValue placeholder="Select a product" />
        </SelectTrigger>
        <SelectContent>
          {products.map((product) => (
            <SelectItem key={product} value={product}>
              {product}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="w-full flex justify-center">
        <TodaysProductsLineChart
          data={data}
          data2={data2}
          selectedProduct={selectedProduct}
        />
      </div>
    </div>
  )
}

export default TodaysProductsLine
