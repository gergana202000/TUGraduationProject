import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Registration from "./pages/Registration"
import { Button } from 'antd'
import { Toaster } from "react-hot-toast"
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder="false" /> 
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
