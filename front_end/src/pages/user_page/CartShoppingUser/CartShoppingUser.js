import { Button, Table } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";

import { TOKEN } from "../../../utils/variable";
import NoImage from '../../../assets/no-image.jpeg'
import { useEffect } from "react";
import { getOrderDetailAction, getOrderDetailByUserIdAction } from "../../../redux_store/actions/OrderAction";


function CartShoppingUser() {
    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    } else {
        window.location.href = '/';
    }
    let { userLogin } = useSelector(state => state.UserReducer);
    const idUser = userLogin?.id;
    const dispatch = useDispatch();
    console.log(userLogin);
    console.log(idUser);

    useEffect(() => {
        if (idUser) {
            dispatch(getOrderDetailByUserIdAction(idUser));
        }
    }, [idUser, dispatch]);
    let { orderDetailByUserId } = useSelector((state) => state.OrderReducer);
    console.log('test order detail : ', orderDetailByUserId);


    const dataUserOrder = orderDetailByUserId;
    const columnsDataTest = [
        {
            title: 'Sản Phẩm',
            render: (text, cat) => {
                const productName = text?.products?.[0]?.nameProduct;
                return (
                    <>
                        {productName || "Không có tên sản phẩm"}
                    </>
                );
            }
        },
        {
            title: 'Hình Ảnh',
            width: '10%',
            render: (text) => {
                // Chuyển chuỗi JSON thành mảng
                const images = text?.products?.[0]?.imagesProduct ? JSON.parse(text.products[0].imagesProduct) : [];
                const imageUrl = images?.[0] || NoImage; // Lấy URL đầu tiên hoặc sử dụng ảnh mặc định
                return (
                    <div className="flex flex-col items-center">
                        <img
                            src={imageUrl}
                            alt="product-image"
                            className="w-[50px] h-[50px] object-cover border-2 rounded-lg"
                        />
                    </div>
                );
            }
        },
        {
            title: 'Giá',
            render: (text, cat) => {
                const productPrice = text?.products?.[0]?.priceProduct;
                return (
                    <>
                        {productPrice || "Không có giá sản phẩm"} vnd
                    </>
                );
            }
        },
        {
            title: 'Số Lượng',
            width: '15%',
            render: (text, cat) => {
                return <>
                    <Button key={1} href={`/admin/categories-mng/edit/${cat.id}`} type="link" onClick={() => {
                    }}>{text?.quantityOrder}</Button>
                </>

            }
        },
        {
            title: 'Tạm Tính',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        },
        {
            title: 'Size',
            render: (text, cat) => {
                return (
                    <>
                        {text?.size?.numberOfSize || 'Không có size'}
                    </>
                );
            }
        },
        {
            title: 'Màu Sắc',
            render: (text) => {
                return (
                    <>
                        {text?.color?.name || 'Không có màu'}
                    </>
                );
            }
        },
    ];
    return (
        <div className="">
            <h2 className="text-gray-500 dark:text-gray-100 text-xl font-bold mb-2">Quản Lý Giỏ Hàng</h2>
            <div className="2xl:grid xl:grid flex flex-col grid-cols-3 gap-4">
                <div className="col-span-2">
                    <Table dataSource={dataUserOrder} columns={columnsDataTest} rowKey={'id'} scroll={{ x: 1000 }} />
                </div>
                <div className="">
                    <div className="py-8 px-4 rounded-md border-4 border-gray-300 flex flex-col gap-4">
                        <h1 className="text-gray-600 font-bold text-xl dark:text-gray-300 border-b-2 border-gray-200 pb-2">Cộng Giỏ Hàng</h1>

                        {
                            orderDetailByUserId?.map((item, i) => {
                                return (
                                    <div className="flex gap-10 items-center border-b-2 border-gray-200 pb-2">
                                        <h3 className="text-base font-bold text-gray-600 dark:text-gray-300">Tạm Tính</h3>
                                        <h4 className="text-base font-medium text-gray-500 dark:text-gray-200">{item?.totalAmount}đ</h4>
                                    </div>
                                )
                            })
                        }
                        <div className="flex gap-10 items-center mb-2"><h3 className="text-base font-bold text-gray-600 dark:text-gray-300">Tổng</h3> <h4 className="text-lg font-bold text-gray-500 dark:text-gray-200">
                            {
                                orderDetailByUserId?.reduce((total, item) => total + (item?.totalAmount || 0), 0).toLocaleString('vi-VN') + 'đ'
                            }

                        </h4></div>
                        <button className="p-2 text-gray-200 font-semibold text-base hover:bg-primary dark:bg-white dark:text-gray-400 dark:hover:bg-primary dark:hover:text-gray-100 rounded-md bg-black">Tiến Hành Thanh Toán</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartShoppingUser;