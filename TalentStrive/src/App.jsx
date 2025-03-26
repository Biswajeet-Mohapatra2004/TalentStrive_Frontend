import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import LoginEMP from './components/pages/LoginEMP';
import Register from './components/pages/Register';
import RegisterEMP from './components/pages/RegisterEMP';
import Dashboard from './components/pages/Dashboard';
import DashboardUser from './components/pages/DashboardUser';
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/register' element={<Register />} />
          <Route path='/employer/register' element={<RegisterEMP />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/employer/login' element={<LoginEMP />} />
          <Route path='/employer/dashboard' element={<Dashboard />} />
          <Route path='/user/dashboard' element={<DashboardUser />} />
        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App
