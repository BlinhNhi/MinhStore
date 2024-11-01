/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class SizeService extends baseService {
    constructor() {
        super();
    }
    getListSize = () => {
        return this.get(`/api/Size`);
    };
    getSizeById = (sizeId) => {
        return this.get(`/api/Size/${sizeId}`);
    }
    createSize = (formData) => {
        return this.post(`/api/Size`, formData);
    };
    deleteSize = (id) => {
        return this.delete(`/api/Size/${id}`);
    };
    updateSize = (id, size) => {
        return this.put(`/api/Size?Id=${id}`, size);
    };
}

export const sizeService = new SizeService();