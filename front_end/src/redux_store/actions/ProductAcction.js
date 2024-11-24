import { productService } from "../../service/ProductService";
import { GET_EIGHT_CHEAP_PRODUCTS, GET_EIGHT_PRODUCTS, GET_PRODUCT_DETAIL, GET_PRODUCT_DETAIL_FOR_USER, GET_PRODUCT_LIST } from "../constants";
import { notification } from 'antd';
import { history } from '../../App';
import axios from "axios";


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
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Thêm Sản Phẩm Thành Công</>
                ),
            });
            window.location.href = '/admin/product-mng';
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
export const getDetailProductAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await productService.getProductById(id);
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

export const getDetailProductForUserAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await productService.getProductByIdForUser(id);
            if (result.data.status === 200) {
                dispatch({
                    type: GET_PRODUCT_DETAIL_FOR_USER,
                    productDetailForUser: result?.data?.data[0],
                })

            }
        } catch (e) {
            console.log(e)
        }
    }
}

export const updateProductAction = (id, formData) => {
    return async () => {
        try {
            const result = await productService.updateProduct(id, formData)
            if (result.data.status === 200) {
                notification.success({
                    closeIcon: true,
                    message: 'Thành Công',
                    description: (
                        <>Cập Nhật Sản Phẩm Thành Công</>
                    ),
                });
                window.location.href = '/admin/product-mng';

            }
        } catch (error) {
            notification.error({
                closeIcon: true,
                message: "Thất Bại",
                description: <>Cập Nhật Sản Phẩm Thất Bại.</>,
            });
        }
    }
}


export const apiUploadImages = (images) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: `https://api.cloudinary.com/v1_1/dsxrhkdnh/image/upload/`,
            data: images,
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const getProductListOptionsAction = (options) => {
    return async (dispatch) => {
        try {
            // dispatch(displayLoadingAction);
            const result = await productService.getProductListOptions(options);
            if (result.data.status === 200) {
                dispatch({
                    type: GET_PRODUCT_LIST,
                    arrProducts: result.data.data,
                    quantityProducts: result?.data?.quantityProducts
                });
                // await dispatch(hideLoadingAction);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
};

export const getProductsOfSearchNameAction = (options) => {
    return async (dispatch) => {
        try {
            // dispatch(displayLoadingAction);
            const result = await productService.getProductsOfSearch(options);
            if (result.data.status === 200) {
                dispatch({
                    type: GET_PRODUCT_LIST,
                    arrProducts: result.data.data,
                    quantityProducts: result?.data?.quantityProducts
                });
                // await dispatch(hideLoadingAction);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
};

export const getProductsOfCategoryAction = (options) => {
    return async (dispatch) => {
        try {
            // dispatch(displayLoadingAction);
            const result = await productService.getProductsOfCategory(options);
            if (result.data.status === 200) {
                dispatch({
                    type: GET_PRODUCT_LIST,
                    arrProducts: result.data.data,
                    quantityProducts: result?.data?.quantityProducts
                });
                // await dispatch(hideLoadingAction);
            }
        } catch (error) {
            console.log("error", error);
        }
    };
};

export const getEightProductsAction = () => {
    return async (dispatch) => {
        try {
            const result = await productService.getEightProducts();
            if (result.data.status === 200) {
                dispatch({
                    type: GET_EIGHT_PRODUCTS,
                    arrEightProducts: result.data.data,
                });
            }
        } catch (error) {
            console.log("error", error);
        }
    };
};

export const getEightCheapProductsAction = () => {
    return async (dispatch) => {
        try {
            const result = await productService.getEightCheapProducts();
            if (result.data.status === 200) {
                dispatch({
                    type: GET_EIGHT_CHEAP_PRODUCTS,
                    arrEightCheapProducts: result.data.data,
                });
            }
        } catch (error) {
            console.log("error", error);
        }
    };
};