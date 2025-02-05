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
    getProductByIdForUser = (id) => {
        return this.get(`/api/Product/user/${id}`);
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
    updateQuantityProduct = (id, Product) => {
        return this.put(`/api/Product/updateQuantityProduct/${id}`, Product);
    };
    getProductListOptions = (options) => {
        return this.get(
            `/api/Product/Options?searchName=${options.searchName}&searchCategory=${options.searchCategory}&searchColor=${options.searchColor}&searchSize=${options.searchSize}&fromPrice=${options.fromPrice}&toPrice=${options.toPrice}&sort=${options.sort}&page=${options.page}`
        );
    };
    getProductsOfSearch = (options) => {
        return this.get(
            `/api/Product/Options?searchName=${options.searchName}&page=${options.page}`
        );
    };
    getProductsOfCategory = (options) => {
        return this.get(
            `/api/Product/Options?searchCategory=${options.searchCategory}`
        );
    };
    getEightProducts = (options) => {
        return this.get(`/api/Product/GetEightProducts?sort=earliest-product-create&page=1`);
    };
    getEightCheapProducts = (options) => {
        return this.get(`/api/Product/GetEightProducts?sort=cheap-products&page=1`);
    };

}

export const productService = new ProductService();