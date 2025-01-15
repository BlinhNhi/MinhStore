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
    getOrderByUserId = (userId) => {
        return this.get(`/api/Order/user/${userId}`);
    }
    addOrder = (formData) => {
        return this.post(`/api/Order`, formData);
    };
    deleteOrder = (id) => {
        return this.delete(`/api/Order/${id}`);
    };
    updateOrder = (id, order) => {
        return this.put(`/api/Order/${id}`, order);
    };
    updateIsDeletedOfOrder = (userId) => {
        return this.put(`/api/Order/update-isDelete/${userId}`);
    };
}

export const orderService = new OrderService();