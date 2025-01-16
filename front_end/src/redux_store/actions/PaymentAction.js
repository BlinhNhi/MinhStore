import { notification } from 'antd';
import { paymentService } from '../../service/PaymentService';
import { GET_PAYMENT_LIST, GET_PAYMENT_DETAIL_BY_USER_ID, GET_PAYMENT_DETAIL } from '../constants';



export const getListPaymentAction = () => {
    return async (dispatch) => {
        try {
            const result = await paymentService.getListPayment();
            if (result.data.status === 200) {
                dispatch({
                    type: GET_PAYMENT_LIST,
                    arrPayments: result.data.data
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};




export const addPaymentAction = (formData) => {
    return async (dispatch) => {

        try {
            const result = await paymentService.createPayment(formData);
            console.log(result);
            notification.success({
                closeIcon: true,
                message: 'Thành Công',
                description: (
                    <>Thanh Toán Thành Công</>
                ),
            });
            // window.location.href = '/admin/categories-mng';
        } catch (error) {
            console.log(error);
            notification.error({
                closeIcon: true,
                message: "Thất Bại",
                description: <>Thanh Toán Thất Bại.</>,
            });
        }
    };
};

export const deletePaymentAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await paymentService.deletePayment(id)
            if (result.data.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: "Thành Công",
                    description: (
                        <>Xoá Đơn Hàng Thành Công</>
                    )
                });
            }
            // await new Promise(resolve => setTimeout(resolve, 800));
            // window.location.href = '/system-account/cart-shopping';
        }
        catch (e) {
            console.log(e)
        }
    };
}
export const getCartDetailAction = (id) => {

    return async (dispatch) => {
        try {
            const result = await paymentService.getPaymentById(id)
            if (result.data.status === 200) {
                dispatch({
                    type: GET_PAYMENT_DETAIL,
                    paymentDetail: result.data.data[0],
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
            const result = await paymentService.getPaymentByUserId(userId)
            console.log(result);
            if (result.data.status === 200) {
                dispatch({
                    paymentDetailByUserId: result?.data?.data,
                    type: GET_PAYMENT_DETAIL_BY_USER_ID,
                })

            }
        } catch (e) {
            console.log(e)
        }
    }
}

// export const updateCartAction = (id, formData) => {
//     return async () => {
//         try {
//             const result = await orderService.updateOrder(id, formData)
//             if (result.data.status === 200) {
//                 notification.success({
//                     closeIcon: true,
//                     message: 'Thành Công',
//                     description: (
//                         <>Cập Nhật Đơn Hàng Thành Công</>
//                     ),
//                 });
//                 setTimeout(() => {
//                     window.location.reload()

//                 }, 1000);
//             }
//         } catch (error) {
//             notification.error({
//                 closeIcon: true,
//                 message: "Thất Bại",
//                 description: <>Cập Nhật Đơn Hàng Thất Bại.</>,
//             });
//         }
//     }
// }