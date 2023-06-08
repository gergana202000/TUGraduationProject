import { Button, Form, Input } from 'antd'
import React from "react"
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from "../redux/alertsSlice"

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/login', values)
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                toast("Redirecting to home page")
                localStorage.setItem("token", response.data.data)
                navigate("/")
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error("Something went wrong")
        };
    }

    return (
        <div className="auth">
            <div className="registration-form card p-3">
                <h1 className="card-title">Welcome</h1>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="email">
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input placeholder="Password" type="password" />
                    </Form.Item>
                    <Button className='primary-button my-2 full-width-button' htmlType='sumbit'>LOGIN</Button>

                    <Link to="/registration" className='anchor mt-2'>SIGN UP</Link>
                </Form>
            </div>
        </div>
    )
}

export default Login