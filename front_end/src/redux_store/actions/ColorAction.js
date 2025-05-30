import { notification } from 'antd';
import { colorService } from "../../service/ColorService";
import { GET_COLOR_DETAIL, GET_COLOR_LIST } from '../constants';


export const getListColorAction = () => {
    return async (dispatch) => {
        try {
            const result = await colorService.getListColor();
            if (result.data.status === 200) {
                dispatch({
                    type: GET_COLOR_LIST,
                    arrColor: result.data.data
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const addColorAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await colorService.createColor(formData)
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Tạo Màu Sảm Phẩm Thành Cơng</>
                ),
            });
            window.location.href = '/admin/color-mng';
        } catch (error) {
            notification.error({
                closeIcon: true,
                message: "Fail",
                description: <>Tạo Màu Sản Phẩm Thất Bại.</>,
            });
        }
    }
}

export const deleteColorAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await colorService.deleteColor(id)
            if (result.data.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: "Success",
                    description: (
                        <>Xoá Màu Sản Phẩm Thành Công</>
                    )
                });
            }
            dispatch(getListColorAction())
        }
        catch (e) {
            console.log(e)
        }
    };
}
export const getColorDetailAction = (id) => {

    return async (dispatch) => {
        try {
            const result = await colorService.getColorById(id)
            if (result.data.status === 200) {
                dispatch({
                    type: GET_COLOR_DETAIL,
                    colorDetail: result.data.data[0],
                })

            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const updateColorAction = (id, formData) => {
    return async () => {
        try {
            const result = await colorService.updateColor(id, formData)
            if (result.data.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: 'Success',
                    description: (
                        <>Cập Nhật Màu Sản Phẩm Thành Công</>
                    ),
                });
                window.location.href = '/admin/color-mng';
            }
        } catch (error) {
            notification.error({
                closeIcon: true,
                message: "Fail",
                description: <>Cập Nhật Màu Sản Phẩm Thất Bại.</>,
            });
        }
    }
}