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
} from 'chart.js';

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { FaCoins } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyCountOrderAction, getTotalAmountPaymentByYearAction } from '../../redux_store/actions/PaymentAction';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function ChartAdmin() {
    const [isOrderVisible, setOrderVisible] = useState(true);
    const [isRevenueVisible, setRevenueVisible] = useState(true);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");

    const dispatch = useDispatch();
    useEffect(() => {
        const handleStorageChange = () => {
            setIsDarkMode(localStorage.getItem("theme") === "dark");
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);
    useEffect(() => {
        dispatch(getTotalAmountPaymentByYearAction(selectedYear.toString()));
        dispatch(getMonthlyCountOrderAction(selectedYear.toString()));
    }, [dispatch, selectedYear]);


    let { monthlyTotalAmountOfOrder } = useSelector(state => state.PaymentReducer);
    let { monthlyCountOrders } = useSelector(state => state.PaymentReducer);

    const totalAmountOfOrdersByMonth = Array(12).fill(0);
    monthlyTotalAmountOfOrder?.forEach(({ month, totalAmount }) => {
        totalAmountOfOrdersByMonth[month - 1] = totalAmount;
    });
    const orderCounts = Array(12).fill(0);
    monthlyCountOrders?.forEach(({ month, orderCount }) => {
        orderCounts[month - 1] = orderCount;
    });
    const totalAmount = totalAmountOfOrdersByMonth?.map(item => (item / 1000000).toFixed(3));
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // const data = {
    //     labels: months,
    //     options: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         plugins: {
    //             legend: {
    //                 labels: {
    //                     color: isDarkMode ? "#fff" : "#000", // Chữ của chú thích
    //                 },
    //             },
    //         },
    //         scales: {
    //             x: {
    //                 ticks: {
    //                     color: isDarkMode ? "#fff" : "#000",
    //                 },
    //                 grid: {
    //                     color: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
    //                 },
    //             },
    //             y: {
    //                 ticks: {
    //                     color: isDarkMode ? "#fff" : "#000",
    //                 },
    //                 grid: {
    //                     color: isDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)",
    //                 },
    //             },
    //         },
    //     },
    //     datasets: [
    //         {
    //             label: "Tổng doanh thu theo tháng / triệu đồng",
    //             backgroundColor: "rgb(75, 192, 192,0.4)",
    //             borderColor: "rgb(75, 192, 192,0.9)",
    //             data: totalAmount || [],
    //             hidden: !isOrderVisible,
    //         },
    //         {
    //             label: "Tổng Đơn Hàng Đã Giao Theo Tháng",
    //             backgroundColor: "rgb(157, 196, 248)",
    //             borderColor: "rgb(157, 196, 248)",
    //             data: orderCounts || [],
    //             tension: 0.5,
    //             type: 'line',
    //             borderDash: [5, 5],
    //             hidden: !isRevenueVisible
    //         },
    //     ],
    // };
    const data = {
        labels: months,
        datasets: [
            {
                label: "Tổng doanh thu theo tháng / triệu đồng",
                backgroundColor: "rgb(75, 192, 192,0.4)",
                borderColor: "rgb(75, 192, 192,0.9)",
                data: totalAmount || [],
                hidden: !isOrderVisible,
            },
            {
                label: "Tổng Đơn Hàng Đã Giao Theo Tháng",
                backgroundColor: "rgb(157, 196, 248)",
                borderColor: "rgb(157, 196, 248)",
                data: orderCounts || [],
                tension: 0.5,
                type: 'line',
                borderDash: [5, 5],
                hidden: !isRevenueVisible
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: isDarkMode ? "#A9A9A9" : "#999",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: isDarkMode ? "#A9A9A9" : "#999",
                },
                grid: {
                    color: isDarkMode ? "#D3D3D3" : "rgba(0,0,0,0.1)",
                },
            },
            y: {
                ticks: {
                    color: isDarkMode ? "#A9A9A9" : "#999",
                },
                grid: {
                    color: isDarkMode ? "#D3D3D3" : "rgba(0,0,0,0.1)",
                },
            },
        },
    };
    return (
        <div className='hidden sm:block'>
            <div className="mb-4">
                <label className="mr-2 text-sm text-gray-600 dark:text-gray-100 font-semibold">Xem thống kê của từng tháng doanh thu và đơn hàng theo năm:</label>
                <select
                    className="p-2 border rounded-md bg-white dark:bg-gray-500 outline-none dark:text-gray-100"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <div className='2xl:h-[60] xl:h-[60] lg:h-[60] md:h-[80] hidden md:block lg:block xl:block 2xl:block'>
                <Bar data={data} options={options} />
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
    );
};

export default ChartAdmin;
