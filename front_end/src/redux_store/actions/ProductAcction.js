import { productService } from "../../service/ProductService";
import { GET_PRODUCT_DETAIL, GET_PRODUCT_LIST } from "../constants";
import { notification } from 'antd';
import { history } from '../../App';


export const getListProductsAction = () => {
    return async (dispatch) => {
        try {
            const result = await productService.getListProduct();
            if (result.data.status === 200) {
                dispatch({
                    type: GET_PRODUCT_LIST,
                    arrProducts: result.data.data
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const addProductAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await productService.createProduct(formData)
            console.log(result);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Thêm Sản Phẩm Thành Công</>
                ),
            });
            history.push('/admin/product-mng');
        } catch (error) {
            notification.error({
                closeIcon: true,
                message: "Fail",
                description: <>Thêm Sản Phẩm Thất Bại.</>,
            });
        }
    }
}

export const deleteProductAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await productService.deleteProduct(id)
            if (result.data.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: "Xoá Sản Phẩm Thành Công",
                    description: (
                        <>Xoá Sản Phẩm Thành Công</>
                    )
                });
            }
            dispatch(getListProductsAction())
        }
        catch (e) {
            console.log(e)
        }
    };
}
export const detailNewsAction = (id) => {

    return async (dispatch) => {
        try {
            const result = await productService.getProductById(id)
            if (result.data.status === 200) {
                dispatch({
                    type: GET_PRODUCT_DETAIL,
                    productDetail: result.data.data[0],
                })

            }
        } catch (e) {
            console.log(e)
        }
    }
}

// export const updateNewsAction = (id, formData) => {
//   return async () => {
//     try {
//       const result = await newService.updateNews(id, formData)
//       if (result.data.status === 200) {
//         notification.success({
//           closeIcon: true,
//           message: 'Success',
//           description: (
//             <>Update News successfully</>
//           ),
//         });
//         history.push('/admin/newsmng');
//       }
//     } catch (error) {
//       notification.error({
//         closeIcon: true,
//         message: "Fail",
//         description: <>Update News Fail.</>,
//       });
//     }
//   }
// }