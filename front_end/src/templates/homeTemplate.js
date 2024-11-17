import { Fragment, useEffect } from "react";
import { Route, useLocation, useNavigate, useParams } from "react-router-dom";

import Footer from "./Layout/Footer";
// import { useDispatch } from "react-redux";
import Header from "./Layout/Header";


import React from "react";

export const HomeTemplate = (props) => {
    const { Component, ...restProps } = props;
    const location = useLocation(); // Thay thế propsRoute.location
    const navigate = useNavigate(); // Thay thế propsRoute.history
    const params = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    // console.log(Component);
    // console.log(props.location);

    return (
        <div>
            <Header location={location} navigate={navigate} params={params} ></Header>
            <Component location={location} navigate={navigate} params={params} />
            <Footer />
        </div>
    );
};


// export const HomeTemplate = (props) => { //path, exact, Component
//     const { Component, ...restProps } = props;
//     // const dispatch = useDispatch();


//     useEffect(() => {
//         window.scrollTo(0, 0);
//     })

//     return <Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
//         return <Fragment>
//             <Header></Header>
//             <Component {...propsRoute} />
//             <Footer />
//         </Fragment>
//     }} />
// }