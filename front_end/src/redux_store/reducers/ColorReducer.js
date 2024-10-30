import { GET_COLOR_DETAIL, GET_COLOR_LIST } from "../constants";

const initialState = {
    arrColor: [],
    colorDetail: {},
}

export const ColorReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_COLOR_LIST:
            state.arrColor = action.arrColor;
            return { ...state }
        case GET_COLOR_DETAIL:
            state.colorDetail = action.colorDetail;
            return { ...state }

        default:
            return { ...state }
    }
}
