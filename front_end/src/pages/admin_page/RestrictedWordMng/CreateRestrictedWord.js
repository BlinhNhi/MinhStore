import React, { useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { addRestrictedWordAction, getListRestrictedWordAction } from '../../../redux_store/actions/RestrictedWordAction';


const CreateRestrictedWord = () => {
    const dispatch = useDispatch();
    let { arrRestrictedWord } = useSelector(state => state.RestrictedWordReducer);
    useEffect(() => {
        dispatch(getListRestrictedWordAction())
    }, [dispatch]);
    const handleSubmitRestrictedWord = (values) => {
        const restrictedWordExisted = arrRestrictedWord?.some(element => element.word === values?.word)
        if (values.word === "" || values?.word?.startsWith(' ') === true) {
            notification.error({
                closeIcon: true,
                message: 'Lỗi',
                description: (
                    <>Vui lòng điền đầy đủ thông tin và không để trống đầu câu!</>
                ),
            });
        }
        else if (restrictedWordExisted === true) {
            notification.error({
                closeIcon: true,
                message: 'Lỗi Trùng Từ Khoá',
                description: (
                    <>
                        Từ Khoá Này Đã Được Thêm.
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
            dispatch(addRestrictedWordAction(formData));
        }
    }

    const formik = useFormik({
        initialValues: {
            word: '',
        },
        onSubmit: handleSubmitRestrictedWord
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
            <h3 className="text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl md:text-2xl font-normal mb-4 dark:text-gray-200">Tạo Từ Khoá Chặn</h3>
            <div className='row'>
                <div className='col-8 dark:text-white'>
                    <Form.Item
                        className=''
                        label="Từ Khoá Chặn"
                        name="word"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Bắt Buộc Nhập Từ Khoá!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="word" onChange={formik.handleChange} />
                    </Form.Item>
                    <Form.Item label="Tác Vụ">
                        <Button htmlType="submit" >Thêm Từ Khoá </Button>
                    </Form.Item>
                </div>
            </div>

        </Form>
    );
};
export default CreateRestrictedWord;