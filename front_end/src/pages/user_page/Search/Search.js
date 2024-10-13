import { Card, Radio, Checkbox } from "antd";

import SelectProduct from "../../../components/SelectProduct/SelectProduct";
import ListProduct from "../../../components/ListProduct/ListProduct";

function Search() {


    // console.log(ProductData?.length);
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <div className="container">
                <div className="hidden sm:block "><SelectProduct></SelectProduct></div>
                <div className="container">
                    <div className="xl:flex lg:flex 2xl:flex flex-row block  flex-wrap py-4">
                        <div className="w-full hidden md:w-full lg:w-1/4 xl:w-1/4 2xl:w-1/4  md:block lg:block xl:block 2xl:block px-2">
                            <Card className="bg-gray-200" title="Sắp Xếp Theo" onChange={(e) => { }}>
                                <Radio.Group>

                                    <Radio value="lowest-price">Giá Thấp Nhất</Radio>
                                    <Radio value="highest-price">Giá Cao Nhất</Radio>
                                </Radio.Group>
                            </Card>
                            <Card title="Loại Giày" className="mt-3 bg-gray-200">
                                <Checkbox value="Adidas" onChange={() => { }}>Adidas</Checkbox><br />
                                <Checkbox value="Nike" onChange={() => { }}>Nike</Checkbox><br />
                                <Checkbox value="Jordan" onChange={() => { }}>Jordan</Checkbox><br />
                                <Checkbox value="Khác" onChange={() => { }}>Khác...</Checkbox>
                            </Card>
                        </div>

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