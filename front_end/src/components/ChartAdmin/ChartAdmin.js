import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'
import { FaCoins } from "react-icons/fa6";
import { IoBag, IoPeopleCircle } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { getListPaymentAction, getTotalAmountPaymentByYearAction } from '../../redux_store/actions/PaymentAction';
import Item from 'antd/es/list/Item';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

function ChartAdmin() {
    const [isOrderVisible, setOrderVisible] = useState(true);
    const [isRevenueVisible, setRevenueVisible] = useState(true);
    const [isCustomerVisible, setCustomerVisible] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTotalAmountPaymentByYearAction('2025'));
        dispatch(getListPaymentAction());
    }, [dispatch])
    let { monthlyTotalAmountOfOrder } = useSelector(state => state.PaymentReducer);
    let { arrPayments } = useSelector(state => state.PaymentReducer);
    // console.log(arrPayments);
    const totalAmountOfOrdersByMonth = Array(12).fill(0);
    monthlyTotalAmountOfOrder?.forEach(({ month, totalAmount }) => {
        totalAmountOfOrdersByMonth[month - 1] = totalAmount;
    });
    const totalAmount = totalAmountOfOrdersByMonth?.map(item => (item / 1000000).toFixed(1));
    // console.log(totalAmountOfOrdersByMonth);
    // console.log(totalAmount);

    // const amounts = monthlyTotalAmountOfOrder?.map(item => (item.totalAmount / 100000).toFixed(1));
    // console.log(amounts);

    const orderCounts = Array(12).fill(0);

    const filteredOrders = arrPayments?.filter(order => order.statusOrder === 4);
    filteredOrders.forEach(order => {
        const month = new Date(order.dayOrder).getMonth();
        orderCounts[month]++;
    });

    // console.log(orderCounts);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const data = {
        labels: months,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
        datasets: [
            {
                label: "Tổng doanh thu theo tháng / triệu đồng",
                backgroundColor: "rgb(75, 192, 192,0.4)",
                borderColor: "rgb(75, 192, 192,0.9)",
                data: totalAmount,
                hidden: !isOrderVisible,
            },
            // {

            //     label:
            //         "Số Lượng Khách Hàng Theo Tháng",
            //     backgroundColor: "rgb(255, 205, 86)",
            //     borderColor: "rgb(255, 205, 86)",
            //     data: [55, 49, 70, 71, 46, 45, 30, 25, 61, 20, 10, 80, 70],
            //     tension: 0.1,
            //     type: 'line',
            //     hidden: !isCustomerVisible
            // },
            {
                label: "Tổng Đơn Hàng Đã Giao Theo Tháng",
                backgroundColor: "rgb(157, 196, 248)",
                borderColor: "rgb(157, 196, 248)",
                data: orderCounts,
                tension: 0.5,
                type: 'line',
                borderDash: [5, 5],
                hidden: !isRevenueVisible
            },

        ],
    };

    return (
        <div>
            <div>
                <div className='2xl:h-[60] xl:h-[60] lg:h-[60] md:h-[80]   hidden md:block lg:block xl:block 2xl:block'>
                    <Bar data={data} className='' />
                </div>

                <div className='hidden items-center justify-center gap-4 mt-8 md:flex lg:flex xl:flex 2xl:flex'>
                    {!isOrderVisible ?
                        <button className='flex items-center gap-2 p-2 rounded-md bg-green-300 opacity-50' onClick={() => setOrderVisible(!isOrderVisible)}>
                            <p className='text-sm font-normal text-gray-500'>Doanh Thu</p> <IoBag className='text-green-600 text-xs'></IoBag>
                        </button>
                        : <div><button className='flex items-center gap-2 p-2 rounded-md bg-green-300' onClick={() => setOrderVisible(false)}>
                            <p className='text-sm font-bold text-gray-500'>Doanh Thu</p> <IoBag className='text-green-600 text-xs'></IoBag>
                        </button></div>}



                    {!isRevenueVisible ?
                        <button className='flex items-center gap-2 p-2 rounded-md bg-blue-300 opacity-50' onClick={() => setRevenueVisible(!isRevenueVisible)}>
                            <p className='text-sm font-normal text-gray-500'>Đơn Hàng</p> <FaCoins className='text-blue-600 text-xs'></FaCoins>
                        </button>
                        : <div><button className='flex items-center gap-2 p-2 rounded-md bg-blue-300' onClick={() => setRevenueVisible(false)}>
                            <p className='text-sm font-bold text-gray-500'>Đơn Hàng</p> <FaCoins className='text-blue-600 text-xs'></FaCoins>
                        </button></div>}
                </div>
            </div>
        </div>
    );
};




export default ChartAdmin;


// {!isCustomerVisible ?
//     <button className='flex items-center gap-2 p-2 rounded-md bg-yellow-300 opacity-50' onClick={() => setCustomerVisible(!isCustomerVisible)}>
//         <p className='text-sm font-normal text-gray-500'>Doanh Thu</p> <IoPeopleCircle className='text-yellow-600 text-xs'></IoPeopleCircle>
//     </button>
//     : <div><button className='flex items-center gap-2 p-2 rounded-md bg-yellow-300' onClick={() => setCustomerVisible(false)}>
//         <p className='text-sm font-bold text-gray-500'>Khách Hàng</p> <IoPeopleCircle className='text-yellow-600 text-base'></IoPeopleCircle>
//     </button></div>}