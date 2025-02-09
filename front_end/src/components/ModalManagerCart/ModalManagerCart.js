import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartDetailByUserIdAction } from "../../redux_store/actions/OrderAction";
import NoImage from '../../assets/no-image.jpeg';
import { handleFormatPrice } from "../../utils/format/formatPrice";
import { NavLink } from "react-router-dom";

function ModalManagerCart({ isOpen, onClose, idUser }) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (isOpen && idUser) {
            dispatch(getCartDetailByUserIdAction(idUser));
        }
    }, [isOpen, idUser, dispatch]);
    const { orderDetailByUserId } = useSelector(state => state.OrderReducer);
    // console.log(orderDetailByUserId);
    const hasValidOrder = orderDetailByUserId?.data?.some(order => !order?.isDeleted && order?.products?.length > 0)
    console.log(hasValidOrder);
    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={onClose}
            />
            <div
                className={`fixed top-0 right-0 w-[250px] sm:w-[350px] h-full bg-white shadow-lg z-50 p-4 border-l transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-base lg:text-lg font-bold text-gray-400">Giỏ Hàng Mua Sắm</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl">
                        &times;
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[400px] lg:max-h-[600px] pr-2">
                    {
                        hasValidOrder ? (
                            orderDetailByUserId?.data?.filter((item) => item?.isDeleted === false)?.map((item, i) => (
                                <div key={i} className="mt-2 flex gap-4">
                                    <div>
                                        {item?.products?.map((it, i) => {
                                            const images = it?.imagesProduct ? JSON.parse(it?.imagesProduct) : [];
                                            const imageUrl = images?.[0] || NoImage;
                                            return (
                                                <img
                                                    src={imageUrl}
                                                    alt="product-image"
                                                    className="sm:w-[100px] sm:h-[100px] w-[100px] h-[100px] object-cover border-2 rounded-lg"
                                                    key={i}
                                                />
                                            );
                                        })}
                                    </div>
                                    <div className="flex flex-col justify-around">
                                        <h3 className="text-gray-500 font-medium text-sm">{item?.products[0]?.nameProduct}</h3>
                                        <p className="text-gray-500 font-normal text-xs">{item?.size?.numberOfSize}</p>
                                        <p className="text-gray-500 font-normal text-xs">{item?.color?.name}</p>
                                        <p className="text-gray-500 font-normal text-xs">
                                            {handleFormatPrice(item?.products[0]?.priceProduct)} vnd x <span>{item?.quantityOrder}</span>
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="mt-4 text-gray-600">
                                <p>Chưa Có Sản Phẩm Trong Giỏ Hàng.</p>
                            </div>
                        )
                    }
                </div>



                <div>
                    {hasValidOrder ? <div className="mt-4 border-t-2 border-gray-500">
                        <h4 className="text-sm font-bold text-gray-600 mt-2">
                            Tổng Tiền: {handleFormatPrice(
                                orderDetailByUserId?.data
                                    ?.filter((item) => item?.isDeleted === false)
                                    ?.reduce((total, item) => total + (item?.totalAmount || 0), 0)
                            )} vnđ
                        </h4>
                        <div className="flex flex-col items-center gap-4 mt-4">
                            <button
                                onClick={onClose}

                                className="w-3/4 bg-gray-400 text-gray-50 hover:text-primary py-1 text-sm sm:text-base font-semibold rounded-full hover:bg-gray-600"
                            >
                                <NavLink to={'/system-account/cart - shopping'}> Xem Giỏ Hàng</NavLink>
                            </button>
                            <button
                                onClick={onClose}
                                className="w-full bg-gray-400 text-gray-50 hover:text-primary py-1 text-sm sm:text-base font-semibold rounded hover:bg-gray-600"
                            >
                                <NavLink to={'/check-out'}>Thanh Toán</NavLink>
                            </button>
                        </div>
                    </div> : <NavLink to={'/search?page=1&searchName=+'}>
                        <button
                            onClick={onClose}
                            className="mt-4 w-full bg-gray-400 text-gray-50 hover:text-primary py-1 text-sm sm:text-base font-semibold rounded hover:bg-gray-600"
                        >
                            Tiếp tục mua sắm?
                        </button>
                    </NavLink>
                    }
                </div>
            </div>
        </>
    );
}

export default ModalManagerCart;