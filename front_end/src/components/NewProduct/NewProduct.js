import { FaStar } from "react-icons/fa";

import { ProductsData } from '../../utils/data/dataNewProduct'

function NewProduct() {
    return (
        <div>
            <div className="container ">
                <div className="text-left mb-28 flex flex-col gap-2">
                    <p className="text-base text-yellow-500" data-aos="fade-up">Top Sản Phẩm Mới Nhất Dành Cho Bạn</p>
                    <h1 className="text-3xl font-bold" data-aos="fade-up">
                        Sản Phẩm Mới Nhất
                    </h1>
                    <p className="text-sm text-gray-400" data-aos="fade-up">Top sản phẩm mới nhất dành cho bạn. Nếu thích hãy bấm "Đặt Hàng Ngay" để đặt hàng.</p>
                </div>
                {/* Body */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
                    {ProductsData.map((data) => (
                        <div
                            key={data?.id}
                            data-aos="zoom-in"
                            className="rounded-2xl mt-4 dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[300px]">
                            <div className="h-[120px]">
                                <img
                                    src={data?.img}
                                    alt={data?.description}
                                    className="max-w-[250px] rounded-md max-h-[200px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                                ></img>
                            </div>
                            {/* detail section */}
                            <div className="p-4">
                                <div className="w-full flex items-center justify-center gap-1">
                                    <FaStar className="text-yellow-400"></FaStar>
                                    <FaStar className="text-yellow-400"></FaStar>
                                    <FaStar className="text-yellow-400"></FaStar>
                                    <FaStar className="text-yellow-400"></FaStar>
                                    <FaStar className="text-yellow-400"></FaStar>
                                </div>
                                <h1 className="text-xl font-bold">
                                    {data?.title}
                                </h1>
                                <p className="text-gray-500 group-hover:text-white duration-300 text-base line-clamp-2">{data?.description}</p>
                                <button className="bg-orange-400 hover:scale-105 duration-300 text-gray-100 py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-orange-400">Đặt Hàng Ngay</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewProduct;