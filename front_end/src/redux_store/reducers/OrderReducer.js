import { GET_ORDER_DETAIL, GET_ORDER_LIST } from "../constants";

const initialState = {
    arrOrder: [],
    orderDetail: {},
}

export const OrderReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ORDER_LIST:
            state.arrOrder = action.arrOrder;
            return { ...state }
        case GET_ORDER_DETAIL:
            state.orderDetail = action.orderDetail;
            return { ...state }

        default:
            return { ...state }
    }
}
