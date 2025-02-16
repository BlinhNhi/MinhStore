import { Button, Input, Table, Space } from 'antd';
import { MdOutlineDelete } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';



import { getListUserAction } from "../../redux_store/actions/UserAction";
import { getListPaymentAction, deletePaymentAction } from "../../redux_store/actions/PaymentAction";
import { getCodeProduct } from '../../utils/format/getCodeProduct';
import { formatDateTime } from '../../utils/format/formatDateTime';
import ModalOrderDetail from '../ModalOrderDetail/ModalOrderDetail';

function TableAdmin() {
    const dispatch = useDispatch();
    const [isModalOrderDetailOpen, setIsModalOrderDetailOpen] = useState(false);
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
    useEffect(() => {
        dispatch(getListUserAction());
        dispatch(getListPaymentAction());
    }, [dispatch])
    let { arrUser } = useSelector(state => state.UserReducer);
    let { arrPayments } = useSelector(state => state.PaymentReducer);

    const [currentOrderDetail, setCurrentOrderDetailId] = useState('')
    const dataUser = arrUser || [];

    const handleOpenModalOrderDetail = () => {
        setIsModalOrderDetailOpen(true);
    };
    const handleCloseModalOrderDetail = () => {
        setIsModalOrderDetailOpen(false);
    };

    const columnsUser = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => text ? text : "Không có",
            width: '15%',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => text ? text : "Không có",
            width: '15%',
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'address',
            render: (text) => text ? text : "Không có",
            key: 'address',
            width: '15%',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            render: (text) => text ? text : "Không có",
            key: 'phone',
            width: '15%',
        },
    ];


    const dataOrder = arrPayments || [];

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

    const columnsOrder = [
        {
            title: 'Mã đơn hàng',
            key: 'id',
            dataIndex: 'id',
            render: (text, data) => {
                return (<>
                    <span>{getCodeProduct(data?.id)}</span>
                </>)
            },
        },
        {
            title: 'Ngày đặt hàng',
            key: 'dayOrder',
            dataIndex: 'dayOrder',
            ...getColumnSearchProps('dayOrder'),
            render: (text, data) => {
                return (<>
                    <span>{formatDateTime(data?.dayOrder)}</span>
                </>)
            },
        },
        {
            title: 'Tên khách hàng',
            key: 'nameUser',
            dataIndex: 'nameUser',
            ...getColumnSearchProps('nameUser'),
            render: (name) => name ? name : "Không có",
        },
        {
            title: 'Địa chỉ giao hàng',
            key: 'addressUser',
            dataIndex: 'addressUser',
            ...getColumnSearchProps('addressUser'),
            render: (name) => name ? name : "Không có",
        },
        {
            title: 'Trạng thái đơn hàng',
            key: 'statusOrder',
            dataIndex: 'statusOrder',
            render: (text, data) => {
                return (<>
                    <span>{data?.statusOrder === 0 ? <p className='text-base text-gray-500'>Đang xử lý</p> : data?.statusOrder === 1 ? <span className="text-primary font-bold">Xác nhận đơn hàng</span> :
                        data?.statusOrder === 2 ? <span className="text-green-500 font-bold">Bàn giao vận chuyển</span> :
                            data?.statusOrder === 3 ? <span className="text-blue-400 font-bold">Đang vận chuyển</span> :
                                data?.statusOrder === 4 ? <span className="text-red-500 font-bold">Hoàn thành đơn hàng</span>
                                    : 'Không xác định'}</span>
                </>)
            },
        },
        {
            title: 'Tác vụ',
            width: '15%',
            render: (text, order) => {
                return <div className='flex gap-2'>
                    <Button key={1} size="large" danger icon={<MdOutlineDelete />} onClick={() => {
                        if (window.confirm('Bạn muốn xoá đơn hàng ' + order.id + '?')) {
                            dispatch(deletePaymentAction(order.id))
                        }
                    }}></Button>
                    <Button
                        key={2}
                        onClick={() => {
                            console.log(order?.id);
                            handleOpenModalOrderDetail();
                            setCurrentOrderDetailId(order?.id)
                        }}
                        size="large"
                        title='Chi tiết đơn hàng'
                        icon={<RiFileList3Line />}

                    ></Button >
                    <ModalOrderDetail
                        isOpen={isModalOrderDetailOpen}
                        onClose={handleCloseModalOrderDetail}
                        paymentId={currentOrderDetail}
                    />

                </div>

            }
        },

    ];


    return (
        <div className='mt-10'>
            <div className='flex flex-col items-start gap-6'>
                <div className='flex flex-col gap-4 w-full'>
                    <h2 className='font-semibold text-gray-600 dark:text-gray-200 text-base'>Quản Lý Đơn Hàng</h2>
                    <Table columns={columnsOrder} dataSource={dataOrder} rowKey={'id'} scroll={{ x: 1000 }} />
                </div>
                <div className='flex flex-col gap-4 w-full'>
                    <h2 className='font-semibold text-gray-600 dark:text-gray-200 text-base'>Quản Lý Khách Hàng</h2>
                    <Table columns={columnsUser} dataSource={dataUser} rowKey={'id'} scroll={{ x: 1000 }} />
                </div>
            </div>
        </div>
    );
}

export default TableAdmin;