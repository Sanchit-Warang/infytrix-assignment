import SalesGrid from './components/grid/sales-grid'
import { MOCK_DATA } from './data'

function App() {
  return (
    <main>
      <div className="flex justify-center mx-10">
        <SalesGrid className="h-[50vh] " rowData={MOCK_DATA} />
      </div>
    </main>
  )
}

export default App
