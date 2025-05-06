import React, { useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getColorDetailAction, getListColorAction, updateColorAction } from '../../../redux_store/actions/ColorAction';
import { useParams } from 'react-router-dom';


const UpdateColor = (props) => {
    const dispatch = useDispatch();
    const { colorDetail } = useSelector(state => state.ColorReducer)
    const { arrColor } = useSelector(state => state.ColorReducer)
    let { id } = useParams();
    useEffect(() => {
        dispatch(getColorDetailAction(id));
        dispatch(getListColorAction());
    }, [dispatch, id])
    const handleSubmitColor = (values) => {
        const sizeExisted = arrColor?.some(element => element.name === values?.name)
        if (values.name === "" || values?.name?.startsWith(' ') === true) {
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
                message: 'Lỗi Trùng Tên Màu Sắc',
                description: (
                    <>
                        Màu Sắc Này Đã Có Rồi.
                    </>
                ),
            });
        }
        else {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            dispatch(updateColorAction(id, formData))
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: colorDetail?.name,
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
            <h3 className="text-lg md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-medium mb-4 dark:text-white">Cập Nhật Màu Sản Phẩm:</h3>
            <div className='row'>
                <div className='col-8'>
                    <Form.Item
                        label="Màu Sắc"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng không bỏ sót thông tin này!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="name" onChange={formik.handleChange} value={formik.values.name} />
                    </Form.Item>

                    <Form.Item label="Action">
                        <Button htmlType="submit" type='primary'>Cập Nhật Màu Sản Phẩm</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default UpdateColor;