import { AgGridReact } from 'ag-grid-react' // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css' // Optional Theme applied to the Data Grid
import { Sales } from '@/types'
import { useState } from 'react'
import { ColDef } from 'ag-grid-community'
import GridDateFormat from './grid-date-format'
import { DateComparator } from './grid-date-format'
import { cn } from '@/lib/utils'

export type SalesGridProps = {
  rowData?: Sales[]
} & React.HTMLAttributes<HTMLDivElement>

const SalesGrid = ({ rowData = [], className, ...props }: SalesGridProps) => {
  const [colDefs] = useState<ColDef<Sales>[]>([
    { field: 'id', flex: 1 },
    { field: 'productName', filter: true, flex: 1 },
    { field: 'category', filter: true, flex: 1 },
    { field: 'sales', flex: 1 },
    {
      field: 'time',
      cellRenderer: GridDateFormat,
      comparator: DateComparator,
      flex: 1,
    },
  ])

  return (
    <div {...props} className={cn('ag-theme-quartz w-full', className)}>
      <AgGridReact
        pagination
        paginationPageSize={500}
        rowData={rowData}
        columnDefs={colDefs}
      />
    </div>
  )
}

export default SalesGrid
