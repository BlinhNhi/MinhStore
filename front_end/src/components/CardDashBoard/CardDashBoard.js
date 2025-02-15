import { FaCoins } from "react-icons/fa6";
import { IoBag, IoPeopleCircle } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
import CountUp from 'react-countup';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getListPaymentAction } from "../../redux_store/actions/PaymentAction";
import { getListUserAction } from "../../redux_store/actions/UserAction";
import { getListProductsAction } from "../../redux_store/actions/ProductAcction";


function CardDashBoard() {
    const dispatch = useDispatch();
    let { arrPayments } = useSelector(state => state.PaymentReducer);
    let { arrUser } = useSelector(state => state.UserReducer)
    let { arrProducts } = useSelector(state => state.ProductReducer)

    useEffect(() => {
        dispatch(getListPaymentAction());
        dispatch(getListUserAction());
        dispatch(getListProductsAction());
    }, [dispatch])

    const totalAmount = arrPayments
        ?.filter(order => order.statusOrder === 4)
        ?.reduce((sum, order) => sum + order.totalAmountOfOrder, 0) / 1000;
    const countOrder = arrPayments?.filter(order => order?.statusOrder === 4)?.length;


    const totalProductInStock = arrProducts?.reduce((total, product) => {
        return total + product.numberOfProductInStock;
    }, 0);

    console.log("Tổng số sản phẩm trong kho:", totalProductInStock);

    console.log("Tổng numberOfProductInStock:", totalProductInStock);
    console.log(arrPayments);
    console.log(countOrder);
    console.log(totalAmount);
    console.log(arrProducts);

    return (
        <div>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-2 place-items-start gap-4 mt-4" >
                <div className="bg-gray-300 rounded-md p-2 sm:p-4 md:p-4 lg:p-4 xl:p-4 2xl:p-4 hover:-translate-y-2 duration-500 w-full hover:shadow-md">
                    <div className="flex flex-col gap-2 text-gray-500 px-6 py-2 ">
                        <h2 className="font-medium text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg uppercase text-ellipsis overflow-hidden line-clamp-1">Tổng Thu Nhập</h2>
                        <div className="flex  gap-2">
                            <h1 className="font-bold text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl text-gray-500">
                                $<CountUp end={totalAmount} />k
                            </h1>
                            <div className="p-2 rounded-md bg-green-200 text-2xl"><FaCoins className="text-green-600" /></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-300 rounded-md p-2 sm:p-4 md:p-4 lg:p-4 xl:p-4 2xl:p-4 hover:-translate-y-2 duration-500 w-full hover:shadow-md">
                    <div className="flex flex-col gap-2 text-gray-500 px-6 py-2 ">
                        <h2 className="font-medium text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg uppercase text-ellipsis overflow-hidden line-clamp-1">Đơn Hàng Đã Giao</h2>
                        <div className="flex items-start justify-between">
                            <h1 className="font-bold text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl text-gray-500">
                                <CountUp end={countOrder} />
                            </h1>
                            <div className="p-2 rounded-md bg-blue-200 text-2xl"><IoBag className="text-blue-600" /></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-300 rounded-md p-2 sm:p-4 md:p-4 lg:p-4 xl:p-4 2xl:p-4 hover:-translate-y-2 duration-500 w-full hover:shadow-md">
                    <div className="flex flex-col gap-2 text-gray-500 px-6 py-2 ">
                        <h2 className="font-medium text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg uppercase text-ellipsis overflow-hidden line-clamp-1">Khách Hàng</h2>
                        <div className="flex items-start justify-between">
                            <h1 className="font-bold text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl text-gray-500"><CountUp end={arrUser?.length} /></h1>
                            <div className="p-2 rounded-md bg-yellow-200 text-2xl"><IoPeopleCircle className="text-yellow-600" /></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-300 rounded-md p-2 sm:p-4 md:p-4 lg:p-4 xl:p-4 2xl:p-4 hover:-translate-y-2 duration-500 w-full hover:shadow-md">
                    <div className="flex flex-col gap-2 text-gray-500 px-6 py-2 ">
                        <h2 className="font-medium text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg uppercase text-ellipsis overflow-hidden line-clamp-1">Sản Phẩm Còn Lại</h2>
                        <div className="flex items-start justify-between">
                            <h1 className="font-bold text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl text-gray-500"><CountUp end={totalProductInStock} /> các loại.</h1>
                            <div className="p-2 rounded-md bg-red-200 text-2xl"><FaBoxOpen className="text-red-600" /></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CardDashBoard;