import  {Button, Form, Input } from 'antd'
import React from "react"
import { Link } from 'react-router-dom'

function Registration(){
const onFinish = (values) => {
    console.log('Received values of form: ', values);
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
                    <Form.Item label="Confirm Password" name="passwordConf">
                        <Input placeholder="Confirm Password" type="password" />
                    </Form.Item>
                    <Button className='primary-button my-2' htmlType='sumbit'>REGISTRATION</Button>

                    <Link to='login' className='anchor mt-2'>SIGN IN</Link>
                </Form>
            </div>
        </div>
    )
}

export default Registration