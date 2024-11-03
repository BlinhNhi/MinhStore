import React, { useEffect } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { addProductAction } from '../../../redux_store/actions/ProductAcction';
import { getListColorAction } from '../../../redux_store/actions/ColorAction';
import { getListSizesAction } from '../../../redux_store/actions/SizeAction';
import { getListCategoriesAction } from '../../../redux_store/actions/CategoryAction';


const { Option } = Select;

const CreateProduct = () => {
    const dispatch = useDispatch();
    let { arrColor } = useSelector(state => state.ColorReducer);
    let { arrSizes } = useSelector(state => state.SizeReducer);
    let { arrCategories } = useSelector(state => state.CategoryReducer);
    console.log(arrCategories);


    useEffect(() => {
        dispatch(getListColorAction());
        dispatch(getListSizesAction());
        dispatch(getListCategoriesAction())

    }, [dispatch]);
    const handleSubmitProduct = (values) => {
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
            dispatch(addProductAction(formData));
        }
    }

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
        initialValues: {
            priceProduct: '',
            nameProduct: '',
            stockQuantity: '',
            numberOfProductSold: '',
            numberOfProductInStock: '',
            imageProduct: null,
            colorId: [],
            sizeId: [],
            categoryId: ''
        },
        onSubmit: handleSubmitProduct
    })

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
            <h3 className="text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl md:text-2xl font-normal mb-4 dark:text-gray-200">Tạo Sản Phẩm Mới</h3>
            <div className='row'>
                <div className='col-8 dark:text-white'>
                    <Form.Item
                        className=''
                        label="Giá Sản Phẩm"
                        name="priceProduct"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Bắt Buộc Nhập Giá Tiền!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="priceProduct" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        className=''
                        label="Tên Sản Phẩm"
                        name="nameProduct"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Bắt Buộc Nhập Tên!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="nameProduct" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        className=''
                        label="Tổng Sản Phẩm"
                        name="stockQuantity"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Bắt Buộc Nhập Tổng Sản Phẩm!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="stockQuantity" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        className=''
                        label="Số Lượng Sản Phẩm Đã Bán"
                        name="numberOfProductSold"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Bắt Buộc Nhập Số Lượng Sản Phẩm Đã Bán!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="numberOfProductSold" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        className=''
                        label="Số Lượng Sản Phẩm Còn Lại"
                        name="numberOfProductInStock"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Bắt Buộc Nhập Số Lượng Sản Phẩm Còn Lại!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="numberOfProductInStock" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Màu Sắc"
                        name='colorId'
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Vui Lòng Chọn Màu Sản Phẩm',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select
                            className='border-0'
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                                border: 'none'
                            }}
                            placeholder="Vui Lòng Chọn Màu"
                            onChange={handleChangeColor}
                            options={options}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Số Size"
                        name='sizeId'
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Vui Lòng Chọn Size Sản Phẩm',
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
                            placeholder="Vui Lòng Chọn Size"
                            onChange={handleChangeSize}
                            options={optionsSize}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Danh Mục"
                        name="categoryId"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Vui Lòng Chọn Danh Mục",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select
                            rules={[{ required: true }]}

                            options={
                                arrCategories
                                    ? arrCategories?.map((item, index) => ({
                                        key: index,
                                        label: item.name,
                                        value: item.id,
                                    }))
                                    : ""
                            }
                            onChange={handleChangeCategory}
                        />
                    </Form.Item>

                    <Form.Item label="Tác Vụ">
                        <Button htmlType="submit" >Thêm Sản Phẩm Mới</Button>
                    </Form.Item>
                </div>
            </div>

        </Form>
    );
};

export default CreateProduct;