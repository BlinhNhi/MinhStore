import { Button, Checkbox, Form, Input } from "antd";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../../redux_store/actions/UserAction";
import { TOKEN } from "../../../utils/variable";

function ProfileUser() {
    let accessToken = {}
    if (localStorage.getItem(TOKEN)) {
        accessToken = localStorage.getItem(TOKEN)
    } else {
        window.location.href = '/';
    }
    let { userLogin } = useSelector(state => state.UserReducer);
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const id = userLogin?.id;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: userLogin?.name,
            email: userLogin?.email,
            password: null,
            phone: userLogin?.phone,
            role: "User",
        },
        onSubmit: async (values) => {
            let formData = new FormData();
            for (let key in values) {
                formData.append(key, values[key]);
            }
            console.table("formData", [...formData]);
            userLogin && dispatch(updateUserAction(id, formData));
        },
    })
    const onChangeCheck = (e) => {
        setChecked(e.target.checked);
    };
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

                    >
                        <Input name="name" onChange={formik.handleChange} value={formik.values.name || ""} />
                    </Form.Item>

                    <Form.Item label="Đổi Mật Khẩu?">
                        <Checkbox checked={checked} onChange={onChangeCheck}></Checkbox>
                    </Form.Item>
                    {checked ? (
                        <Form.Item
                            label="Mật Khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: "Password  cannot be blank!",
                                },
                            ]}
                        >
                            <Input.Password
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                placeholder="Password"
                            />
                        </Form.Item>
                    ) : (
                        ""
                    )}

                    <Form.Item
                        label="Điện Thoại"
                        style={{ minWidth: '100%', padding: '2px' }}
                    >
                        <Input name="phone" onChange={formik.handleChange} value={formik.values.phone || ""} />
                    </Form.Item>

                    <Form.Item label="Action">
                        <Button
                            htmlType="submit"
                            className="btn-primary bg-primary"
                            type="primary"
                        >
                            {" "}
                            Cập Nhật Tài Khoản{" "}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default ProfileUser;