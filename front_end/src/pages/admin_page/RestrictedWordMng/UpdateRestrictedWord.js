import React, { useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getListRestrictedWordAction, updateRestrictedWordAction, getRestrictedWordDetailAction } from '../../../redux_store/actions/RestrictedWordAction';

const UpdateRestrictedWord = (props) => {
    const dispatch = useDispatch();
    const { restrictedWordDetail } = useSelector(state => state.RestrictedWordReducer)
    let { arrRestrictedWord } = useSelector(state => state.RestrictedWordReducer);
    let { id } = useParams();
    useEffect(() => {
        dispatch(getRestrictedWordDetailAction(id));
        dispatch(getListRestrictedWordAction())
    }, [dispatch, id]);

    const handleSubmitCategory = (values) => {
        const restrictedWordExisted = arrRestrictedWord?.some(element => element.word === values?.word)
        if (values.word === "" || values?.word?.startsWith(' ') === true) {
            notification.error({
                closeIcon: true,
                message: 'Error',
                description: (
                    <>Vui lòng điền đầy đủ thông tin và không để trống đầu câu!</>
                ),
            });
        }
        else if (restrictedWordExisted === true) {
            notification.error({
                closeIcon: true,
                message: 'Lỗi Trùng Tên Từ Khoá',
                description: (
                    <>
                        Từ Khoá Này Đã Có Rồi.
                    </>
                ),
            });
        }
        else {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            dispatch(updateRestrictedWordAction(id, formData))
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            word: restrictedWordDetail?.word,
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
            <h3 className="text-lg md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-medium mb-4 dark:text-white">Cập Nhật Từ Khoá:</h3>
            <div className='row'>
                <div className='col-8'>
                    <Form.Item
                        label="Từ Khoá"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng không bỏ sót thông tin này!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="word" onChange={formik.handleChange} value={formik.values.word} />
                    </Form.Item>

                    <Form.Item label="Action">
                        <Button htmlType="submit" type='primary'>Cập Nhật Từ Khoá</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default UpdateRestrictedWord;