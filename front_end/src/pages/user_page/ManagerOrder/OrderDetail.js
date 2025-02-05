import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN } from "../../../utils/variable";
import { getPaymentDetailAction, updateStatusPaymentAction } from "../../../redux_store/actions/PaymentAction";
import { RiLoader2Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { formatDateTime } from "../../../utils/format/formatDateTime";
import { getCodeProduct } from "../../../utils/format/getCodeProduct";
import { handleFormatPrice } from "../../../utils/format/formatPrice";
function OrderDetail() {
    let accessToken = {};
    const dispatch = useDispatch();
    // if (localStorage.getItem(TOKEN)) {
    //     accessToken = localStorage.getItem(TOKEN);
    // } else {
    //     window.location.href = '/';
    // }
    let { userLogin } = useSelector(state => state.UserReducer);
    const [loading, setLoading] = useState(true);
    const idUser = userLogin?.id;
    let { id } = useParams();
    console.log(id);
    useEffect(() => {
        if (idUser || id) {
            setLoading(true);
            dispatch(getPaymentDetailAction(id))
                .finally(() => setLoading(false));
        }
    }, [idUser, dispatch])
    let { paymentDetail } = useSelector(state => state.PaymentReducer)
    console.log(paymentDetail);
    const handleOrderComfirm = (paymentId, newStatusOrder) => {
        const formData = new FormData();
        formData.append("nameUser", paymentDetail?.nameUser);
        formData.append("addressUser", paymentDetail?.addressUser);
        formData.append("dayOrder", paymentDetail?.dayOrder);
        formData.append("statusOrder", newStatusOrder);
        console.table("nameUser: ", paymentDetail?.nameUser, "addressUser: ", paymentDetail?.addressUser, "idPayment: ", paymentId, "statusOrder: ", newStatusOrder, paymentDetail?.dayOrder);
        dispatch(updateStatusPaymentAction(paymentId, formData));
    };
    if (loading) {
        return <div className="flex justify-center items-center gap-2 dark:bg-gray-900 p-8">
            <RiLoader2Line className="text-primary animate-spin text-4xl" /> <p className="text-lg italic dark:text-gray-200">Loading....</p>
        </div>;
    }

    if (paymentDetail?.length < 0) {
        return <p>Không tìm thấy đơn hàng.</p>;
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <div className="container">
                <div className="py-10">
                    <h1 className="text-lg md:text-2xl font-bold mb-4">Chi tiết đơn hàng</h1>
                    <h4 className="text-xs md:text-base">Đơn hàng #<span className="font-semibold text-xs md:text-base">{getCodeProduct(paymentDetail?.id)}
                    </span> đã được đặt lúc <span className="font-bold text-xs md:text-base">{formatDateTime(paymentDetail.dayOrder)}</span> và hiện tại là
                        <span className="font-bold text-xs md:text-base">
                            {paymentDetail.statusOrder === 0 ? ' Đang xử lý' : paymentDetail.statusOrder === 1 ?
                                <span className="font-bold text-xs md:text-base text-primary"> Chấp nhận</span>
                                : paymentDetail.statusOrder === 2 ?
                                    <span className="font-bold text-xs md:text-base text-green-500"> Bàn giao vận chuyển</span>
                                    : paymentDetail.statusOrder === 3 ?
                                        <span className="font-bold text-xs md:text-base text-blue-500"> Đang vận chuyển</span>
                                        :
                                        <span className="font-bold text-xs md:text-base text-red-500"> Đã giao hàng</span>}
                        </span>.
                    </h4>
                    <h2 className="text-base md:text-xl font-bold mt-4">SẢN PHẨM</h2>
                    <div className="overflow-x-auto w-full block py-2">
                        <table className="table-auto w-full mt-2 border-collapse border border-gray-300 ">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2 text-sm font-semibold sm:text-lg">Tên sản phẩm</th>
                                    <th className="border border-gray-300 px-4 py-2 text-sm font-semibold sm:text-lg">Size</th>
                                    <th className="border border-gray-300 px-4 py-2 text-sm font-semibold sm:text-lg">Màu sắc</th>
                                    <th className="border border-gray-300 px-4 py-2 text-sm font-semibold sm:text-lg">Số lượng</th>
                                    <th className="border border-gray-300 px-4 py-2 text-sm font-semibold sm:text-lg">Giá / Sản phẩm</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentDetail?.orders?.flatMap(order =>
                                    order?.products?.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-4 py-2 text-sm sm:text-lg">{item?.nameProduct}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-sm sm:text-lg">{order?.size?.numberOfSize}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-sm sm:text-lg">{order?.color?.name}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-sm sm:text-lg">{order?.quantityOrder}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-sm sm:text-lg">{handleFormatPrice(item?.priceProduct)} vnd</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 font-bold text-base md:text-lg">Tổng hoá đơn: {handleFormatPrice(paymentDetail?.totalAmountOfOrder)} vnd</p>
                    <p className="text-sm md:text-base  font-semibold">Phương thức thanh toán: Thanh toán khi nhận hàng (COD)</p>
                    <div className="flex flex-col gap-2 sm:gap-1">
                        <h2 className="text-sm md:text-base font-bold mt-4">ĐỊA CHỈ THANH TOÁN</h2>
                        <p className="font-semibold text-xs md:text-base ">Tên Khách Hàng: {paymentDetail?.nameUser}</p>
                        <p className="font-semibold text-xs md:text-base ">Địa Chỉ Khách Hàng: {paymentDetail?.addressUser}</p>
                        <p className="font-semibold text-xs md:text-base ">Số Điện Thoại Khách Hàng: {paymentDetail?.phoneUser}</p>
                        <h4 className="font-semibold text-xs md:text-base">Ghi Chú Sản Phẩm:</h4>
                        <div className="px-2 flex gap-2 py-3 border-2 border-gray-300 dark:border-gray-100 rounded-tr-3xl sm:rounded-tr-[30px] rounded-md w-full sm:w-2/3">
                            <span className="text-xs md:text-base font-semibold italic" dangerouslySetInnerHTML={{ __html: paymentDetail.noteUser }}></span>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            onClick={() => {
                                handleOrderComfirm(paymentDetail?.id, 4)
                            }}
                            disabled={paymentDetail?.statusOrder === 0 || paymentDetail?.statusOrder === 1 || paymentDetail?.statusOrder === 2 || paymentDetail?.statusOrder === 4}
                            className={`px-2 py-1 text-base md:text-lg font-medium rounded-md transition-colors duration-300
        ${paymentDetail?.statusOrder === 0 || paymentDetail?.statusOrder === 1 || paymentDetail?.statusOrder === 2 || paymentDetail?.statusOrder === 4
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-primary/80 text-white hover:bg-primary hover:text-gray-100"} 
    `}
                        >
                            Đã nhận hàng
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
