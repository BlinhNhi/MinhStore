import { Button, Table } from 'antd';
import { MdOutlineDelete } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getListUserAction } from "../../redux_store/actions/UserAction";
import { getListPaymentAction, deletePaymentAction } from "../../redux_store/actions/PaymentAction";
import { getCodeProduct } from '../../utils/format/getCodeProduct';
import { formatDateTime } from '../../utils/format/formatDateTime';
import ModalOrderDetail from '../ModalOrderDetail/ModalOrderDetail';

function TableAdmin() {
    const dispatch = useDispatch();
    const [isModalOrderDetailOpen, setIsModalOrderDetailOpen] = useState(false);

    useEffect(() => {
        dispatch(getListUserAction());
        dispatch(getListPaymentAction());
    }, [dispatch])
    let { arrUser } = useSelector(state => state.UserReducer);
    let { arrPayments } = useSelector(state => state.PaymentReducer);

    const dataUser = arrUser || [];
    console.log(arrPayments);
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
            dataIndex: 'phoneNumber',
            render: (text) => text ? text : "Không có",
            key: 'phoneNumber',
            width: '15%',
        },
    ];


    const dataOrder = arrPayments || [];


    const columnsOrder = [
        {
            title: 'Mã đơn hàng',
            key: 'id',
            dataIndex: 'id',
            render: (text, data) => {
                console.log(data);
                return (<>
                    <span>{getCodeProduct(data?.id)}</span>
                </>)
            },
        },
        {
            title: 'Ngày đặt hàng',
            key: 'dayOrder',
            dataIndex: 'dayOrder',
            render: (text, data) => {
                console.log(data);
                return (<>
                    <span>{formatDateTime(data?.dayOrder)}</span>
                </>)
            },
        },
        {
            title: 'Trạng thái đơn hàng',
            key: 'statusOrder',
            dataIndex: 'statusOrder',
            render: (text, data) => {
                console.log(data);
                return (<>
                    <span>{data?.statusOrder === 0 ? 'Đang xử lý' : data?.statusOrder === 1 ? 'Chấp nhận' : 'Đã nhận hàng'}</span>
                </>)
            },
        },
        {
            title: 'Tác vụ',
            width: '15%',
            render: (text, order) => {
                return <div className='flex gap-2'>
                    {/* <Button key={1} href={`/admin/ordermng/edit/${order.id}`} type="link" icon={<MdModeEditOutline />} onClick={() => {
                    }}></Button> */}

                    <Button key={1} size="large" danger icon={<MdOutlineDelete />} onClick={() => {
                        if (window.confirm('Bạn muốn xoá đơn hàng ' + order.id + '?')) {
                            dispatch(deletePaymentAction(order.id))
                        }
                    }}></Button>
                    <div>
                        <Button
                            key={2}
                            onClick={() => {
                                handleOpenModalOrderDetail();
                            }}
                            size="large"
                            title='Chi tiết đơn hàng'
                            icon={<RiFileList3Line />}

                        ></Button >
                        <ModalOrderDetail
                            isOpen={isModalOrderDetailOpen}
                            onClose={handleCloseModalOrderDetail}
                            onConfirm={() => {
                                setIsModalOrderDetailOpen(false);
                            }}
                            paymentId={order?.id}
                        />
                    </div>
                </div>

            }
        },

    ];


    return (
        <div className='mt-10'>
            <div className='flex flex-col items-start gap-6'>
                <div className='flex flex-col gap-4 w-full'>
                    <h2 className='font-semibold text-gray-400 text-base'>Quản Lý Khách Hàng</h2>
                    <Table columns={columnsUser} dataSource={dataUser} rowKey={'id'} scroll={{ x: 1000 }} />
                </div>

                <div className='flex flex-col gap-4 w-full'>
                    <h2 className='font-semibold text-gray-400 text-base'>Quản Lý Đơn Hàng</h2>
                    <Table columns={columnsOrder} dataSource={dataOrder} rowKey={'id'} scroll={{ x: 1000 }} />
                </div>
            </div>
        </div>
    );
}

export default TableAdmin;