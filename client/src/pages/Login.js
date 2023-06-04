import  {Button, Form, Input } from 'antd'
import React from "react"
import { Link } from 'react-router-dom'

function Login(){
const onFinish = (values) => {
    console.log('Received values of form: ', values);
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
                    <Button className='primary-button my-2' htmlType='sumbit'>LOGIN</Button>

                    <Link to='registration' className='anchor mt-2'>SIGN UP</Link>
                </Form>
            </div>
        </div>
    )
}

export default Login