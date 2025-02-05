import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Form, Input, notification } from "antd";
import { RiLoader2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useFormik } from "formik";
import NoImage from '../../../assets/no-image.jpeg';
import { getCartDetailByUserIdAction, updateIsDeletedOfCartAction } from "../../../redux_store/actions/OrderAction";
import { handleFormatPrice } from "../../../utils/format/formatPrice";
import { addPaymentAction } from "../../../redux_store/actions/PaymentAction";



function PaymentProduct() {
    const dispatch = useDispatch();
    let { userLogin } = useSelector(state => state.UserReducer);
    const idUser = userLogin?.id;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (idUser) {
            setLoading(true);
            dispatch(getCartDetailByUserIdAction(idUser))
                .finally(() => setLoading(false));
        }
    }, [idUser, dispatch]);
    let { orderDetailByUserId } = useSelector(state => state.OrderReducer);
    if (orderDetailByUserId?.data?.length === 0 || orderDetailByUserId?.data?.every((item) => item?.isDeleted === true)) {
        window.location.href = '/';
    }
    const totalAmountSum = orderDetailByUserId?.data?.filter((item) => item?.isDeleted === false)?.reduce((sum, item) => {
        return sum + (item?.totalAmount || 0);
    }, 0);

    console.log(orderDetailByUserId?.data);
    const idParseOfOrderToString = orderDetailByUserId?.data?.filter(item => !item.isDeleted)?.map(item => `"${item.id}"`).join(",");
    console.log(idParseOfOrderToString);

    const formik = useFormik({
        initialValues: {
            nameUser: "",
            phoneUser: "",
            addressUser: "",
        },
        onSubmit: (values) => {
            if (values.nameUser === "") {
                notification.error({
                    closeIcon: true,
                    message: "Lỗi",
                    description: <>Vui lòng điền đầy đủ các trường.</>,
                });
            } else {
                let formData = new FormData();
                for (let key in values) {
                    formData.append(key, values[key]);
                }
                formData.append("totalAmountOfOrder", totalAmountSum);
                formData.append("userId", idUser);
                formData.append("orderId", idParseOfOrderToString);
                console.table("formData", [...formData]);
                dispatch(addPaymentAction(formData));
                dispatch(updateIsDeletedOfCartAction(idUser))
            }
        },
    });

    const handleChangeContent = (e, editor) => {
        const data = editor.getData();
        formik.setFieldValue("noteUser", data);
    };
    // fix error ResizeObserver loop
    useEffect(() => {
        function hideError(e) {
            if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
                const resizeObserverErrDiv = document.getElementById(
                    'webpack-dev-server-client-overlay-div'
                );
                const resizeObserverErr = document.getElementById(
                    'webpack-dev-server-client-overlay'
                );
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute('style', 'display: none');
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute('style', 'display: none');
                }
            }
        }

        window.addEventListener('error', hideError)
        return () => {
            window.addEventListener('error', hideError)
        }
    }, [])

    if (loading) {
        return <div className="flex justify-center items-center gap-2 dark:bg-gray-900 p-8">
            <RiLoader2Line className="text-primary animate-spin text-4xl" /> <p className="text-lg italic dark:text-gray-200">Loading....</p>
        </div>;
    }

    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
        >
            <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
                <div className="container pt-10">
                    {/* start */}

                    <div className="grid  lg:grid-cols-2 gap-2">
                        <div className="lg:border-r-2 lg:border-gray-300 lg:pr-4">
                            <h2 className="font-bold text-xl text-gray-700 dark:text-gray-200 uppercase">Thanh Toán Và Giao Hàng</h2>
                            <div className="mt-6">
                                <Form.Item
                                    label=""
                                    name="nameUser"
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
                                        name="nameUser"
                                        onChange={formik.handleChange}
                                        className="block text-sm py-2 xl:py-2 2xl:py-2 px-4 rounded-xl w-5/6 lg:w-full xl:w-full 2xl:w-full border-2 hover:border-gray-300 outline-none focus:outline-none"
                                        placeholder="Họ Và Tên"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label=""
                                    name="phoneUser"
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
                                        name="phoneUser"
                                        onChange={formik.handleChange}
                                        className="block text-sm py-2 xl:py-2 2xl:py-2 px-4 rounded-xl w-5/6 lg:w-full xl:w-full 2xl:w-full border-2 hover:border-gray-300 outline-none focus:outline-none"
                                        placeholder="Điện Thoại"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label=""
                                    name="addressUser"
                                    style={{ minWidth: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Address is required!",
                                            transform: (value) => value.trim(),
                                        },
                                    ]}
                                >
                                    <Input
                                        name="addressUser"
                                        onChange={formik.handleChange}
                                        className="block text-sm py-2 xl:py-2 2xl:py-2 px-4 rounded-xl w-5/6 lg:w-full xl:w-full 2xl:w-full border-2 hover:border-gray-300 outline-none focus:outline-none"
                                        placeholder="Địa Chỉ"
                                    />
                                </Form.Item>

                                <Form.Item
                                    className="w-5/6 md:w-full lg:w-full xl:w-full 2xl:w-full"
                                >
                                    <h2 className="font-bold text-xl text-gray-700 dark:text-gray-200 uppercase">
                                        Thông Tin Bổ Sung
                                    </h2>
                                    <p className="font-medium text-base text-gray-700 dark:text-gray-200 mb-2">
                                        Ghi chú đơn hàng (tuỳ chọn)
                                    </p>

                                    <CKEditor
                                        config={{

                                            placeholder: "Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn", // Đặt placeholder ở đây
                                        }}
                                        name="noteUser"
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

                            </div>
                        </div>

                        <div className="">
                            <div>
                                <h2 className="font-bold text-xl text-gray-700 dark:text-gray-200 uppercase text-center ">Đơn Hàng Của Bạn</h2>
                                {
                                    orderDetailByUserId?.data?.map((item, i) => {
                                        return item?.isDeleted === false && <div className="mt-6" key={item?.id}>
                                            <div>
                                                <div className="border-b-2 border-gray-300 pb-4">
                                                    <div className="flex justify-around ">
                                                        <div>
                                                            {item?.products?.map((pro, i) => {
                                                                const images = pro?.imagesProduct ? JSON.parse(pro?.imagesProduct) : [];
                                                                const imageUrl = images?.[0] || NoImage; return (
                                                                    <img

                                                                        src={imageUrl}
                                                                        alt="product-image"
                                                                        className="w-[125px] h-[125px] object-cover border-2 rounded-lg"
                                                                        key={pro?.id}
                                                                    />
                                                                )
                                                            })}
                                                        </div>
                                                        <div className="flex flex-col justify-around ">
                                                            {item?.products?.map((pro, i) => {
                                                                return <>
                                                                    <h3 key={pro?.id} className="text-lg font-medium text-gray-600 dark:text-gray-200  leading-[0px]">{pro?.nameProduct}</h3>
                                                                </>
                                                            })}
                                                            <h4 className="text-base  text-gray-600 dark:text-gray-200  leading-[0px]">Size Giày: {item?.size?.numberOfSize}</h4>
                                                            <h4 className="text-base  text-gray-600 dark:text-gray-200  leading-[0px]">Màu Sắc: {item?.color?.name}</h4>
                                                            <div className="flex items-center gap-2 sm:hidden ">
                                                                {item?.products?.map((pro, i) => {
                                                                    return <h3 key={i} className="text-base  text-gray-600 dark:text-gray-200">{handleFormatPrice(pro?.priceProduct)}đ</h3>
                                                                })}
                                                                <p className="text-gray-600 dark:text-gray-200">x {item?.quantityOrder}</p>
                                                            </div>
                                                        </div>

                                                        <div className="hidden sm:flex justify-center items-center ">
                                                            {item?.products?.map((pro, i) => {
                                                                return <h3 key={i} className="text-lg  text-gray-600 dark:text-gray-200">{handleFormatPrice(pro?.priceProduct)}đ</h3>
                                                            })}
                                                            <p className="text-gray-600 dark:text-gray-200 ml-2">x {item?.quantityOrder}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" py-4 pl-8">
                                                    <div className="flex justify-between">
                                                        <h3 className="text-base font-medium text-gray-600 dark:text-gray-200">Tạm tính: </h3>
                                                        <h2 className="text-lg  text-gray-600 dark:text-gray-200">{handleFormatPrice(item?.totalAmount)}đ</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                                <h1 className="font-bold text-gray-800 dark:text-primary text-lg 
                            text-right border-double py-4 border-gray-400 border-t-4 mt-4">Tổng: {handleFormatPrice(totalAmountSum)}đ </h1>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button className="p-2 px-20 text-gray-200 font-semibold rounded-lg bg-gray-400 
                            hover:bg-gray-500 hover:text-gray-100 dark:bg-gray-100 dark:text-gray-500 dark:hover:bg-primary dark:hover:text-gray-100">Thanh Toán</button>
                            </div>
                        </div>
                    </div>
                    <div className="py-10 text-center">
                        <h2 className="text-lg italic font-bold dark:text-primary text-gray-500">Đơn hàng sẽ được thanh toán sau khi nhận hàng.</h2>
                    </div>
                </div>
            </div>
        </Form>
    );
}

export default PaymentProduct;