import { notification } from 'antd';
import { paymentService } from '../../service/PaymentService';
import { GET_PAYMENT_LIST, GET_PAYMENT_DETAIL_BY_USER_ID, GET_PAYMENT_DETAIL, GET_MONTHLY_TOTAL_AMOUNT_OF_PAYMENT, GET_MONTHLY_COUNT_ORDER } from '../constants';




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
            notification.success({
                closeIcon: true,
                message: 'Thành Công',
                description: (
                    <>Thanh Toán Thành Công</>
                ),
            });
            window.location.href = '/system-account/view-order';
        } catch (error) {
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
            dispatch(getListPaymentAction());
        }
        catch (e) {
            console.log(e)
        }
    };
}
export const getPaymentDetailAction = (id) => {

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

export const getTotalAmountPaymentByYearAction = (year) => {

    return async (dispatch) => {
        try {
            const result = await paymentService.getTotalMountPaymentByYear(year)
            if (result?.data?.statusCode === 200) {
                dispatch({
                    type: GET_MONTHLY_TOTAL_AMOUNT_OF_PAYMENT,
                    monthlyTotalAmountOfOrder: result?.data?.value,
                })
            }
            else if (result?.data?.statusCode === 404) {
                dispatch({
                    type: GET_MONTHLY_TOTAL_AMOUNT_OF_PAYMENT,
                    monthlyTotalAmountOfOrder: [],
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getMonthlyCountOrderAction = (year) => {

    return async (dispatch) => {
        try {
            const result = await paymentService.getMonthlyCountOrder(year)
            if (result?.data?.statusCode === 200) {
                dispatch({
                    type: GET_MONTHLY_COUNT_ORDER,
                    monthlyCountOrders: result?.data?.value,
                })
            } else if (result?.data?.statusCode === 404) {
                dispatch({
                    type: GET_MONTHLY_COUNT_ORDER,
                    monthlyCountOrders: [],
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const getPaymentDetailByUserIdAction = (userId) => {

    return async (dispatch) => {
        try {
            const result = await paymentService.getPaymentByUserId(userId)
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



export const updateStatusPaymentAction = (id, formData) => {
    return async (dispatch) => {
        try {
            const result = await paymentService.updateStatusPayment(id, formData);
            if (result.data.status === 200) {
                await dispatch(getPaymentDetailAction(id));
                await dispatch(getListPaymentAction());
                notification.success({
                    closeIcon: true,
                    message: 'Dữ liệu đã được cập nhật',
                    description: 'Dữ liệu thanh toán đã được cập nhật thành công',
                });
            }
        } catch (error) {
            console.log(error);
            notification.error({
                closeIcon: true,
                message: "Thất Bại",
                description: <>Cập Nhật Trạng Thái Thất Bại.</>,
            });
        }
    };
}
