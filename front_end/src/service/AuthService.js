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
        console.log(token);
        if (token !== null) {
            return this.post(`/api/Auth/getinfo?token=${token}`);
        }
    }
}

export const authService = new AuthService();