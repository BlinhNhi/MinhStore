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
            <Card title="Màu Sắc" className="mt-3 bg-gray-200 text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base">
                <Checkbox className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="Adidas" onChange={() => { }}>Vàng</Checkbox><br />
                <Checkbox className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="Nike" onChange={() => { }}>Cam</Checkbox><br />
                <Checkbox className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="Jordan" onChange={() => { }}>Đỏ</Checkbox><br />
                <Checkbox className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="Khác" onChange={() => { }}>Tím</Checkbox>
            </Card>
            <Card title="Size Giày" className="mt-3 bg-gray-200 text-base sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base">
                <Checkbox className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="Adidas" onChange={() => { }}>38</Checkbox><br />
                <Checkbox className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="Nike" onChange={() => { }}>39</Checkbox><br />
                <Checkbox className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="Jordan" onChange={() => { }}>40</Checkbox><br />
                <Checkbox className="text-xs sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base" value="Khác" onChange={() => { }}>41</Checkbox>
            </Card>
        </div>
    );
}

export default FilterProduct;