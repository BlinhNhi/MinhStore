import { GET_RESTRICTED_WORD_DETAIL, GET_RESTRICTED_WORD_LIST } from "../constants";

const initialState = {
    arrRestrictedWord: [],
    restrictedWordDetail: {},
}

export const RestrictedWordReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_RESTRICTED_WORD_LIST:
            state.arrRestrictedWord = action.arrRestrictedWord;
            return { ...state }
        case GET_RESTRICTED_WORD_DETAIL:
            state.restrictedWordDetail = action.restrictedWordDetail;
            return { ...state }

        default:
            return { ...state }
    }
}
