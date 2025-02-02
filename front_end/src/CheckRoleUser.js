import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import HomeTemplate from "./templates/HomeTemplate";
import { TOKEN } from "./utils/variable";
import { getCurrentUserAction } from "./redux_store/actions/AuthAction";
import Loading from "./components/Loading/Loading";

function CheckRoleUser({ Component }) {
    const dispatch = useDispatch();
    const { userLogin } = useSelector((state) => state.UserReducer);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem(TOKEN) || "";
        if (accessToken) {
            dispatch(getCurrentUserAction(accessToken)).finally(() => {
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, [dispatch]);


    if (isLoading) {
        return <div><Loading></Loading></div>;

    }


    if (!userLogin || userLogin.role !== "User") {
        return <Navigate to="/" replace />;
    }

    return <HomeTemplate Component={Component} />;

}

export default CheckRoleUser;