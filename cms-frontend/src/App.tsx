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
import Api from './pages/Api/Api'
// import Setting from './pages/Settings/Setting'
import SettingsLayout from './pages/setting-forms/SettingsLayout'
import SettingsPasswordPage from './pages/setting-forms/ConfPassword/SettingsPasswordPage'
import Docs from './pages/Documentation/Docs'
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword'
import NotFound from './pages/NotFound'
import FooterLayout from './pages/Footer/FooterLayout'
import AboutUs from './pages/Footer/AboutUs'
import ContactUs from './pages/Footer/ContactUs'
import Privacy from './pages/Footer/Privacy'
import Service from './pages/Footer/Service'
import PublicLayout from './PublicLayout.tsx'
import Flow from './pages/ReactFlow/Flow.tsx'
import ProfileFormPage from './pages/setting-forms/ProfileFormPage.tsx'

// import GlowingCursor from './GlowingCursor'

function App() {
  return (
    <>
      {/* <GlowingCursor /> */}
      {/* routers */}
      <BrowserRouter>
        <Routes>
          {/* Protected routes (require login) */}
          <Route path='/dashboard' element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path='/documentation' element={<Layout />}>
            <Route index element={<Docs />} />
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
          <Route path='/api' element={<Layout />}>
            <Route index element={<Api />} />
          </Route>
          {/* <Route path='/settings' element={<Layout />}>
            <Route index element={<Setting />} />
          </Route> */}
          <Route path='/schema/:projectId' element={<Layout />}>
            <Route index element={<Schema />} />
          </Route>
          <Route path='/fields/:schemaId' element={<Layout />}>
            <Route index element={<Fields />} />
          </Route>
          <Route path='/flowchart' element={<Layout />}>
            <Route index element={<Flow />} />
          </Route>

          {/* settings */}
          <Route path='/settings' element={<SettingsLayout />}>
            <Route index element={<ProfileFormPage />} />
            <Route path='/settings/password' element={<SettingsPasswordPage />} />
          </Route>

          {/* Protected footer paths - keep these if you want authenticated users to access via sidebar */}
          <Route path='/footer' element={<FooterLayout />}>
            <Route path='aboutus' element={<AboutUs />} />
            <Route path='contactus' element={<ContactUs />} />
            <Route path='privacy' element={<Privacy />} />
            <Route path='service' element={<Service />} />
          </Route>

          {/* Public footer pages - these don't require authentication */}
          <Route path='/public' element={<PublicLayout />}>
            <Route path='about' element={<AboutUs />} />
            <Route path='contact' element={<ContactUs />} />
            <Route path='privacy' element={<Privacy />} />
            <Route path='terms' element={<Service />} />
          </Route>

          {/* Public routes */}
          <Route path='/auth' element={<Authentication />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App