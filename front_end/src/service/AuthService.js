/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class AuthService extends baseService {
    constructor() {
        super();
    }
    login = (loginInfo) => {
        return this.post(`/api/Auth/`, loginInfo);
    }
    register = (registerInfo) => {
        console.log(registerInfo);
        return this.post(`/api/auth/register?Email=${registerInfo}`);
    }
    getCurrentUser = (token) => {
        if (token !== null) {
            return this.post(`/api/Auth/getinfo?token=${token}`);
        }
    }
    forgetPassword = (email) => {
        return this.post(`/api/Auth/ForgetPassword?Email=${email}`);
    };
}

export const authService = new AuthService();