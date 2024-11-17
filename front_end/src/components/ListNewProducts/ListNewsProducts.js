import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import { PiSneakerMoveFill } from "react-icons/pi";

import NoImage from '../../assets/no-image.jpeg';
import { handleFormatPrice } from "../../utils/format/formatPrice";



function ListNewsProducts(listProducts) {
    const data = listProducts
    let listEightProduct = data.listProducts;
    console.log(listEightProduct);

    function SampleArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "orange",
                    color: "white",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)",
                }}
                onClick={onClick}
            />
        );
    }
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        nextArrow: <SampleArrow />,
        prevArrow: <SampleArrow />,
        appendDots: dots => (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "6px"
                }}
            >
                {dots}
            </div>
        ),
        customPaging: i => (
            <div
                style={{
                    width: "30px",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "orange",
                    justifyContent: "center",
                }}
            >
                {i + 1}
            </div>
        ),
        responsive: [
            {
                breakpoint: 1280, // Đối với màn hình <= 1280px
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div
            data-aos="fade-up"
            className="pb-16 mt-10"
            key={1}
        >
            <h1 className="font-bold text-2xl">Top Sản Phẩm Mới Nhất</h1>
            <div className="slider-container">
                <Slider {...settings}>
                    {listEightProduct?.map((data, i) => (
                        <div className="px-10 py-8">
                            <NavLink to={`/product-detail/${data?.id}`}>
                                <div className=" border-4 border-gray-300 hover:border-gray-400  hover:dark:border-primary hover:cursor-pointer rounded-md  hover:translate-y-2 duration-500">
                                    <div className="flex flex-col dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white duration-300 shadow-xl gap-2">
                                        <img src={JSON.parse(data?.imagesProduct)[0]?.length > 0 ? JSON.parse(data?.imagesProduct)[0] : NoImage} alt={data?.nameProduct} className="w-full object-cover h-[300px]  xl:h-[250px] 2xl:h-[300px]"></img>
                                        <div className="flex flex-col gap-1 text-left pl-2 ">
                                            <h3 className="font-medium text-lg text-[18px] text-ellipsis overflow-hidden line-clamp-1">{data?.nameProduct}</h3>
                                            <p className="text-base ">{handleFormatPrice(data?.priceProduct)} vnd</p>
                                            <div className="flex items-center gap-2">
                                                <PiSneakerMoveFill className="text-primary text-lg dark:text-gray-100" />
                                                <span className="text-base">{data?.category?.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ListNewsProducts;