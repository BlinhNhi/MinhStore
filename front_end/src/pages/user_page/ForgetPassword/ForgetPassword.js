import React from "react";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../redux/actions/DriverAction";

export default function ForgetPasswordDriver(props) {
    const dispatch = useDispatch();


    const onFinish = (values) => {
        dispatch(forgetPassword(values.email));
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };


    return (
        <div className="py-8 px-8 bg-white rounded-2xl shadow-xl z-20">
            <Form
                name="basic"
                className="d-flex flex-col"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 24,
                }}
                style={{
                    maxWidth: 350,
                    width: 350,
                }}
                initialValues={{
                    remember: false,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div>
                    <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                        Password Recovery
                    </h1>
                    <p className="text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">
                        Nhập email đăng ký của bạn để lấy lại mật khẩu!!
                    </p>
                </div>
                <Form.Item
                    label=""
                    name="email"
                    rules={[
                        {
                            type: "email",
                            message: "E-mail không đúng định dạng!",
                        },
                        {
                            required: true,
                            message: "E-mail không được để trống!",
                        },
                    ]}
                >
                    <Input
                        className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                        placeholder="Email"
                    />
                </Form.Item>

                <div className="text-center mt-6">
                    <button
                        type="submit"
                        className="py-2 w-64 text-xl text-white bg-purple-400 rounded-xl"
                    >
                        Khôi phục mật khẩu mới
                    </button>
                    <p className="mt-4 text-sm">
                        Vui lòng xem mật khẩu tại gmail sau khi gửi!!
                    </p>
                </div>
            </Form>
        </div>
    );
}
