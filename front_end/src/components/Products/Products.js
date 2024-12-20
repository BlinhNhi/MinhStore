import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa";

import Img1 from '../../assets/top_product/adidas.jpg';
import Img2 from '../../assets/top_product/nike.jpg';
import Img3 from '../../assets/top_product/nike2.jpg';
import Img4 from '../../assets/top_product/nikeJodan.jpg';
import NoImage from "../../assets/no-image.jpeg"

import { useDispatch, useSelector } from "react-redux";
import { getEightCheapProductsAction } from "../../redux_store/actions/ProductAcction";
import { PiSneakerMoveFill } from "react-icons/pi";
import { handleFormatPrice } from "../../utils/format/formatPrice";


const ProductData = [
    {
        id: 1,
        title: 'Women Ethnic',
        rate: 5.0,
        color: 'White',
        aosDelay: "0",
        img: Img1
    },
    {
        id: 2,
        title: 'Women western',
        rate: 4.5,
        color: 'Red',
        aosDelay: "200",
        img: Img2
    },
    {
        id: 3,
        title: 'Goggles',
        rate: 4.7,
        color: 'brown',
        aosDelay: "400",
        img: Img3
    },
    {
        id: 4,
        title: 'Printed T-Shirt',
        rate: 4.4,
        color: 'Yellow',
        aosDelay: "600",
        img: Img4
    },
    {
        id: 5,
        title: 'Fashin T-Shirt',
        rate: 4.5,
        color: 'Pink',
        aosDelay: "800",
        img: Img2
    },
]
function Products() {

    const { arrEightCheapProducts } = useSelector((state) => state.ProductReducer);
    let arrGetNewProduct = arrEightCheapProducts.slice(0, 5);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEightCheapProductsAction());
    }, [dispatch])
    return (
        <div className="mt-14 mb-12 ">
            <div className="container">
                {/* Header */}
                <div className="text-center mb-10 max-w-[600px] mx-auto flex flex-col gap-2">
                    <p className="text-base text-yellow-500">Top 5 Sản Phẩm Rẻ Nhất Dành Cho Bạn</p>
                    <h1 className="text-3xl font-bold">
                        Top 5 Sản Phẩm Rẻ Nhất
                    </h1>
                    <p className="text-sm text-gray-400">Top 5 sản phẩm rẻ nhất dành cho bạn. Nếu thích hãy bấm "Xem Thêm" để có thể xem nhiều sản phẩm</p>
                </div>
                {/* Body */}
                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
                        {arrGetNewProduct.map((data) => (
                            <div
                                key={data?.id}
                                data-aos="fade-up"
                                data-aos-delay={300}
                                className="space-y-3">
                                <img src={JSON.parse(data?.imagesProduct)[0]?.length > 1 ? JSON.parse(data?.imagesProduct)[0] : NoImage} alt={data?.nameProduct} className="h-[220px] w-[150px] object-cover rounded-md"></img>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-semibold">{data?.title}</h3>
                                    <p className="text-sm text-gray-600">{handleFormatPrice(data?.priceProduct)} vnd</p>
                                    <div className="flex items-center gap-1">
                                        <PiSneakerMoveFill className="text-yellow-600 text-lg dark:text-gray-100" />
                                        <span className="text-base">{data?.category?.name}</span>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button className="text-center mt-10 hover:bg-orange-500 cursor-pointer bg-orange-400 text-white py-2 px-3 rounded-md">
                            Xem  Thêm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;