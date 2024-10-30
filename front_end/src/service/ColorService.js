/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class ColorService extends baseService {
    constructor() {
        super();
    }
    getListColor = () => {
        return this.get(`/api/Color`);
    };
    getColorById = (colorId) => {
        return this.get(`/api/Color/${colorId}`);
    }
    createColor = (formData) => {
        return this.post(`/api/Color`, formData);
    };
    deleteColor = (id) => {
        return this.delete(`/api/Color/${id}`);
    };
    updateColor = (id, color) => {
        return this.put(`/api/Color?Id=${id}`, color);
    };
}

export const colorService = new ColorService();