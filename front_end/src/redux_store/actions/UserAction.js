import { notification } from 'antd';
import { userService } from '../../service/UserService';
import { GET_USER_DETAIL, GET_USER_LIST } from '../constants';



export const getListUserAction = () => {
  return async (dispatch) => {
    try {
      const result = await userService.getListUser();
      if (result.data.status === 200) {
        dispatch({
          type: GET_USER_LIST,
          arrUser: result.data.data
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};




export const addUserAction = (formData) => {
  return async (dispatch) => {

    try {
      const result = await userService.createUser(formData);
      console.log(result);
      notification.success({
        closeIcon: true,
        message: 'Thành Công',
        description: (
          <>Tạo Người Dùng Thành Công</>
        ),
      });
      window.location.href = '/admin/user-mng';
    } catch (error) {
      notification.error({
        closeIcon: true,
        message: "Thất Bại",
        description: <>Tạo Người Dùng Thất Bại.</>,
      });
    }
  };
};

export const deleteUserAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await userService.deleteUser(id)
      if (result.data.status === 200) {
        notification.success({
          closeIcon: true,
          message: "Thành Công",
          description: (
            <>Xoá Người Dùng Thành Công</>
          )
        });
      }
      dispatch(getListUserAction())
    }
    catch (e) {
      console.log(e)
    }
  };
}
export const getUserDetailAction = (id) => {

  return async (dispatch) => {
    try {
      const result = await userService.getUserById(id)
      if (result.data.status === 200) {
        dispatch({
          type: GET_USER_DETAIL,
          userDetail: result.data.data[0],
        })

      }
    } catch (e) {
      console.log(e)
    }
  }
}

export const updateUserAction = (id, formData) => {
  return async () => {
    try {
      const result = await userService.updateUser(id, formData)
      if (result.data.status === 200) {
        notification.success({
          closeIcon: true,
          message: 'Thành Công',
          description: (
            <>Cập Nhật Người Dùng Thành Công</>
          ),
        });
        window.location.href = '/system-account/my-account/';
      }
    } catch (error) {
      notification.error({
        closeIcon: true,
        message: "Thất Bại",
        description: <>Cập Nhật Người Dùng Thất Bại.</>,
      });
    }
  }
}