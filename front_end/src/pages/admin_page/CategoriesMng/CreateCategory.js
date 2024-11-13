import React, { useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { addCategoryAction, getListCategoriesAction } from '../../../redux_store/actions/CategoryAction';


const CreateCategory = () => {
    const dispatch = useDispatch();
    let { arrCategories } = useSelector(state => state.CategoryReducer);
    useEffect(() => {
        dispatch(getListCategoriesAction())
    }, [dispatch]);
    const handleSubmitCategory = (values) => {
        const categoryExisted = arrCategories?.some(element => element.name === values?.name)
        if (values.name === "" || values?.name?.startsWith(' ') === true) {
            notification.error({
                closeIcon: true,
                message: 'Error',
                description: (
                    <>Vui lòng điền đầy đủ thông tin và Không để trống đầu câu !.</>
                ),
            });
        }
        else if (categoryExisted === true) {
            notification.error({
                closeIcon: true,
                message: 'Lỗi Trùng Tên Danh Mục',
                description: (
                    <>
                        Danh Mục Này Đã Có Rồi.
                    </>
                ),
            });
        }
        else {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            console.table('formData', [...formData])
            dispatch(addCategoryAction(formData));
        }
    }
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: handleSubmitCategory
    })


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
            <h3 className="text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl md:text-2xl font-normal mb-4 dark:text-gray-200">Tạo Danh Mục Cho Sản Phẩm</h3>
            <div className='row'>
                <div className='col-8 dark:text-white'>
                    <Form.Item
                        className=''
                        label="Tên Danh Mục"
                        name="name"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Bắt Buộc Nhập Danh Mục!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="name" onChange={formik.handleChange} />
                    </Form.Item>
                    <Form.Item label="Tác Vụ">
                        <Button htmlType="submit" >Thêm Danh Mục </Button>
                    </Form.Item>
                </div>
            </div>

        </Form>
    );
};

export default CreateCategory;