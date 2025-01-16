import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import HomePage from './pages/Home/HomePage'
import Authentication from './pages/Authentication/Authentication'
import Dashboard from './pages/Dashboard/Dashboard'
import Layout from './Layout'
import Project from './pages/Project/Project'
import Schema from "./pages/Schema/Schema";
import Fields from "./pages/Field/Fields";

function App() {
  return (
    <>
      {/* routers */}
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path='/project' element={<Layout />}>
            <Route index element={<Project />} />
          </Route>
          <Route path='/schema' element={<Layout />}>
            <Route index element={<Schema />} />
          </Route>
          <Route path='/schema/:projectId' element={<Layout />}>
            <Route index element={<Schema />} />
          </Route>
          <Route path='/fields/:schemaId' element={<Layout />}>
            <Route index element={<Fields />} />
          </Route>
          <Route path='/auth' element={<Authentication />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
