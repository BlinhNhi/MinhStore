import { GET_PAYMENT_LIST, GET_PAYMENT_DETAIL, GET_PAYMENT_DETAIL_BY_USER_ID } from "../constants";

const initialState = {
    arrPayments: [],
    paymentDetail: {},
    paymentDetailByUserId: [],
}

export const PaymentReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PAYMENT_LIST:
            state.arrPayments = action.arrPayments;
            return { ...state }
        case GET_PAYMENT_DETAIL:
            state.paymentDetail = action.paymentDetail;
            return { ...state }
        case GET_PAYMENT_DETAIL_BY_USER_ID:
            state.paymentDetailByUserId = action.paymentDetailByUserId;
            return { ...state }
        default:
            return { ...state }
    }
}
