import { Card, Radio, Checkbox } from "antd";


function FilterProduct({ isFilterOpen }) {
    // console.log(isFilterOpen);
    return (
        <div className={`w-full ${isFilterOpen === true ? 'block' : 'hidden'} md:w-full lg:w-1/4 xl:w-1/4 2xl:w-1/4 sm:block md:block lg:block xl:block 2xl:block px-2`}>
            <Card className="bg-gray-200 text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" title="Sắp Xếp Theo" onChange={(e) => { }}>
                <Radio.Group className="flex flex-col gap-2 sm:gap-0 md:gap-0 lg:gap-0 xl:gap-0 2xl:gap-0 ">
                    <Radio className=" text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="lowest-price">Giá Thấp Nhất</Radio>
                    <Radio className=" text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="highest-price">Giá Cao Nhất</Radio>
                </Radio.Group>
            </Card>
            <Card title="Loại Giày" className="mt-3 bg-gray-200 text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base">
                <Checkbox className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="Adidas" onChange={() => { }}>Adidas</Checkbox><br />
                <Checkbox className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="Nike" onChange={() => { }}>Nike</Checkbox><br />
                <Checkbox className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="Jordan" onChange={() => { }}>Jordan</Checkbox><br />
                <Checkbox className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="Khác" onChange={() => { }}>Khác...</Checkbox>
            </Card>
        </div>
    );
}

export default FilterProduct;