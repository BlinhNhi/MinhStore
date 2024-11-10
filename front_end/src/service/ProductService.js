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
    getProductListOptions = (options) => {
        return this.get(
            `/api/Product/Options?searchName=${options.searchName}&searchCategory=${options.searchCategory}&searchColor=${options.searchColor}&searchSize=${options.searchSize}&fromPrice=${options.fromPrice}&toPrice=${options.toPrice}&sort=${options.sort}`
        );
    };
}

export const productService = new ProductService();