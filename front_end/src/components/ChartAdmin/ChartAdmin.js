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

import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2'
import { FaCoins } from "react-icons/fa6";
import { IoBag, IoPeopleCircle } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";

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


    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const data = {
        labels: months,
        datasets: [
            {
                label: "Tổng Doanh Thu Theo Tháng",
                backgroundColor: "rgb(75, 192, 192,0.4)",
                borderColor: "rgb(75, 192, 192,0.9)",
                data: [65, 59, 80, 81, 56, 55, 40, 55, 71, 40, 20, 90, 80],
                hidden: !isOrderVisible,
            },
            {

                label:
                    "Số Lượng Khách Hàng Theo Tháng",
                backgroundColor: "rgb(255, 205, 86)",
                borderColor: "rgb(255, 205, 86)",
                data: [55, 49, 70, 71, 46, 45, 30, 25, 61, 20, 10, 80, 70],
                tension: 0.1,
                type: 'line',
                hidden: !isCustomerVisible
            },
            {
                label: "Tổng Đơn Hàng Theo Tháng",
                backgroundColor: "rgb(157, 196, 248)",
                borderColor: "rgb(157, 196, 248)",
                data: [55, 39, 60, 81, 16, 35, 50, 45, 71, 80, 20, 10, 60],
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
                <Bar height={100} data={data} />
                <div className='flex items-center justify-center gap-4 mt-8'>
                    {!isOrderVisible ?
                        <button className='flex items-center gap-2 p-2 rounded-md bg-green-300 opacity-50' onClick={() => setOrderVisible(!isOrderVisible)}>
                            <p className='text-sm font-normal text-gray-500'>Doanh Thu</p> <IoBag className='text-green-600 text-xs'></IoBag>
                        </button>
                        : <div><button className='flex items-center gap-2 p-2 rounded-md bg-green-300' onClick={() => setOrderVisible(false)}>
                            <p className='text-sm font-bold text-gray-500'>Doanh Thu</p> <IoBag className='text-green-600 text-xs'></IoBag>
                        </button></div>}

                    {!isCustomerVisible ?
                        <button className='flex items-center gap-2 p-2 rounded-md bg-yellow-300 opacity-50' onClick={() => setCustomerVisible(!isCustomerVisible)}>
                            <p className='text-sm font-normal text-gray-500'>Doanh Thu</p> <IoPeopleCircle className='text-yellow-600 text-xs'></IoPeopleCircle>
                        </button>
                        : <div><button className='flex items-center gap-2 p-2 rounded-md bg-yellow-300' onClick={() => setCustomerVisible(false)}>
                            <p className='text-sm font-bold text-gray-500'>Khách Hàng</p> <IoPeopleCircle className='text-yellow-600 text-base'></IoPeopleCircle>
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