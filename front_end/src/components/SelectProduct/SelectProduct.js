import { Select, } from "antd";
// import { useState } from "react";
import { ImSearch } from "react-icons/im";
const { Option } = Select;

function SelectProduct({ onSendData }) {
    const handleFromChange = (value) => {
        // console.log(value);
        onSendData(value); // Gọi hàm và truyền giá trị lên cha
    };

    return (
        <div className="pt-10 pb-4">
            <div className="container ">
                <form>
                    <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center justify-around gap-4 bg-gray-200 w-100 p-4 rounded-md">
                        <div className="w-40 sm:w-80 md:w-80 lg:w-80 xl:w-80 2xl:w-80    flex flex-col gap-2">
                            <h4 className="text-sm sm:text-sm md:text-lg xl:text-lg 2xl:text-lg italic dark:text-gray-500 font-medium">Chọn Theo Giá</h4>
                            <Select
                                size={"middle"}
                                id="size"
                                style={{ minWidth: '100%' }}
                                showSearch
                                // value={From}
                                placeholder="Tất Cả"
                            // options={ }
                            // onChange={handleFromChange}
                            >
                                <Option value="jack">Dưới 1 Triệu</Option>
                                <Option value="kk">Từ 1 đến 3 triệu</Option>
                                <Option value="kkk">Từ 3 đến 5 triệu</Option>
                                <Option value="lucy">Trên 5 triệu</Option>
                            </Select>
                        </div>
                        <div className="w-40 sm:w-80 md:w-80 lg:w-80 xl:w-80 2xl:w-80  flex flex-col gap-2">
                            <h4 className="text-sm sm:text-sm md:text-lg xl:text-lg 2xl:text-lg italic dark:text-gray-500 font-medium">Chọn Theo Size </h4>
                            <Select
                                size={"middle"}
                                id="size"
                                style={{ minWidth: '100%' }}
                                showSearch
                                // value={From}
                                placeholder="Tất Cả"
                                // options={}
                                onChange={handleFromChange}
                            >
                                <Option value="38">38</Option>
                                <Option value="39">39</Option>
                                <Option value="40">40</Option>
                                <Option value="41">41</Option>
                                <Option value="42">42</Option>
                            </Select>
                        </div>
                        <div className="">
                            <button
                                className="
                                w-40 lg:w-[300px]  xl:w-[300px] 2xl:w-[300px]  md:w-[180px] px-4 sm:w-[140px]  
                                mt-0 lg:mt-8   xl:mt-8  2xl:mt-8   md:mt-8  sm:mt-8 
                                py-2 focus:outline-none  rounded-full font-semibold  flex items-center justify-center gap-3
                             bg-primary/80 text-white hover:bg-primary/60 focus:bg-primary active:bg-primary focus:text-gray-500"
                                type="submit"
                            >
                                <p className="text-xs sm:text-xs md:text-base xl:text-base 2xl:text-base">Tìm Giày Ngay</p>
                                <span><ImSearch className="text-xs sm:text-xs md:text-base xl:text-base 2xl:text-base"></ImSearch></span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SelectProduct;