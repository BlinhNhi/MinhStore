import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Pagination } from 'antd';

import Img1 from '../../assets/top_product/adidas.jpg';
import Img2 from '../../assets/top_product/nike.jpg';
import Img3 from '../../assets/top_product/nike2.jpg';
import Img4 from '../../assets/top_product/nike3.jpg';

function ListProduct() {

    const ProductData = [
        {
            id: 1,
            title: 'Women Ethnic',
            rate: 5.0,
            color: 'White',
            aosDelay: "0",
            img: Img1,
            price: 100
        },
        {
            id: 2,
            title: 'Women western',
            rate: 4.5,
            color: 'Red',
            aosDelay: "200",
            img: Img2,
            price: 200
        },
        {
            id: 3,
            title: 'Goggles',
            rate: 4.7,
            color: 'brown',
            aosDelay: "400",
            img: Img3,
            price: 300
        },
        {
            id: 4,
            title: 'Printed T-Shirt',
            rate: 4.4,
            color: 'Yellow',
            aosDelay: "600",
            img: Img4,
            price: 100
        },
        {
            id: 5,
            title: 'Fashin T-Shirt',
            rate: 4.5,
            color: 'Pink',
            aosDelay: "800",
            img: Img2,
            price: 300
        },
        {
            id: 6,
            title: 'Women Ethnic',
            rate: 5.0,
            color: 'White',
            aosDelay: "0",
            img: Img1,
            price: 500
        },
        {
            id: 7,
            title: 'Women western',
            rate: 4.5,
            color: 'Red',
            aosDelay: "200",
            img: Img2,
            price: 400
        },
        {
            id: 8,
            title: 'Goggles',
            rate: 4.7,
            color: 'brown',
            aosDelay: "400",
            img: Img3,
            price: 600
        },
        {
            id: 9,
            title: 'Printed T-Shirt',
            rate: 4.4,
            color: 'Yellow',
            aosDelay: "600",
            img: Img4,
            price: 200
        },
        {
            id: 10,
            title: 'Fashin T-Shirt',
            rate: 4.5,
            color: 'Pink',
            aosDelay: "800",
            img: Img2,
            price: 300
        },
    ]

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const reverseArrProduct = ProductData.slice().reverse();
    const currentProduct = reverseArrProduct.slice(
        indexOfFirstPost,
        indexOfLastPost
    );


    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 place-items-center gap-2">
                {currentProduct.map((data) => (
                    <div
                        data-aos="flip-left"
                    >
                        <div
                            key={data.id}
                            className="
                        space-y-4 border-gray-200 border-2 rounded-lg cursor-pointer bg-gray-200 dark:bg-primary/90 
                        hover:translate-y-3 duration-500 dark:hover:border-primary hover:border-gray-300 mt-4">

                            <img src={data.img} alt={data?.title} className="
                        
                        h-[129px] w-[129px] sm:h-[220px] sm:w-[200px] md:h-[220px] md:w-[300px] 
                        xl:h-[220px] xl:w-[200px] 2xl:h-[220px] 2xl:w-[200px]
                        object-cover rounded-tl-lg rounded-tr-lg"></img>
                            <div className="flex flex-col gap-1 ml-2">
                                <h3 className="font-semibold text-ellipsis overflow-hidden text-base line-clamp-1">{data?.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-100">{data?.color}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-100">{data?.price} $</p>

                                <div className="flex items-center gap-1">
                                    <FaStar className="text-yellow-400" />
                                    <span className="">{data?.rate}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>

            <div className="mt-10">
                <div>
                    <Pagination
                        className='d-flex justify-center line-clamp-3 mb-20'
                        pageSize={8}
                        currentPage={1}
                        total={ProductData.length}
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