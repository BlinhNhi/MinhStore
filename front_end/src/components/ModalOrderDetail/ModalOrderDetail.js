import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetailAction, updateStatusPaymentAction } from "../../redux_store/actions/PaymentAction";
import { getCodeProduct } from "../../utils/format/getCodeProduct";
import { formatDateTime } from "../../utils/format/formatDateTime";
import { handleFormatPrice } from "../../utils/format/formatPrice";

function ModalOrderDetail({ isOpen, onClose, paymentId }) {
    const dispatch = useDispatch();
    let { paymentDetail } = useSelector(state => state.PaymentReducer)
    useEffect(() => {
        if (paymentId) {
            dispatch(getPaymentDetailAction(paymentId));
        }
    }, [dispatch, paymentId])
    const handleOrderComfirm = (paymentId, newStatusOrder) => {
        const formData = new FormData();
        formData.append("nameUser", paymentDetail?.nameUser);
        formData.append("addressUser", paymentDetail?.addressUser);
        formData.append("dayOrder", paymentDetail?.dayOrder);
        formData.append("statusOrder", newStatusOrder);
        console.table("nameUser: ", paymentDetail?.nameUser, "addressUser: ", paymentDetail?.addressUser, "idPayment: ", paymentId, "statusOrder: ", newStatusOrder);
        dispatch(updateStatusPaymentAction(paymentId, formData));
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/50 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-2/3">
                <h2 className="text-base sm:text-xl font-bold text-gray-800 mb-4">
                    Đơn hàng chi tiết
                </h2>
                <div className="flex gap-1 flex-col flex-1 overflow-y-auto max-h-[400px] lg:max-h-[600px]">
                    <h2 className="text-sm sm:text-base text-gray-500 font-medium">Mã đơn hàng: {getCodeProduct(paymentDetail?.id)}</h2>

                    <h2 className="text-sm sm:text-base text-gray-500 font-medium">Ngày đặt hàng: {paymentDetail?.dayOrder ? formatDateTime(paymentDetail.dayOrder) : "Không xác định"}</h2>
                    <h2 className="text-sm sm:text-base text-gray-500 font-medium">Trạng thái đơn hàng: <span className="text-gray-600 font-bold">
                        {paymentDetail?.statusOrder === 0 ? 'Đang xử lý, xác nhận đơn hàng để có thể chấp nhận đơn hàng.' :
                            paymentDetail?.statusOrder === 1 ? <span className="text-primary font-bold">Xác nhận đơn hàng, bạn có thể bàn giao vận chuyển.</span> :
                                paymentDetail?.statusOrder === 2 ? <span className="text-green-500 font-bold">Bàn giao vận chuyển, người giao hàng đã đến lấy sản phẩm để giao?</span> :
                                    paymentDetail?.statusOrder === 3 ? <span className="text-blue-400 font-bold">Đang vận chuyển, bạn có thể chuyển về bàn giao vận chuyển
                                        khi đơn hàng gặp sự cố chỉ cần 1 nút bấm!
                                    </span> :
                                        paymentDetail?.statusOrder === 4 ? <span className="text-red-500 font-bold">Hoàn thành đơn hàng, chúc mừng bạn khách hàng đã nhận hàng.</span>
                                            : 'Không xác định'
                        }</span></h2>

                    <h2 className="text-sm sm:text-base text-gray-500 font-medium">Tên khách hàng: {paymentDetail?.nameUser}</h2>
                    <h4 className="text-sm sm:text-base text-gray-500 font-medium">Địa chỉ khách hàng: {paymentDetail?.addressUser}</h4>
                    <h4 className="text-sm sm:text-base text-gray-500 font-medium">Số điện thoại khách hàng: {paymentDetail?.phoneUser}</h4>
                    <h4 className="text-sm sm:text-base text-gray-500 font-medium">Ghi chú đơn hàng:</h4>
                    <h4 className="border-2 border-gray-500 p-1 rounded-md border-double w-2/3"> <span className="text-sm md:text-base italic sm:text-base text-gray-500 font-medium " dangerouslySetInnerHTML={{ __html: paymentDetail.noteUser }}></span></h4>
                    <h2 className="text-sm sm:text-base text-gray-600 font-bold">Số lượng sản phẩm: {paymentDetail?.orders?.length}</h2>
                    {paymentDetail?.orders?.map((item, i) => {
                        return <div className="border-b-2 pb-2 border-gray-400  w-2/3" key={item?.id}>
                            <h2 className="font-medium text-gray-500 text-sm sm:text-base">Tên Sản phẩm: {item?.products[0]?.nameProduct}</h2>
                            <h4 className="font-medium text-gray-500 text-sm sm:text-base">Màu sắc: <span className="text-xs sm:text-base font-bold">{item?.color?.name}</span></h4>
                            <h4 className="font-medium text-gray-500 text-sm sm:text-base">Size: <span className="text-xs sm:text-base font-bold">{item?.size?.numberOfSize}</span></h4>
                            <h2 className="font-medium text-gray-500 text-sm sm:text-base">Thành tiền: <span className="text-xs sm:text-base font-normal">{handleFormatPrice(item?.products[0]?.priceProduct)} x {item?.quantityOrder} = {handleFormatPrice(item?.totalAmount)} vnd</span></h2>
                        </div>
                    })}
                    <h2 className="text-sm sm:text-base  text-gray-500 font-medium md:font-bold text-right mt-2  w-2/3">Tổng đơn hàng: <span>{handleFormatPrice(paymentDetail?.totalAmountOfOrder)} vnd</span></h2>
                </div>

                <div className="flex md:flex-row flex-col gap-4   md:justify-end mt-6 md:space-x-4 justify-center ">
                    <button
                        onClick={() => handleOrderComfirm(paymentDetail?.id, 1)}
                        disabled={
                            paymentDetail?.statusOrder === 1 || paymentDetail?.statusOrder === 2 || paymentDetail?.statusOrder === 3 || paymentDetail?.statusOrder === 4
                        }
                        className={`py-2 px-2 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold rounded
        ${paymentDetail?.statusOrder === 1 || paymentDetail?.statusOrder === 2 || paymentDetail?.statusOrder === 3 || paymentDetail?.statusOrder === 4 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary/70 text-white hover:bg-primary"}
    `}
                    >
                        {paymentDetail?.statusOrder === 0 ? "Xác nhận đơn hàng" : "Đã xác nhận"}
                    </button>
                    <button
                        onClick={() => handleOrderComfirm(paymentDetail?.id, paymentDetail?.statusOrder === 2 ? 3 : 2)}
                        disabled={paymentDetail?.statusOrder === 0 || paymentDetail?.statusOrder === 4}
                        className={`py-2 px-2 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold rounded transition-colors duration-300
        ${paymentDetail?.statusOrder === 0
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : paymentDetail?.statusOrder === 1
                                    ? "bg-primary/70 text-white hover:bg-primary"
                                    : paymentDetail?.statusOrder === 2
                                        ? "bg-green-500/70 text-white hover:bg-green-500"
                                        : paymentDetail?.statusOrder === 4
                                            ? "bg-red-500/80 cursor-not-allowed text-white "
                                            : "bg-blue-400/70 text-white hover:bg-blue-400"
                            }
    `}
                    >
                        {paymentDetail?.statusOrder === 3 ? "Đang vận chuyển" : paymentDetail?.statusOrder === 1 ? "Đã xác nhận" : paymentDetail?.statusOrder === 4 ? "Hoàn thành đơn hàng" : "Bàn giao vận chuyển"}
                    </button>

                    <button
                        onClick={onClose}
                        className="py-2 px-2 sm:px-4 sm:py-2 text-sm sm:text-base font-semibold
                 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                        Thoát
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalOrderDetail;