import { notification } from 'antd';
import { orderService } from '../../service/OrderService';
import { GET_ORDER_DETAIL, GET_ORDER_DETAIL_BY_USER_ID, GET_ORDER_LIST } from '../constants';
import { Navigate } from 'react-router-dom';



export const getListCartAction = () => {
    return async (dispatch) => {
        try {
            const result = await orderService.getListOrder();
            if (result.data.status === 200) {
                dispatch({
                    type: GET_ORDER_LIST,
                    arrOrder: result.data.data
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};




export const addCartAction = (formData) => {
    return async (dispatch) => {

        try {
            const result = await orderService.addOrder(formData);
            console.log(result);
        } catch (error) {
            notification.error({
                closeIcon: true,
                message: "Thất Bại",
                description: <>Thêm Giỏ Hàng Thất Bại.</>,
            });
        }
    };
};

export const deleteCartAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await orderService.deleteOrder(id)
            if (result.data.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: "Thành Công",
                    description: (
                        <>Xoá Giỏ Hàng Thành Công</>
                    )
                });
            }
            await new Promise(resolve => setTimeout(resolve, 800));
            window.location.href = '/system-account/cart-shopping';
        }
        catch (e) {
            console.log(e)
        }
    };
}
export const getCartDetailAction = (id) => {

    return async (dispatch) => {
        try {
            const result = await orderService.getOrderById(id)
            if (result.data.status === 200) {
                dispatch({
                    type: GET_ORDER_DETAIL,
                    orderDetail: result.data.data[0],
                })

            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getCartDetailByUserIdAction = (userId) => {

    return async (dispatch) => {
        try {
            const result = await orderService.getOrderByUserId(userId)
            if (result.data.status === 200) {
                dispatch({
                    orderDetailByUserId: result?.data,
                    type: GET_ORDER_DETAIL_BY_USER_ID,
                })

            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const updateCartAction = (id, formData) => {
    return async () => {
        try {
            const result = await orderService.updateOrder(id, formData)
            if (result.data.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: 'Thành Công',
                    description: (
                        <>Cập Nhật Giỏ Hàng Thành Công</>
                    ),
                });
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
        } catch (error) {
            notification.error({
                closeIcon: true,
                message: "Thất Bại",
                description: <>Cập Nhật Giỏ Hàng Thất Bại.</>,
            });
        }
    }
}

export const updateIsDeletedOfCartAction = (userId) => {
    return async () => {
        try {
            const result = await orderService.updateIsDeletedOfOrder(userId)
            if (result.data.status === 200) {
                setTimeout(() => {
                    window.location.reload()

                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }
    }
}