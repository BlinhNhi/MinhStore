import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { TOKEN } from "../../../utils/variable";
import { getPaymentDetailByUserIdAction } from "../../../redux_store/actions/PaymentAction";
import { RiLoader2Line } from "react-icons/ri";
import { formatDateTime } from "../../../utils/format/formatDateTime";
import { handleFormatPrice } from "../../../utils/format/formatPrice";
function ManagerOrder() {

    let accessToken = {};
    const dispatch = useDispatch();
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN);
    } else {
        window.location.href = '/';
    }
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
    if (loading) {
        return <div className="flex justify-center items-center gap-2 dark:bg-gray-900 p-8">
            <RiLoader2Line className="text-primary animate-spin text-4xl" /> <p className="text-lg italic dark:text-gray-200">Loading....</p>
        </div>;
    }
    return (
        <div className="mt-10">
            <div className="hidden sm:block overflow-x-auto w-full ">
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
                                <td className="px-6 py-6 font-semibold text-base">{item?.statusOrder === 0 ? 'Đang xử lý' : item?.statusOrder === 1 ? 'Chấp Nhận' : 'Đã nhận hàng'}</td>
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

            <div className="sm:hidden w-full">
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
                                    <span className="font-medium">Tổng</span>
                                    <span>{handleFormatPrice(item?.totalAmountOfOrder)}đ cho {item?.orders.length} sản phẩm</span>
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
        </div>
    );
}

export default ManagerOrder;