import { createBrowserHistory } from "history";
import { Routes, Route } from "react-router-dom"; // Dùng Route thay vì Router
import AOS from "aos";
import "aos/dist/aos.css";
import React from "react";

import Home from "./pages/user_page/Home/Home";
import Search from "./pages/user_page/Search/Search";
import ProductDetail from "./pages/user_page/ProductDetail/ProductDetail";
import Login from "./pages/user_page/Login/Login";
import SideBarUser from "./pages/user_page/SideBarUser/SideBarUser"

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

import AdminTemplate from "./templates/AdminTemplate";
import { HomeTemplate } from "./templates/HomeTemplate";


export const history = createBrowserHistory();

function App() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<HomeTemplate Component={Home} />} />
      <Route path="/search" element={<HomeTemplate Component={Search} />} />
      <Route path="/product-detail/:id" element={<HomeTemplate Component={ProductDetail} />} />
      <Route path="/login" element={<HomeTemplate Component={Login} />} />
      <Route path="/profile" element={<HomeTemplate Component={SideBarUser} />} />


      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminTemplate Component={DashBoard} />} />

      {/* Color Manager */}
      <Route path="/admin/color-mng" element={<AdminTemplate Component={ColorMng} />} />
      <Route path="/admin/color-mng/addcolor" element={<AdminTemplate Component={CreateColor} />} />
      <Route path="/admin/color-mng/edit/:id" element={<AdminTemplate Component={UpdateColor} />} />

      {/* Category Manager */}
      <Route path="/admin/categories-mng" element={<AdminTemplate Component={CategoryMng} />} />
      <Route path="/admin/categories-mng/addcate" element={<AdminTemplate Component={CreateCategory} />} />
      <Route path="/admin/categories-mng/edit/:id" element={<AdminTemplate Component={UpdateCategory} />} />

      {/* Size Manager */}
      <Route path="/admin/sizes-mng" element={<AdminTemplate Component={SizeMng} />} />
      <Route path="/admin/sizes-mng/addsize" element={<AdminTemplate Component={CreateSize} />} />
      <Route path="/admin/sizes-mng/edit/:id" element={<AdminTemplate Component={UpdateSize} />} />

      {/* Product Manager */}
      <Route path="/admin/product-mng" element={<AdminTemplate Component={ProductManager} />} />
      <Route path="/admin/product-mng/add-product" element={<AdminTemplate Component={CreateProduct} />} />
      <Route path="/admin/product-mng/edit/:id" element={<AdminTemplate Component={UpdateProduct} />} />

      {/* Default Route */}
      <Route path="/" element={<HomeTemplate Component={Home} />} />
    </Routes>
  );
}

export default App;
