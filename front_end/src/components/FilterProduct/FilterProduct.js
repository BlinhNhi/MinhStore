import { Card, Radio, Checkbox } from "antd";
import { memo, useEffect } from "react";
import { getListColorAction } from "../../redux_store/actions/ColorAction";
import { useDispatch, useSelector } from "react-redux";
import { getListSizesAction } from "../../redux_store/actions/SizeAction";
import { getProductListOptionsAction } from "../../redux_store/actions/ProductAcction";

const setInput = {
    searchName: "",
    searchCategory: "",
    searchColor: "",
    searchSize: "",
    fromPrice: "",
    toPrice: "",
    sort: "",
    // dayStart: "",
};

function FilterProduct({ isFilterOpen }) {
    let { arrColor } = useSelector(state => state.ColorReducer);
    let { arrSizes } = useSelector(state => state.SizeReducer);
    let { arrProducts } = useSelector(state => state.ProductReducer)
    console.log(arrProducts);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getListColorAction())
        dispatch(getListSizesAction())
    }, [dispatch])

    const handleOnChangeSort = (e) => {
        setInput.sort = e.target.value;
        dispatch(getProductListOptionsAction(setInput));
    };

    const handleOnChangeColor = (event) => {
        if (event.target.checked && event.target.value !== "undefine") {
            setInput.searchColor += event.target.value + ",";
            console.log(setInput.searchColor);
        } else {
            setInput.searchColor = setInput.searchColor.replace(event.target.value + ",", "");
        }
        dispatch(getProductListOptionsAction(setInput));
    };

    const handleOnChangeSize = (event) => {
        if (event.target.checked && event.target.value !== "undefine") {
            setInput.searchSize += event.target.value + ",";
            console.log(setInput.searchSize);
        } else {
            setInput.searchSize = setInput.searchSize.replace(event.target.value + ",", "");
        }
        dispatch(getProductListOptionsAction(setInput));
    };

    return (
        <div className={`w-full ${isFilterOpen === true ? 'block' : 'hidden'} md:w-full lg:w-1/4 xl:w-1/4 2xl:w-1/4 sm:block md:block lg:block xl:block 2xl:block px-2`}>
            <Card className="bg-gray-200 text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" title="Sắp Xếp Theo" onChange={(e) => handleOnChangeSort(e)}>
                <Radio.Group className="flex flex-col gap-2 sm:gap-0 md:gap-0 lg:gap-0 xl:gap-0 2xl:gap-0 ">
                    <Radio key="1" className=" text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="">Tất Cả</Radio>
                    <Radio key="2" className=" text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="lowest-price">Giá Thấp Nhất</Radio>
                    <Radio key="3" className=" text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="highest-price">Giá Cao Nhất</Radio>
                </Radio.Group>
            </Card>
            <Card title="Màu Sắc" className="mt-3 bg-gray-200 text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base">
                {arrColor?.map((item, key) => {
                    return <>
                        <Checkbox key={key} onChange={(e) => handleOnChangeColor(e)} className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value={item?.name} >{item?.name}</Checkbox><br />
                    </>
                })}
            </Card>
            <Card title="Size Giày" className="mt-3 bg-gray-200 text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base">
                {arrSizes?.map((item, key) => {
                    return <>
                        <Checkbox key={key} onChange={(e) => handleOnChangeSize(e)} className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value={item?.numberOfSize}>{item?.numberOfSize}</Checkbox><br />
                    </>
                })}
            </Card>
        </div>
    );
}

export default memo(FilterProduct);