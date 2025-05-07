import { GET_COMMENT_LIST, GET_COMMENT_PAGINATION } from "../constants";

const initialState = {
    arrComment: [],
    arrCommentPagination: [],
    numberPage: 0
}

export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENT_LIST:
            state.arrComment = action.arrComment;
            return { ...state }
        case GET_COMMENT_PAGINATION:
            state.arrCommentPagination = action.arrCommentPagination;
            state.numberPage = action.numberPage;
            return { ...state }
        default:
            return { ...state }
    }
}
