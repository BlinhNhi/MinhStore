import React, { useEffect } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { getListSizesAction, deleteSizeAction, getSizeDetailAction } from '../../../redux_store/actions/SizeAction';



export default function SizeMng() {
    let { arrSizes } = useSelector(state => state.SizeReducer);
    console.log(arrSizes);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListSizesAction())
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


    const data = arrSizes;

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
            title: 'Số Thứ Tự',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Kích Thước',
            dataIndex: 'numberOfSize',
            key: 'numberOfSize',
            width: '20%',
            ...getColumnSearchProps('numberOfSize'),
            sorter: (a, b) => a.numberOfSize - b.numberOfSize,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Quản Lý',
            width: '15%',
            render: (text, si) => {
                return <>
                    <Button key={1} href={`/admin/sizes-mng/edit/${si.id}`} type="link" icon={<EditOutlined />} onClick={() => {
                        dispatch(getSizeDetailAction(si.id))
                    }}></Button>
                    <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
                        if (window.confirm('Bạn Muốn Xoá Kích Thước : ' + si.numberOfSize + '?')) {
                            dispatch(deleteSizeAction(si.id))
                        }
                    }}></Button>
                </>

            }
        },
    ]
    return (
        <div className="text-gray-800 dark:text-gray-200">
            <div className='d-flex mb-4'>
                <h3 className='text-lg font-bold'>Quản Lý Kích Thước</h3>
                <Button href='/admin/sizes-mng/addsize' type="primary" className='ml-3 mt-3 small bg-blue-600'>+ Thêm Kích Thước</Button>
            </div>
            <Table columns={columns} dataSource={data} rowKey={'id'} scroll={{ x: 1000 }} />
        </div>
    )

}
