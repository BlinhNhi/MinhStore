import { notification } from 'antd';
import { history } from '../../App';
import { sizeService } from '../../service/SizeService';
import { GET_SIZE_LIST, GET_SIZE_DETAIL } from '../constants';
import { useNavigate } from 'react-router-dom';



export const getListSizesAction = () => {
    return async (dispatch) => {
        try {
            const result = await sizeService.getListSize();
            if (result.data.status === 200) {
                dispatch({
                    type: GET_SIZE_LIST,
                    arrSizes: result.data.data
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

// export const addSizeAction = (formData) => {
//     return async (dispatch) => {
//         const navigate = useNavigate();
//         try {
//             const result = await sizeService.createSize(formData)
//             console.log(result);
//             notification.success({
//                 closeIcon: true,
//                 message: 'Thành Công',
//                 description: (
//                     <>Tạo Kích Thước Thành Công</>
//                 ),
//             });
//             navigate('/admin/sizes-mng');
//         } catch (error) {
//             notification.error({
//                 closeIcon: true,
//                 message: "Thất Bại",
//                 description: <>Tạo Kích Thước Thất Bại.</>,
//             });
//         }
//     }
// }


export const addSizeAction = (formData) => {
    return async (dispatch) => {

        try {
            const result = await sizeService.createSize(formData);
            console.log(result);
            notification.success({
                closeIcon: true,
                message: 'Thành Công',
                description: (
                    <>Tạo Kích Thước Thành Công</>
                ),
            });
            window.location.href = '/admin/sizes-mng';
        } catch (error) {
            notification.error({
                closeIcon: true,
                message: "Thất Bại",
                description: <>Tạo Kích Thước Thất Bại.</>,
            });
        }
    };
};

export const deleteSizeAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await sizeService.deleteSize(id)
            if (result.data.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: "Thành Công",
                    description: (
                        <>Xoá Kích Thước Thành Công</>
                    )
                });
            }
            dispatch(getListSizesAction())
        }
        catch (e) {
            console.log(e)
        }
    };
}
export const getSizeDetailAction = (id) => {

    return async (dispatch) => {
        try {
            const result = await sizeService.getSizeById(id)
            if (result.data.status === 200) {
                dispatch({
                    type: GET_SIZE_DETAIL,
                    sizeDetail: result.data.data[0],
                })

            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const updateSizeAction = (id, formData) => {
    return async () => {
        try {
            const result = await sizeService.updateSize(id, formData)
            if (result.data.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: 'Thành Công',
                    description: (
                        <>Cập Nhật Kích Thước Thành Công</>
                    ),
                });
                window.location.href = '/admin/sizes-mng';
            }
        } catch (error) {
            notification.error({
                closeIcon: true,
                message: "Thất Bại",
                description: <>Cập Nhật Kích Thước Thất Bại.</>,
            });
        }
    }
}