import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartDetailByUserIdAction } from "../../redux_store/actions/OrderAction";
import NoImage from '../../assets/no-image.jpeg';
import { handleFormatPrice } from "../../utils/format/formatPrice";

function ModalManagerCart({ isOpen, onClose, idUser }) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (isOpen && idUser) {
            dispatch(getCartDetailByUserIdAction(idUser));
        }
    }, [isOpen, idUser, dispatch]);
    const { orderDetailByUserId } = useSelector(state => state.OrderReducer);
    console.log(orderDetailByUserId);
    const hasValidOrder = orderDetailByUserId?.data?.some(order => !order?.isDeleted && order?.products?.length > 0)
    console.log(hasValidOrder);
    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={onClose}
            />
            <div
                className={`fixed top-0 right-0 w-[350px] h-full bg-white shadow-lg z-50 p-4 border-l transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-between items-center border-b pb-2">
                    <h2 className="text-lg font-bold text-gray-400">Giỏ Hàng Mua Sắm</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl">
                        &times;
                    </button>
                </div>
                {
                    hasValidOrder ? <div className="">
                        {
                            orderDetailByUserId?.data?.filter((item) => item?.isDeleted === false)?.map((item, i) => {
                                return (
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
                                )
                            })
                        }
                    </div>
                        :
                        <div className="mt-4 text-gray-600">
                            <p>Chưa Có Sản Phẩm Trong Giỏ Hàng.</p>
                        </div>
                }


                <button
                    onClick={onClose}
                    className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                    Tiếp tục mua sắm?
                </button>
            </div>
        </>
    );
}

export default ModalManagerCart;