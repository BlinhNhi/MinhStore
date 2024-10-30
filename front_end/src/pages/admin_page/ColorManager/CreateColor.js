import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { addColorAction } from '../../../redux_store/actions/ColorAction';


const CreateColor = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: (values) => {
            if (values?.name === '' || values?.name?.startsWith(' ') === true) {
                notification.error({
                    closeIcon: true,
                    message: 'Error',
                    description: (
                        <>
                            Vui lòng điền đầy đủ thông tin và Không để trống đầu câu !.
                        </>
                    ),
                });
            } else {
                let formData = new FormData();
                for (let key in values) {
                    formData.append(key, values[key]);
                }
                console.table('formData', [...formData])
                dispatch(addColorAction(formData));
            }

        }
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
            <h3 className="text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl md:text-2xl font-normal mb-4 dark:text-gray-200">Tạo Màu Mới Cho Sản Phẩm</h3>
            <div className='row'>
                <div className='col-8 dark:text-white'>
                    <Form.Item
                        className=''
                        label="Tên Màu Sắc"
                        name="name"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Bắt Buộc Nhập Tên Màu!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="name" onChange={formik.handleChange} />
                    </Form.Item>
                    <Form.Item label="Tác Vụ">
                        <Button htmlType="submit" >Thêm Màu Mới</Button>
                    </Form.Item>
                </div>
            </div>

        </Form>
    );
};

export default CreateColor;