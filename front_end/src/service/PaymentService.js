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
    getTotalMountPaymentByYear = (year) => {
        return this.get(`/api/Payment/GetMonthlyTotalAmount?year=${year}`);
    }
    getMonthlyCountOrder = (year) => {
        return this.get(`/api/Payment/GetMonthlyCountOrder?year=${year}`);
    }
    deletePayment = (id) => {
        return this.delete(`/api/Payment/${id}`);
    };
    updatePayment = (id, pay) => {
        return this.put(`/api/Payment?Id=${id}`, pay);
    };
    updateStatusPayment = (id, pay) => {
        return this.put(`/api/Payment/updateStatus/${id}`, pay);
    };
}

export const paymentService = new PaymentService();