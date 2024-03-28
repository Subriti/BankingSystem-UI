//to use react router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//define components
import Navbar from './components/Navbar.jsx'

//define teller pages
import AdminLogin from './pages/admin/Login.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'

//define teller pages
import UserDashboard from './pages/UserDashboard.jsx'

import Home from './pages/Home.jsx'
import NoPage from './pages/NoPage.jsx'
import Login from './pages/Login.jsx'


//define css files
import './index.css'
import './styles/global.scss'


function App() {

  return (
    <div className='App'>
      <Router>
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/@adminLogin" element={<AdminLogin />} />
            <Route path="/login" element={<Login />} />

            {/* teller routes */}
            <Route path="/adminDashboard" element={<AdminDashboard />} />

            {/* user routes */}
            <Route path="/userDashboard" element={<UserDashboard />} />

            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}
export default App;
