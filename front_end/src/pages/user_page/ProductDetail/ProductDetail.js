import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
    FaStar,
    FaOpencart,
    FaHandPointRight,
    FaTruck,
    FaCoins,
} from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";
import { } from "react-icons/fa";

import ListNewsProducts from "../../../components/ListNewProducts/ListNewsProducts";
import { useDispatch, useSelector } from "react-redux";
import { getDetailProductForUserAction, getEightProductsAction } from "../../../redux_store/actions/ProductAcction";
import { handleFormatPrice } from "../../../utils/format/formatPrice";
import { getCodeProduct } from "../../../utils/format/getCodeProduct";
import { useParams } from "react-router-dom";

function CancelArrowSlider(props) {
    const { style } = props;
    return <div style={{ ...style, display: "none", background: "red" }} />;
}

function ProductDetail(props) {
    let { id } = useParams();
    console.log(id);
    const dispatch = useDispatch();
    const { productDetailForUser } = useSelector((state) => state.ProductReducer);
    const { arrEightProducts } = useSelector((state) => state.ProductReducer);
    const [numberProduct, setNumberProduct] = useState(1);

    console.log(arrEightProducts);

    useEffect(() => {
        dispatch(getDetailProductForUserAction(id));
        dispatch(getEightProductsAction())
    }, [dispatch]);
    let imagesProduct =
        productDetailForUser?.imagesProduct &&
        JSON.parse(productDetailForUser.imagesProduct);
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        appendDots: (dots) => (
            <div>
                <ul className="m-[-16px]"> {dots} </ul>
            </div>
        ),
        customPaging: (i) => (
            <div className="flex gap-2 px-3 text-white hover:bg-primary bg-gray-500 dark:text-gray-500  rounded-md dark:bg-white  dark:hover:bg-primary dark:hover:text-white items-center justify-center ">
                {i + 1}
            </div>
        ),
        nextArrow: <CancelArrowSlider />,
        prevArrow: <CancelArrowSlider />,
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 ">
            <div className="container pt-10">
                <div className="block xl:flex 2xl:flex mb-10 gap-6">
                    <div className="flex items-start flex-col">
                        <div data-aos="fade-up" className="flex items-center">
                            <div
                                className="
                    w-[300px] h-[300px] 
                    sm:w-[500px] sm:h-[350px]  
                    md:w-[500px] md:h-[400px] 
                    lg:w-[600px] lg:h-[500px] 
                    xl:w-[600px] xl:h-[500px] 
                    2xl:w-[700px] 2xl:h-[600px]    
                    block mt-0 xl:mt-9 2xl:mt-9"
                            >
                                <Slider {...settings}>
                                    {imagesProduct?.map((item, key) => {
                                        return (
                                            <div className="" key={key}>
                                                <img
                                                    className="w-full h-[300px] sm:h-[300px] md:h-[350px] lg:h-[450px] xl:h-[450px] 2xl:h-[550px] object-contain"
                                                    src={item}
                                                    alt=""
                                                />
                                            </div>
                                        );
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>

                    <div className=" flex items-start mt-10">
                        <div data-aos="zoom-in" className="flex flex-col gap-1 ">
                            <h2 className="font-bold mt-2 text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl">
                                {productDetailForUser?.nameProduct}
                            </h2>
                            <h3 className="p-0 text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg font-medium">
                                Mã Sản Phẩm: {getCodeProduct(productDetailForUser?.id)}
                            </h3>
                            <h3
                                className="p-0 text-base font-medium
sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg
sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0
"
                            >
                                Giá: {handleFormatPrice(productDetailForUser?.priceProduct)} vnd
                            </h3>
                            <div className="mt-1">
                                <h3
                                    className="
    mt-1
    sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0
    text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg font-medium
    "
                                >
                                    Chọn Màu Giày:{" "}
                                </h3>
                                {/* star */}
                                <div className="flex items-center gap-4 mt-3">
                                    {productDetailForUser?.colors?.map((data, key) => {
                                        return (
                                            <button
                                                key={key}
                                                className="border-2 hover:bg-slate-300 hover:text-white dark:bg-white rounded-md dark:text-gray-600 dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary p-2"
                                            >
                                                {data?.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="mt-1">
                                <h3
                                    className="
    mt-1
    sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0
    text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg font-medium
    "
                                >
                                    Chọn Size Giày:{" "}
                                </h3>
                                {/* star */}
                                <div className="flex items-center gap-4 mt-3">
                                    {productDetailForUser?.sizes?.map((data, key) => {
                                        return (
                                            <button
                                                key={key}
                                                className="border-2 hover:bg-slate-300 hover:text-white dark:bg-white rounded-md dark:text-gray-600 dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary p-2"
                                            >
                                                {data?.numberOfSize}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            <div
                                className="
flex-col
 md:flex-row lg:flex-row xl:flex-row 2xl:flex-row
md:items-center lg:items-center xl:items-center 2xl:items-center
flex items-start mt-3 gap-4 mb-5
"
                            >
                                {/* Button Number of Product */}
                                <div className="flex gap-2 items-center border-4 border-gray-300 bg-gray-50 dark:border-gray-300">
                                    <button
                                        onClick={() => {
                                            setNumberProduct(numberProduct + 1);
                                        }}
                                        className="text-base font-bold
     sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl
     px-3 py-1 dark:bg-gray-100 dark:text-gray-600 border-gray-200 border-r-4 hover:bg-gray-400 dark:hover:bg-gray-400"
                                    >
                                        +
                                    </button>

                                    <p
                                        className="text-base font-medium
     sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl
     py-1 px-14 bg-gray-50 dark:text-gray-600"
                                    >
                                        {numberProduct}
                                    </p>

                                    <button
                                        onClick={() => {
                                            setNumberProduct(numberProduct - 1);
                                        }}
                                        disabled={numberProduct <= 1}
                                        className={`text-base font-bold hover:bg-gray-400 dark:hover:bg-gray-400
            sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl
            px-4 py-1 dark:bg-gray-100 dark:text-gray-600 border-gray-200 border-l-4
            ${numberProduct <= 1
                                                ? "opacity-50 cursor-not-allowed dark:bg-gray-400 dark:text-gray-600 border-l-4 border-gray-300 bg-gray-400"
                                                : ""
                                            }`}
                                    >
                                        -
                                    </button>
                                </div>
                            </div>

                            <div
                                className="
    flex flex-col items-start
    gap-4
    md:gap-3 lg:gap-3 xl:gap-3 2xl:gap-3
      md:flex-row lg:flex-row xl:flex-row 2xl:flex-row
      md:items-center lg:items-center xl:items-center 2xl:items-center
    "
                            >
                                <button
                                    className="
        text-center cursor-pointer bg-orange-400 text-white py-1 px-2 rounded-full text-base
       flex items-center
       md:text-base lg:text-xl xl:text-xl 2xl:text-xl   hover:bg-primary/90 hover:text-gray-100
    "
                                >
                                    <FaOpencart className="mr-2" /> Thêm Vào Giỏ Hàng{" "}
                                </button>
                                <button
                                    className="
            text-center cursor-pointer bg-orange-400 text-white py-1 rounded-full text-base flex items-center
             md:text-base lg:text-xl xl:text-xl 2xl:text-xl  hover:bg-primary/90 hover:text-gray-100
            px-[50px]  md:px-4 lg:px-4 xl:px-4 2xl:px-4
    "
                                >
                                    {" "}
                                    Mua Ngay <FaHandPointRight className="ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Body */}

                <div className="py-4 border-t-2  border-gray-400 w-full lg:w-[50%] xl:w-[50%] 2xl:w-[50%]">
                    <h1 className="font-medium text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base items-center  flex gap-4 mt-4">
                        <FaCoins /> Miễn phí vận chuyển toàn quốc cho đơn hàng trên 1tr.
                    </h1>
                    <h1 className="font-medium text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base items-center  flex gap-4 mt-1">
                        <IoIosFlash /> Giao nhanh 2h trong nội thành HCM.
                    </h1>
                    <h1 className="font-medium text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base items-center  flex gap-4 mt-1">
                        <FaTruck></FaTruck>Thời gian vận chuyển trung bình 3-4 ngày.
                    </h1>
                </div>

                <ListNewsProducts listProducts={arrEightProducts}></ListNewsProducts>
            </div>
        </div>
    );
}

export default ProductDetail;
