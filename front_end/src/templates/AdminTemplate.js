import { Fragment, useState } from "react";
import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { Layout, Menu, theme } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { IoMenu, IoClose } from "react-icons/io5";

import AdminAvatar from "../components/Admin/AdminAvatar";
import DarkMode from "../components/DarkMode/DarkMode";

const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

function AdminTemplate(props) {
    const { Component, ...restProps } = props;
    const [collapsed, setCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);  // Thay đổi state sang boolean

    const selectedKeys = ['/admin/busmng', '/admin/stationmng', '/admin/theatremng', '/admin/theatrechildmng', '/admin/users'];
    const selectedKey = (selectedKeys.indexOf(props.path) + 1).toString();
    const { token: { colorBgContainer } } = theme.useToken();

    const itemsAdmin = [
        getItem('DashBoard', '1', <NavLink className='text-decoration-none' to="/admin/dashboard"><LuLayoutDashboard /></NavLink>),
        getItem('Bus Management', 'sub1', <UserOutlined />, [
            getItem('Bus Management', '2', <NavLink className='text-decoration-none' to="/admin/busmng"><i className="fas fa-bus f3" /></NavLink>),
            getItem('Bus Type Management', '3', <NavLink className='text-decoration-none' to="/admin/bustypemng"><i className="fas fa-bus f3" /></NavLink>),
        ]),
    ];

    // Hàm mở modal
    const showModal = () => {
        setIsModalOpen(true); // Hiển thị modal
    };

    // Hàm đóng modal
    const closeModal = () => {
        setIsModalOpen(false); // Ẩn modal
    };

    return (
        <Route {...restProps} render={(propsRoute) => {
            return (
                <Fragment>
                    <Layout style={{ minHeight: '100vh' }} className="relative">
                        <div className="bg-bg-blue 2xl:block xl:block lg:block md:block sm:hidden hidden">
                            <Sider collapsible width={300} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                                <div className="demo-logo-vertical text-white text-base font-bold text-center my-10 bg-bg-blue 2xl:block xl:block lg:block md:block sm:hidden">
                                    Admin Page
                                </div>
                                <Menu theme="dark" defaultSelectedKeys={selectedKey} mode="inline" items={itemsAdmin} />
                            </Sider>
                        </div>

                        <Layout className="bg-gray-200 dark:bg-gray-700">
                            <Header className="bg-gray-300 dark:bg-gray-800 flex items-center justify-end pr-8">
                                <div className="flex items-center gap-4 justify-center">
                                    <div className="flex gap-2 items-center">
                                        <button
                                            onClick={showModal}  // Gọi hàm mở modal
                                            className="block text-base hover:bg-blue-200 p-[11px] rounded-full dark:text-gray-100 text-gray-400 font-bold md:hidden lg:hidden xl:hidden 2xl:hidden">
                                            <IoMenu />
                                        </button>
                                        <button type="link" className="p-[11px] rounded-full hover:bg-blue-200">
                                            <a href="/admin/dashboard">
                                                <LuLayoutDashboard className="font-extrabold text-base sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl dark:text-gray-100 text-gray-400" />
                                            </a>
                                        </button>
                                        <DarkMode />
                                    </div>
                                    <div>
                                        <AdminAvatar />
                                    </div>
                                </div>
                            </Header>

                            <Content style={{ margin: '16px' }}>
                                <div className="p-6 min-h-80 bg-gray-100 dark:bg-gray-600">
                                    <Component {...propsRoute} />
                                </div>
                            </Content>
                        </Layout>

                        {/* Modal */}
                        {/* Modal */}
                        <div
                            className={`fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/70 transition-transform duration-500 ease-in-out transform ${isModalOpen ? 'translate-x-0' : '-translate-x-full'}`}
                        >
                            <div className="bg-white fixed left-0 right-10 bottom-0 top-0   z-20">
                                <div className="flex justify-end p-4">
                                    <button onClick={closeModal}>
                                        <IoClose />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h1>Hello</h1>
                                </div>
                            </div>
                        </div>

                    </Layout>
                </Fragment>
            );
        }} />
    );
}

export default AdminTemplate;
