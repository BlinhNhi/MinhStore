import React, { useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getSizeDetailAction, getListSizesAction, updateSizeAction } from '../../../redux_store/actions/SizeAction';
import { useParams } from 'react-router-dom';


const UpdateSize = (props) => {
    const dispatch = useDispatch();
    const { sizeDetail } = useSelector(state => state.SizeReducer)
    const { arrSizes } = useSelector(state => state.SizeReducer)

    let { id } = useParams();
    useEffect(() => {
        dispatch(getListSizesAction());
        dispatch(getSizeDetailAction(id));
    }, [dispatch, id])
    const handleSubmitColor = (values) => {
        const sizeExisted = arrSizes?.some(element => element.numberOfSize === values?.numberOfSize)
        if (values.numberOfSize === "" || values?.numberOfSize?.startsWith(' ') === true) {
            notification.error({
                closeIcon: true,
                message: 'Error',
                description: (
                    <>Vui lòng điền đầy đủ thông tin và Không để trống đầu câu!.</>
                ),
            });
        }
        else if (sizeExisted === true) {
            notification.error({
                closeIcon: true,
                message: 'Lỗi Trùng Kích Thước',
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
            dispatch(updateSizeAction(id, formData))
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            numberOfSize: sizeDetail?.numberOfSize,
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
            <h3 className="text-lg md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-medium mb-4 dark:text-white">Cập Nhật Kích Thước Sản Phẩm:</h3>
            <div className='row'>
                <div className='col-8'>
                    <Form.Item
                        label="Kích Thước"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng không bỏ sót thông tin này!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="numberOfSize" onChange={formik.handleChange} value={formik.values.numberOfSize} />
                    </Form.Item>

                    <Form.Item label="Action">
                        <Button htmlType="submit" type='primary'>Cập Nhật Kích Thước Sản Phẩm</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default UpdateSize;