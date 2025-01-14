/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class PaymentService extends baseService {
    constructor() {
        super();
    }
    getListPayment = () => {
        return this.get(`/api/Payment`);
    };
    getPaymentById = (payId) => {
        return this.get(`/api/Payment/${payId}`);
    }
    createPayment = (formData) => {
        return this.post(`/api/Payment`, formData);
    };
    getPaymentByUserId = (userId) => {
        return this.get(`/api/Payment/user/${userId}`);
    }
    deletePayment = (id) => {
        return this.delete(`/api/Payment/${id}`);
    };
    updatePayment = (id, cate) => {
        return this.put(`/api/Payment?Id=${id}`, cate);
    };
}

export const categoryPayment = new PaymentService();