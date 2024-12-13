import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import HomePage from './pages/Home/HomePage'
import Authentication from './pages/Authentication/Authentication'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/auth' element={<Authentication/>}/>
      <Route path="/"  element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
