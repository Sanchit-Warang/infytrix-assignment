import { CustomCellRendererProps } from 'ag-grid-react'

const GridDateFormat = (props: CustomCellRendererProps) => {
  return <span>{`${new Date(props.value).toLocaleDateString()}`}</span>
}

export const DateComparator = (valueA: string, valueB: string) => {
  const dateA = new Date(valueA).getTime()
  const dateB = new Date(valueB).getTime()
  if (dateA < dateB) return -1
  if (dateA > dateB) return 1
  return 0
}

export default GridDateFormat
