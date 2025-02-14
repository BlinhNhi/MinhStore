import { Button, Checkbox, Form, Input } from "antd";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUserAction } from "../../../redux_store/actions/UserAction";

function ProfileUser() {
    let { userLogin } = useSelector((state) => state.UserReducer);
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const id = userLogin?.id;

    const validate = (values) => {
        const errors = {};
        if (checked && (!values?.password || values?.password?.length < 10)) {
            errors.password = "Mật khẩu phải lớn hơn 10 ký tự!";
        }
        // if (values?.phone?.startsWith(' ') === true || values?.phone?.length < 10) {
        //     errors.phone = "Điện thoại không được để trống và lớn hơn 10 ký tự!";
        // }
        // if (values?.name?.startsWith(' ') === true) {
        //     errors.name = "Name cannot be blank!";
        // }
        return errors;
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: userLogin?.name || '',
            email: userLogin?.email,
            password: null,
            phone: userLogin?.phone || '',
            role: "User",
        },
        validate,
        onSubmit: async (values) => {
            if (!Object.keys(formik.errors).length) {
                let formData = new FormData();
                for (let key in values) {
                    formData.append(key, values[key]);
                }
                userLogin && dispatch(updateUserAction(id, formData));
            } else {
                console.log("Validation failed:", formik.errors);
            }
        },
    });

    const onChangeCheck = (e) => {
        setChecked(e.target.checked);
    };

    const hasChanges = JSON.stringify(formik.values) !== JSON.stringify(formik.initialValues);

    return (
        <div>
            <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-300">Xin Chào {userLogin?.email}</h3>
            <p className="text-base text-gray-600 italic font-bold dark:text-gray-300 mb-2">Bạn có thể cập nhật thông tin của bạn tại đây!</p>
            <div className="bg-gray-50 dark:bg-gray-100 px-4 py-10 rounded-md">
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    onSubmitCapture={formik.handleSubmit}
                >
                    <div className="mb-4">
                        <h3 className="font-bold italic text-base text-gray-500">Email: {formik.values.email}</h3>
                    </div>
                    <Form.Item
                        label="Tên"
                        help={formik.touched.name && formik.errors.name}
                        validateStatus={formik.touched.name && formik.errors.name ? "error" : ""}
                    >
                        <Input
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name || ""}
                        />
                    </Form.Item>

                    <Form.Item label="Đổi Mật Khẩu?">
                        <Checkbox checked={checked} onChange={onChangeCheck}></Checkbox>
                    </Form.Item>
                    {checked && (
                        <Form.Item
                            label="Mật Khẩu"
                            help={formik.touched.password && formik.errors.password}
                            validateStatus={formik.touched.password && formik.errors.password ? "error" : ""}
                        >
                            <Input.Password
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password || ""}
                                placeholder="Password"
                            />
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Điện Thoại"
                        help={formik.touched.phone && formik.errors.phone}
                        validateStatus={formik.touched.phone && formik.errors.phone ? "error" : ""}
                    >
                        <Input
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone || ""}
                        />
                    </Form.Item>

                    <Form.Item label="Action">
                        <Button
                            htmlType="submit"
                            className={`btn-primary bg-primary ${!hasChanges ? "disabled" : ""}`}
                            type="primary"
                            disabled={!hasChanges}
                        >
                            Cập Nhật Tài Khoản
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default ProfileUser;
