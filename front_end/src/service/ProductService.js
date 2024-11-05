/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class ProductService extends baseService {
    constructor() {
        super();
    }
    getListProduct = () => {
        return this.get(`/api/Product`);
    };
    getProductById = (id) => {
        return this.get(`/api/Product/${id}`);
    }
    createProduct = (formData) => {
        return this.post(`/api/Product`, formData);
    };
    deleteProduct = (id) => {
        return this.delete(`/api/Product/${id}`);
    };
    updateProduct = (id, Product) => {
        return this.put(`/api/Product/${id}`, Product);
    };
}

export const productService = new ProductService();