import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Pagination } from 'antd';
import { useSelector } from "react-redux";
import { FaRegSadTear } from "react-icons/fa";

import NoImage from '../../assets/no-image.jpeg'


function ListProduct() {
    let { arrProducts } = useSelector(state => state.ProductReducer)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const reverseArrProduct = arrProducts.slice().reverse();
    const currentProduct = reverseArrProduct.slice(
        indexOfFirstPost,
        indexOfLastPost
    );

    return (
        <div>
            {
                currentProduct?.length > 0 ? <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 place-items-center gap-2">
                    {currentProduct?.map((data) => (

                        <div
                            data-aos="flip-left"
                        >
                            <div

                                key={data.id}
                                className="
                        space-y-4 border-gray-200 border-2 rounded-lg cursor-pointer bg-gray-200 dark:bg-primary/90 
                        hover:translate-y-3 duration-500 dark:hover:border-primary hover:border-gray-300 mt-4">

                                <img src={JSON.parse(data?.imagesProduct)[0]?.length > 0 ? JSON.parse(data?.imagesProduct)[0] : NoImage} alt={data?.nameProduct} className="
                        
                        h-[129px] w-[129px] sm:h-[220px] sm:w-[200px] md:h-[220px] md:w-[300px] 
                        xl:h-[220px] xl:w-[200px] 2xl:h-[220px] 2xl:w-[200px]
                        object-fill rounded-tl-lg rounded-tr-lg"></img>
                                <div className="flex flex-col gap-1 ml-2">
                                    <h3 className="font-semibold text-ellipsis overflow-hidden text-base line-clamp-1">{data?.nameProduct}</h3>
                                    <div className="flex items-center gap-1">
                                        {data?.colors?.map((color, index) => (
                                            <p className="text-sm text-gray-600 dark:text-gray-100">{color?.name}</p>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {data?.sizes?.map((size, index) => (
                                            <p className="text-sm text-gray-600 dark:text-gray-100">{size?.numberOfSize}</p>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-100">{data?.priceProduct} vnd</p>

                                    <div className="flex items-center gap-1">
                                        <FaStar className="text-yellow-400" />
                                        <span className="">{data?.category?.name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))

                    }
                </div> : <div className="">
                    <div className="flex flex-col gap-1 justify-center items-center bg-primary/40 rounded-md p-2">
                        <span className="text-3xl font-semibold text-gray-400 dark:text-gray-100"><FaRegSadTear /></span>
                        <h3 className="font-semibold text-base dark:text-gray-100 text-gray-400">Không Tìm Được Sản Phẩm Theo Yêu Cầu Của Bạn.</h3>
                    </div>
                </div>
            }


            <div className="mt-10">
                <div>
                    <Pagination
                        className='d-flex justify-center line-clamp-3 mb-20'
                        pageSize={8}
                        currentPage={1}
                        total={arrProducts?.length}
                        onChange={(page) => {
                            setCurrentPage(page);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ListProduct;


