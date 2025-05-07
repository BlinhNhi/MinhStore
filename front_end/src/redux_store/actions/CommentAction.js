import { GET_COMMENT_LIST, GET_COMMENT_PAGINATION } from '../constants';
import { commentService } from '../../service/CommentService';

export const getCommentByIdProductAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await commentService.getCommentByProductId(id)
            if (result.status === 200) {
                dispatch({
                    type: GET_COMMENT_LIST,
                    arrComment: result.data,
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const paginationCommentByIdProductAction = (id, page) => {
    return async (dispatch) => {
        try {
            const result = await commentService.paginationCommentByProductId(id, page)
            console.log(result);
            console.log(result?.data?.totalCount);
            if (result.status === 200) {
                dispatch({
                    type: GET_COMMENT_PAGINATION,
                    arrCommentPagination: result.data?.data,
                    numberPage: result?.data?.totalCount,
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}

