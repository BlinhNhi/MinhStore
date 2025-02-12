/* eslint-disable no-useless-constructor */

import { baseService } from "./baseService";

export class CategoryService extends baseService {
    constructor() {
        super();
    }

    getListCategory = () => {
        return this.get(`/api/Category`);
    };
    getCategoryById = (cateId) => {
        return this.get(`/api/Category/${cateId}`);
    }
    createCategory = (formData) => {
        return this.post(`/api/Category`, formData);
    };
    deleteCategory = (id) => {
        return this.delete(`/api/Category/${id}`);
    };
    updateCategory = (id, cate) => {
        return this.put(`/api/Category?Id=${id}`, cate);
    };
}

export const categoryService = new CategoryService();