import { useQuery } from '@tanstack/react-query'
import AXIOS from '@/lib/axios'
import { Sales } from '@/types'

export const useGetTodaySalesQuery = () => {
  return useQuery({
    queryKey: ['sales', 'today'],
    queryFn: async () => {
      const { data } = await AXIOS.get('/sales')
      const res = data as Sales[]
      return res.map((item) => {
        const date = new Date()
        date.setHours(Math.floor(Math.random() * 25))
        console.log(date.getHours())
        console.log(date.toLocaleTimeString())
        return {
          ...item,
          sales: Math.floor(Math.random() * 15),
          time: date.toUTCString(),
        }
      })
    },
  })
}

export const useGetSalesBYDateQuery = (date: Date) => {
  return useQuery({
    queryKey: ['sales', date.toISOString()],
    queryFn: async () => {
      const { data } = await AXIOS.get('/sales')
      const res = data as Sales[]
      return res.map((item) => {
        const newDate = new Date(date)
        newDate.setHours(Math.floor(Math.random() * 25))
        console.log(newDate.getHours())
        console.log(newDate.toLocaleTimeString())
        return {
          ...item,
          sales: Math.floor(Math.random() * 15),
          time: newDate.toUTCString(),
        }
      })
    },
  })
}
