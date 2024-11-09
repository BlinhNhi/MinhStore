import { Modal } from "antd";
import { MdFilterList } from "react-icons/md";

import SelectProduct from "../../../components/SelectProduct/SelectProduct";
import ListProduct from "../../../components/ListProduct/ListProduct";
import { useState } from "react";
import FilterProduct from "../../../components/FilterProduct/FilterProduct";

function Search() {
    // const number = 5;
    // const formattedNumber = Intl.NumberFormat().format(number);
    // console.log(formattedNumber);  

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [childData, setChildData] = useState('');
    console.log(childData);
    const handleChildData = (data) => {
        console.log(data);
        setChildData(data);
    };

    const showFilter = () => {
        // console.log('show');
        // console.log(isFilterOpen);
        setIsFilterOpen(true);
    };
    //   const handleOk = () => {
    //     setIsFilterOpen(false);
    //   };
    const handleFilterCancel = () => {
        setIsFilterOpen(false);
    };
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <div className="container">
                <div className="hidden sm:block ">
                    <SelectProduct></SelectProduct>
                </div>
                <div className="container relative">
                    <div className="xl:flex lg:flex 2xl:flex flex-row block  flex-wrap py-4">
                        <FilterProduct></FilterProduct>
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
                            <SelectProduct onSendData={handleChildData}></SelectProduct>
                            <FilterProduct isFilterOpen={isFilterOpen} ></FilterProduct>
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