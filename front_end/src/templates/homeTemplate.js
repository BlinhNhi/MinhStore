import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Header from "./Layout/Header";
import Footer from "./Layout/Footer";


import React from "react";

function HomeTemplate(props) {
    const { Component, ...restProps } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    })


    return (
        <div>
            <Header location={location} navigate={navigate} params={params} ></Header>
            <Component location={location} navigate={navigate} params={params} />
            <Footer />
        </div>
    );
};
export default HomeTemplate;


