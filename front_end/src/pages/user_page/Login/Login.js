import { Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoFlash } from "react-icons/io5";

function Login() {
    const [openLogin, setOpenLogin] = useState("flex");
    const [openRegister, setOpenRegister] = useState(false);
    console.log(openRegister);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <div className="container ">
                <div className="py-10 ">
                    <div className="flex items-center flex-col justify-center gap-3">
                        <h1 className="text-2xl font-bold">Tài Khoản</h1>
                        <h4 className="font-semibold text-gray-600 text-base dark:text-gray-400">
                            <a
                                className="font-semibold text-base hover:text-gray-400 dark:text-gray-100"
                                href="/"
                            >
                                Trang Chủ /{" "}
                            </a>
                            Tài Khoản
                        </h4>
                    </div>

                    <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row gap-10 mt-10">
                        <div
                            className="
                        flex flex-col gap-[12px] border-r-0 pr-4 border-gray-400 
                        sm:border-r-0 md:border-r-0 lg:border-r-4 xl:border-r-4 2xl:border-r-4
                        w-full  sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2
                        "
                        >
                            <div
                                className={`${openRegister === true ? "flex" : "hidden"
                                    } flex-col gap-2 `}
                            >
                                <h1 className="font-bold text-2xl">Đăng Ký</h1>
                                <h4 className="text-lg font-medium">
                                    Địa chỉ email <span className="text-red-600">*</span>
                                </h4>
                                <div>
                                    <Form>
                                        <Form.Item
                                            label=""
                                            name="email"
                                            style={{ minWidth: "100%" }}
                                            rules={[
                                                {
                                                    type: "email",
                                                    message: "E-mail is invalid!",
                                                },
                                                {
                                                    required: true,
                                                    message: "E-mail is required!",
                                                    transform: (value) => value.trim(),
                                                },
                                            ]}
                                        >
                                            <Input
                                                className="block text-sm py-2 xl:py-3 2xl:py-3 px-4 rounded-3xl w-full xl:w-2/3 2xl:w-2/3 border-2 hover:border-gray-300 outline-none focus:outline-none"
                                                placeholder="Email"
                                            />
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div className="">
                                    <p className="font-semibold  md:text-lg lg:text-lg xl:text-lg 2xl:text-lg sm:text-base text-base w-full">
                                        Một liên kết để tạo mật khẩu sẽ được gửi đến địa chỉ email
                                        của bạn.
                                    </p>
                                </div>
                                <div>
                                    <button
                                        className="
                                    font-bold bg-gray-900 hover:bg-gray-700 md:p-2 lg:p-2 xl:p-3 2xl:p-3 sm:p-1 p-1  
                                    mt-2 rounded-md text-white text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-xl
                                     dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-800
                                     w-full md:w-full lg:w-full xl:w-2/3 2xl:w-2/3 sm:w-full
                                    "
                                    >
                                        Đăng Ký
                                    </button>
                                </div>
                            </div>
                            {/* Đăng Nhập */}
                            <div className={`${openLogin} flex-col gap-2 `}>
                                <h1 className="font-bold  text-2xl  sm:text-xl  md:text-xl  lg:text-xl  xl:text-2xl 2xl:text-2xl ">
                                    Đăng Nhập
                                </h1>
                                <div>
                                    <h4 className="text-lg  sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-lg font-medium mb-3">
                                        Địa chỉ email <span className="text-red-600">*</span>
                                    </h4>
                                    <Form>
                                        <Form.Item
                                            label=""
                                            name="email"
                                            style={{ minWidth: "100%" }}
                                            rules={[
                                                {
                                                    type: "email",
                                                    message: "E-mail is invalid!",
                                                },
                                                {
                                                    required: true,
                                                    message: "E-mail is required!",
                                                    transform: (value) => value.trim(),
                                                },
                                            ]}
                                        >
                                            <Input
                                                className="block text-sm py-2 xl:py-3 2xl:py-3 px-4 rounded-3xl  md:w-full lg:w-full xl:w-2/3 2xl:w-2/3 sm:w-full w-full  border-2 hover:border-gray-300 outline-none focus:outline-none"
                                                placeholder="Email"
                                            />
                                        </Form.Item>
                                    </Form>

                                    <Form>
                                        <h4 className="text-lg sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-lg font-medium mb-3 dark:text-gray-100">
                                            Mật Khẩu <span className="text-red-600">*</span>
                                        </h4>
                                        <Form.Item
                                            label=""
                                            name="password"
                                            style={{ minWidth: "100%" }}
                                            rules={[
                                                {
                                                    type: "password",
                                                    required: true,
                                                    message: "Password is required!",
                                                    transform: (value) => value.trim(),
                                                },
                                            ]}
                                        >
                                            <Input.Password
                                                className="
                                                flex text-sm py-2 px-4 rounded-3xl md:w-full lg:w-full xl:w-2/3 2xl:w-2/3 sm:w-full w-full border-2 hover:border-gray-300
                                                 outline-none focus:outline-none xl:py-3 2xl:py-3"
                                                placeholder="Mật Khẩu"
                                            />
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div>
                                    <button
                                        className="
                                   font-bold bg-gray-900 hover:bg-gray-700 md:p-2 lg:p-2 xl:p-3 2xl:p-3 sm:p-1 p-1  
                                    mt-2 rounded-md text-white text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-xl
                                     dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-800
                                     w-full md:w-full lg:w-full xl:w-2/3 2xl:w-2/3 sm:w-full
                                     "
                                    >
                                        Đăng Nhập
                                    </button>
                                </div>
                                <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row items-start md:items-center lg:items-center xl:items-center justify-between w-full md:w-full lg:w-full xl:w-2/3 2xl:w-2/3 sm:w-full mt-2 gap-2">
                                    <div className="flex 2xl:flex-row items-center gap-2">
                                        <Checkbox>
                                            <h1 className="text-base font-medium md:text-base lg:text-base xl:text-lg 2xl:text-lg sm:text-base dark:text-gray-100">
                                                Ghi Nhớ Mật Khẩu
                                            </h1>
                                        </Checkbox>
                                    </div>
                                    <div>
                                        <h1 className="text-base font-medium hover:underline hover:text-gray-500 md:text-base lg:text-base xl:text-lg 2xl:text-lg sm:text-base">
                                            Quên Mật Khẩu?
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex sm:flex md:flex items-center w-full justify-center lg:hidden xl:hidden 2xl:hidden">
                            <div className="border-2 border-gray-400 w-full"></div>
                            <h2 className="px-4 font-bold text-gray-600 text-lg">OR</h2>
                            <div className="border-2 border-gray-400 w-full"></div>
                        </div>

                        <div
                            className="
                        w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2
                        "
                        >
                            <div className="flex flex-col gap-2">
                                <h1 className="font-bold text-2xl  sm:text-xl  md:text-xl  lg:text-xl  xl:text-2xl 2xl:text-2xl">
                                    Đăng Ký
                                </h1>
                                <h4 className="md:text-lg lg:text-lg xl:text-lg 2xl:text-lg sm:text-base text-base font-medium text-gray-600 dark:text-gray-200">
                                    Đăng ký trang web này cho phép bạn truy cập trạng thái và lịch
                                    sử đơn hàng của mình. Chỉ cần điền vào các trường bên dưới và
                                    chúng tôi sẽ thiết lập tài khoản mới cho bạn ngay lập tức.
                                    Chúng tôi sẽ chỉ yêu cầu bạn những thông tin cần thiết để giúp
                                    quá trình mua hàng nhanh hơn và dễ dàng hơn.
                                </h4>
                            </div>
                            <div className="mt-4">
                                {openRegister === false ? (
                                    <button
                                        onClick={() => {
                                            setOpenRegister(true);
                                            setOpenLogin("hidden");
                                        }}
                                        className="
                            font-bold bg-gray-900 hover:bg-gray-700 
                            md:p-2 lg:p-2 xl:p-3 2xl:p-3 sm:p-1 p-1 rounded-3xl text-white
                            w-full md:w-full lg:w-2/3 xl:w-2/3 2xl:w-2/3 sm:w-full 
                             text-lg  sm:text-lg  md:text-lg  lg:text-lg  xl:text-xl 2xl:text-xl
                             dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-gray-800
                            "
                                    >
                                        Đăng Ký
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setOpenRegister(false);
                                            setOpenLogin("flex");
                                        }}
                                        className="
                      font-bold bg-gray-900 hover:bg-gray-700 md:p-2 lg:p-2 xl:p-3 2xl:p-3 sm:p-1 p-1 rounded-3xl text-white 
                      w-full md:w-full lg:w-2/3 xl:w-2/3 2xl:w-2/3 sm:w-full 
                       text-lg  sm:text-lg  md:text-lg  lg:text-lg  xl:text-xl 2xl:text-xl
                       dark:bg-gray-100 dark:hover:bg-gray-300 dark:text-gray-800

                      "
                                    >
                                        Đăng Nhập
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10  border-t-4 border-gray-600 ">
                        <div className="flex flex-col items-center justify-center  mt-6 gap-3">
                            <div className="flex items-center gap-4">
                                <FaHeart className="font-bold text-4xl  sm:text-4xl  md:text-xl lg:text-xl  xl:text-xl 2xl:text-xl text-red-600"></FaHeart>
                                <h1 className="text-lg  sm:text-lg  md:text-lg  lg:text-lg  xl:text-xl 2xl:text-xl font-bold">
                                    MinhCoi Store chân thành cảm ơn vì được trở thành người đồng
                                    hành cùng Bạn!!!{" "}
                                </h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <IoFlash className="font-bold text-4xl sm:text-4xl  md:text-xl  lg:text-xl  xl:text-xl 2xl:text-xl text-yellow-600"></IoFlash>
                                <h1 className="text-lg  sm:text-lg  md:text-lg  lg:text-lg  xl:text-xl 2xl:text-xl font-bold">
                                    MinhCoi Store Trang Thông Tin Chính Thức.
                                </h1>
                            </div>
                            <h2 className="flex items-center gap-4">
                                <a href="tel: 0917023265" className="text-lg  sm:text-lg  md:text-lg  lg:text-lg  xl:text-xl 2xl:text-xl font-bold">
                                    Hotline Bán Hàng: 0917023265
                                </a>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
