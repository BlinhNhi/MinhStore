import { GET_PRODUCT_LIST, GET_PRODUCT_DETAIL, GET_PRODUCT_DETAIL_FOR_USER } from "../constants";

const initialState = {
    arrProducts: [],
    productDetail: {},
    productDetailForUser: ""
}

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PRODUCT_LIST:
            state.arrProducts = action.arrProducts;
            return { ...state }
        case GET_PRODUCT_DETAIL:
            state.productDetail = action.productDetail;
            return { ...state }
        case GET_PRODUCT_DETAIL_FOR_USER:
            state.productDetailForUser = action.productDetailForUser;
            return { ...state }

        default:
            return { ...state }
    }
}
