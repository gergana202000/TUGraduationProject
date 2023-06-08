import Raect from "react"
import { Button, Col, Input, Layout, Row, TimePicker } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { Form, useNavigate } from "react-router-dom"
import { hideLoading, showLoading } from "../redux/alertsSlice"
import { toast } from "react-hot-toast"
import axios from "axios"


function ApplyDoctor() {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            const response = await axios.post("/api/user/doctor-account", {
                ...values,
                userId: user._id,
            }, {
                headers: {
                    Authprization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/")
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
        <Layout>
            <h1 className="page-title">Apply Doctor</h1>
            <hr />
            <Form layout="vertical" onFinish={onFinish}>
                <h1 className="card-title mt-3">Personal Information</h1>
                <Row gutter={20}>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="First Name" name="firstName" rules={[{ required: true }]}>
                            <Input placeholder="First Name" />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Last Name" name="lastName" rules={[{ required: true }]}>
                            <Input placeholder="Last Name" />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Phone" name="phone" rules={[{ required: true }]}>
                            <Input placeholder="Phone" />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Website" name="website" rules={[{ required: true }]}>
                            <Input placeholder="Website" />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Address" name="address" rules={[{ required: true }]}>
                            <Input placeholder="Address" />
                        </Form.Item>
                    </Col>
                </Row>
                <hr />
                <h1 className="card-title mt-3">Profesional Information</h1>
                <Row gutter={20}>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Specialization" name="specialization" rules={[{ required: true }]}>
                            <Input placeholder="Specialization" />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Experience" name="experience" rules={[{ required: true }]}>
                            <Input placeholder="Experience" type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Fee Per Consultation" name="feePerConsult" rules={[{ required: true }]}>
                            <Input placeholder="Fee Per Consultation" type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Timings" name="timeings" rules={[{ required: true }]}>
                            <TimePicker.RangePicker />
                        </Form.Item>
                    </Col>
                </Row>

                <div className="d-flex justify-content-end" >
                    <Button className="primary-button" htmlType="submit">APPLY</Button>
                </div>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor