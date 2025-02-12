/* eslint-disable no-useless-constructor */
import { TOKEN } from "../utils/variable";
import { baseService } from "./baseService";

export class CategoryService extends baseService {
    constructor() {
        super();
    }
    // getListCategory = () => {
    //     const accessToken = localStorage.getItem(TOKEN) || "";
    //     console.log(accessToken);
    //     return this.get(`/api/Category`, {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`
    //         }
    //     });
    // };
    getListCategory = () => {
        const accessToken = localStorage.getItem(TOKEN);
        if (!accessToken) {
            console.error("No access token found!");
            return Promise.reject("No access token found!");
        }
        console.log(accessToken);
        return this.get(`/api/Category`, {
            headers: {
                "Authorization": `Bearer  ${accessToken}`,
                "Content-Type": "application/json"
            }
        });
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