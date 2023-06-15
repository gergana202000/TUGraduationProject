import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { DatePicker, TimePicker, Row, Col, Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { hideLoading, showLoading } from "../redux/alertsSlice"
import { toast } from "react-hot-toast"
import axios from "axios"
import moment from "moment"


function BookAppointment() {
    const [isAvailable, setIsAvailable] = useState(false)
    const navigate = useNavigate()
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const { user } = useSelector((state) => state.user)
    const [doctor, setDoctor] = useState(null)
    const params = useParams()
    const dispatch = useDispatch()
    const getDoctorData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post("/api/doctor/get-doctor-info-by-doctor-id",
                {
                    doctorId: params.doctorId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            dispatch(hideLoading())
            if (response.data.success) {
                setDoctor(response.data.data)
            }
        } catch (error) {
            console.log(error)
            dispatch(hideLoading())
        }
    }

    const checkAvailability = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post("/api/user/check-booking-avilability",
                {
                    doctorId: params.doctorId,
                    date: date,
                    time: time
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                setIsAvailable(true)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Error booking appointment")
            dispatch(hideLoading())
        }
    }

    const bookNow = async () => {
        setIsAvailable(false)
        try {
            dispatch(showLoading())
            const response = await axios.post("/api/user/book-appointment",
                {
                    doctorId: params.doctorId,
                    userId: user._id,
                    doctorInfo: doctor,
                    userInfo: user,
                    date: date,
                    time: time
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/appointments")
            }
        } catch (error) {
            toast.error("Something booking appointment")
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        getDoctorData()
    }, [])
    return (
        <Layout>
            {doctor && (
                <div>
                    <h1 className="page-title">{doctor.firstName} {doctor.lastName}</h1>
                    <hr />
                    <Row gutter={20} className='mt-5' align="middle">
                        <Col span={8} sm={24} xs={24} lg={8}>
                            <h1 className="normal-text"><b>Timing: {doctor.timings[0]} - {doctor.timings[1]}</b></h1>
                            <p><b>Phone: </b>{doctor.phone}</p>
                            <p><b>Address: </b>{doctor.address}</p>
                            <p><b>Fee Per Consultation: </b>{doctor.feePerConsult}</p>
                            <p><b>Website: </b>{doctor.website}</p>

                            <div className='d-flex flex-column pt-2 mt-2'>
                                <DatePicker format="DD-MM-YY" onChange={(value) => {
                                    setDate(moment(value).format("DD-MM-YYYY"))
                                    setIsAvailable(false)
                                }} />
                                <TimePicker format="HH:mm" className='mt-3' onChange={(value) => {
                                    setIsAvailable(false)
                                    setTime(moment(value).format("HH:mm"))
                                }} />
                                {!isAvailable && <Button className='primary-button mt-3 full-width-button' onClick={checkAvailability}>Check Availability</Button>}
                                {isAvailable && (<Button className='primary-button mt-3 full-width-button' onClick={bookNow}>Book Now</Button>)}
                            </div>
                        </Col>

                        <Col span={8} sm={24} xs={24} lg={8}>
                            <img src='https://img.freepik.com/free-vector/appointment-booking-with-calendar_52683-39658.jpg?w=826&t=st=1686510783~exp=1686511383~hmac=fd8a0c11257af6adf404031da99b1ae34fe8c1c30671a59a6014a981d64b125a' width="100%" height="400" />
                        </Col>
                    </Row>
                </div>
            )}
        </Layout>
    )
}

export default BookAppointment