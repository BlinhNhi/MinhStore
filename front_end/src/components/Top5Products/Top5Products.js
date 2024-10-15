import { FaStar } from "react-icons/fa";
import Img1 from '../../assets/top_product/adidas.jpg';

function Top5Product() {
    return (
        <div
            data-aos="fade-up"
            className="ml-20  hover:cursor-pointer w-[400px] flex-col  gap-4 hidden xl:flex 2xl:flex 
    ">
            <h1 className="font-bold text-xl">Top 5 Sản Phẩm Mới Nhất</h1>
            <div className="
            border-[3px] dark:border-gray-100 dark:hover:border-primary border-gray-400 hover:border-gray-500 rounded-md  mt-2 
            hover:translate-y-2 duration-500
            ">
                <div className="flex items-center  gap-2 mr-10">
                    <img src={Img1} alt="" className="w-[150px]  h-[150px] object-contain "></img>
                    <div className="flex flex-col gap-4  ml-6">
                        <h3 className="font-semibold text-[18px] text-ellipsis overflow-hidden line-clamp-1">Adidas Samba Adidas </h3>
                        <p className="text-base">Giá: 1.000.000đ</p>
                        <div className="w-full flex gap-1 text-base">
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                        </div>
                    </div>
                </div>
            </div>
            <div className="
            hover:translate-y-2 duration-500
            border-[3px] dark:border-gray-100 dark:hover:border-primary border-gray-400 hover:border-gray-500 rounded-md  mt-2 ">
                <div className="flex items-center  gap-2 mr-10">
                    <img src={Img1} alt="" className="w-[150px]  h-[150px] object-contain "></img>
                    <div className="flex flex-col gap-4  ml-6">
                        <h3 className="font-semibold text-[18px] text-ellipsis overflow-hidden line-clamp-1">Adidas Samba Adidas </h3>
                        <p className="text-base">Giá: 1.000.000đ</p>
                        <div className="w-full flex gap-1 text-base">
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                        </div>
                    </div>
                </div>
            </div>
            <div className="
            hover:translate-y-2 duration-500
            border-[3px] dark:border-gray-100 dark:hover:border-primary border-gray-400 hover:border-gray-500 rounded-md  mt-2 ">
                <div className="flex items-center  gap-2 mr-10">
                    <img src={Img1} alt="" className="w-[150px]  h-[150px] object-contain "></img>
                    <div className="flex flex-col gap-4  ml-6">
                        <h3 className="font-semibold text-[18px] text-ellipsis overflow-hidden line-clamp-1">Adidas Samba Adidas </h3>
                        <p className="text-base">Giá: 1.000.000đ</p>
                        <div className="w-full flex gap-1 text-base">
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                        </div>
                    </div>
                </div>
            </div>
            <div className="
            hover:translate-y-2 duration-500
            border-[3px] dark:border-gray-100 dark:hover:border-primary border-gray-400 hover:border-gray-500 rounded-md  mt-2 ">
                <div className="flex items-center  gap-2 mr-10">
                    <img src={Img1} alt="" className="w-[150px]  h-[150px] object-contain "></img>
                    <div className="flex flex-col gap-4  ml-6">
                        <h3 className="font-semibold text-[18px] text-ellipsis overflow-hidden line-clamp-1">Adidas Samba Adidas </h3>
                        <p className="text-base">Giá: 1.000.000đ</p>
                        <div className="w-full flex gap-1 text-base">
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                        </div>
                    </div>
                </div>
            </div>
            <div className="
            hover:translate-y-2 duration-500
            border-[3px] dark:border-gray-100 dark:hover:border-primary border-gray-400 hover:border-gray-500 rounded-md  mt-2 ">
                <div className="flex items-center  gap-2 mr-10">
                    <img src={Img1} alt="" className="w-[150px]  h-[150px] object-contain "></img>
                    <div className="flex flex-col  gap-4  ml-6">
                        <h3 className="font-semibold text-[18px] text-ellipsis overflow-hidden line-clamp-1">Adidas Samba Adidas </h3>
                        <p className="text-base">Giá: 1.000.000đ</p>
                        <div className="w-full flex gap-1 text-base">
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                            <FaStar className="text-yellow-400"></FaStar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Top5Product;