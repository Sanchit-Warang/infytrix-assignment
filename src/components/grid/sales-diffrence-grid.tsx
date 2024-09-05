import { AgGridReact } from 'ag-grid-react' // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css' // Optional Theme applied to the Data Grid
import { SalesDiff } from '@/types'
import { useState } from 'react'
import { ColDef } from 'ag-grid-community'
import { cn } from '@/lib/utils'

export type SalesDiffGridProps = {
  rowData?: SalesDiff[]
} & React.HTMLAttributes<HTMLDivElement>

const SalesDiffGrid = ({
  rowData = [],
  className,
  ...props
}: SalesDiffGridProps) => {
  const [colDefs] = useState<ColDef<SalesDiff>[]>([
    { field: 'productName', filter: true, flex: 1 },
    { field: 'category', filter: true, flex: 1 },
    { field: 'sale1', headerName: 'Day 1 Sales', flex: 1 },
    { field: 'sale2', headerName: 'Day 2 Sales', flex: 1 },
    { field: 'difference', flex: 1 },
  ])

  return (
    <div
      {...props}
      className={cn(
        'ag-theme-quartz w-full min-w-[600px] md:min-w-full',
        className
      )}
    >
      <AgGridReact
        pagination
        paginationPageSize={10}
        rowData={rowData}
        columnDefs={colDefs}
      />
    </div>
  )
}

export default SalesDiffGrid
