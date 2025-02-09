import { useDispatch, useSelector } from "react-redux";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { RiLoader2Line } from "react-icons/ri";

import NoImage from '../../../assets/no-image.jpeg';
import { deleteCartAction, getCartDetailByUserIdAction, updateCartAction } from "../../../redux_store/actions/OrderAction";
import ModalDeleteCart from "../../../components/ModalDeleteCart/ModalDeleteCart";
import { getCodeProduct } from "../../../utils/format/getCodeProduct";
import { handleFormatPrice } from "../../../utils/format/formatPrice";
import { notification } from "antd";

function CartShoppingUser() {
    let { userLogin } = useSelector(state => state.UserReducer);
    const idUser = userLogin?.id;
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [currentCartId, setCurrentCartId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (idUser) {
            setLoading(true);
            dispatch(getCartDetailByUserIdAction(idUser))
                .finally(() => setLoading(false));
        }
    }, [idUser, dispatch]);

    let { orderDetailByUserId } = useSelector(state => state.OrderReducer);
    const dataUserOrder = orderDetailByUserId?.data || [];

    const handleOpenModalDeleteCart = () => {
        setIsModalOpen(true);
    };
    const handleCloseModalDeleteCart = () => {
        setIsModalOpen(false);
    };

    const handleIncrease = (quantityOrder, totalAmount, idOfOrder, numberProductInStock) => {
        console.log(numberProductInStock);
        const quantityOrderCurrent = quantityOrder + 1;
        const totalAmountCurrent = totalAmount + (totalAmount / quantityOrder);
        const formData = new FormData();
        if (numberProductInStock < quantityOrderCurrent) {
            notification.error({
                closeIcon: true,
                message: 'Xin lỗi',
                description: (
                    <>Chúng tôi chỉ còn  {numberProductInStock} sản phẩm.</>
                ),
            });
        } else {
            formData.append("QuantityOrder", quantityOrderCurrent);
            formData.append("TotalAmount", totalAmountCurrent);
            dispatch(updateCartAction(idOfOrder, formData));
        }

    };

    const handleDecrease = (quantityOrder, totalAmount, idOfOrder) => {
        if (quantityOrder > 1) {
            const quantityOrderCurrent = quantityOrder - 1;
            const totalAmountCurrent = totalAmount - (totalAmount / quantityOrder);
            const formData = new FormData();
            formData.append("QuantityOrder", quantityOrderCurrent);
            formData.append("TotalAmount", totalAmountCurrent);
            dispatch(updateCartAction(idOfOrder, formData));
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center gap-2  dark:bg-gray-900">
            <RiLoader2Line className="text-primary animate-spin text-4xl " /> <p className="text-lg italic dark:text-gray-200">Loading Cart....</p>
        </div>;
    }

    if (dataUserOrder.length === 0 || dataUserOrder.every((item) => item?.isDeleted === true)) {
        return <div>Không có sản phẩm trong giỏ hàng.</div>;
    }


    return (
        <div className="">
            <div className="2xl:grid xl:grid flex flex-col grid-cols-3 gap-6">
                <div className="col-span-2">
                    <h2 className="text-gray-500 dark:text-gray-100 text-xl font-bold mb-4">Quản Lý Giỏ Hàng</h2>
                    {dataUserOrder.map((up, i) => (
                        up?.isDeleted === false &&
                        <div className="flex sm:flex-row flex-col  items-center justify-between mt-4 border-t-2
                        border-gray-400 sm:pt-0 pt-6" key={up?.id}>
                            <div>
                                {up?.products?.map((it, i) => {
                                    const images = it?.imagesProduct ? JSON.parse(it?.imagesProduct) : [];
                                    const imageUrl = images?.[0] || NoImage;
                                    return (
                                        <img
                                            src={imageUrl}
                                            alt="product-image"
                                            className="sm:w-[150px] sm:h-[150px] w-[300px] h-[300px] object-cover border-2 rounded-lg"
                                            key={i}
                                        />
                                    );
                                })}
                            </div>
                            <div className="flex flex-col gap-1 mt-2">
                                {up?.products?.map((it, i) => (
                                    <h1
                                        key={i}
                                        className="font-bold text-lg text-gray-500 dark:text-gray-200 hover:text-primary dark:hover:text-primary cursor-pointer"
                                    >
                                        {it?.nameProduct}
                                    </h1>
                                ))}
                                <h3 className="text-base font-semibold rounded-md text-gray-500 dark:text-gray-200">
                                    Mã Đơn Hàng: {getCodeProduct(up?.id)}
                                </h3>
                                <h3 className="text-base font-semibold rounded-md text-gray-500 dark:text-gray-200">
                                    Size Giày: {up?.size?.numberOfSize}
                                </h3>
                                <h3 className="text-base font-semibold rounded-md text-gray-500 dark:text-gray-200">
                                    Màu Sắc: {up?.color?.name}
                                </h3>
                                {up?.products?.map((it, i) => (
                                    <h3
                                        key={i}
                                        className="text-base font-semibold rounded-md text-gray-500 dark:text-gray-200 mb-2"
                                    >
                                        Giá: {handleFormatPrice(it?.priceProduct)}đ
                                    </h3>
                                ))}
                                <div className="flex gap-2 items-center w-[232px] border-2 border-gray-300 bg-gray-50 dark:border-gray-300">
                                    <button
                                        onClick={() => handleIncrease(up?.quantityOrder, up?.totalAmount, up?.id, up?.products[0]?.numberOfProductInStock)}
                                        className="text-base font-bold sm:text-2xl px-3 py-1 dark:bg-gray-100 dark:text-gray-600 border-gray-200 border-r-2 hover:bg-gray-400"
                                    >
                                        +
                                    </button>
                                    <p className="text-base font-medium sm:text-2xl py-1 px-14 bg-gray-50 dark:text-gray-600">
                                        {up?.quantityOrder}
                                    </p>
                                    <button
                                        onClick={() => handleDecrease(up?.quantityOrder, up?.totalAmount, up?.id)}
                                        disabled={up?.quantityOrder <= 1}
                                        className={`text-base font-bold sm:text-2xl px-4 py-1 dark:bg-gray-100 dark:text-gray-600 border-gray-200 border-l-2 ${up?.quantityOrder <= 1 ? "cursor-not-allowed opacity-50" : ""
                                            }`}
                                    >
                                        -
                                    </button>

                                </div>
                                <h3 className="text-lg font-bold text-gray-500 mt-2 dark:text-gray-200">
                                    Tạm Tính: {handleFormatPrice(up?.totalAmount)}đ
                                </h3>
                                <div className="sm:hidden block">
                                    <button
                                        onClick={() => {
                                            handleOpenModalDeleteCart();
                                            setCurrentCartId(up?.id);
                                        }}
                                        className="flex items-center justify-center gap-2 
                                        p-2 mt-2 rounded-md font-bold dark:hover:bg-primary text-gray-400 hover:text-gray-500
                                         dark:text-gray-200 text-2xl dark:border-gray-200 dark:hover:border-primary 
                                         border-2 border-gray-300 hover:border-gray-400 bg-gray-300 hover:bg-gray-400 hove"
                                    >
                                        <IoMdCloseCircleOutline /><p className="text-base font-medium">Xoá sản phẩm</p>
                                    </button>
                                    <ModalDeleteCart
                                        isOpen={isModalOpen}
                                        onClose={handleCloseModalDeleteCart}
                                        onConfirm={() => {
                                            dispatch(deleteCartAction(currentCartId));
                                            setIsModalOpen(false);
                                        }}
                                        orderId={getCodeProduct(currentCartId)}
                                    />
                                </div>
                            </div>
                            <div className="sm:block hidden">
                                <button
                                    onClick={() => {
                                        handleOpenModalDeleteCart();
                                        setCurrentCartId(up?.id);
                                    }}
                                    className="hover:text-primary font-bold dark:hover:text-primary text-gray-500 dark:text-gray-200 text-4xl"
                                >
                                    <IoMdCloseCircleOutline />
                                </button>
                                <ModalDeleteCart
                                    isOpen={isModalOpen}
                                    onClose={handleCloseModalDeleteCart}
                                    onConfirm={() => {
                                        dispatch(deleteCartAction(currentCartId));
                                        setIsModalOpen(false);
                                    }}
                                    orderId={getCodeProduct(currentCartId)}
                                />
                            </div>
                        </div>
                    ))}

                </div>
                <div className="mt-10">
                    <div className="py-8 px-4 rounded-md border-4 border-gray-300 flex flex-col gap-4">
                        <h1 className="text-gray-600 font-bold text-xl dark:text-gray-300 border-b-2 border-gray-200 pb-2">
                            Cộng Giỏ Hàng
                        </h1>
                        {orderDetailByUserId?.data.map((item, i) => (
                            item?.isDeleted === false && <div className="flex gap-10 items-center border-b-2 border-gray-200 pb-2" key={i}>
                                <h3 className="text-base font-bold text-gray-600 dark:text-gray-300">Tạm Tính</h3>
                                <h4 className="text-base font-medium text-gray-500 dark:text-gray-200">{handleFormatPrice(item?.totalAmount)}đ</h4>
                            </div>
                        ))}
                        <div className="flex gap-10 items-center mb-2">
                            <h3 className="text-base font-bold text-gray-600 dark:text-gray-300">Tổng</h3>
                            <h4 className="text-lg font-bold text-gray-500 dark:text-gray-200">
                                {handleFormatPrice(
                                    orderDetailByUserId?.data
                                        ?.filter((item) => item?.isDeleted === false)
                                        ?.reduce((total, item) => total + (item?.totalAmount || 0), 0)
                                )}đ
                            </h4>
                        </div>
                        <a href="/check-out">
                            <button
                                className="w-full px-2 py-2 border-gray-200 border-2 rounded-md font-bold bg-primary text-white hover:bg-gray-400 hover:text-black"
                            >
                                Thanh Toán
                            </button>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartShoppingUser;
