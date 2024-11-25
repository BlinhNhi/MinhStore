import { useDispatch } from "react-redux";
import { Select, } from "antd";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { getProductListOptionsAction } from "../../redux_store/actions/ProductAcction";
const { Option } = Select;

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

function SelectProduct({ searchNameProduct, searchTypeCategory, onSendDataSortPrice, onSendDataSelectPrice, valueFilterColor }) {
    const dispatch = useDispatch();
    const dataNameProduct = searchNameProduct;
    console.log("filter color of select product : ", valueFilterColor);
    const categoryProduct = searchTypeCategory;
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation()
    let entries = searchParams.entries();

    // gọi hàm chuuyển giá trị sắp xếp của price ra ngoài component search để truyền vào pagination
    const sendDataPriceToSearch = (value) => {
        const data = value
        onSendDataSortPrice(data);
    };

    const sendDataSelectPriceToSearch = (value) => {
        const dataSelect = value;
        onSendDataSelectPrice(dataSelect)
    }

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

    const handleChangePrice = (value) => {
        const [from, to] = value.split('-').map(Number);
        sendDataSelectPriceToSearch(value)
        setInput.searchCategory = searchTypeCategory || "";
        setInput.searchName = searchNameProduct || "";
        setInput.fromPrice = from;
        setInput.toPrice = to;
        setInput.searchColor = valueFilterColor || ""
        handleSetPage()
        console.log('test set input from handleChangePrice : ', setInput);
        dispatch(getProductListOptionsAction(setInput));
    }



    const handleChangeSort = (value) => {
        const pageParams = searchParams.get('page');
        sendDataPriceToSearch(value)
        setInput.sort = value;
        if (searchTypeCategory != null) {
            console.log('fun cate run');
            setInput.searchCategory = categoryProduct;
            setInput.searchColor = valueFilterColor || ""
            handleSetPage()
            console.log('test setInput', setInput);
            dispatch(getProductListOptionsAction(setInput));
        }
        else if (searchNameProduct != null) {
            console.log('fun name run');
            setInput.searchName = dataNameProduct;
            setInput.searchColor = valueFilterColor || ""
            console.log("Name : ", setInput.searchName);
            handleSetPage()
            console.log('test setInput', setInput);
            console.log('test page from select name: ', pageParams);
            dispatch(getProductListOptionsAction(setInput));
        }

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
                                placeholder="Tất Cả"
                                onChange={handleChangePrice}
                            >
                                <Option value="0-900000000">Tất Cả</Option>
                                <Option value="0-1000000">Dưới 1 Triệu</Option>
                                <Option value="1000000-3000000">Từ 1 đến 3 triệu</Option>
                                <Option value="3000000-5000000">Từ 3 đến 5 triệu</Option>
                                <Option value="5000000-900000000">Trên 5 triệu</Option>
                            </Select>
                        </div>
                        <div className="w-40 sm:w-80 md:w-80 lg:w-80 xl:w-80 2xl:w-80  flex flex-col gap-2">
                            <h4 className="text-sm sm:text-sm md:text-lg xl:text-lg 2xl:text-lg italic dark:text-gray-500 font-medium">Sắp Xếp Theo </h4>
                            <Select
                                size={"middle"}
                                id="size"
                                style={{ minWidth: '100%' }}
                                showSearch
                                placeholder="Sắp Xếp Theo...."
                                onChange={handleChangeSort}
                            >
                                <Option value="highest-price">Giá Cao Đến Thấp</Option>
                                <Option value="lowest-price">Giá Thấp Đến Cao</Option>
                            </Select>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default SelectProduct;