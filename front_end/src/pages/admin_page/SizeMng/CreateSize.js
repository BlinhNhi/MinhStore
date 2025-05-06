import React, { useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { addSizeAction, getListSizesAction } from '../../../redux_store/actions/SizeAction';


const CreateSize = () => {
    const dispatch = useDispatch();
    let { arrSizes } = useSelector(state => state.SizeReducer);

    useEffect(() => {
        dispatch(getListSizesAction())
    }, []);
    const handleSubmitColor = (values) => {
        const sizeExisted = arrSizes?.some(element => element.numberOfSize === values?.numberOfSize)
        if (values.numberOfSize === "" || values?.numberOfSize?.startsWith(' ') === true) {
            notification.error({
                closeIcon: true,
                message: 'Error',
                description: (
                    <>Vui lòng điền đầy đủ thông tin và không để trống đầu câu!</>
                ),
            });
        }
        else if (sizeExisted === true) {
            notification.error({
                closeIcon: true,
                message: 'Lỗi Trùng Tên Kích Thước',
                description: (
                    <>
                        Kích Thước Này Đã Có Rồi.
                    </>
                ),
            });
        }
        else {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            dispatch(addSizeAction(formData));
        }
    }

    const formik = useFormik({
        initialValues: {
            numberOfSize: '',
        },
        onSubmit: handleSubmitColor
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
            <h3 className="text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl md:text-2xl font-normal mb-4 dark:text-gray-200">Tạo Kích Thước Mới Cho Sản Phẩm</h3>
            <div className='row'>
                <div className='col-8 dark:text-white'>
                    <Form.Item
                        className=''
                        label="Kích Thước"
                        name="numberOfSize"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Bắt Buộc Nhập Kích Thước!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="numberOfSize" onChange={formik.handleChange} />
                    </Form.Item>
                    <Form.Item label="Tác Vụ">
                        <Button htmlType="submit" >Thêm Kích Thước Mới</Button>
                    </Form.Item>
                </div>
            </div>

        </Form>
    );
};

export default CreateSize;