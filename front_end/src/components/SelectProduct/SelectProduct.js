import { Select, } from "antd";
import { ImSearch } from "react-icons/im";
const { Option } = Select;

function SelectProduct() {
    return (
        <div className="pt-10 pb-4">
            <div className="container ">
                <form>
                    <div className="flex items-center justify-around gap-4 bg-gray-200 w-100 p-4 rounded-md">
                        <div className="w-80 flex flex-col gap-2">
                            <h4 className="sm:text-sm md:text-lg xl:text-lg 2xl:text-lg italic dark:text-gray-500 font-medium">Chọn Theo Giá</h4>
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
                                <Option value="jack">Từ 1 đến 3 triệu</Option>
                                <Option value="lucy">Từ 3 đến 5 triệu</Option>
                                <Option value="lucy">Trên 5 triệu</Option>
                            </Select>
                        </div>
                        <div className="w-80 flex flex-col gap-2">
                            <h4 className="text-lg sm:text-sm md:text-lg xl:text-lg 2xl:text-lg italic dark:text-gray-500 font-medium">Chọn Theo Size </h4>
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
                                <Option value="jack">38</Option>
                                <Option value="jack">39</Option>
                                <Option value="jack">40</Option>
                                <Option value="jack">41</Option>
                                <Option value="jack">42</Option>

                            </Select>
                        </div>
                        <div className="">
                            <button
                                className="
                            w-[300px] md:w-[180px] px-4 sm:w-[140px]  py-2 focus:outline-none mt-8  rounded-full font-semibold  flex items-center justify-center gap-3
                             bg-primary/80 text-white hover:bg-primary/60 focus:bg-primary active:bg-primary focus:text-gray-500"
                                type="submit"
                            >
                                <p className="text-base sm:text-xs md:text-base xl:text-base 2xl:text-base">Tìm Giày Ngay</p>
                                <span><ImSearch className="text-base sm:text-xs md:text-base xl:text-base 2xl:text-base"></ImSearch></span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SelectProduct;