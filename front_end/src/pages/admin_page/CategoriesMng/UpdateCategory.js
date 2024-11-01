import React, { useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategoriesAction, updateCategoryAction, getCategoryDetailAction } from '../../../redux_store/actions/CategoryAction';


const UpdateCategory = (props) => {
    const dispatch = useDispatch();
    const { categoryDetail } = useSelector(state => state.CategoryReducer)
    let { arrCategories } = useSelector(state => state.CategoryReducer);
    let { id } = props.match.params;
    useEffect(() => {
        dispatch(getCategoryDetailAction(id));
        dispatch(getListCategoriesAction())
    }, [dispatch, id]);

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
            dispatch(updateCategoryAction(id, formData))
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: categoryDetail?.name,
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
            <h3 className="text-lg md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-medium mb-4 dark:text-white">Cập Nhật Danh Mục:</h3>
            <div className='row'>
                <div className='col-8'>
                    <Form.Item
                        label="Danh Mục"
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
                        <Button htmlType="submit" type='primary'>Cập Nhật Danh Mục</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default UpdateCategory;