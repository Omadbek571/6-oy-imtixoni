import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import ErrorPages from './pages/ErrorPages'
import Detailes from './pages/Detailes'
import fonImg from "./imges/register-fon.jpg"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!token) {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
      } else {
        if (!location.pathname.includes("/register")) {
          navigate("/")
        }
      }
    }
  }, [navigate, location, token])

  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate("/login")
    }
    return children
  }

  return (
    <div 
      className='border-slate-300 rounded-xl min-h-screen ' 
    >
      <Routes>
        <Route path='/' element={<PrivateRoute isAuth={token}><Home /></PrivateRoute>}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/books/:id' element={<Detailes />}></Route>
        <Route path='*' element={<ErrorPages />}></Route>
      </Routes>
    </div>
  )
}

export default App
