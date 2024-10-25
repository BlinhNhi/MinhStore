import { Button, Input, Space, Table } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import Img1 from '../../../assets/top_product/adidas.jpg';
import Img2 from '../../../assets/top_product/nike.jpg';
import Img3 from '../../../assets/top_product/nike2.jpg';
import Img4 from '../../../assets/top_product/nike3.jpg';
function ProductManager() {
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
            width: '15%',
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
        {
            title: 'Manage',
            width: '1q0%',
            render: (text, item) => {
                return <>
                    <Button key={1} href={`/admin/newsmng/edit/${item.id}`} type="link" icon={<EditOutlined />} onClick={() => {
                    }}></Button>
                    <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
                        if (window.confirm('Do you want to delete News ' + item.id + '?')) {
                            // dispatch(deleteNewsAction(item.id))
                        }
                    }}></Button>
                </>

            }
        },
    ];

    return (
        <div className="text-gray-800 dark:text-gray-200">
            <div className='d-flex mb-4'>
                <h3 className='text-lg'>Quản Lý Sản Phẩm</h3>
                <Button href='/admin/newsmng/addnews' type="primary" className='ml-3 mt-3 small bg-blue-600'>+ Thêm Sản Phẩm</Button>
            </div>
            <Table columns={columnsOrder} dataSource={dataOrder} rowKey={'id'} scroll={{ x: 1000 }} />
        </div>
    );
}

export default ProductManager;