import React from "react";
import { PiSneakerMoveFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { FaRegSadTear } from "react-icons/fa";

import NoImage from '../../assets/no-image.jpeg'
import { handleFormatPrice } from "../../utils/format/formatPrice";



function ListProduct() {
    let { arrProducts } = useSelector(state => state.ProductReducer)


    return (
        <div>
            {
                arrProducts?.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 place-items-center gap-2">
                    {arrProducts?.map((data) => (

                        <a key={data?.id} href={`/product-detail/${data?.id}`}>
                            <div
                                data-aos="flip-left"

                            >
                                <div

                                    key={data.id}
                                    className="
                        space-y-4 border-gray-200 border-2 rounded-lg cursor-pointer bg-gray-200 dark:bg-primary/90 
                        hover:translate-y-3 duration-500 dark:hover:border-primary hover:border-gray-300 mt-4">

                                    <img
                                        src={
                                            JSON.parse(data?.imagesProduct)[0]?.length > 0
                                                ? JSON.parse(data?.imagesProduct)[0]
                                                : NoImage
                                        }
                                        alt={data?.nameProduct}
                                        className="
    h-[200px] w-[200px] sm:h-[220px] sm:w-[200px] md:h-[220px] md:w-[200px]
    xl:h-[220px] xl:w-[200px] object-cover rounded-tl-lg rounded-tr-lg
  "
                                    />
                                    <div className="flex flex-col gap-1 ml-2 w-3/4">
                                        <h3 className="font-semibold text-ellipsis overflow-hidden text-base line-clamp-1">{data?.nameProduct}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-100">{handleFormatPrice(data?.priceProduct)} vnd</p>
                                        <div className="flex items-center gap-2">
                                            <PiSneakerMoveFill className="text-yellow-600 text-lg dark:text-gray-100" />
                                            <span className="text-base">{data?.category?.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>

                    ))

                    }
                </div> : <div className="">
                    <div className="flex flex-col gap-1 justify-center items-center bg-primary/40 rounded-md p-2">
                        <span className="text-3xl font-semibold text-gray-400 dark:text-gray-100"><FaRegSadTear /></span>
                        <h1 className="font-bold text-lg dark:text-gray-100 text-gray-400">Opps !!!</h1>
                        <h3 className="font-semibold text-base dark:text-gray-100 text-gray-400">Không Tìm Được Sản Phẩm Theo Yêu Cầu Của Bạn.</h3>
                    </div>
                </div>
            }



        </div>
    );
}

export default ListProduct;


