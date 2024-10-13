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
        <HomeTemplate path="/productDetail/nike/1" Component={ProductDetail}></HomeTemplate>
        <HomeTemplate path="/login" Component={Login}></HomeTemplate>
        <HomeTemplate Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
