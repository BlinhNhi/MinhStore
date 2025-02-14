import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
// import { userService } from "../../services/UserService";
import { notification } from "antd";
import { TOKEN } from "../../../src/utils/variable";
import { authService } from "../../service/AuthService";
import { GET_CURRENT_USER_ACTION } from "../constants";
import { Navigate } from "react-router-dom";

export const loginAction = (loginInfo) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);
            await new Promise(resolve => setTimeout(resolve, 2000));
            const result = await authService.login(loginInfo);
            if (result.status === 200) {
                localStorage.setItem(TOKEN, result.data.data.accessToken);
                console.log(result.data.data?.user?.role);
                if (result.data.data?.user?.role === 'Admin') {
                    window.location.href = '/admin/dashboard';
                } else {
                    notification.success({
                        closeIcon: true,
                        message: "Thành Công",
                        description: (
                            <>
                                Đăng Nhập Thành Công.<br />
                                Chào Mừng Đến Với MinhCoi Store.
                            </>
                        ),
                    });
                    window.location.href = '/';
                }
            } else {
                await dispatch(hideLoadingAction);
                window.location.href = '/login';
            }
            await dispatch(hideLoadingAction);
        } catch (error) {
            dispatch(hideLoadingAction);
            notification.error({
                closeIcon: true,
                message: "Thất Bại",
                description: (
                    <>
                        Đăng Nhập Thất Bại.<br />
                        Vui Lòng Thử Lại.
                    </>
                ),
            });
        }
    };
};

export const registerAction = (inforUser) => {

    console.log(inforUser);
    return async (dispatch) => {
        dispatch(displayLoadingAction);
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const result = await authService.register(inforUser);
            if (result.data.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: "Đăng Ký Thành Công",
                    description: (
                        <>
                            Vui lòng kiểm tra email để có mật khẩu để đăng nhập.<br />
                        </>
                    ),
                });
                await dispatch(hideLoadingAction);
                window.location.href = '/login';
            } else {
                notification.error({
                    closeIcon: true,
                    message: "Đăng Ký Thất Bại",
                    description: (
                        <>
                            Xin lỗi. Email này đã tồn tại.
                        </>
                    ),
                });
                await dispatch(hideLoadingAction);
            }
        } catch (error) {
            console.log(error);
            notification.error({
                closeIcon: true,
                message: "Error",
                description: (
                    <>
                        Đăng ký thất bại, Vui lòng thử lại!!.
                    </>
                ),
            });
            await dispatch(hideLoadingAction);
        }
    };
};

export const forgetPassword = (emailInfo) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);
            const result = await authService.forgetPassword(emailInfo);
            if (result.data.status === 200) {
                dispatch({
                    type: GET_CURRENT_USER_ACTION,
                    emailInfo: result.data.content,
                });
                await dispatch(hideLoadingAction);
                notification.success({
                    closeIcon: false,
                    message: "Thành Công",
                    description: (
                        <>
                            Mật khẩu mới của bạn đã được gửi đến email, vui lòng kiểm tra mail hoặc hộp thư rác và đăng nhập lại.
                        </>
                    ),
                });
                window.location.href = '/login';

            }
        } catch (error) {
            console.log(error);
            await dispatch(hideLoadingAction);
            notification.error({
                closeIcon: false,
                message: "Thất Bại",
                description: (
                    <>
                        Email này chưa được đăng ký.
                    </>
                ),
            });
        }
    };
};


export const getCurrentUserAction = (token) => {
    return async (dispatch) => {
        try {
            const result = await authService.getCurrentUser(token);
            if (result.status === 200) {
                dispatch({
                    type: GET_CURRENT_USER_ACTION,
                    userLogin: result.data,
                });
            } else {
                localStorage.removeItem(TOKEN)
            }
        } catch (error) {
            localStorage.removeItem(TOKEN)
        }
    };
};

