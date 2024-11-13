import { Modal } from "antd";
import { MdFilterList } from "react-icons/md";

import SelectProduct from "../../../components/SelectProduct/SelectProduct";
import ListProduct from "../../../components/ListProduct/ListProduct";
import { useEffect, useState } from "react";
import FilterProduct from "../../../components/FilterProduct/FilterProduct";
import { useDispatch, useSelector } from "react-redux";
import { getProductListOptionsAction, getProductsOfCategoryAction } from "../../../redux_store/actions/ProductAcction";
import { history } from "../../../App";

const setInput = {
    searchName: "",
    searchCategory: "",
    searchColor: "",
    searchSize: "",
    fromPrice: "",
    toPrice: "",
    sort: "",
    dayStart: "",
};

function Search(props) {
    const dispatch = useDispatch()
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [childDataCategory, setChildDataCategory] = useState('');
    console.log(childDataCategory);
    const handleChildDataCategory = (data) => {
        console.log(data);
        setChildDataCategory(data);
        setInput.searchCategory = data;
    };
    let searchParams = new URLSearchParams(props.location.search);
    let searchNameProduct = searchParams.get('searchName');
    let searchTypeCategory = searchParams.get('searchCategory');
    console.log(searchTypeCategory);
    console.log(setInput.searchCategory);

    useEffect(() => {
        if (searchNameProduct !== "" && searchNameProduct !== null) {
            setInput.searchName = searchParams.get('searchName')
            dispatch(getProductListOptionsAction(setInput));
        }
        else if (searchTypeCategory !== "" && searchTypeCategory !== null) {
            setInput.searchCategory = searchParams.get('searchCategory')
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
                    <SelectProduct onSendData={handleChildDataCategory}></SelectProduct>
                </div>
                <div className="container relative">
                    <div className="xl:flex lg:flex 2xl:flex flex-row block  flex-wrap py-4">
                        <FilterProduct searchNameProduct={searchNameProduct} searchTypeCategory={searchTypeCategory}></FilterProduct>
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
                            <SelectProduct onSendData={handleChildDataCategory}></SelectProduct>
                            <FilterProduct isFilterOpen={isFilterOpen} searchNameProduct={searchNameProduct} searchTypeCategory={searchTypeCategory}></FilterProduct>
                        </Modal>

                        <div className="w-full  pt-1 px-2 md:w-full lg:w-3/4 xl:w-3/4 2xl:w-3/4">
                            <ListProduct></ListProduct>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;