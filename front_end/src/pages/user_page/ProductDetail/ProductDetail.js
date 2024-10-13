import React, { useState } from "react";
import Slider from "react-slick";
import { FaStar, FaOpencart, FaHandPointRight, FaTruck, FaCoins } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";
import { } from "react-icons/fa";

import Img1 from '../../../assets/top_product/adidas.jpg';
import Img2 from '../../../assets/top_product/nike.jpg';
import Img3 from '../../../assets/top_product/nike2.jpg';
import Img4 from '../../../assets/top_product/nike3.jpg';
import Top5Product from "../../../components/Top5Products/Top5Products";

function CancelArrowSlider(props) {
    const { style } = props;
    return (
        <div
            style={{ ...style, display: "none", background: "red" }}
        />
    );
}

function ProductDetail() {
    const [numberProduct, setNumberProduct] = useState(1);
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        appendDots: dots => (
            <div
            >
                <ul className="m-[-16px]"> {dots} </ul>
            </div>
        ),
        customPaging: i => (
            <div
                className="flex gap-2 px-3 text-white hover:bg-primary bg-gray-500 dark:text-gray-500  rounded-md dark:bg-white  dark:hover:bg-primary dark:hover:text-white items-center justify-center "
            >
                {i + 1}
            </div>
        ),
        nextArrow: <CancelArrowSlider />,
        prevArrow: <CancelArrowSlider />,
    };
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <div className="container pt-10">
                <div className="block xl:flex 2xl:flex ">
                    <div className="flex items-start flex-col">
                        <div
                            data-aos="fade-up"
                            className="flex items-center">
                            <div
                                className="
                    w-[280px] h-[300px] 
                    sm:w-[500px] sm:h-[300px]  
                    md:w-[600px] md:h-[500px] 
                    lg:w-[800px] lg:h-[700px] 
                    xl:w-[800px] xl:h-[700px] 
                    2xl:w-[800px] 2xl:h-[700px]    
                    block mt-0 xl:mt-9 2xl:mt-9">
                                <Slider {...settings}>
                                    <div className="">
                                        <img className="w-full h-[200px] sm:h-[250px] md:h-[400px] lg:h-[600px] xl:md:h-[600px] 2xl:md:h-[600px] object-cover" src={Img1} alt="" />
                                    </div>
                                    <div className="">
                                        <img className="w-full h-[200px] sm:h-[250px] md:h-[400px] lg:h-[600px] xl:md:h-[600px] 2xl:md:h-[600px] object-cover" src={Img2} alt="" />
                                    </div>
                                    <div className="">
                                        <img className="w-full h-[200px] sm:h-[250px] md:h-[400px] lg:h-[600px] xl:md:h-[600px] 2xl:md:h-[600px] object-cover" src={Img3} alt="" />
                                    </div>
                                    <div className="">
                                        <img className="w-full h-[200px] sm:h-[250px] md:h-[400px] lg:h-[600px] xl:md:h-[600px] 2xl:md:h-[600px] object-cover" src={Img4} alt="" />
                                    </div>
                                </Slider>
                            </div>
                        </div>

                        {/* Body */}
                        <div className=" flex items-center ">
                            <div
                                data-aos="zoom-in"
                                className="flex flex-col gap-1 ">
                                <h2 className="font-bold mt-2 text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl">Adidas Samba</h2>
                                <div className="mt-2 p-0">
                                    <div className="w-full flex gap-1 text-base">
                                        <FaStar className="text-yellow-400"></FaStar>
                                        <FaStar className="text-yellow-400"></FaStar>
                                        <FaStar className="text-yellow-400"></FaStar>
                                        <FaStar className="text-yellow-400"></FaStar>
                                        <FaStar className="text-yellow-400"></FaStar>
                                    </div>
                                </div>
                                <h3 className="leading-[0px] p-0 mt-2 text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg font-medium">Mã Sản Phẩm: 001</h3>
                                <h3 className="
                            leading-[0px] p-0 mt-[19px]  text-base font-medium
                            sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg 
                            sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0
                            ">Giá: 1.000.000 đ</h3>
                                <div className="mt-1">
                                    <h3 className="
                                mt-1
                                sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-0
                                text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg font-medium
                                ">Chọn Size Giày: </h3>
                                    {/* star */}
                                    <div className="flex items-center gap-4 mt-3">
                                        <button className="border-2 hover:bg-slate-300 hover:text-white dark:bg-white rounded-md dark:text-gray-600 dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary p-2">31</button>
                                        <button className="border-2 hover:bg-slate-300 hover:text-white dark:bg-white rounded-md dark:text-gray-600 dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary p-2">32</button>
                                        <button className="border-2 hover:bg-slate-300 hover:text-white dark:bg-white rounded-md dark:text-gray-600 dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary p-2">33</button>
                                        <button className="border-2 hover:bg-slate-300 hover:text-white dark:bg-white rounded-md dark:text-gray-600 dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary p-2">34</button>
                                        <button className="border-2 hover:bg-slate-300 hover:text-white dark:bg-white rounded-md dark:text-gray-600 dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary p-2">35</button>
                                    </div>
                                </div>
                                <div className="
                            flex-col
                             md:flex-row lg:flex-row xl:flex-row 2xl:flex-row
                            md:items-center lg:items-center xl:items-center 2xl:items-center
                            flex items-start mt-3 gap-4 mb-5
                            ">
                                    {/* Button Number of Product */}
                                    <div className="flex gap-2 items-center border-4 border-gray-300 bg-gray-50 dark:border-gray-300">
                                        <button
                                            onClick={() => {
                                                setNumberProduct(numberProduct + 1)
                                            }}
                                            className="text-base font-bold
                                 sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl 
                                 px-3 py-2 dark:bg-gray-100 dark:text-gray-600 border-gray-200 border-r-4 hover:bg-gray-400 dark:hover:bg-gray-400">
                                            +
                                        </button>

                                        <p className="text-base font-medium
                                 sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl 
                                 py-2 px-14 bg-gray-50 dark:text-gray-600">{numberProduct}</p>

                                        <button
                                            onClick={() => {
                                                setNumberProduct(numberProduct - 1)
                                            }}
                                            disabled={numberProduct <= 1}
                                            className={`text-base font-bold hover:bg-gray-400 dark:hover:bg-gray-400
                                        sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl 
                                        px-4 py-2 dark:bg-gray-100 dark:text-gray-600 border-gray-200 border-l-4 
                                        ${numberProduct <= 1 ? 'opacity-50 cursor-not-allowed dark:bg-gray-400 dark:text-gray-600 border-l-4 border-gray-300 bg-gray-400' : ''}`}
                                        >
                                            -
                                        </button>
                                    </div>

                                    <div className="
                                flex flex-col items-start
                                gap-4
                                md:gap-3 lg:gap-3 xl:gap-3 2xl:gap-3
                                  md:flex-row lg:flex-row xl:flex-row 2xl:flex-row
                                  md:items-center lg:items-center xl:items-center 2xl:items-center
                                ">
                                        <button className="
                                    text-center cursor-pointer bg-orange-400 text-white py-1 px-4 rounded-full text-base 

                                   md:py-3 lg:py-3 xl:py-3 2xl:py-3 flex items-center
                                   md:text-base lg:text-xl xl:text-xl 2xl:text-xl font-bold  hover:bg-primary/90 hover:text-gray-100
                                "
                                        ><FaOpencart className="mr-2" /> Thêm Vào Giỏ Hàng </button>
                                        <button
                                            className="
                                        text-center cursor-pointer bg-orange-400 text-white py-1 rounded-full text-base flex items-center
                                         md:text-base lg:text-xl xl:text-xl 2xl:text-xl font-bold hover:bg-primary/90 hover:text-gray-100
                                        px-[50px]  md:px-4 lg:px-4 xl:px-4 2xl:px-4 md:py-3 lg:py-3 xl:py-3 2xl:py-3
                                "> Mua Ngay <FaHandPointRight className="ml-2" /></button>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="my-6 border-t-2 border-gray-400 w-full">
                            <h1 className="font-medium text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base items-center  flex gap-4 mt-4"><FaCoins /> Miễn phí vận chuyển toàn quốc cho đơn hàng trên 1tr.</h1>
                            <h1 className="font-medium text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base items-center  flex gap-4 mt-1"><IoIosFlash /> Giao nhanh 2h trong nội thành HCM.</h1>
                            <h1 className="font-medium text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base items-center  flex gap-4 mt-1"><FaTruck></FaTruck>Thời gian vận chuyển trung bình 3-4 ngày.</h1>
                        </div>
                    </div>
                    <Top5Product></Top5Product>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;