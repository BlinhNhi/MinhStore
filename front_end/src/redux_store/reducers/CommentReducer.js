import { GET_COMMENT_LIST } from "../constants";

const initialState = {
    arrComment: [],

}

export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_COMMENT_LIST:
            state.arrComment = action.arrComment;
            return { ...state }
        default:
            return { ...state }
    }
}
