import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import ApplyDoctor from "./pages/ApplyDoctor"
import UserList from "./pages/Admin/UserList"
import DoctorList from "./pages/Admin/DoctorList"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast"
import { useSelector } from "react-redux"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import Notifications from "./pages/Notifications"
import DoctorProfile from "./pages/Doctor/DoctorProfile"
import DoctorAppointments from "./pages/Doctor/DoctorAppointments"
import BookAppointment from "./pages/BookAppointment"
import Appointments from "./pages/Appointments"
function App() {
  const { loading } = useSelector((state) => state.alerts)
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/registration' element={<PublicRoute><Registration /></PublicRoute>} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/apply-doctor' element={<PublicRoute><ApplyDoctor /></PublicRoute>} />
        <Route path='/notifications' element={<PublicRoute><Notifications /></PublicRoute>} />
        <Route path='/admin/userlist' element={<PublicRoute><UserList /></PublicRoute>} />
        <Route path='/admin/doctorlist' element={<PublicRoute><DoctorList /></PublicRoute>} />
        <Route path='/doctor/doctorprofile/:userId' element={<PublicRoute><DoctorProfile /></PublicRoute>} />
        <Route path='/book-appointment/:doctorId' element={<PublicRoute><BookAppointment /></PublicRoute>} />
        <Route path='/appointments' element={<PublicRoute><Appointments /></PublicRoute>} />
        <Route path='/doctor/appointments' element={<PublicRoute><DoctorAppointments /></PublicRoute>} />
      </Routes>
    </BrowserRouter>
  )
}


export default App
