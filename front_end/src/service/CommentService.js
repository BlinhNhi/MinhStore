/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class CommentService extends baseService {
    constructor() {
        super();
    }
    getCommentByProductId = (productId) => {
        return this.get(`/api/Comment/by-product/${productId}`);
    };
    paginationCommentByProductId = (productId, page) => {
        return this.get(`/api/Comment/getcomment-by-pagination?ProductId=${productId}&page=${page}`);
    }
}
export const commentService = new CommentService();