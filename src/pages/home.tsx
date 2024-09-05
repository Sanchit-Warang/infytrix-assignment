import SalesGrid from '@/components/grid/sales-grid'
import { useGetTodaySalesQuery } from '@/hooks/api/sales'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import ProductsBarChart from '@/components/graphs/products-bar-graph'
import CategoriesPieChart from '@/components/graphs/categories-piechart-graph'
import TodaysProductsLine from '@/components/todays-product-with-selector'

function HomePage() {
  const todaySales = useGetTodaySalesQuery()
  return (
    <main className="space-y-4 w-full">
      {todaySales.data && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Today's Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesGrid className="h-[50vh] " rowData={todaySales.data} />
          </CardContent>
        </Card>
      )}
      {todaySales.data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductsBarChart data={todaySales.data} />
            </CardContent>
          </Card>
          <Card className="overflow-x-auto">
            <CardHeader>
              <CardTitle>Category Sales</CardTitle>
            </CardHeader>
            <CardContent className="w-full flex justify-center">
              <CategoriesPieChart data={todaySales.data} />
            </CardContent>
          </Card>
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Product Sales throughout the day</CardTitle>
            </CardHeader>
            <CardContent className='overflow-x-auto'>
              <TodaysProductsLine data={todaySales.data} />
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}

export default HomePage
