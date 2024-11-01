/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class CategroyService extends baseService {
    constructor() {
        super();
    }
    getListCategroy = () => {
        return this.get(`/api/Categroy`);
    };
    getCategroyById = (colorId) => {
        return this.get(`/api/Categroy/${colorId}`);
    }
    createCategroy = (formData) => {
        return this.post(`/api/Categroy`, formData);
    };
    deleteCategroy = (id) => {
        return this.delete(`/api/Categroy/${id}`);
    };
    updateCategroy = (id, color) => {
        return this.put(`/api/Categroy?Id=${id}`, color);
    };
}

export const categoryService = new CategroyService();