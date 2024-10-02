import { BaseApi } from "./baseAPI/baseAPI.js";

export class UserApi extends BaseApi {
    constructor() {
        super();
    }
    login = (data) => {
        return this.post(`/login`, );
    }
    register = (data) => {
        return this.post(`/register`, );
    }
}
export const userApi = new UserApi();