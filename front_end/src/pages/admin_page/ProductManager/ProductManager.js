import React, { useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductAction, getDetailProductAction, getListProductsAction } from '../../../redux_store/actions/ProductAcction';

import NoImage from '../../../assets/no-image.jpeg'

export default function ProductMng() {
    let { arrProducts } = useSelector(state => state.ProductReducer);
    console.log(arrProducts);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListProductsAction())
    }, [dispatch])


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const resetSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0] = '');
        setSearchedColumn(dataIndex);
    };


    const data = arrProducts;

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8, }} onKeyDown={(e) => e.stopPropagation()} >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        className='bg-primary'
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && resetSearch(selectedKeys, confirm, dataIndex)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>

                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text, index) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    key={index}
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'nameProduct',
            key: 'nameProduct',
            width: '5%',
            ...getColumnSearchProps('nameProduct'),
            sorter: (a, b) => a.nameProduct - b.nameProduct,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Giá Sản Phẩm',
            dataIndex: 'priceProduct',
            key: 'priceProduct',
            width: '15%',
            ...getColumnSearchProps('priceProduct'),
            sorter: (a, b) => a.priceProduct - b.priceProduct,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Tổng Sản Phẩm Trong Kho',
            dataIndex: 'stockQuantity',
            key: 'stockQuantity',
            width: '15%',
            ...getColumnSearchProps('stockQuantity'),
            sorter: (a, b) => a.stockQuantity - b.stockQuantity,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Sản Phẩm Đã Bán',
            dataIndex: 'numberOfProductSold',
            key: 'numberOfProductSold',
            width: '15%',
            ...getColumnSearchProps('numberOfProductSold'),
            sorter: (a, b) => a.numberOfProductSold - b.numberOfProductSold,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Sản Phẩm Còn Lại',
            dataIndex: 'numberOfProductInStock',
            key: 'numberOfProductInStock',
            width: '5%',
            ...getColumnSearchProps('numberOfProductInStock'),
            sorter: (a, b) => a.numberOfProductInStock - b.numberOfProductInStock,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: "Hình Ảnh",
            dataIndex: "avatar",
            width: '15%',
            key: "avatar",
            render: (text, data, index) => {
                const image = JSON.parse(data?.imagesProduct);
                return data?.imagesProduct != null ? (
                    <div className='flex flex-col  items-center gap-1'>
                        <img
                            // style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%", }}
                            className=' w-[50px] object-contain  rounded-lg border-solid border-gray-300 flex items-center h-[50px]'
                            src={image[0]}
                            alt="..." />
                        <p className='text-xl font-semibold '>... </p>

                    </div>
                ) : <div className='flex flex-col items-center'><img key={index} src={NoImage} alt='no-image' className='w-[50px] h-[50px] object-cover border-2 rounded-lg' /></div>
                // data?.imagesProduct?.length > 1
                //     ?
                //     JSON.parse(data?.imagesProduct)?.map((image, i) => {
                //         console.log(image);
                //         return (
                //             <div className='' key={i}>
                //                 <img
                //                     key={i}
                //                     style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%", }}
                //                     // className=' w-[100%] object-cover  rounded-lg border-solid border-gray-300 flex items-center h-[700px]'
                //                     src={image[0]}
                //                     alt="..." />

                //             </div>
                //         )
                //     }
                //     ) :
                //     <img 
                //     className=' w-[100%] object-cover  rounded-lg border-solid border-gray-300 flex items-center h-[700px]' 
                //     src="/img/placeholder-image.jpg" alt="..." />

                // return data.avatar != null ? (
                //     <img key={index} style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%", }} src={`$/Images/User/${data.avatar}`} alt={data.avatar} />
                // ) : (
                //    
                // );
            },
        },
        {
            title: 'Danh Mục',
            dataIndex: 'category',
            key: 'category',
            width: '10%',
            ...getColumnSearchProps('category'),
            sortDirections: ['descend', 'ascend'],
            render: (text, category) => {
                return <p>{category?.category?.name}</p>
            },
        },
        {
            title: 'Màu Sắc',
            dataIndex: 'colors',
            key: 'colors',
            width: '10%',
            ...getColumnSearchProps('colors'),
            sortDirections: ['descend', 'ascend'],
            render: (text, colors) => {
                return colors.colors.map((item, index) => {
                    return <p className='border text-center mb-1 rounded-md' key={index}>{item.name}</p>
                })
            },
        },
        {
            title: 'Số Size',
            dataIndex: 'sizes',
            key: 'sizes',
            width: '10%',
            ...getColumnSearchProps('sizes'),
            sortDirections: ['descend', 'ascend'],
            render: (text, sizes) => {
                return sizes.sizes.map((item, index) => {
                    return <p className='border text-center mb-1 rounded-md' key={index}>{item.numberOfSize}</p>
                })
            },
        },
        {
            title: 'Manage',
            width: '10%',
            render: (text, pro) => {
                return <>
                    <Button key={1} href={`/admin/product-mng/edit/${pro.id}`} type="link" icon={<EditOutlined />} onClick={() => {
                        dispatch(getDetailProductAction(pro.id))
                    }}></Button>
                    <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
                        if (window.confirm('Bạn Muốn Xoá Sản Phẩm : ' + pro.nameProduct + '?')) {
                            dispatch(deleteProductAction(pro.id))
                        }
                    }}></Button>
                </>

            }
        },
    ]
    return (
        <div className="text-gray-800 dark:text-gray-200">
            <div className='d-flex mb-4'>
                <h3 className='text-lg font-bold'>Quản Lý Sản Phẩm</h3>
                <Button href='/admin/product-mng/add-product' type="primary" className='ml-3 mt-3 small bg-blue-600'>+ Thêm Sản Phẩm</Button>
            </div>
            <Table columns={columns} dataSource={data} rowKey={'id'} scroll={{ x: 1000 }} />
        </div>
    )

}
