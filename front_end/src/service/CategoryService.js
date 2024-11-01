/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class CategoryService extends baseService {
    constructor() {
        super();
    }
    getListCategory = () => {
        return this.get(`/api/Category`);
    };
    getCategoryById = (colorId) => {
        return this.get(`/api/Category/${colorId}`);
    }
    createCategory = (formData) => {
        return this.post(`/api/Category`, formData);
    };
    deleteCategory = (id) => {
        return this.delete(`/api/Category/${id}`);
    };
    updateCategory = (id, color) => {
        return this.put(`/api/Category?Id=${id}`, color);
    };
}

export const categoryService = new CategoryService();