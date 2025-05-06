/* eslint-disable no-useless-constructor */

import { baseService } from "./baseService";

export class RestrictedWordService extends baseService {
    constructor() {
        super();
    }
    getListRetrictedWord = () => {
        return this.get(`/api/RetrictedWord`);
    };
    getRetrictedWordById = (id) => {
        return this.get(`/api/RetrictedWord/${id}`);
    }
    createRetrictedWord = (formData) => {
        return this.post(`/api/RetrictedWord`, formData);
    };
    deleteRetrictedWord = (id) => {
        return this.delete(`/api/RetrictedWord/${id}`);
    };
    updateRetrictedWord = (id, restric) => {
        return this.put(`/api/RetrictedWord?Id=${id}`, restric);
    };
}

export const restrictedWordService = new RestrictedWordService();