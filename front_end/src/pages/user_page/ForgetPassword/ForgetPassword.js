import React from "react";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../../redux_store/actions/AuthAction";

export default function ForgetPassword(props) {
    const dispatch = useDispatch();


    const onResetPasswordSuccess = (values) => {
        dispatch(forgetPassword(values.email));
    };
    const onResetPasswordFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };


    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <div className="container py-10 flex items-center flex-col justify-center">
                <div className=" gap-3 flex flex-col py-6">
                    <h1 className="text-2xl font-bold">Tài Khoản</h1>
                    <h4 className="font-semibold text-gray-500 text-base dark:text-gray-400">
                        <a
                            className="font-semibold text-base  hover:text-gray-400 dark:text-gray-100"
                            href="/"
                        >
                            Trang Chủ /{" "}
                        </a>
                        Tài Khoản
                    </h4>
                </div>
                <div className="">
                    <Form
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={onResetPasswordSuccess}
                        onFinishFailed={onResetPasswordFailed}
                        autoComplete="off"
                    >
                        <div className="py-4 border-b-2 border-gray-300 dark:border-gray-100">
                            <h2 className="text-center font-semibold text-base dark:text-gray-100 text-gray-500 ">
                                Quên mật khẩu? Vui lòng nhập tên đăng nhập hoặc địa chỉ email. Bạn sẽ nhận được một liên kết tạo mật khẩu mới qua email.
                            </h2>
                        </div>
                        <div className="">
                            <div className="pt-4">
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
                                        className="block text-sm py-2 xl:py-3 2xl:py-3 px-4 rounded-3xl w-full md:w-2/3 lg:w-2/3 xl:w-2/3 2xl:w-2/3 border-2 hover:border-gray-300 outline-none focus:outline-none"
                                        placeholder="Email"
                                    />
                                </Form.Item>
                            </div>

                            <div className="mt-6 text-center sm:text-left">
                                <button
                                    type="submit"
                                    className="font-semibold bg-gray-900 hover:bg-gray-700 md:p-2 lg:p-2 xl:p-3 2xl:p-3 sm:p-1 p-1  
                                    mt-2 rounded-md text-white text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-xl
                                     dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-800
                                     w-3/4 sm:w-2/4 md:w-2/4 lg:w-2/4 xl:w-2/4 2xl:w-2/4 "
                                >
                                    Khôi phục mật khẩu mới
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
