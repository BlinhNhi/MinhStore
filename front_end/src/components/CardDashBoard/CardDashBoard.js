import { FaCoins } from "react-icons/fa6";
import { IoBag, IoPeopleCircle } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
import CountUp from 'react-countup';

function CardDashBoard() {
    return (
        <div>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-2 place-items-start gap-2 mt-4" >
                <div className="bg-gray-300 rounded-md p-4 hover:-translate-y-2 duration-500 w-full hover:shadow-md">
                    <div className="flex flex-col gap-4 text-gray-500 px-6 py-2 ">
                        <h2 className="font-medium text-lg uppercase text-ellipsis overflow-hidden line-clamp-2">Tổng Thu Nhập</h2>
                        <div className="flex items-start justify-between">
                            <h1 className="font-semibold text-3xl text-gray-400">
                                $<CountUp end={550.25} />k
                            </h1>
                            <div className="p-2 rounded-md bg-green-200 text-2xl"><FaCoins className="text-green-600" /></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-300 rounded-md p-4 hover:-translate-y-2 duration-500 w-full hover:shadow-md">
                    <div className="flex flex-col gap-4 text-gray-500 px-6 py-2 ">
                        <h2 className="font-medium text-lg uppercase text-ellipsis overflow-hidden line-clamp-2">Đơn Hàng</h2>
                        <div className="flex items-start justify-between">
                            <h1 className="font-semibold text-3xl text-gray-400">
                                <CountUp end={10} />
                            </h1>
                            <div className="p-2 rounded-md bg-blue-200 text-2xl"><IoBag className="text-blue-600" /></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-300 rounded-md p-4 hover:-translate-y-2 duration-500 w-full hover:shadow-md">
                    <div className="flex flex-col gap-4 text-gray-500 px-6 py-2 ">
                        <h2 className="font-medium text-lg uppercase text-ellipsis overflow-hidden line-clamp-2">Khách Hàng</h2>
                        <div className="flex items-start justify-between">
                            <h1 className="font-semibold text-3xl text-gray-400"><CountUp end={330} /></h1>
                            <div className="p-2 rounded-md bg-yellow-200 text-2xl"><IoPeopleCircle className="text-yellow-600" /></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-300 rounded-md p-4 hover:-translate-y-2 duration-500 w-full hover:shadow-md">
                    <div className="flex flex-col gap-4 text-gray-500 px-6 py-2 ">
                        <h2 className="font-medium text-lg uppercase text-ellipsis overflow-hidden line-clamp-1">Sản Phẩm Còn Lại</h2>
                        <div className="flex items-start justify-between">
                            <h1 className="font-semibold text-3xl text-gray-400"><CountUp end={100} /></h1>
                            <div className="p-2 rounded-md bg-red-200 text-2xl"><FaBoxOpen className="text-red-600" /></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CardDashBoard;