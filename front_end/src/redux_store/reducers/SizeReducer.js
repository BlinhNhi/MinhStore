import { GET_SIZE_LIST, GET_SIZE_DETAIL } from "../constants";

const initialState = {
    arrSizes: [],
    sizeDetail: {},
}

export const SizeReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_SIZE_LIST:
            state.arrSizes = action.arrSizes;
            return { ...state }
        case GET_SIZE_DETAIL:
            state.sizeDetail = action.sizeDetail;
            return { ...state }

        default:
            return { ...state }
    }
}
