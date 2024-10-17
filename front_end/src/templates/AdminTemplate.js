import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { Layout, Menu, theme, Button, Input, Modal, Descriptions } from 'antd';
import { UserOutlined } from '@ant-design/icons';


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
        getItem('Bus Management', 'sub1', <UserOutlined />, [
            getItem('Bus Management', '1', <NavLink className='text-decoration-none' to="/admin/busmng"><i className="fas fa-bus f3"></i></NavLink>),
            getItem('Bus Type Management', '2', <NavLink className='text-decoration-none' to="/admin/bustypemng"><i className="fas fa-bus f3"></i></NavLink>),
        ]),

    ]

    return <Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
        return <Fragment>
            <Layout style={{ minHeight: '100vh', }}>
                <Sider collapsible width={300} collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical text-white text-2xl text-center my-10" >Admin Page</div>
                    <Menu theme="dark" defaultSelectedKeys={selectedKey} mode="inline" items={itemsAdmin} />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                            paddingRight: '30px'
                        }}
                    >
                        {/* <div>{operations}</div> */}
                    </Header>
                    <Content style={{ margin: '16px' }} >
                        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, }} >
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                </Layout>
            </Layout>


        </Fragment>
    }} />
}

export default AdminTemplate;