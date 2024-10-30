import { createBrowserHistory } from "history";
import { Switch, Router } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"
import React from "react";

import { HomeTemplate } from "./templates/HomeTemplate";
import Home from "./pages/user_page/Home/Home";
import Search from "./pages/user_page/Search/Search";
import ProductDetail from "./pages/user_page/ProductDetail/ProductDetail";
import Login from "./pages/user_page/Login/Login";
import AdminTemplate from "./templates/AdminTemplate";
import ProductManager from "./pages/admin_page/ProductManager/ProductManager";
import DashBoard from "./pages/admin_page/DashBoard/DashBoard";
// Color Manager
import ColorMng from "./pages/admin_page/ColorManager/ColorManager";
import CreateColor from "./pages/admin_page/ColorManager/CreateColor";
import UpdateColor from "./pages/admin_page/ColorManager/UpdateColor";


export const history = createBrowserHistory();
function App() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router history={history}>
      {/* <Loading /> */}
      <Switch>
        <HomeTemplate path="/home" exact Component={Home}></HomeTemplate>
        <HomeTemplate path="/search/" Component={Search}></HomeTemplate>
        <HomeTemplate path="/product-detail/1" Component={ProductDetail}></HomeTemplate>
        <HomeTemplate path="/login" Component={Login}></HomeTemplate>

        <AdminTemplate path="/admin/product-manager" Component={ProductManager}></AdminTemplate>
        <AdminTemplate path="/admin/dashboard" Component={DashBoard}></AdminTemplate>

        {/* Color */}
        {/* FAQ */}
        <AdminTemplate path="/admin/color-mng" exact Component={ColorMng} />
        <AdminTemplate path="/admin/color-mng/addcolor" exact Component={CreateColor} />
        <AdminTemplate path="/admin/color-mng/edit/:id" exact Component={UpdateColor} />

        <HomeTemplate Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
