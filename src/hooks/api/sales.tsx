import { useQuery } from '@tanstack/react-query'
import AXIOS from '@/lib/axios'
import { Sales } from '@/types'

export const useGetTodaySalesQuery = () => {
  return useQuery({
    queryKey: ['getTodaySales'],
    queryFn: async () => {
      const { data } = await AXIOS.get('/sales')
      return data as Sales[]
    },
  })
}
