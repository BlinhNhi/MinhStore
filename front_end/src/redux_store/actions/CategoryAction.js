import { notification } from 'antd';
import { history } from '../../App';
import { categoryService } from '../../service/CategoyService';
import { GET_CATEGORY_LIST, GET_CATEGORY_DETAIL } from '../constants';



export const getListCategoriesAction = () => {
    return async (dispatch) => {
        try {
            const result = await categoryService.getListCategroy();
            console.log(result);
            if (result.data.status === 200) {
                dispatch({
                    type: GET_CATEGORY_LIST,
                    arrCategories: result.data.data
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const addCategoryAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await categoryService.createCategroy(formData)
            console.log(result);
            notification.success({
                closeIcon: true,
                message: 'Thành Công',
                description: (
                    <>Tạo Danh Mục Thành Công</>
                ),
            });
            history.push('/admin/categories-mng');
        } catch (error) {
            notification.error({
                closeIcon: true,
                message: "Thất Bại",
                description: <>Tạo Danh Mục Thất Bại.</>,
            });
        }
    }
}

export const deleteCategoryAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await categoryService.deleteCategroy(id)
            console.log(result);
            if (result.data.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: "Thành Công",
                    description: (
                        <>Xoá Danh Mục Thành Công</>
                    )
                });
            }
            dispatch(getListCategoriesAction())
        }
        catch (e) {
            console.log(e)
        }
    };
}
export const getCategoryDetailAction = (id) => {

    return async (dispatch) => {
        try {
            const result = await categoryService.getCategroyById(id)
            if (result.data.status === 200) {
                dispatch({
                    type: GET_CATEGORY_DETAIL,
                    categoryDetail: result.data.data[0],
                })

            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const updateCategoryAction = (id, formData) => {
    return async () => {
        try {
            const result = await categoryService.updateCategroy(id, formData)
            console.log(result);
            if (result.data.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: 'Thành Công',
                    description: (
                        <>Cập Nhật Danh Mục Thành Công</>
                    ),
                });
                history.push('/admin/categories-mng');
            }
        } catch (error) {
            notification.error({
                closeIcon: true,
                message: "Thất Bại",
                description: <>Cập Nhật Danh Mục Thất Bại.</>,
            });
        }
    }
}