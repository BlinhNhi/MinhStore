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
import DashBoard from "./pages/admin_page/DashBoard/DashBoard";

// Color Manager
import ColorMng from "./pages/admin_page/ColorManager/ColorManager";
import CreateColor from "./pages/admin_page/ColorManager/CreateColor";
import UpdateColor from "./pages/admin_page/ColorManager/UpdateColor";
// Category Manager
import CategoryMng from "./pages/admin_page/CategoriesMng/CategoriesMng";
import CreateCategory from "./pages/admin_page/CategoriesMng/CreateCategory";
import UpdateCategory from "./pages/admin_page/CategoriesMng/UpdateCategory";
// Size
import SizeMng from "./pages/admin_page/SizeMng/SizesMng";
import CreateSize from "./pages/admin_page/SizeMng/CreateSize";
import UpdateSize from "./pages/admin_page/SizeMng/UpdateSize";
// Product
import ProductManager from "./pages/admin_page/ProductManager/ProductManager";
import CreateProduct from "./pages/admin_page/ProductManager/CreateProduct";
import UpdateProduct from "./pages/admin_page/ProductManager/UpdateProduct";


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
        <AdminTemplate path="/admin/dashboard" Component={DashBoard}></AdminTemplate>

        {/* Color */}
        <AdminTemplate path="/admin/color-mng" exact Component={ColorMng} />
        <AdminTemplate path="/admin/color-mng/addcolor" exact Component={CreateColor} />
        <AdminTemplate path="/admin/color-mng/edit/:id" exact Component={UpdateColor} />
        {/* Category */}
        <AdminTemplate path="/admin/categories-mng" exact Component={CategoryMng} />
        <AdminTemplate path="/admin/categories-mng/addcate" exact Component={CreateCategory} />
        <AdminTemplate path="/admin/categories-mng/edit/:id" exact Component={UpdateCategory} />
        {/* Size */}
        <AdminTemplate path="/admin/sizes-mng" exact Component={SizeMng} />
        <AdminTemplate path="/admin/sizes-mng/addsize" exact Component={CreateSize} />
        <AdminTemplate path="/admin/sizes-mng/edit/:id" exact Component={UpdateSize} />
        {/* Product */}
        <AdminTemplate path="/admin/product-mng" exact Component={ProductManager} />
        <AdminTemplate path="/admin/product-mng/add-product" exact Component={CreateProduct} />
        <AdminTemplate path="/admin/product-mng/edit/:id" exact Component={UpdateProduct} />


        <HomeTemplate Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
