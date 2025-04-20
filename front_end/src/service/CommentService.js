/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class CommentService extends baseService {
    constructor() {
        super();
    }
    getCommentByProductId = (productId) => {
        return this.get(`/api/Comment/by-product/${productId}`);
    }
}

export const commentService = new CommentService();