import Navbar from './components/navbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <div className="m-10">
        <Outlet />
      </div>
    </>
  )
}

export default App
