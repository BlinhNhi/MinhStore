import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getListProductsAction, getDetailProductAction, updateProductAction } from '../../../redux_store/actions/ProductAcction';
import { getListColorAction } from '../../../redux_store/actions/ColorAction';
import { getListSizesAction } from '../../../redux_store/actions/SizeAction'
import { getListCategoriesAction } from '../../../redux_store/actions/CategoryAction';



const UpdateProduct = (props) => {
    const dispatch = useDispatch();
    const { productDetail } = useSelector(state => state.ProductReducer)
    let { arrColor } = useSelector(state => state.ColorReducer);
    let { arrSizes } = useSelector(state => state.SizeReducer);
    let { arrCategories } = useSelector(state => state.CategoryReducer);
    let { id } = props.match.params;

    // State để theo dõi xem dữ liệu đã sẵn sàng chưa
    const [loading, setLoading] = useState(true);
    const [defaultValue, setDefaultValue] = useState([]);
    useEffect(() => {
        dispatch(getDetailProductAction(id));
        dispatch(getListColorAction());
        dispatch(getListSizesAction());
        dispatch(getListCategoriesAction())
    }, [dispatch, id])
    const handleSubmitColor = (values) => {
        // const sizeExisted = arrColor?.some(element => element.name === values?.name)
        if (values.name === "" || values?.name?.startsWith(' ') === true) {
            notification.error({
                closeIcon: true,
                message: 'Error',
                description: (
                    <>Vui lòng điền đầy đủ thông tin và Không để trống đầu câu !.</>
                ),
            });
        }
        // else if (sizeExisted === true) {
        //     notification.error({
        //         closeIcon: true,
        //         message: 'Lỗi Trùng Tên Màu Sắc',
        //         description: (
        //             <>
        //                 Màu Sắc Này Đã Có Rồi.
        //             </>
        //         ),
        //     });
        // }
        else {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            console.table('formData', [...formData])
            dispatch(updateProductAction(id, formData))
        }
    }




    console.log(typeof (productDetail?.colorId));
    const options = [];
    arrColor.forEach(element => {
        options.push({
            label: element.name,
            value: element.id
        });
    });

    const optionsSize = [];
    arrSizes.forEach(element => {
        optionsSize.push({
            label: element.numberOfSize,
            value: element.id
        });
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            priceProduct: productDetail?.priceProduct,
            nameProduct: productDetail?.nameProduct,
            stockQuantity: productDetail?.stockQuantity,
            numberOfProductSold: productDetail?.numberOfProductSold,
            numberOfProductInStock: productDetail?.numberOfProductInStock,
            imageProduct: productDetail?.imageProduct || null,
            colorId: productDetail?.colorId || [],
            sizeId: productDetail?.sizeId,
            categoryId: productDetail?.categoryId
        },
        onSubmit: handleSubmitColor
    })

    useEffect(() => {
        if (productDetail?.colorId) {
            const colorArray = productDetail.colorId.split(',').map(Number);
            setDefaultValue(colorArray);
            setLoading(false);
        }
    }, [productDetail?.colorId]);


    const handleChangeColor = (value) => {
        formik.setFieldValue('colorId', value)
        console.log(value);
    };

    const handleChangeSize = (value) => {
        formik.setFieldValue('sizeId', value)
        console.log(value);
    };

    const handleChangeCategory = (value) => {
        console.log(value);
        formik.setFieldValue("categoryId", value);
    };

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }



    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
        >
            <h3 className="text-lg md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-medium mb-4 dark:text-white">Cập Nhật Màu Sản Phẩm:</h3>
            <div className='row'>
                <div className='col-8'>
                    <Form.Item
                        label="Tên Sản Phẩm"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng không bỏ sót thông tin này!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="nameProduct" onChange={formik.handleChange} value={formik.values.nameProduct} />
                    </Form.Item>

                    <Form.Item
                        label="Giá Sản Phẩm"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Giá Sản Phẩm Không Được Để Trống!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="priceProduct" onChange={formik.handleChange} value={formik.values.priceProduct} />
                    </Form.Item>

                    <Form.Item
                        label="Sản Phẩm Trong Kho"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Sản Phẩm Tồn Tại Trong Kho Không Được Để Trống!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="stockQuantity" onChange={formik.handleChange} value={formik.values.stockQuantity} />
                    </Form.Item>

                    <Form.Item
                        label="Sản Phẩm Đã Bán"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Sản Phẩm Đã Bán Không Được Để Trống!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="numberOfProductSold" onChange={formik.handleChange} value={formik.values.numberOfProductSold} />
                    </Form.Item>

                    <Form.Item
                        label="Sản Phẩm Còn Lại"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Sản Phẩm Còn Lại Không Được Để Trống!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="numberOfProductInStock" onChange={formik.handleChange} value={formik.values.numberOfProductInStock} />
                    </Form.Item>

                    <Form.Item
                        label="Màu Sản Phẩm"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Màu Sản Phẩm Không Được Để Trống!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            defaultValue={defaultValue}
                            onChange={handleChangeColor}
                            options={options}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Danh Mục"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Danh Mục Không Được Để Trống',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select value={formik.values.categoryId} options={arrCategories?.map((item, index) => ({ key: index, label: item.name, value: item.id }))} onChange={handleChangeCategory} />
                    </Form.Item>

                    <Form.Item label="Action">
                        <Button htmlType="submit" type='primary'>Cập Nhật Sản Phẩm</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default UpdateProduct;