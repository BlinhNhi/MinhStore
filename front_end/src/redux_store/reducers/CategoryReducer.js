import { GET_CATEGORY_LIST, GET_CATEGORY_DETAIL } from "../constants";

const initialState = {
    arrCategories: [],
    categoryDetail: {},
}

export const ColorReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_CATEGORY_LIST:
            state.arrCategories = action.arrCategories;
            return { ...state }
        case GET_CATEGORY_DETAIL:
            state.categoryDetail = action.categoryDetail;
            return { ...state }

        default:
            return { ...state }
    }
}
