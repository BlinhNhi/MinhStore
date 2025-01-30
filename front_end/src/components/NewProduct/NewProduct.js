import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import NoImage from "../../assets/no-image.jpeg"
import { getEightProductsAction } from "../../redux_store/actions/ProductAcction";
import { handleFormatPrice } from "../../utils/format/formatPrice";
import { NavLink } from "react-router-dom";

function NewProduct() {

    const dispatch = useDispatch();
    const { arrEightProducts } = useSelector((state) => state.ProductReducer);
    useEffect(() => {
        dispatch(getEightProductsAction())
    }, [dispatch])
    let arrGetNewProduct = arrEightProducts.slice(0, 3);
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-20 md:gap-20 place-items-center">
                    {arrGetNewProduct.map((data, i) => (
                        <div
                            key={data?.id}
                            data-aos="zoom-in"
                            className="rounded-2xl mt-4 dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl  group max-w-[300px]">
                            <div className="h-[120px] w-[300px]">
                                <img
                                    src={JSON.parse(data?.imagesProduct)[0]?.length > 0 ? JSON.parse(data?.imagesProduct)[0] : NoImage}
                                    alt={data?.nameProduct}
                                    className="w-[200px] rounded-md max-h-[200px]  block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                                ></img>
                            </div>
                            {/* detail section */}
                            <div className="p-4">
                                <h1 className="text-xl font-bold">
                                    {data?.nameProduct}
                                </h1>
                                <p className="text-gray-500 group-hover:text-white duration-300 text-base line-clamp-2">{handleFormatPrice(data?.priceProduct)} vnd</p>
                                <NavLink to={`/product-detail/${data?.id}`}>
                                    <button className="bg-orange-400 hover:scale-105 duration-300 text-gray-100 py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-orange-400">Đặt Hàng Ngay</button>
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewProduct;