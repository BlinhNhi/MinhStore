import { GET_PRODUCT_LIST, GET_PRODUCT_DETAIL, GET_PRODUCT_DETAIL_FOR_USER, GET_EIGHT_PRODUCTS, GET_EIGHT_CHEAP_PRODUCTS } from "../constants";

const initialState = {
    arrProducts: [],
    arrEightProducts: [],
    arrEightCheapProducts: [],
    productDetail: {},
    productDetailForUser: "",
    quantityProducts: 0
}

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PRODUCT_LIST:
            return {
                ...state,
                arrProducts: action.arrProducts || [],
                quantityProducts: action.quantityProducts || 0,
            }
        case GET_EIGHT_PRODUCTS:
            state.arrEightProducts = action.arrEightProducts;
            return { ...state }
        case GET_EIGHT_CHEAP_PRODUCTS:
            state.arrEightCheapProducts = action.arrEightCheapProducts;
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
