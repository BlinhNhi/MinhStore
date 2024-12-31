import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Form, Input } from "antd";

import NoImage from '../../../assets/no-image.jpeg';


function PaymentProduct() {
    const handleChangeContent = (e, editor) => {
        const data = editor.getData();
        console.log(data);
        // formik.setFieldValue("content", data);
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <div className="container pt-10">
                <div className="grid grid-cols-2 gap-2">
                    <div className="border-r-2 border-gray-300 pr-4">
                        <h2 className="font-bold text-xl text-gray-700 dark:text-gray-200 uppercase">Thanh Toán Và Giao Hàng</h2>
                        <div className="mt-6">
                            <Form
                                initialValues={{
                                    remember: false,
                                }}
                                // onFinish={onRegisterSuccess}
                                // onFinishFailed={onFailed}
                                autoComplete="off"
                            >

                                <Form.Item
                                    label=""
                                    name="name"
                                    style={{ minWidth: "100%" }}
                                    rules={[
                                        {
                                            type: "name",
                                            message: "Name is invalid!",
                                        },
                                        {
                                            required: true,
                                            message: "Name is required!",
                                            transform: (value) => value.trim(),
                                        },
                                    ]}
                                >
                                    <Input
                                        className="block text-sm py-2 xl:py-2 2xl:py-2 px-4 rounded-xl w-full xl:w-2/3 2xl:w-2/3 border-2 hover:border-gray-300 outline-none focus:outline-none"
                                        placeholder="Họ Và Tên"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label=""
                                    name="phone"
                                    style={{ minWidth: "100%" }}
                                    rules={[
                                        {
                                            type: "phone",
                                            message: "Phone is invalid!",
                                        },
                                        {
                                            required: true,
                                            message: "Phone is required!",
                                            transform: (value) => value.trim(),
                                        },
                                    ]}
                                >
                                    <Input
                                        className="block text-sm py-2 xl:py-2 2xl:py-2 px-4 rounded-xl w-full xl:w-2/3 2xl:w-2/3 border-2 hover:border-gray-300 outline-none focus:outline-none"
                                        placeholder="Điện Thoại"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label=""
                                    name="address"
                                    style={{ minWidth: "100%" }}
                                    rules={[
                                        {
                                            type: "address",
                                            message: "Address is invalid!",
                                        },
                                        {
                                            required: true,
                                            message: "Address is required!",
                                            transform: (value) => value.trim(),
                                        },
                                    ]}
                                >
                                    <Input
                                        className="block text-sm py-2 xl:py-2 2xl:py-2 px-4 rounded-xl w-full xl:w-2/3 2xl:w-2/3 border-2 hover:border-gray-300 outline-none focus:outline-none"
                                        placeholder="Địa Chỉ"
                                    />
                                </Form.Item>

                                <Form.Item >
                                    <h2 className="font-bold text-xl text-gray-700 dark:text-gray-200 uppercase ">Thông Tin Bổ Sung</h2>
                                    <p className="font-medium text-base text-gray-700 dark:text-gray-200 mb-2">Ghi chú đơn hàng (tuỳ chọn)</p>
                                    <CKEditor
                                        className="rounded-lg overflow-hidden"
                                        config={{
                                            placeholder: "Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn", // Đặt placeholder ở đây
                                        }}
                                        name="content"
                                        editor={ClassicEditor}
                                        onChange={(event, editor) => {
                                            handleChangeContent(event, editor);
                                        }}
                                        onReady={(editor) => {
                                            editor.editing.view.change((writer) => {
                                                writer.setStyle(
                                                    "height",
                                                    "200px",
                                                    editor.editing.view.document.getRoot()
                                                );
                                            });
                                        }}
                                    ></CKEditor>
                                </Form.Item>

                                {/* <div className="">
                                    <p className="font-semibold dark:text-gray-200 text-gray-600  md:text-lg lg:text-lg xl:text-lg 2xl:text-lg sm:text-base text-base w-full">
                                        Một liên kết để tạo mật khẩu sẽ được gửi đến địa chỉ email
                                        của bạn.
                                    </p>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="
                                    font-bold bg-gray-900 hover:bg-gray-700 md:p-2 lg:p-2 xl:p-3 2xl:p-3 sm:p-1 p-1  
                                    mt-2 rounded-md text-white text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-xl
                                     dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-800
                                     w-full md:w-full lg:w-full xl:w-2/3 2xl:w-2/3 sm:w-full
                                    "
                                    >
                                        Đăng Ký
                                    </button>
                                </div> */}
                            </Form>
                        </div>
                    </div>
                    <div className="">
                        <div>
                            <h2 className="font-bold text-xl text-gray-700 dark:text-gray-200 uppercase">Đơn Hàng Của Bạn</h2>
                            <div className="mt-6">
                                <div className="border-b-2 border-gray-300 pb-4">
                                    <div className="flex justify-around  ">
                                        <div>
                                            <img src={NoImage} className="w-[65px] h-[65px] object-cover border-2 rounded-lg" alt="prodcut-image"></img>
                                        </div>
                                        <div className="flex flex-col justify-around">
                                            <h3 className="text-base font-medium text-gray-600 dark:text-gray-200  leading-[0px]">Dép Crocs Duet Sport Unisex White</h3>
                                            <h4 className="text-sm  text-gray-600 dark:text-gray-200  leading-[0px]">Size Giày: 39</h4>
                                            <h4 className="text-sm  text-gray-600 dark:text-gray-200  leading-[0px]">Màu Sắc: Xanh</h4>
                                        </div>
                                        <div className="flex justify-center items-center">
                                            <h3 className="text-lg  text-gray-600 dark:text-gray-200">3,200,000đ</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b-2 border-gray-300 py-4 pl-8">
                                    <div className="flex justify-between">
                                        <h3 className="text-base font-medium text-gray-600 dark:text-gray-200">Tạm tính</h3>
                                        <h2 className="text-lg  text-gray-600 dark:text-gray-200">6,100,000đ</h2>
                                    </div>
                                </div>
                                <div className=" py-4 pl-8">
                                    <div className="flex justify-between">
                                        <h3 className="text-base font-medium text-gray-600 dark:text-gray-200">Thanh toán: </h3>
                                        <h2 className="text-lg  text-gray-600 dark:text-gray-200">6,100,000đ</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentProduct;