import { GET_PRODUCT_LIST, GET_PRODUCT_DETAIL } from "../constants";

const initialState = {
    arrProducts: [],
    productDetail: {},
}

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PRODUCT_LIST:
            state.arrProducts = action.arrProducts;
            return { ...state }
        case GET_PRODUCT_DETAIL:
            state.productDetail = action.productDetail;
            return { ...state }

        default:
            return { ...state }
    }
}
