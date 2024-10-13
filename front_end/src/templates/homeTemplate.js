import { Fragment, useEffect } from "react";
import { Route } from "react-router-dom";

import Footer from "./Layout/Footer";
// import { useDispatch } from "react-redux";
import Header from "./Layout/Header";





export const HomeTemplate = (props) => { //path, exact, Component
    const { Component, ...restProps } = props;
    // const dispatch = useDispatch();


    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return <Route {...restProps} render={(propsRoute) => { //props.location, props.history, props.match
        return <Fragment>
            <Header></Header>
            <Component {...propsRoute} />
            <Footer />
        </Fragment>
    }} />
}