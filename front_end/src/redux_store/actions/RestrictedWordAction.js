import { notification } from 'antd';
import { history } from '../../App';
import { GET_RESTRICTED_WORD_LIST, GET_RESTRICTED_WORD_DETAIL } from '../constants';
import { restrictedWordService } from '../../service/RestrictedWord';



export const getListRestrictedWordAction = () => {
    return async (dispatch) => {
        try {
            const result = await restrictedWordService.getListRetrictedWord();
            if (result.data.status === 200) {
                dispatch({
                    type: GET_RESTRICTED_WORD_LIST,
                    arrRestrictedWord: result.data.data
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const addRestrictedWordAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await restrictedWordService.createRetrictedWord(formData)
            console.log(result);
            notification.success({
                closeIcon: true,
                message: 'Thành Công',
                description: (
                    <>Tạo Từ Khoá Thành Công</>
                ),
            });
            window.location.href = '/admin/restricted-word-mng';
        } catch (error) {
            notification.error({
                closeIcon: true,
                message: "Thất Bại",
                description: <>Tạo Từ Khoá Thất Bại.</>,
            });
        }
    }
}

export const deleteRestrictedWordAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await restrictedWordService.deleteRetrictedWord(id)
            if (result.data.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: "Thành Công",
                    description: (
                        <>Xoá Từ Khoá Thành Công</>
                    )
                });
            }
            dispatch(getListRestrictedWordAction())
        }
        catch (e) {
            console.log(e)
        }
    };
}
export const getRestrictedWordDetailAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await restrictedWordService.getRetrictedWordById(id)
            if (result.data.status === 200) {
                dispatch({
                    type: GET_RESTRICTED_WORD_DETAIL,
                    restrictedWordDetail: result.data.data[0],
                })

            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const updateRestrictedWordAction = (id, formData) => {
    return async () => {
        try {
            const result = await restrictedWordService.updateRetrictedWord(id, formData)
            if (result.data.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: 'Thành Công',
                    description: (
                        <>Cập Nhật Từ Khoá Thành Công</>
                    ),
                });
                window.location.href = '/admin/restricted-word-mng';
            }
        } catch (error) {
            notification.error({
                closeIcon: true,
                message: "Thất Bại",
                description: <>Cập Nhật Từ Khoá Thất Bại.</>,
            });
        }
    }
}