import { Modal } from "antd";
import { MdFilterList } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import SelectProduct from "../../../components/SelectProduct/SelectProduct";
import ListProduct from "../../../components/ListProduct/ListProduct";
import FilterProduct from "../../../components/FilterProduct/FilterProduct";
import Pagination from "../../../components/Pagination/Pagination";
import { getProductListOptionsAction, getProductsOfCategoryAction } from "../../../redux_store/actions/ProductAcction";


const setInput = {
    searchName: "",
    searchCategory: "",
    searchColor: "",
    searchSize: "",
    fromPrice: "",
    toPrice: "",
    sort: "",
    dayStart: "",
    page: 1
};
// console.log('test setinput : ', setInput);
function Search(props) {
    const dispatch = useDispatch()
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    let { userLogin } = useSelector(state => state.UserReducer);
    console.log(userLogin);
    let searchParams = new URLSearchParams(props.location.search);
    let searchNameProduct = searchParams.get('searchName');
    let searchTypeCategory = searchParams.get('searchCategory');
    const [valueSortPrice, setValueSortPrice] = useState("");
    const [valueSelectPrice, setValueSelectPrice] = useState("");
    const [valueFilterColor, setValueFilterColor] = useState("");
    const [valueFilterSize, setValueFilterSize] = useState("");
    // console.log('test search name product form search : ', searchNameProduct);
    // console.log('test search category product form search : ', searchTypeCategory);
    const handleValueFromSortPrice = (valueSortPrice) => {
        setValueSortPrice(valueSortPrice);
    };
    const handleValueFromSelectPrice = (valueSelectPrice) => {
        setValueSelectPrice(valueSelectPrice);
        // console.log('test select price : ', valueSelectPrice);
    };
    const handleValueFromFilterColor = (valueFilterColor) => {
        setValueFilterColor(valueFilterColor)
        // console.log('test filter color : ', valueFilterColor);
    }
    const handleValueFromFilterSize = (valueFilterSize) => {
        setValueFilterSize(valueFilterSize)
        // console.log('test filter color : ', valueFilterSize);
    }

    useEffect(() => {
        if (searchNameProduct !== "" && searchNameProduct !== null) {
            setInput.searchName = searchParams.get('searchName')
            setInput.searchCategory = "";
            setInput.searchColor = "";
            setInput.searchSize = "";
            setInput.fromPrice = "";
            setInput.toPrice = "";
            setInput.sort = "";
            setInput.dayStart = "";
            setInput.page = 1;
            dispatch(getProductListOptionsAction(setInput));
        }
        else if (searchTypeCategory !== "" && searchTypeCategory !== null) {
            setInput.searchCategory = searchParams.get('searchCategory')
            // console.log('test input category', setInput);
            dispatch(getProductsOfCategoryAction(setInput));
        }

    }, [dispatch]);
    const showFilter = () => {
        setIsFilterOpen(true);
    };
    const handleFilterCancel = () => {
        setIsFilterOpen(false);
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <div className="container">
                <div className="hidden sm:block ">
                    <SelectProduct
                        searchNameProduct={searchNameProduct}
                        searchTypeCategory={searchTypeCategory}
                        onSendDataSortPrice={handleValueFromSortPrice}
                        onSendDataSelectPrice={handleValueFromSelectPrice}
                        valueFilterColor={valueFilterColor}
                        valueFilterSize={valueFilterSize}
                    ></SelectProduct>
                </div>
                <div className="container relative">
                    <div className="xl:flex lg:flex 2xl:flex flex-row block  flex-wrap py-4">
                        <FilterProduct
                            searchNameProduct={searchNameProduct}
                            searchTypeCategory={searchTypeCategory}
                            valueSortPrice={valueSortPrice}
                            valueSelectPrice={valueSelectPrice}
                            onSendDataFilterColor={handleValueFromFilterColor}
                            onSendDataFilterSize={handleValueFromFilterSize}
                        ></FilterProduct>
                        <button
                            onClick={showFilter}>
                            <div className="fixed right-2 top-[65%]">
                                <MdFilterList className="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden
                                 dark:bg-gray-200 text-3xl rounded-lg bg-gray-700 text-gray-100  
                                dark:text-gray-500 hover:bg-primary/80 dark:hover:bg-primary/90 dark:hover:text-gray-100">
                                </MdFilterList>
                            </div>
                        </button>

                        <Modal title="" open={isFilterOpen} onOk={handleFilterCancel} onCancel={handleFilterCancel}>
                            <SelectProduct
                                searchNameProduct={searchNameProduct}
                                searchTypeCategory={searchTypeCategory}
                                onSendDataSortPrice={handleValueFromSortPrice}
                                onSendDataSelectPrice={handleValueFromSelectPrice}
                                valueFilterColor={valueFilterColor}
                                valueFilterSize={valueFilterSize}
                            ></SelectProduct>
                            <FilterProduct
                                isFilterOpen={isFilterOpen}
                                searchNameProduct={searchNameProduct}
                                searchTypeCategory={searchTypeCategory}
                                valueSortPrice={valueSortPrice}
                                valueSelectPrice={valueSelectPrice}
                                onSendDataFilterColor={handleValueFromFilterColor}
                                onSendDataFilterSize={handleValueFromFilterSize}
                            ></FilterProduct>
                        </Modal>

                        <div className="w-full  pt-1 px-2 md:w-full lg:w-3/4 xl:w-3/4 2xl:w-3/4">
                            <ListProduct></ListProduct>
                            <Pagination
                                searchNameProduct={searchNameProduct}
                                searchTypeCategory={searchTypeCategory}
                                valueSortPrice={valueSortPrice}
                                valueSelectPrice={valueSelectPrice}
                                valueFilterColor={valueFilterColor}
                                valueFilterSize={valueFilterSize}
                            ></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;