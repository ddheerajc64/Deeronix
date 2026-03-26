import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import Videos from './pages/Videos.jsx'
import Updates from './pages/Updates.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'
import Layout from './components/Layout.jsx'
import AdminRoute from './components/AdminRoute.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="videos" element={<Videos />} />
        <Route path="updates" element={<Updates />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
