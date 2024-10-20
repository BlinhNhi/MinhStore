import { Table } from 'antd';
import Img1 from '../../assets/top_product/adidas.jpg';
import Img2 from '../../assets/top_product/nike.jpg';
import Img3 from '../../assets/top_product/nike2.jpg';
import Img4 from '../../assets/top_product/nike3.jpg';

function TableAdmin() {
    const dataUser = [
        {
            key: '1',
            name: 'Mike',
            phoneNumber: "0902981321",
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            phoneNumber: "0902981312",
            address: '10 Downing Street',
        },
    ];


    const columnsUser = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
    ];


    const dataOrder = [
        {
            key: '1',
            name: 'Women Ethnic',
            price: "1.000.000đ",
            size: '42',
            color: 'white',
            productSold: 3,
            numberProduct: 10,
            inventory: 7,
            image: Img1
        },
        {
            key: '2',
            name: 'Women western',
            price: "2.000.000đ",
            size: '38',
            color: 'red',
            productSold: 3,
            numberProduct: 9,
            inventory: 6,
            image: Img2
        },
        {
            key: '3',
            name: 'Goggles',
            price: "1.200.000đ",
            size: '39',
            color: 'brown',
            productSold: 4,
            numberProduct: 10,
            inventory: 6,
            image: Img3
        },
        {
            key: '4',
            name: 'Printed T-Shirt',
            price: "2.500.000đ",
            size: '40',
            color: 'Yellow',
            productSold: 0,
            numberProduct: 5,
            inventory: 5,
            image: Img4
        },
    ];


    const columnsOrder = [
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá Tiền',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Số Giày',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Màu Sắc',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Số Lượng Sản Phẩm',
            dataIndex: 'numberProduct',
            width: '15%',
            key: 'numberProduct',
        },
        {
            title: 'Sản Phẩm Đã Bán',
            dataIndex: 'productSold',
            width: '15%',
            key: 'productSold',
        },
        {
            title: 'Sản Phẩm Còn Lại',
            dataIndex: 'inventory',
            width: '15%',
            key: 'inventory',
        },
        {
            title: "Hình Ảnh",
            dataIndex: "image",
            key: "image",
            render: (text, data, index) => {
                console.log(data);
                return data.image != "null" && data.image != null ? (
                    <img key={index} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: "20%", }}
                        src={data?.image}
                        alt={data.avatar}
                    />
                ) : (
                    <div>Không Có Hình Ảnh</div>
                );
            },
        },
    ];


    return (
        <div className='mt-10'>
            <div className='flex items-start gap-6'>
                <div className='flex flex-col gap-4 w-1/2'>
                    <h2 className='font-semibold text-gray-400 text-base'>Quản Lý Khách Hàng</h2>
                    <Table columns={columnsUser} dataSource={dataUser} rowKey={'id'} />
                </div>

                <div className='flex flex-col gap-4'>
                    <h2 className='font-semibold text-gray-400 text-base'>Quản Lý Đơn Hàng</h2>
                    <Table columns={columnsOrder} dataSource={dataOrder} rowKey={'id'} />
                </div>
            </div>
        </div>
    );
}

export default TableAdmin;