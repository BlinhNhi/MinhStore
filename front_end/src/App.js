import { createBrowserHistory } from "history";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import React from "react";

// General
import Home from "./pages/user_page/Home/Home";
import Search from "./pages/user_page/Search/Search";
import ProductDetail from "./pages/user_page/ProductDetail/ProductDetail";
import Login from "./pages/user_page/Login/Login";
import DashBoard from "./pages/admin_page/DashBoard/DashBoard";

// User
// Manager account.
import SystemUser from "./pages/user_page/SystemUser/SystemUser"
import ProfileUser from "./pages/user_page/ProfileUser/ProfileUser"
import ManagerAccount from "./pages/user_page/ManagerAccount/ManagerAccount";
// Order, Payment
import CartShoppingUser from "./pages/user_page/CartShoppingUser/CartShoppingUser"
import PaymentProduct from "./pages/user_page/PaymentProduct/PaymentProduct";
import ManagerOrder from "./pages/user_page/ManagerOrder/ManagerOrder";
import OrderDetail from "./pages/user_page/ManagerOrder/OrderDetail";

// Admin
// Color 
import ColorMng from "./pages/admin_page/ColorManager/ColorManager";
import CreateColor from "./pages/admin_page/ColorManager/CreateColor";
import UpdateColor from "./pages/admin_page/ColorManager/UpdateColor";
// Category 
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


import HomeTemplate from "./templates/HomeTemplate";
import Loading from "./components/Loading/Loading";


import AdminRoute from "./AdminRoute";
import CheckRoleUser from "./CheckRoleUser";
import ForgetPassword from "./pages/user_page/ForgetPassword/ForgetPassword";
import RestrictedWordMng from "./pages/admin_page/RestrictedWordMng/RestrictedWordMng";
import CreateRestrictedWord from "./pages/admin_page/RestrictedWordMng/CreateRestrictedWord";
import UpdateRestrictedWord from "./pages/admin_page/RestrictedWordMng/UpdateRestrictedWord";


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
    <>
      <Loading></Loading>
      <Routes>
        {/* General */}
        <Route path="/home" element={<HomeTemplate Component={Home} />} />
        <Route path="/search" element={<HomeTemplate Component={Search} />} />
        <Route path="/product-detail/:id" element={<CheckRoleUser Component={ProductDetail} />}></Route>
        <Route path="/login" element={<HomeTemplate Component={Login} />} />
        <Route path="/forgetPassword" element={<HomeTemplate Component={ForgetPassword} />} />


        {/* User */}
        <Route path="/system-account/*" element={<CheckRoleUser Component={SystemUser} />}>
          <Route path="my-account" element={<ManagerAccount />} />
          <Route path="profile" element={<ProfileUser />} />
          <Route path="cart-shopping" element={<CartShoppingUser />} />
          <Route path="view-order" element={<ManagerOrder />} />
        </Route>

        {/* Payment */}
        <Route path="check-out" element={<HomeTemplate Component={PaymentProduct} />} />
        {/* Payment Detail */}
        <Route path="orderDetail/:id" element={<HomeTemplate Component={OrderDetail} />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminRoute Component={DashBoard} />} />
        {/* Color Manager */}
        <Route path="/admin/color-mng" element={<AdminRoute Component={ColorMng} />} />
        <Route path="/admin/color-mng/addcolor" element={<AdminRoute Component={CreateColor} />} />
        <Route path="/admin/color-mng/edit/:id" element={<AdminRoute Component={UpdateColor} />} />
        {/* Category Manager */}
        <Route path="/admin/categories-mng" element={<AdminRoute Component={CategoryMng} />} />
        <Route path="/admin/categories-mng/addcate" element={<AdminRoute Component={CreateCategory} />} />
        <Route path="/admin/categories-mng/edit/:id" element={<AdminRoute Component={UpdateCategory} />} />
        {/* Size Manager */}
        <Route path="/admin/sizes-mng" element={<AdminRoute Component={SizeMng} />} />
        <Route path="/admin/sizes-mng/addsize" element={<AdminRoute Component={CreateSize} />} />
        <Route path="/admin/sizes-mng/edit/:id" element={<AdminRoute Component={UpdateSize} />} />
        {/* Product Manager */}
        <Route path="/admin/product-mng" element={<AdminRoute Component={ProductManager} />} />
        <Route path="/admin/product-mng/add-product" element={<AdminRoute Component={CreateProduct} />} />
        <Route path="/admin/product-mng/edit/:id" element={<AdminRoute Component={UpdateProduct} />} />
        {/* Restricted Word */}
        <Route path="/admin/restricted-word-mng" element={<AdminRoute Component={RestrictedWordMng} />} />
        <Route path="/admin/restricted-word-mng/addrestrictedword" element={<AdminRoute Component={CreateRestrictedWord} />} />
        <Route path="/admin/restricted-word-mng/edit/:id" element={<AdminRoute Component={UpdateRestrictedWord} />} />
        {/* Default Route */}
        <Route path="/" element={<HomeTemplate Component={Home} />} />
      </Routes>
    </>

  );
}

export default App;
