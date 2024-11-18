import { Card, Checkbox } from "antd";
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
    page: 1
};

function FilterProduct({ isFilterOpen, searchNameProduct, searchTypeCategory }) {
    let { arrColor } = useSelector(state => state.ColorReducer);
    let { arrSizes } = useSelector(state => state.SizeReducer);
    const dataNameProduct = searchNameProduct;
    const categoryProduct = searchTypeCategory;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListColorAction())
        dispatch(getListSizesAction())
    }, [dispatch])

    // const handleOnChangeSort = (e) => {
    //     setInput.sort = e.target.value;
    //     if (dataNameProduct !== null) {
    //         setInput.searchName = dataNameProduct;
    //         setInput.searchCategory = "";
    //         dispatch(getProductListOptionsAction(setInput));
    //     } else if (searchTypeCategory != null) {
    //         setInput.searchCategory = categoryProduct;
    //         dispatch(getProductListOptionsAction(setInput));
    //     }
    //     setInput.searchCategory = "";
    //     dispatch(getProductListOptionsAction(setInput));
    // };

    const handleOnChangeColor = (event) => {
        if (event.target.checked && event.target.value !== "undefine") {
            setInput.searchColor += event.target.value + ",";
        } else {
            if (dataNameProduct !== null) {
                setInput.searchName = dataNameProduct;
                setInput.searchCategory = "";
                dispatch(getProductListOptionsAction(setInput));
            } else if (searchTypeCategory != null) {
                setInput.searchCategory = categoryProduct;
                dispatch(getProductListOptionsAction(setInput));
            }
            setInput.searchColor = setInput.searchColor.replace(event.target.value + ",", "");
        }
        dispatch(getProductListOptionsAction(setInput));
    };

    const handleOnChangeSize = (event) => {
        if (event.target.checked && event.target.value !== "undefine") {
            setInput.searchSize += event.target.value + ",";
        } else {
            if (dataNameProduct !== null) {
                setInput.searchName = dataNameProduct;
                setInput.searchCategory = "";
                dispatch(getProductListOptionsAction(setInput));
            } else if (searchTypeCategory !== null) {
                setInput.searchCategory = categoryProduct;
                dispatch(getProductListOptionsAction(setInput));
            }
            setInput.searchSize = setInput.searchSize.replace(event.target.value + ",", "");
        }
        dispatch(getProductListOptionsAction(setInput));
    };

    return (
        <div className={`w-full ${isFilterOpen === true ? 'block' : 'hidden'} md:w-full lg:w-1/4 xl:w-1/4 2xl:w-1/4 sm:block md:block lg:block xl:block 2xl:block px-2`}>

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