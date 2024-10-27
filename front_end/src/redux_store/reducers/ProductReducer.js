import { GET_PRODUCT_LIST } from "../constants";

const initialState = {
    arrProducts: [],
    // newsDetail: {},
}

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_PRODUCT_LIST:
            state.arrProducts = action.arrProducts;
            return { ...state }
        // case GET_NEWS_DETAIL:
        //     state.newsDetail= action.newsDetail;
        //     return {...state}

        default:
            return { ...state }
    }
}
