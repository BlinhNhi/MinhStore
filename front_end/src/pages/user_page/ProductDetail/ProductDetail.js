import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import {
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
import { addCartAction } from "../../../redux_store/actions/OrderAction";
import { notification } from "antd";
import ModalAddProductIntoCart from "../../../components/ModalAddProductIntoCart/ModalAddProductIntoCart";
import Comment from "../../../components/Comment/Comment";

function CancelArrowSlider(props) {
    const { style } = props;
    return <div style={{ ...style, display: "none", background: "red" }} />;
}

function ProductDetail(props) {
    console.log('re-render');
    let { id } = useParams();
    let { userLogin } = useSelector((state) => state.UserReducer);
    const dispatch = useDispatch();
    const { productDetailForUser } = useSelector((state) => state.ProductReducer);
    const { arrEightProducts } = useSelector((state) => state.ProductReducer);
    const idUser = userLogin?.id;

    useEffect(() => {
        console.log('re-render useEffect');
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

    const [numberProduct, setNumberProduct] = useState(1);
    const [savedIdSize, setSavedIdSize] = useState(0);
    const [savedIdColor, setSavedIdColor] = useState(0);
    const [savedPrice, setSavePrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChangeQuantity = (type) => {
        let newNumberProduct;
        if (type === 'increase') {
            newNumberProduct = numberProduct + 1;
        } else if (type === 'decrease' && numberProduct > 1) {
            newNumberProduct = numberProduct - 1;
        }
        const newPriceProduct = newNumberProduct * (productDetailForUser?.priceProduct);
        setNumberProduct(newNumberProduct);
        setSavePrice(newPriceProduct);
    };

    const handleModal = (params) => {
        console.log(params);
        setIsModalOpen(params);
    };


    const handleBuyProduct = (urlPage) => {
        if (!idUser || !savedIdSize || !savedIdColor || !numberProduct || !productDetailForUser?.priceProduct) {
            notification.error({
                closeIcon: true,
                message: 'Lỗi',
                description: (
                    <>Chọn các tùy chọn cho sản phẩm trước khi cho sản phẩm vào giỏ hàng của bạn. !.</>
                ),
            });
        }
        else if (productDetailForUser?.numberOfProductInStock < numberProduct) {
            console.log('handle Now render');
            notification.error({
                closeIcon: true,
                message: 'Xin lỗi',
                description: (
                    <>Chúng tôi chỉ còn  {productDetailForUser?.numberOfProductInStock} sản phẩm.</>
                ),
            });
        }
        else {
            const formData = new FormData();
            formData.append("UserId", idUser);
            formData.append("ProductId", id);
            formData.append("QuantityOrder", numberProduct);
            formData.append("TotalAmount", savedPrice || productDetailForUser?.priceProduct);
            formData.append("SizeId", savedIdSize);
            formData.append("ColorId", savedIdColor);
            dispatch(addCartAction(formData));
            if (urlPage) window.location.href = urlPage;
            else handleModal(true);
        }
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
                                <div className="flex items-center gap-4 mt-3 flex-wrap">
                                    {productDetailForUser?.colors?.map((data, key) => {
                                        return (
                                            <button
                                                onClick={() => {
                                                    setSavedIdColor(data?.id);
                                                }}
                                                className={`border-2 p-2 rounded-md 
                                                ${savedIdColor === data?.id
                                                        ? "bg-slate-300 text-white border-slate-400"
                                                        : "hover:bg-slate-300 hover:text-white dark:bg-white dark:text-gray-600 dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary"
                                                    }`}
                                                key={key}

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
                                <div className="flex items-center gap-4 mt-3 flex-wrap ">
                                    {productDetailForUser?.sizes?.map((data, key) => {
                                        return (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    setSavedIdSize(data?.id);

                                                }}
                                                className={`border-2 p-2 rounded-md 
                                                    ${savedIdSize === data?.id
                                                        ? "bg-slate-300 text-white border-slate-400"
                                                        : "hover:bg-slate-300 hover:text-white dark:bg-white dark:text-gray-600 dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary"
                                                    }`}
                                            >
                                                {data?.numberOfSize}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {productDetailForUser?.numberOfProductInStock < 1 ? <h2 className="mt-2 font-bold text-gray-600 dark:text-gray-100 text-lg">Sản phẩm này đã hết hàng.</h2> : <div>
                                <div
                                    className="
flex-col
 md:flex-row lg:flex-row xl:flex-row 2xl:flex-row
md:items-center lg:items-center xl:items-center 2xl:items-center
flex items-start mt-3 gap-4 mb-5
"
                                >
                                    <div className="flex gap-2 items-center border-4 border-gray-300 bg-gray-50 dark:border-gray-300">
                                        <button
                                            onClick={() => {
                                                setNumberProduct(numberProduct + 1);
                                                handleChangeQuantity('increase');
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
                                                handleChangeQuantity('decrease');
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
                                        onClick={() => {
                                            handleBuyProduct();
                                        }}
                                        className="
        text-center cursor-pointer bg-orange-400 text-white py-1 px-2 rounded-full text-base
       flex items-center
       md:text-base lg:text-xl xl:text-xl 2xl:text-xl   hover:bg-primary/90 hover:text-gray-100
    "
                                    >
                                        <FaOpencart className="mr-2" /> Thêm Vào Giỏ Hàng{" "}
                                    </button>
                                    <button
                                        onClick={() => { handleBuyProduct('/system-account/cart-shopping') }}
                                        className="
            text-center cursor-pointer bg-orange-400 text-white py-1 rounded-full text-base flex items-center
             md:text-base lg:text-xl xl:text-xl 2xl:text-xl  hover:bg-primary/90 hover:text-gray-100
            px-[50px]  md:px-4 lg:px-4 xl:px-4 2xl:px-4
    "
                                    >
                                        Mua Ngay <FaHandPointRight className="ml-2" />
                                    </button>
                                </div>
                            </div>}

                        </div>
                    </div>
                    <ModalAddProductIntoCart
                        isOpen={isModalOpen}
                        onClose={() => { handleModal(false) }}
                        nameProduct={productDetailForUser?.nameProduct}
                    />
                </div>
                {/* Body */}

                <div className="py-4 border-t-2  border-gray-400 w-full lg:w-[50%] xl:w-[50%] 2xl:w-[50%]">
                    <h1 className="font-medium text-lg sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg items-center  flex gap-4 ">
                        <FaCoins /> Miễn phí vận chuyển toàn quốc cho đơn hàng trên 1tr.
                    </h1>
                    <h1 className="font-medium text-lg sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg items-center  flex gap-4 mt-1">
                        <IoIosFlash /> Giao nhanh 2h trong nội thành HCM.
                    </h1>
                    <h1 className="font-medium text-lg sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg items-center  flex gap-4 mt-1">
                        <FaTruck></FaTruck>Thời gian vận chuyển trung bình 3-4 ngày.
                    </h1>
                </div>
                <Comment productId={id} userId={idUser} />
                <ListNewsProducts listProducts={arrEightProducts}></ListNewsProducts>
            </div>
        </div>
    );
}

export default ProductDetail;
