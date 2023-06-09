import { Button, Form, Input } from 'antd'
import React from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import axios from "axios"
import toast from "react-hot-toast"
import { hideLoading, showLoading } from '../redux/alertsSlice'

function Registration() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/registration', values)
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/login")
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="auth">
            <div className="registration-form card p-3">
                <h1 className="card-title">Nice to meet you</h1>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Name" name="name">
                        <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input placeholder="Password" type="password" />
                    </Form.Item>
                    {/* <Form.Item label="Confirm Password" name="passwordConf">
                        <Input placeholder="Confirm Password" type="password" />
                    </Form.Item> */}
                    <Button className='primary-button my-2 full-width-button' htmlType='sumbit'>REGISTRATION</Button>

                    <Link to="/login" className='anchor mt-2'>SIGN IN</Link>
                </Form>
            </div>
        </div>
    )
}

export default Registration