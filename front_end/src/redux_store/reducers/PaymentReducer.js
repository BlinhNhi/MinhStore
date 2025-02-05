import { GET_PAYMENT_LIST, GET_PAYMENT_DETAIL, GET_PAYMENT_DETAIL_BY_USER_ID, GET_MONTHLY_TOTAL_AMOUNT_OF_PAYMENT } from "../constants";

const initialState = {
    arrPayments: [],
    paymentDetail: {},
    paymentDetailByUserId: [],
    monthlyTotalAmountOfOrder: []
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
        case GET_MONTHLY_TOTAL_AMOUNT_OF_PAYMENT:
            state.monthlyTotalAmountOfOrder = action.monthlyTotalAmountOfOrder;
            return { ...state }
        default:
            return { ...state }
    }
}
