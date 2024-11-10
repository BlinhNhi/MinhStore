import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getListProductsAction, getDetailProductAction, updateProductAction, apiUploadImages } from '../../../redux_store/actions/ProductAcction';
import { getListColorAction } from '../../../redux_store/actions/ColorAction';
import { getListSizesAction } from '../../../redux_store/actions/SizeAction'
import { getListCategoriesAction } from '../../../redux_store/actions/CategoryAction';
import { FaCamera, FaRegTrashAlt } from 'react-icons/fa';
import LoadingImage from '../../../components/LoadingImage/LoadingImage';



const UpdateProduct = (props) => {
    const dispatch = useDispatch();
    let { id } = props.match.params;
    const { productDetail } = useSelector(state => state.ProductReducer)
    let { arrColor } = useSelector(state => state.ColorReducer);
    let { arrSizes } = useSelector(state => state.SizeReducer);
    let { arrCategories } = useSelector(state => state.CategoryReducer);
    const [loading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState([]);


    // State để theo dõi xem dữ liệu đã sẵn sàng chưa
    const [loadingColor, setLoadingColor] = useState(true);
    const [defaultValue, setDefaultValue] = useState([]);
    const [defaultSizeValue, setDefaultSizeValue] = useState([]);

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
            // list_image: companyDetail?.list_image ? companyDetail?.list_image : null,
            imagesProduct: productDetail?.imagesProduct ? productDetail?.imagesProduct : null,
            colorId: productDetail?.colorId || [],
            sizeId: productDetail?.sizeId,
            categoryId: productDetail?.categoryId
        },
        onSubmit: handleSubmitColor
    })
    // hàm lấy imge khi update
    useEffect(() => {
        const images = productDetail?.imagesProduct ? JSON.parse(productDetail?.imagesProduct) : [];
        console.log(images);
        images && setImagePreview(images);
    }, [productDetail?.imagesProduct])

    useEffect(() => {
        if (productDetail?.colorId && productDetail?.sizeId) {
            const colorArray = productDetail.colorId.split(',').map(Number);
            setDefaultValue(colorArray);
            const sizeArray = productDetail.sizeId.split(',').map(Number);
            setDefaultSizeValue(sizeArray);
            setLoadingColor(false);
        }
    }, [productDetail?.colorId]);


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

        if (formik?.values?.imagesProduct !== null) {
            formik.setFieldValue("imagesProduct", JSON.stringify([...JSON.parse(formik?.values?.imagesProduct), ...images]));
        }
        else {
            formik.setFieldValue("imagesProduct", JSON.stringify([...images]));
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

    if (loadingColor) {
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
            <h3 className="text-lg md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-medium mb-4 dark:text-white">Cập Nhật Sản Phẩm:</h3>
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
                        label="Size Sản Phẩm"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Size Sản Phẩm Không Được Để Trống!',
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
                            onChange={handleChangeSize}
                            options={optionsSize}
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