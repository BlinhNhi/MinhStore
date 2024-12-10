/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class UserService extends baseService {
    constructor() {
        super();
    }
    getListUser = () => {
        return this.get(`/api/User`);
    };
    getUserById = (Id) => {
        return this.get(`/api/User/${Id}`);
    }
    createUser = (formData) => {
        return this.post(`/api/User`, formData);
    };
    deleteUser = (id) => {
        return this.delete(`/api/User/${id}`);
    };
    updateUser = (id, user) => {
        return this.put(`/User/${id}`, user);
    };
}

export const userService = new UserService();