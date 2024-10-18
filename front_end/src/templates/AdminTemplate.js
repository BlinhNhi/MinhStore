import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";

import { Layout, Menu, theme, Button, Input, Modal, Descriptions } from 'antd';
import { UserOutlined } from '@ant-design/icons';
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
    const selectedKeys = ['/admin/busmng', '/admin/stationmng', '/admin/theatremng', '/admin/theatrechildmng', '/admin/users',]
    const selectedKey = (selectedKeys.indexOf(props.path) + 1).toString();
    const { token: { colorBgContainer }, } = theme.useToken();


    const itemsAdmin = [
        getItem('DashBoard', '1', <NavLink className='text-decoration-none' to="/admin/dashboard"><LuLayoutDashboard></LuLayoutDashboard></NavLink>),
        getItem('Bus Management', 'sub1', <UserOutlined />, [
            getItem('Bus Management', '2', <NavLink className='text-decoration-none' to="/admin/busmng"><i className="fas fa-bus f3"></i></NavLink>),
            getItem('Bus Type Management', '3', <NavLink className='text-decoration-none' to="/admin/bustypemng"><i className="fas fa-bus f3"></i></NavLink>),
        ]),

    ]

    return <Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
        return <Fragment>
            <Layout style={{ minHeight: '100vh', }}>
                <Sider className="bg-gray-800" collapsible width={300} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical text-white text-base font-bold text-center my-10" >Admin Page</div>
                    <Menu theme="dark" defaultSelectedKeys={selectedKey} mode="inline" items={itemsAdmin} />
                </Sider>
                <Layout className="bg-gray-200 dark:bg-gray-700">
                    <Header
                        className="bg-gray-300 dark:bg-gray-800 flex items-center justify-end pr-8"
                    >
                        <div className="flex items-center gap-6 justify-center">
                            <div className="flex gap-2 items-center">
                                <button type="link" className="p-[11px] rounded-full hover:bg-blue-200"><a href="/admin/dashboard" ><LuLayoutDashboard className="font-extrabold text-2xl text-gray-400" /></a> </button>
                                <DarkMode></DarkMode>
                            </div>
                            <AdminAvatar></AdminAvatar>
                        </div>
                    </Header>
                    <Content style={{ margin: '16px' }}>
                        <div
                            className="p-6 min-h-80 bg-gray-100 dark:bg-gray-600"
                        >
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                </Layout>
            </Layout>


        </Fragment>
    }} />
}

export default AdminTemplate;