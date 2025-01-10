import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Form, Input } from "antd";

import NoImage from '../../../assets/no-image.jpeg';
import { TOKEN } from "../../../utils/variable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderDetailByUserIdAction } from "../../../redux_store/actions/OrderAction";
import { handleFormatPrice } from "../../../utils/format/formatPrice";


function PaymentProduct() {
    let accessToken = {};
    const dispatch = useDispatch();
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN);
    } else {
        window.location.href = '/';
    }
    let { userLogin } = useSelector(state => state.UserReducer);
    console.log(userLogin);
    const idUser = userLogin?.id;
    useEffect(() => {
        if (idUser) {
            dispatch(getOrderDetailByUserIdAction(idUser))
        }
    }, [idUser, dispatch]);
    let { orderDetailByUserId } = useSelector(state => state.OrderReducer);

    const totalAmountSum = orderDetailByUserId?.data?.filter((item) => item?.isDeleted === false)?.reduce((sum, item) => {
        return sum + (item?.totalAmount || 0);
    }, 0);

    // const idProduct = orderDetailByUserId?.data?.map(order => order.products?.map(product => product.id))
    //     .flat();

    // console.log(idProduct);

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
                            </Form>
                        </div>
                    </div>

                    <div className="">
                        <div>
                            <h2 className="font-bold text-xl text-gray-700 dark:text-gray-200 uppercase text-center ">Đơn Hàng Của Bạn</h2>
                            {
                                orderDetailByUserId?.data?.map((item, i) => {
                                    return item?.isDeleted === false && <div className="mt-6" key={i}>
                                        <div>
                                            <div className="border-b-2 border-gray-300 pb-4">
                                                <div className="flex justify-around">
                                                    <div>
                                                        {item?.products?.map((pro, i) => {
                                                            const images = pro?.imagesProduct ? JSON.parse(pro?.imagesProduct) : [];
                                                            const imageUrl = images?.[0] || NoImage;
                                                            return (
                                                                <img
                                                                    src={imageUrl}
                                                                    alt="product-image"
                                                                    className="w-[125px] h-[125px] object-cover border-2 rounded-lg"
                                                                    key={i}
                                                                />
                                                            )
                                                        })}
                                                    </div>
                                                    <div className="flex flex-col justify-around ">
                                                        {item?.products?.map((pro, i) => {
                                                            return <>
                                                                <h3 key={i} className="text-lg font-medium text-gray-600 dark:text-gray-200  leading-[0px]">{pro?.nameProduct}</h3>
                                                            </>
                                                        })}
                                                        <h4 className="text-base  text-gray-600 dark:text-gray-200  leading-[0px]">Size Giày: {item?.size?.numberOfSize}</h4>
                                                        <h4 className="text-base  text-gray-600 dark:text-gray-200  leading-[0px]">Màu Sắc: {item?.color?.name}</h4>
                                                    </div>

                                                    <div className="flex justify-center items-center">
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentProduct;