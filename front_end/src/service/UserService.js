/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class UserService extends baseService {
    constructor() {
        super();
    }
    getListUser = () => {
        return this.get(`/User`);
    };
    getUserById = (Id) => {
        return this.get(`/User/${Id}`);
    }
    createUser = (formData) => {
        return this.post(`/User`, formData);
    };
    deleteUser = (id) => {
        return this.delete(`/User/${id}`);
    };
    updateUser = (id, user) => {
        return this.put(`/User/${id}`, user);
    };
}

export const userService = new UserService();