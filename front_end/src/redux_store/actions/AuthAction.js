import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
// import { userService } from "../../services/UserService";
import { notification } from "antd";
import { TOKEN } from "../../../src/utils/variable";
import { authService } from "../../service/AuthService";
import { GET_CURRENT_USER_ACTION } from "../constants";

export const loginAction = (loginInfo) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction);
            await new Promise(resolve => setTimeout(resolve, 2000));
            const result = await authService.login(loginInfo);
            if (result.status === 200) {
                localStorage.setItem(TOKEN, result.data.data.accessToken);
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
        await new Promise(resolve => setTimeout(resolve, 2000));
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
        }
    };
};

// export const forgetPassword = (emailInfo) => {
//     return async (dispatch) => {
//         try {
//             // dispatch(displayLoadingAction);
//             const result = await userService.forgetPassword(emailInfo);
//             if (result.data.status === 200) {
//                 dispatch({
//                     type: LAY_LAI_MAT_KHAU_ACTION,
//                     emailInfo: result.data.content,
//                 });
//                 await dispatch(hideLoadingAction);
//                 notification.success({
//                     closeIcon: false,
//                     message: "Success",
//                     description: (
//                         <>
//                             Your new password has been sent to your email, please check your email or spam box and login again.
//                         </>
//                     ),
//                 });
//                 history.replace("login");
//             }
//         } catch (error) {
//             console.log(error);
//             // await dispatch(hideLoadingAction);
//             notification.error({
//                 closeIcon: false,
//                 message: "Error",
//                 description: (
//                     <>
//                         This email is not registered yet.
//                     </>
//                 ),
//             });
//         }
//     };
// };


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
            // console.log(error);
        }
    };
};

