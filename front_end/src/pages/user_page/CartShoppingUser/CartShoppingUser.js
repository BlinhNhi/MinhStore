import { useDispatch, useSelector } from "react-redux";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { TOKEN } from "../../../utils/variable";
import NoImage from '../../../assets/no-image.jpeg'
import { useEffect, useState } from "react";
import { deleteOrderAction, getOrderDetailByUserIdAction, updateOrderAction } from "../../../redux_store/actions/OrderAction";
import ModalDeleteCart from "../../../components/ModalDeleteCart/ModalDeleteCart";
import { getCodeProduct } from "../../../utils/format/getCodeProduct";


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
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        if (idUser) {
            dispatch(getOrderDetailByUserIdAction(idUser));
        }
    }, [idUser, dispatch]);
    let { orderDetailByUserId } = useSelector((state) => state.OrderReducer);
    const dataUserOrder = orderDetailByUserId || [];
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    console.log('test order detail : ', orderDetailByUserId);


    const handleIncrease = (quantityOrder, totalAmount, idOfOrder) => {
        const quantityOrderCurrent = quantityOrder + 1;
        const totalAmountCurrent = totalAmount + (totalAmount / quantityOrder)
        const formData = new FormData();
        formData.append("QuantityOrder", quantityOrderCurrent);
        formData.append("TotalAmount", totalAmountCurrent);
        dispatch(updateOrderAction(idOfOrder, formData))
        console.log(idOfOrder);
        console.log(quantityOrderCurrent);
        console.log(totalAmount);
        console.log(totalAmountCurrent);

    };

    const handleDecrease = (quantityOrder, totalAmount, idOfOrder) => {
        if (quantityOrder > 1) {
            const quantityOrderCurrent = quantityOrder - 1;
            const totalAmountCurrent = totalAmount - (totalAmount / quantityOrder)
            console.log(idOfOrder);
            console.log(quantityOrderCurrent);
            console.log(totalAmount);
            console.log(totalAmountCurrent);
            const formData = new FormData();
            formData.append("QuantityOrder", quantityOrderCurrent);
            formData.append("TotalAmount", totalAmountCurrent);
            dispatch(updateOrderAction(idOfOrder, formData))
        }
    };



    return (
        <div className="">
            <div className="2xl:grid xl:grid flex flex-col grid-cols-3 gap-6">
                <div className="col-span-2">
                    <h2 className="text-gray-500 dark:text-gray-100 text-xl font-bold mb-4">Quản Lý Giỏ Hàng</h2>
                    {
                        dataUserOrder?.length > 0 ? dataUserOrder?.map((up, i) => {
                            return <div className="flex items-center justify-between mt-4 border-t-2 border-gray-400" key={up?.id}>
                                <div className="" >
                                    {up?.products?.map((it, i) => {
                                        const images = it?.imagesProduct ? JSON.parse(it?.imagesProduct) : [];
                                        const imageUrl = images?.[0] || NoImage;
                                        return <img
                                            src={imageUrl}
                                            alt="product-image"
                                            className="w-[150px] h-[150px] object-cover border-2 rounded-lg"
                                        />


                                    })}

                                </div>
                                <div key={up?.id} className="flex flex-col gap-1 mt-2">
                                    <>
                                        {up?.products?.map((it, i) => {
                                            return <h1 className="font-bold text-lg text-gray-500 dark:text-gray-200 hover:text-primary dark:hover:text-primary cursor-pointer ">{it?.nameProduct}</h1>


                                        })}
                                    </>
                                    <h3 className="text-base font-semibold rounded-md text-gray-500 dark:text-gray-200">Mã Đơn Hàng: {getCodeProduct(up?.id)}</h3>
                                    <h3 className="text-base font-semibold rounded-md text-gray-500 dark:text-gray-200">Size Giày: {up?.size?.numberOfSize}</h3>
                                    <h3 className="text-base font-semibold rounded-md text-gray-500 dark:text-gray-200">Màu Sắc : {up?.color?.name}</h3>
                                    <>
                                        {up?.products?.map((it, i) => {
                                            console.log();
                                            return <h3 className="text-base font-semibold rounded-md text-gray-500 dark:text-gray-200 mb-2">Giá: {it?.priceProduct}đ</h3>

                                        })}
                                    </>

                                    <div className="flex gap-2 items-center w-[232px] border-2 border-gray-300 bg-gray-50 dark:border-gray-300">
                                        <button
                                            onClick={() => handleIncrease(up?.quantityOrder, up?.totalAmount, up?.id)}
                                            className="text-base font-bold
     sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl
     px-3 py-1 dark:bg-gray-100 dark:text-gray-600 border-gray-200 border-r-2 hover:bg-gray-400 dark:hover:bg-gray-400"
                                        >
                                            +
                                        </button>

                                        <p
                                            className="text-base font-medium
     sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl
     py-1 px-14 bg-gray-50 dark:text-gray-600"
                                        >
                                            {up?.quantityOrder}
                                        </p>

                                        <button
                                            onClick={() => {
                                                handleDecrease(up?.quantityOrder, up?.totalAmount, up?.id);
                                            }}
                                            disabled={up?.quantityOrder <= 1}
                                            className={`text-base font-bold hover:bg-gray-400 dark:hover:bg-gray-400
            sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl
            px-4 py-1 dark:bg-gray-100 dark:text-gray-600 border-gray-200 border-l-2
            ${up?.quantityOrder <= 1
                                                    ? "text-base font-bold hover:bg-gray-400 dark:hover:bg-gray-400 sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl cursor-not-allowed px-[18px] opacity-50 py-1 dark:bg-gray-100 dark:text-gray-600 border-gray-200 border-l-2"
                                                    : ""
                                                }`}
                                        >
                                            -
                                        </button>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-500 mt-2 dark:text-gray-200">Tạm Tính: {up?.totalAmount}đ</h3>
                                </div>
                                <div>
                                    <button
                                        onClick={() => {
                                            handleOpenModal();
                                            console.log("Opening modal with id:", up?.id);
                                            setCurrentOrderId(up?.id);
                                        }}
                                        className=" hover:text-primary font-bold dark:hover:text-primary text-gray-500 dark:text-gray-200 text-4xl">
                                        <IoMdCloseCircleOutline />
                                    </button>
                                    <ModalDeleteCart
                                        isOpen={isModalOpen}
                                        onClose={handleCloseModal}
                                        onConfirm={() => {
                                            dispatch(deleteOrderAction(currentOrderId));
                                            setIsModalOpen(false);
                                        }}
                                        orderId={getCodeProduct(currentOrderId)}
                                    />
                                </div>
                            </div>
                        }) : <div>
                            <p className="text-base italic">Không có sản phẩm nào trong giỏ hàng</p>
                        </div>
                    }
                </div>
                <div className="mt-10">
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