export type Sales = {
  id: number
  productName: string
  category: string
  sales: number
  time: string
}

export type SalesDiff = {
  id: number
  productName: string
  category: string
  sale1: number
  sale2: number
  difference: number
  time: string
}
