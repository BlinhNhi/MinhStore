import { createBrowserHistory } from "history";
import { Routes, Route } from "react-router-dom"; // Dùng Route thay vì Router
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useMemo } from "react";
// General
import Home from "./pages/user_page/Home/Home";
import Search from "./pages/user_page/Search/Search";
import ProductDetail from "./pages/user_page/ProductDetail/ProductDetail";
import Login from "./pages/user_page/Login/Login";
import DashBoard from "./pages/admin_page/DashBoard/DashBoard";

// User
import SystemUser from "./pages/user_page/SystemUser/SystemUser"
import ProfileUser from "./pages/user_page/ProfileUser/ProfileUser"
import CartShoppingUser from "./pages/user_page/CartShoppingUser/CartShoppingUser"



// Admin
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
import ManagerAccount from "./pages/user_page/ManagerAccount/ManagerAccount";
import Loading from "./components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN } from "./utils/variable";
import { getCurrentUserAction } from "./redux_store/actions/AuthAction";
import PaymentProduct from "./pages/user_page/PaymentProduct/PaymentProduct";
import ManagerOrder from "./pages/user_page/ManagerOrder/ManagerOrder";
import OrderDetail from "./pages/user_page/ManagerOrder/OrderDetail";


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

  const dispatch = useDispatch();
  let { userLogin } = useSelector(state => state.UserReducer);
  const accessToken = useMemo(() => {
    return localStorage.getItem(TOKEN) || "";
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (accessToken && accessToken != null) {
        dispatch(getCurrentUserAction(accessToken))
      }
    }, 1000)

  }, [accessToken, dispatch]);


  return (
    <>
      <Loading></Loading>
      <Routes>
        {/* General */}
        <Route path="/home" element={<HomeTemplate Component={Home} />} />
        <Route path="/search" element={<HomeTemplate Component={Search} />} />
        <Route path="/product-detail/:id" element={<HomeTemplate Component={ProductDetail} />} />
        <Route path="/login" element={<HomeTemplate Component={Login} />} />

        {/* User */}
        <Route path="/system-account/*" element={<HomeTemplate Component={SystemUser} />}>
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
    </>

  );
}

export default App;
