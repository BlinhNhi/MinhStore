import { GET_COMMENT_LIST } from '../constants';
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
