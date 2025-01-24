import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import HomePage from './pages/Home/HomePage'
import Authentication from './pages/Authentication/Authentication'
import Dashboard from './pages/Dashboard/Dashboard'
import Layout from './Layout'
import Project from './pages/Project/Project'
import Schema from "./pages/Schema/Schema";
import Fields from "./pages/Field/Fields";
import SchemaTab from "./pages/Schema/SchemaTab";
import Content from "./pages/Content/Content";

function App() {
  return (
    <>
      {/* routers */}
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path='/project' element={<Layout />}>
            <Route index element={<Project />} />
          </Route>
          <Route path='/schema' element={<Layout />}>
            <Route index element={<SchemaTab />} />
          </Route>
          <Route path='/content' element={<Layout />}>
            <Route index element={<Content />} />
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
