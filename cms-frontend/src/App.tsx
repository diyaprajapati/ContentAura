import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import HomePage from './pages/Home/HomePage'
import Authentication from './pages/Authentication/Authentication'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <>
    {/* routers */}
    <BrowserRouter>
    <Routes>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/auth' element={<Authentication/>}/>
      <Route path="/"  element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
