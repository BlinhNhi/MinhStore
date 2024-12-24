/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class OrderService extends baseService {
    constructor() {
        super();
    }
    getListOrder = () => {
        return this.get(`/api/Order`);
    };
    getOrderById = (Id) => {
        return this.get(`/api/Order/${Id}`);
    }
    addOrder = (formData) => {
        return this.post(`/api/Order`, formData);
    };
    deleteOrder = (id) => {
        return this.delete(`/api/Order/${id}`);
    };
    updateOrder = (id, order) => {
        return this.put(`/Order/${id}`, order);
    };
}

export const orderService = new OrderService();