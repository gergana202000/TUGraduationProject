import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Registration from "./pages/Registration"
import ApplyDoctor from "./pages/ApplyDoctor"
import Home from "./pages/Home"
import { Button } from 'antd'
import { Toaster } from "react-hot-toast"
import { useSelector } from "react-redux"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import Notifications from "./pages/Notifications"
function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner">
        <div class="spinner-border" role="status">
          
        </div>
      </div>
      )}
      <Toaster position="top-center" reverseOrder="false" /> 
      <Routes>
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/registration' element={<PublicRoute><Registration /></PublicRoute>} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/apply-doctor' element={<PublicRoute><ApplyDoctor /></PublicRoute>} />
        <Route path='/notifications' element={<PublicRoute><Notifications /></PublicRoute>} />
      </Routes>
    </BrowserRouter>
  )
}


export default App
