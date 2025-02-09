import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RiLoader2Line } from "react-icons/ri";

import { getPaymentDetailByUserIdAction } from "../../../redux_store/actions/PaymentAction";
import { formatDateTime } from "../../../utils/format/formatDateTime";
import { handleFormatPrice } from "../../../utils/format/formatPrice";
function ManagerOrder() {
    const dispatch = useDispatch();
    let { userLogin } = useSelector(state => state.UserReducer);
    const [loading, setLoading] = useState(true);
    const idUser = userLogin?.id;

    useEffect(() => {
        if (idUser) {
            setLoading(true);
            dispatch(getPaymentDetailByUserIdAction(idUser))
                .finally(() => setLoading(false));
        }
    }, [idUser, dispatch])
    let { paymentDetailByUserId } = useSelector(state => state.PaymentReducer)
    console.log(paymentDetailByUserId);
    console.log(paymentDetailByUserId?.length);

    if (loading) {
        return <div className="flex justify-center items-center gap-2 dark:bg-gray-900 p-8">
            <RiLoader2Line className="text-primary animate-spin text-4xl" /> <p className="text-lg italic dark:text-gray-200">Loading....</p>
        </div>;
    }
    return (
        <div className="">
            <h2 className="font-semibold text-lg text-gray-600 dark:text-gray-100">Quản lý đơn hàng</h2>
            <h2 className="font-bold text-base text-gray-500 dark:text-primary italic">
                Lưu ý: Vui lòng kiểm tra đơn hàng, nếu có sai sót hãy liên hệ
                với chúng tôi qua số điện thoại: <a href="tel:0917023265">0917023265</a>, nếu không có vấn đề đơn hàng của bạn sẽ bị xoá sau 2 tháng. Cảm ơn vì sự hợp tác của bạn.
            </h2>

            {paymentDetailByUserId?.length <= 0 ? <h2 className="font-bold text-gray-500 text-lg text-center mt-3 dark:text-primary">Không có đơn hàng.</h2> : <div>
                <div className="hidden sm:block overflow-x-auto w-full mt-2">
                    <table className="table-auto w-full items-center">
                        <thead className="text-center ">
                            <tr>
                                <th className="px-6 py-6 align-middle border-2 border-gray-400  border-solid text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold">Ngày</th>
                                <th className="px-6 py-6 align-middle border-2 border-gray-400  border-solid text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold">Trạng thái</th>
                                <th className="px-6 py-6 align-middle border-2 border-gray-400  border-solid text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold">Tổng</th>
                                <th className="px-6 py-6 align-middle border-2 border-gray-400  border-solid text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-bold">Các thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="text-center ">
                            {paymentDetailByUserId?.map((item, i) => {
                                console.log();
                                return <tr>
                                    {/* {formatDateTime(item?.orderDate)} */}
                                    <td className="px-6 py-6">{formatDateTime(item?.dayOrder)}</td>
                                    <td className="px-6 py-6 font-semibold text-base">
                                        <span className="font-bold text-xs md:text-base">
                                            {item?.statusOrder === 0 ? ' Đang xử lý' : item?.statusOrder === 1 ?
                                                <span className="font-bold text-xs md:text-base text-primary"> Chấp nhận</span>
                                                : item?.statusOrder === 2 ?
                                                    <span className="font-bold text-xs md:text-base text-green-500"> Bàn giao vận chuyển</span>
                                                    : item?.statusOrder === 3 ?
                                                        <span className="font-bold text-xs md:text-base text-blue-500"> Đang vận chuyển</span>
                                                        :
                                                        <span className="font-bold text-xs md:text-base text-red-500"> Đã giao hàng</span>}
                                        </span>.
                                        {/* {item?.statusOrder === 0 ? 'Đang xử lý' : item?.statusOrder === 1 ? 'Chấp Nhận' : item?.statusOrder === 1 ? 'Đã nhận hàng' : ""} */}
                                    </td>
                                    <td className="px-6 py-6 flex  md:flex-col lg:flex-col xl:flex-row 2xl:flex-row gap-1"><p className="font-semibold text-base">{handleFormatPrice(item?.totalAmountOfOrder)}đ</p> cho <p className="font-semibold text-base">{item?.orders.length} sản phẩm</p></td>
                                    <td><NavLink
                                        to={`/orderDetail/${item?.id}`}
                                    >
                                        <button
                                            className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-200 dark:hover:bg-primary dark:text-gray-500 dark:hover:text-gray-100 text-white px-4 py-2 rounded-md font-medium">
                                            Xem Thêm...
                                        </button>
                                    </NavLink></td>
                                </tr>
                            })}

                        </tbody>
                    </table>


                </div>

                <div className="sm:hidden w-full mt-4">
                    <div className="border-2 border-gray-400 rounded-md p-4 mb-4">
                        {paymentDetailByUserId?.map((item, i) => {
                            return (
                                <div className={`${i !== 0 ? "border-t-2 mt-2" : ""} p-2 flex flex-col gap-2`}>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium">Ngày</span>
                                        <span>{formatDateTime(item?.dayOrder)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium">Trạng thái</span>
                                        <span>{item?.statusOrder === 0 ? 'Đang xử lý' : item?.statusOrder === 1 ? 'Chấp Nhận' : 'Đã nhận hàng'}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium">Tổng: </span>
                                        <span className="ml-2">{handleFormatPrice(item?.totalAmountOfOrder)}đ cho {item?.orders.length} sản phẩm</span>
                                    </div>
                                    <div className="flex justify-end">
                                        <NavLink to={`/orderDetail/${item?.id}`}>
                                            <button className="bg-gray-500 hover:bg-gray-600 dark:bg-gray-200 dark:hover:bg-primary dark:text-gray-500 dark:hover:text-gray-100 text-white px-2 py-1 rounded-md font-normal">
                                                Xem Thêm...
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>}


        </div>
    );
}

export default ManagerOrder;