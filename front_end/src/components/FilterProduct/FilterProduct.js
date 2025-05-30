import { Card, Checkbox } from "antd";
import { memo, useEffect } from "react";
import { getListColorAction } from "../../redux_store/actions/ColorAction";
import { useDispatch, useSelector } from "react-redux";
import { getListSizesAction } from "../../redux_store/actions/SizeAction";
import { getProductListOptionsAction } from "../../redux_store/actions/ProductAcction";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";

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

function FilterProduct({ isFilterOpen, searchNameProduct, searchTypeCategory, valueSortPrice, valueSelectPrice, onSendDataFilterColor, onSendDataFilterSize }) {
    // console.log('value sort of filter : ', valueSortPrice);
    // console.log('value select of filter : ', valueSelectPrice);
    // console.log('value select of filter : ', searchTypeCategory);
    // console.log('value select of filter : ', searchNameProduct);


    let { arrColor } = useSelector(state => state.ColorReducer);
    let { arrSizes } = useSelector(state => state.SizeReducer);
    const [searchParams] = useSearchParams();
    const dataNameProduct = searchNameProduct;
    const categoryProduct = searchTypeCategory;
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    let entries = searchParams.entries();

    useEffect(() => {
        dispatch(getListColorAction())
        dispatch(getListSizesAction())
    }, [dispatch])

    // hàm dùng để set page lên url
    const append = (entries) => {
        let params = {};
        for (let [key, value] of entries) {
            if (key !== "page") {
                params[key] = value;
            }
        }
        params["page"] = 1; // Thêm `page` vào sau cùng
        return params;
    };

    const handleSetPage = () => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams(append(entries)).toString(),
        });
    };

    const sendDataFilterColor = (value) => {
        const dataColorFilter = value;
        // console.log('data color filter : ', dataColorFilter);
        onSendDataFilterColor(dataColorFilter)
    }

    const sendDataFilterSize = (value) => {
        const dataSizeFilter = value;
        // console.log('data color filter : ', dataSizeFilter);
        onSendDataFilterSize(dataSizeFilter)
    }


    const handleOnChangeColor = (event) => {
        // console.log('data prodct name : ', dataNameProduct);
        // console.log('data prodct cate : ', categoryProduct);
        // console.log('data value filter : ', event.target.value);
        const [from, to] = valueSelectPrice.split('-').map(Number);
        const page = searchParams.get('page');
        if (event.target.checked && event.target.value !== "undefine") {
            setInput.searchName = dataNameProduct || "";
            setInput.searchCategory = categoryProduct || "";
            setInput.fromPrice = from || "";
            setInput.toPrice = to || "";
            setInput.sort = valueSortPrice || "";
            setInput.searchColor += event.target.value + ",";
            setInput.page = +page;
        } else {
            setInput.searchName = dataNameProduct || "";
            setInput.searchCategory = categoryProduct || "";
            setInput.sort = valueSortPrice || "";
            setInput.fromPrice = from || "";
            setInput.toPrice = to || "";
            // console.log('test page from select category: ', page);
            setInput.searchColor = setInput.searchColor.replace(event.target.value + ",", "");
        }
        sendDataFilterColor(setInput.searchColor)
        handleSetPage()
        // console.log("color filter : ", event.target.value + ",");
        // console.log('color has filter : ', setInput.searchColor);
        // console.log('Value  of color filter  : ', setInput);
        dispatch(getProductListOptionsAction(setInput));
    };

    const handleOnChangeSize = (event) => {
        const [from, to] = valueSelectPrice.split('-').map(Number);
        const page = searchParams.get('page');
        if (event.target.checked && event.target.value !== "undefine") {
            setInput.searchName = dataNameProduct || "";
            setInput.searchCategory = categoryProduct || "";
            setInput.fromPrice = from || "";
            setInput.toPrice = to || "";
            setInput.sort = valueSortPrice || "";
            setInput.searchSize += event.target.value + ",";
            setInput.page = +page;
        } else {
            setInput.searchName = dataNameProduct || "";
            setInput.searchCategory = categoryProduct || "";
            setInput.sort = valueSortPrice || "";
            setInput.fromPrice = from || "";
            setInput.toPrice = to || "";
            // console.log('test page from select category: ', page);
            setInput.searchSize = setInput.searchSize.replace(event.target.value + ",", "");
        }
        sendDataFilterSize(setInput.searchSize)
        handleSetPage()
        // console.log("color size : ", event.target.value + ",");
        // console.log('color has size : ', setInput.searchSize);
        // console.log('Value of size filter : ', setInput);
        dispatch(getProductListOptionsAction(setInput));
    };

    return (
        <div key={1} className={`w-full ${isFilterOpen === true ? 'block' : 'hidden'} md:w-full lg:w-1/4 xl:w-1/4 2xl:w-1/4 sm:block md:block lg:block xl:block 2xl:block px-2`}>

            <Card title="Màu Sắc" className="mt-3 bg-gray-200 text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base">
                {arrColor?.map((item) => {
                    return <div key={item?.id}>
                        <Checkbox onChange={(e) => handleOnChangeColor(e)} className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value={item?.name} >{item?.name}</Checkbox><br />
                    </div>
                })}
            </Card>
            <Card title="Size Giày" className="mt-3 bg-gray-200 text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base">
                {arrSizes?.map((item) => {
                    return <div key={item?.id}>
                        <Checkbox onChange={(e) => handleOnChangeSize(e)} className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value={item?.numberOfSize}>{item?.numberOfSize}</Checkbox><br />
                    </div>
                })}
            </Card>
        </div>
    );
}

export default memo(FilterProduct);
