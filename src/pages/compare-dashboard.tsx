import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import CategoriesPieChart from '@/components/graphs/categories-piechart-graph'
import { useGetSalesBYDateQuery } from '@/hooks/api/sales'
import ProductsBarChart from '@/components/graphs/products-bar-graph'
import TodaysProductsLine from '@/components/todays-product-with-selector'
import SalesDiffGrid from '@/components/grid/sales-diffrence-grid'
import Loader from '@/components/ui/loader'

const CompareDashBoardPage = () => {
  const [date1, setDate1] = useState<Date | undefined>(new Date())
  const [date2, setDate2] = useState<Date | undefined>(new Date())

  const sale1 = useGetSalesBYDateQuery(date1 ? date1 : new Date())
  const sale2 = useGetSalesBYDateQuery(date2 ? date2 : new Date())

  const categoriesJSX = () => {
    if (sale1.data && sale2.data) {
      return (
        <>
          <h1 className="text-xl font-semibold">Categories Difference</h1>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <Card>
              <CardContent className="p-5 flex justify-center items-center">
                <div className="w-full md:w-1/2">
                  <CategoriesPieChart data={sale1.data} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 flex justify-center items-center">
                <div className="w-full md:w-1/2">
                  <CategoriesPieChart data={sale2.data} />
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )
    }

    return <></>
  }

  const productsJSX = () => {
    if (sale1.data && sale2.data) {
      return (
        <>
          <h1 className="text-xl font-semibold">Products Difference</h1>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <Card>
              <CardContent className="p-5 flex justify-center items-center">
                <div className="w-full">
                  <ProductsBarChart data={sale1.data} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 flex justify-center items-center">
                <div className="w-full">
                  <ProductsBarChart data={sale2.data} />
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )
    }

    return <></>
  }

  const productLinesJSX = () => {
    if (sale1.data && sale2.data) {
      return (
        <>
          <h1 className="text-xl font-semibold">Product Lines Difference</h1>
          <Card className="">
            <CardHeader>
              <CardTitle>Product Sales throughout the day</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <TodaysProductsLine data={sale1.data} data2={sale2.data} />
            </CardContent>
          </Card>
        </>
      )
    }

    return <></>
  }

  const salesJSX = () => {
    if (sale1.data && sale2.data) {
      const data = sale1.data.map((item, i) => {
        return {
          id: item.id,
          productName: item.productName,
          category: item.category,
          sale1: item.sales,
          sale2: sale2.data[i].sales,
          difference: Math.abs(item.sales - sale2.data[i].sales),
          time: item.time,
        }
      })
      return (
        <>
          <h1 className="text-xl font-semibold">Sales Difference</h1>
          <Card className="p-3">
            <CardContent className="overflow-x-auto">
              <SalesDiffGrid className="h-[50vh]" rowData={data} />
            </CardContent>
          </Card>
        </>
      )
    }
    return <></>
  }

  return (
    <main className="space-y-4 w-full">
      <h1 className="text-2xl font-semibold">Compare Sales</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Pick Dates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 grid-cols-1">
            <div className="flex justify-center flex-col items-center space-y-3">
              <h1 className="text-lg font-semibold">
                Day 1
              </h1>
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !date1 && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date1 ? format(date1, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date1}
                      onSelect={setDate1}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </>
            </div>
            <div className="flex justify-center flex-col items-center space-y-3">
              <h1 className="text-lg font-semibold">
                Day 2
              </h1>
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !date2 && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date2 ? format(date2, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date2}
                      onSelect={setDate2}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </>
            </div>
          </div>
        </CardContent>
      </Card>
      {sale1.isLoading || sale2.isLoading ? <Loader /> : <></>}
      {salesJSX()}
      {categoriesJSX()}
      {productsJSX()}
      {productLinesJSX()}
    </main>
  )
}

export default CompareDashBoardPage
