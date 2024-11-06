import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FaCamera, FaRegTrashAlt } from "react-icons/fa";

import { addProductAction, apiUploadImages } from '../../../redux_store/actions/ProductAcction';
import { getListColorAction } from '../../../redux_store/actions/ColorAction';
import { getListSizesAction } from '../../../redux_store/actions/SizeAction';
import { getListCategoriesAction } from '../../../redux_store/actions/CategoryAction';
import LoadingImage from '../../../components/LoadingImage/LoadingImage';


// const { Option } = Select;
const CreateProduct = () => {
    const dispatch = useDispatch();
    let { arrColor } = useSelector(state => state.ColorReducer);
    let { arrSizes } = useSelector(state => state.SizeReducer);
    let { arrCategories } = useSelector(state => state.CategoryReducer);
    const [loading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState([]);


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
            imagesProduct: "",
            colorId: [],
            sizeId: [],
            categoryId: ''
        },
        onSubmit: handleSubmitProduct
    })

    const handleFiles = async (e) => {
        e.stopPropagation();
        setIsLoading(true);
        let images = [];
        const files = e.target.files;

        const formData = new FormData();
        for (let i of files) {
            formData.append("file", i);
            formData.append(
                "upload_preset",
                "jzdubdw6"
            );
            const response = await apiUploadImages(formData);
            if (response.status === 200)
                images = [...images, response.data?.secure_url];
        }
        setIsLoading(false);
        setImagePreview((pre) => [...pre, ...images]);

        let imageCurrent = formik?.values?.imagesProduct;
        console.log(imageCurrent);
        if (imageCurrent === "") {
            formik.setFieldValue("imagesProduct", JSON.stringify([...formik?.values?.imagesProduct, ...images]));
        }
        else {
            formik.setFieldValue("imagesProduct", JSON.stringify([...JSON.parse(formik?.values?.imagesProduct), ...images]));

        }


    };

    const handleDeleteImage = (image) => {
        // 20:14/64

        let a = formik?.values?.imagesProduct
        setImagePreview((pre) => pre?.filter((item) => item !== image));
        formik.setFieldValue("imagesProduct", JSON.stringify(JSON.parse((a))?.filter((item) => item !== image)));
    };

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

                    {/* image */}
                    <Form.Item label="Image">
                        <div className="w-full mb-6">
                            {/* <h2 className="font-semibold text-xl py-2">Hình Ảnh</h2> */}
                            <p className="italic mt-1">
                                Cập Nhật Hình Ảnh Rõ Ràng
                            </p>
                            <div className="w-full md:w-[100%] sm:w-[100%] lg:w-[100%] 2xl:w-[70%] xl:w-[70%]">
                                <label
                                    className="w-full border-2  border-orange-400 hover:border-orange-500 text-3xl  text-gray-300 cursor-pointer
                                    flex-col gap-6  my-4 items-center justify-center h-[150px] flex rounded-md bg-gray-50 hover:bg-gray-100 
                                    dark:border-gray-50 dark:hover:border-gray-100 dark:bg-orange-100 dark:hover:bg-orange-200 dark:border-4
                                    "
                                    htmlFor="file"
                                >
                                    {loading ? (
                                        <LoadingImage></LoadingImage>
                                    ) : (
                                        <span className="flex flex-col items-center dark:text-primary  justify-center gap-2">
                                            <FaCamera></FaCamera>
                                            <div className="text-gray-500 font-medium dark:text-primary text-base">Thêm Ảnh</div>
                                        </span>
                                    )}
                                </label>
                                <input
                                    onChange={handleFiles}
                                    type="file"
                                    id="file"
                                    hidden
                                    multiple
                                ></input>
                                <h3 className="font-medium py-2 text-base">Ảnh Đã Chọn</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 place-items-center gap-2">
                                    {imagePreview?.map((item) => {
                                        return (
                                            <div className="space-x-4 relative" key={item}>
                                                <img
                                                    key={item}
                                                    alt="img-preview"
                                                    src={item}
                                                    className="w-80 h-54 object-contain bg-gray-200 dark:bg-orange-300 rounded-md"
                                                ></img>
                                                <span
                                                    title="Xoá"
                                                    className="top-1 text-sm bg-gray-500 hover:bg-slate-600 text-white rounded-[60%] cursor-pointer right-0 p-2 absolute "
                                                    onClick={() => handleDeleteImage(item)}
                                                >
                                                    <FaRegTrashAlt />
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
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